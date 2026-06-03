/**
 * Repone el valor de `@module` cuando quedó vacío (p. ej. tras un reemplazo masivo defectuoso).
 *
 * @fileoverview Recorre `src/` y escribe el identificador derivado de la ruta relativa.
 * @remarks Solo toca el primer bloque TSDoc del archivo; idempotente si ya tiene `@module identificador`.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { LEADING_TSDOC, modulePathFromFile } from './utils/tsdoc-templates.mjs'
import { walk } from './utils/walk.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, '..', 'src')

const candidates = walk(srcDir)
let n = 0
for (const abs of candidates) {
  let raw = fs.readFileSync(abs, 'utf8')
  const m = raw.match(LEADING_TSDOC)
  if (!m) continue
  const head = m[0]
  if (!/\*\s*@module\b/u.test(head)) continue
  if (/\*\s*@module[ \t]+\S/u.test(head)) continue

  const id = modulePathFromFile(abs, srcDir)
  const fixedHead = head.replace(
    /(\s*\*\s*@module)\s*(\r?\n)/gu,
    (_, pre, nl) => `${pre} ${id}${nl}`
  )
  if (fixedHead !== head) {
    raw = raw.replace(head, () => fixedHead)
    fs.writeFileSync(abs, raw, 'utf8')
    n += 1
  }
}

console.log(
  `fix-empty-module-tag: ${candidates.length} archivo(s) escaneados, ${n} corregido(s).`
)
