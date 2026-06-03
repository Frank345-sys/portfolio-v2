/**
 * Sustituye cabeceras TSDoc genéricas insertadas por `check-tsdoc.mjs --fix`
 * por textos coherentes según la ruta del archivo.
 *
 * @fileoverview Recorre `src/`, detecta placeholders conocidos y los reemplaza por descripciones generadas a partir de la ruta y los exports detectados.
 * @remarks Modo `--dry-run`: lista los archivos que cambiarían sin escribir en disco.
 *
 * Uso:
 *  node scripts/fill-tsdoc-placeholders.mjs              # aplica cambios
 *  node scripts/fill-tsdoc-placeholders.mjs --dry-run    # solo lista cambios
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  GENERIC_BARREL_LINE,
  hadPlaceholderLine,
  LEADING_TSDOC,
  PLACEHOLDER_FILEOVERVIEW_SOURCE,
  PLACEHOLDER_FILEOVERVIEW_TEST,
  PLACEHOLDER_REMARKS_SOURCE,
  PLACEHOLDER_REMARKS_TEST,
  PLACEHOLDER_SUMMARY,
  tsdocCopyFromRoute,
} from './utils/tsdoc-templates.mjs'
import { walk } from './utils/walk.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const srcDir = path.join(root, 'src')

const isDryRun =
  process.argv.includes('--dry-run') || process.argv.includes('--dry')

/**
 * @param {string} block
 * @param {string} relPosix
 * @param {boolean} isTest
 * @returns {string | null} nuevo bloque o null si sin cambios
 */
function transformBlock(block, relPosix, isTest) {
  const lines = block.split('\n')
  if (lines.length < 2) return null
  const rawInner = lines.slice(1, -1)

  if (!hadPlaceholderLine(rawInner)) return null

  const gen = tsdocCopyFromRoute(relPosix, isTest)

  const kept = rawInner.filter((line) => {
    if (PLACEHOLDER_SUMMARY.test(line)) return false
    if (PLACEHOLDER_FILEOVERVIEW_SOURCE.test(line)) return false
    if (PLACEHOLDER_REMARKS_SOURCE.test(line)) return false
    if (PLACEHOLDER_FILEOVERVIEW_TEST.test(line)) return false
    if (PLACEHOLDER_REMARKS_TEST.test(line)) return false
    return true
  })

  /** @type {string[]} */
  const proseLines = []
  /** @type {string[]} */
  const tagLines = []
  for (const raw of kept) {
    const t = raw.replace(/^\s*\*\s?/u, '').trim()
    if (t.startsWith('@')) tagLines.push(raw)
    else proseLines.push(raw)
  }

  while (proseLines.length > 0) {
    const last = proseLines[proseLines.length - 1]
    const t = last.replace(/^\s*\*\s?/u, '').trim()
    if (t.length === 0) proseLines.pop()
    else break
  }

  const proseText = proseLines
    .map((r) => r.replace(/^\s*\*\s?/u, '').trim())
    .filter((t) => t.length > 0)
  const hasProse = proseText.length > 0

  const hasFo = tagLines.some((l) => /@fileoverview\b/u.test(l))
  const hasRm = tagLines.some((l) => /@remarks\b/u.test(l))

  /** @type {string[]} */
  const out = ['/**']

  if (hasProse) {
    for (const raw of proseLines) {
      out.push(/^\s*\*/u.test(raw) ? raw : ` * ${raw}`)
    }
    out.push(' *')
  } else {
    out.push(` * ${gen.summary}`)
    out.push(' *')
  }

  for (const raw of tagLines) {
    out.push(/^\s*\*/u.test(raw) ? raw : ` * ${raw}`)
  }

  if (!hasFo) out.push(` * @fileoverview ${gen.fileoverview}`)
  if (!hasRm) out.push(` * @remarks ${gen.remarks}`)

  out.push(' */')
  return out.join('\n')
}

/**
 * Inventario de re-exports en un barrel.
 *
 * Cubre:
 *  - `export { X, Y } from '…'` / `export type { X, Y } from '…'`
 *  - `export * as Foo from '…'`  / `export type * as Foo from '…'`
 *  - `export * from '…'`         / `export type * from '…'`  (sin nombre, solo se cuenta)
 *
 * @param {string} afterHeader — contenido del archivo tras el bloque TSDoc inicial.
 * @returns {{ names: string[], starReexports: number }}
 */
