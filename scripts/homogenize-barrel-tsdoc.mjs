/**
 * Homogeneiza @remarks de barrels en un directorio (solo TSDoc, sin tocar exports).
 * Migración manual; no forma parte de `npm run lint` / `check:ci`.
 *
 * Uso:
 *   node scripts/homogenize-barrel-tsdoc.mjs [--dry-run]
 *   node scripts/homogenize-barrel-tsdoc.mjs src/components/Foo [--dry-run]
 *
 * El único argumento posicional (sin prefijo `-`) es la ruta bajo la raíz del repo.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { homogenizeBarrelTsdoc } from './utils/tsdoc-templates.mjs'
import { walk } from './utils/walk.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

/**
 * @param {string} message
 */
function fail(message) {
  console.error(message)
  process.exitCode = 1
}

function main() {
  const argv = process.argv.slice(2)
  const isDryRun = argv.includes('--dry-run') || argv.includes('--dry')
  const positionalArgs = argv.filter((a) => !a.startsWith('-'))

  if (positionalArgs.length > 1) {
    fail(
      'homogenize-barrel-tsdoc: usa un solo directorio objetivo o ninguno (default: src/shared).'
    )
    return
  }

  const targetRel = positionalArgs[0] ?? 'src/shared'
  const targetDir = path.resolve(root, targetRel)

  if (!fs.existsSync(targetDir)) {
    fail(`homogenize-barrel-tsdoc: directorio no encontrado: ${targetDir}`)
    return
  }

  if (!fs.statSync(targetDir).isDirectory()) {
    fail(`homogenize-barrel-tsdoc: la ruta no es un directorio: ${targetDir}`)
    return
  }

  const files = walk(targetDir, {
    filter: (_abs, ent) => ent.name === 'index.ts' || ent.name === 'index.tsx',
  })

  let updated = 0
  for (const file of files) {
    const body = fs.readFileSync(file, 'utf8')
    const next = homogenizeBarrelTsdoc(body)
    if (next === body) continue
    if (!isDryRun) fs.writeFileSync(file, next)
    updated += 1
    console.log(path.relative(root, file))
  }

  const mode = isDryRun ? ' [dry-run]' : ''
  console.log(
    `homogenize-barrel-tsdoc${mode}: ${files.length} barrel(s) escaneados, ${updated} actualizado(s) en ${targetRel}`
  )
}

main()
