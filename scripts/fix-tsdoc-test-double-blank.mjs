/**
 * Colapsa líneas vacías duplicadas en el bloque TSDoc inicial de archivos `*.test.*` / `*.spec.*`
 * antes de `* @fileoverview`.
 *
 * @fileoverview Normaliza cabeceras generadas o editadas a mano sin tocar el resto del archivo.
 * @remarks Solo transforma el primer bloque TSDoc del archivo; idempotente si ya hay una sola línea en blanco.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  collapseTestTsdocDoubleBlank,
  LEADING_TSDOC,
} from './utils/tsdoc-templates.mjs'
import { walkTestFiles } from './utils/walk.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, '..', 'src')

const candidates = walkTestFiles(srcDir)
let n = 0
for (const abs of candidates) {
  const raw = fs.readFileSync(abs, 'utf8')
  const m = raw.match(LEADING_TSDOC)
  if (!m) continue
  const nextBlock = collapseTestTsdocDoubleBlank(m[0])
  if (nextBlock === m[0]) continue
  fs.writeFileSync(
    abs,
    raw.replace(m[0], () => nextBlock),
    'utf8'
  )
  n += 1
}

console.log(
  `fix-tsdoc-test-double-blank: ${candidates.length} test(s) escaneados, ${n} actualizado(s) bajo src/.`
)