function extractBarrelExportNames(afterHeader) {
  /** @type {string[]} */
  const names = []
  const seen = new Set()
  let starReexports = 0

  const blockRe =
    /export\s+(?:type\s+)?\{\s*([^}]+)\s*\}\s*from\s*['"][^'"]+['"]/gu
  let m
  while ((m = blockRe.exec(afterHeader))) {
    for (const part of m[1].split(',')) {
      const token = part.trim()
      const pub = token.includes(' as ')
        ? token
            .split(/\s+as\s+/iu)
            .pop()
            ?.trim()
        : token
      const id = pub?.replace(/^type\s+/iu, '').trim()
      if (id && /^[A-Za-z_$][\w$]*$/u.test(id) && !seen.has(id)) {
        seen.add(id)
        names.push(id)
      }
    }
  }

  // `export * as Foo from '…'` aporta `Foo` como nombre publicado.
  const starAsRe =
    /export\s+(?:type\s+)?\*\s+as\s+([A-Za-z_$][\w$]*)\s+from\s*['"][^'"]+['"]/gu
  while ((m = starAsRe.exec(afterHeader))) {
    const id = m[1]
    if (id && !seen.has(id)) {
      seen.add(id)
      names.push(id)
    }
  }

  // `export * from '…'` no expone un identificador concreto; lo contamos para el resumen.
  const starRe = /export\s+(?:type\s+)?\*\s+from\s*['"][^'"]+['"]/gu
  while (starRe.exec(afterHeader) !== null) {
    starReexports += 1
  }

  return { names, starReexports }
}

/**
 * Sustituye la línea genérica de barrel por texto anclado a `@module` y a los exports reales.
 *
 * @param {string} absFile
 * @returns {boolean}
 */
function processBarrelFile(absFile) {
  const base = path.basename(absFile)
  if (base !== 'index.ts' && base !== 'index.tsx') return false

  const raw = fs.readFileSync(absFile, 'utf8')
  const m = raw.match(LEADING_TSDOC)
  if (!m) return false

  const head = m[0]
  const modM = head.match(/@module\s+(\S+)/u)
  if (!modM) return false

  const lines = head.split('\n')
  const genericIdx = lines.findIndex((l) => GENERIC_BARREL_LINE.test(l))
  if (genericIdx < 0) return false

  const modulePath = modM[1]
  const after = raw.slice(m.index + m[0].length)
  const { names: exportNames, starReexports } = extractBarrelExportNames(after)

  let replacement
  if (exportNames.length > 0) {
    const max = 8
    const shown = exportNames.slice(0, max)
    const moreNamed =
      exportNames.length > max
        ? ` y ${exportNames.length - max} símbolo(s) más`
        : ''
    const starTail =
      starReexports > 0
        ? ` y ${starReexports} re-export(s) completo(s) de submódulo(s)`
        : ''
    replacement = ` * Punto de entrada \`@module ${modulePath}\`: re-exporta ${shown.map((n) => `\`${n}\``).join(', ')}${moreNamed}${starTail} para imports estables sin rutas internas.`
  } else if (starReexports > 0) {
    replacement = ` * Punto de entrada \`@module ${modulePath}\`: agrupa ${starReexports} re-export(s) completo(s) de submódulo(s) para imports estables sin rutas internas.`
  } else {
    replacement = ` * Punto de entrada \`@module ${modulePath}\`: barrel que agrega los exports públicos de este directorio sin fijar rutas de implementación.`
  }

  const newLines = [...lines]
  newLines[genericIdx] = replacement
  const newHead = newLines.join('\n')
  if (newHead === head) return false
  // Forma funcional: evita que un `$` dentro del nuevo encabezado se interprete como referencia.
  if (!isDryRun) {
    fs.writeFileSync(
      absFile,
      raw.replace(head, () => newHead),
      'utf8'
    )
  }
  return true
}

/**
 * @param {string} absFile
 * @returns {boolean}
 */
function processFile(absFile) {
  const rel = path.relative(srcDir, absFile).replace(/\\/gu, '/')
  const isTest =
    /\.test\.tsx?$/iu.test(absFile) || /\.spec\.tsx?$/iu.test(absFile)

  const raw = fs.readFileSync(absFile, 'utf8')
  const m = raw.match(LEADING_TSDOC)
  if (!m) return false

  const nextBlock = transformBlock(m[0], rel, isTest)
  if (!nextBlock) return false

  // Forma funcional para no interpretar `$`/`$1`… dentro del bloque generado.
  const nextRaw = raw.replace(LEADING_TSDOC, () => nextBlock)
  if (nextRaw === raw) return false
  if (!isDryRun) {
    fs.writeFileSync(absFile, nextRaw, 'utf8')
  }
  return true
}

/** @type {string[]} */
const changedFiles = []
/** @type {string[]} */
const changedBarrels = []

const allFiles = walk(srcDir)

for (const f of allFiles) {
  if (processFile(f)) changedFiles.push(path.relative(root, f))
}

for (const f of allFiles) {
  if (processBarrelFile(f)) changedBarrels.push(path.relative(root, f))
}

if (isDryRun) {
  console.log(
    `fill-tsdoc-placeholders [dry-run]: ${allFiles.length} archivo(s) escaneados; ${changedFiles.length} con placeholders legacy y ${changedBarrels.length} barrel(s) cambiarían.`
  )
  if (changedFiles.length > 0) {
    console.log('\nPlaceholders:')
    for (const f of changedFiles) console.log(`  - ${f}`)
  }
  if (changedBarrels.length > 0) {
    console.log('\nBarrels:')
    for (const f of changedBarrels) console.log(`  - ${f}`)
  }
} else {
  console.log(
    `fill-tsdoc-placeholders: ${allFiles.length} archivo(s) escaneados; actualizados ${changedFiles.length} con placeholders legacy; ${changedBarrels.length} barrel(s) con descripción específica.`
  )
}
