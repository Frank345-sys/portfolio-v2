import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { walk } from './utils/walk.mjs'

/**
 * Complementa `import/no-duplicates` (imports en el mismo archivo), no barrels.
 * Ver `scripts/README.md` para la matriz con ESLint y CI.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const srcDir = path.join(root, 'src')

const STAR_REEXPORT_RE =
  /export\s+(?:type\s+)?\*\s+from\s*['"][^'"]+['"]\s*;?/gu

/**
 * @param {string} exportClause
 * @returns {string[]}
 */
function getNamesFromNamedExportClause(exportClause) {
  return exportClause
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      if (part.includes(' as ')) {
        return (
          part
            .split(/\s+as\s+/u)
            .at(-1)
            ?.trim() ?? ''
        )
      }
      return part
    })
    .filter(Boolean)
}

/**
 * Cuenta solo nombres explícitos en el texto (`export { … } from`, `export * as Ns from`).
 * No inspecciona `export * from '…'`: dos star-reexports pueden colisionar en tiempo de módulo
 * sin que este script lo detecte (haría falta resolver el grafo de imports).
 *
 * @param {string} fileBody
 * @returns {Map<string, number>}
 */
function collectExplicitExportNames(fileBody) {
  const names = new Map()
  const body = fileBody.replace(/^\uFEFF/u, '')

  const namedRe = /export\s*\{\s*([^}]*)\s*\}\s*from\s*['"][^'"]+['"]\s*;?/gu
  for (const match of body.matchAll(namedRe)) {
    const clause = match[1] ?? ''
    for (const name of getNamesFromNamedExportClause(clause)) {
      names.set(name, (names.get(name) ?? 0) + 1)
    }
  }

  const nsRe =
    /export\s*\*\s*as\s*([A-Za-z_$][\w$]*)\s*from\s*['"][^'"]+['"]\s*;?/gu
  for (const match of body.matchAll(nsRe)) {
    const name = match[1]
    if (name) names.set(name, (names.get(name) ?? 0) + 1)
  }

  return names
}

/**
 * @param {string} fileBody
 * @returns {number}
 */
function countStarReexports(fileBody) {
  const body = fileBody.replace(/^\uFEFF/u, '')
  return [...body.matchAll(STAR_REEXPORT_RE)].length
}

function main() {
  const barrelFiles = walk(srcDir, {
    filter: (_abs, ent) => ent.name === 'index.ts' || ent.name === 'index.tsx',
  }).sort()
  const withDuplicatedExports = []
  const withManyStarReexports = []

  for (const file of barrelFiles) {
    const body = fs.readFileSync(file, 'utf8')
    const exportNames = collectExplicitExportNames(body)
    const duplicated = [...exportNames.entries()]
      .filter(([, count]) => count > 1)
      .map(([name]) => name)
      .sort()

    if (duplicated.length > 0) {
      withDuplicatedExports.push({ file, duplicated })
    }

    const starCount = countStarReexports(body)
    if (starCount >= 2) {
      withManyStarReexports.push({ file, starCount })
    }
  }

  if (withManyStarReexports.length > 0) {
    console.warn(
      `Barrel exports: ${withManyStarReexports.length} barrel(s) con 2+ \`export * from\` (posibles colisiones en runtime no detectadas por este script):`
    )
    for (const { file, starCount } of withManyStarReexports) {
      console.warn(
        ` - ${path.relative(root, file)} (${starCount} star-reexport(s))`
      )
    }
  }

  if (withDuplicatedExports.length === 0) {
    const status = withManyStarReexports.length > 0 ? 'OK con avisos' : 'OK'
    const starNote =
      withManyStarReexports.length > 0
        ? `; ${withManyStarReexports.length} barrel(s) con 2+ \`export * from\` (ver warnings arriba)`
        : ''
    console.log(
      `Barrel exports: ${status} (${barrelFiles.length} index.ts/index.tsx revisados, sin nombres duplicados${starNote}).`
    )
    return
  }

  console.error(
    'Barrel exports: se detectaron nombres de exportación duplicados en barrels:'
  )
  for (const issue of withDuplicatedExports) {
    console.error(`\n- ${path.relative(root, issue.file)}`)
    for (const dup of issue.duplicated) {
      console.error(`  - ${dup}`)
    }
  }
  console.error(
    '\nSugerencia: renombra alias con `as` o evita re-exportar el mismo símbolo dos veces.'
  )
  process.exitCode = 1
}

main()
