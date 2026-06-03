/**
 * Walker recursivo compartido por los scripts de mantenimiento de TSDoc.
 *
 * @fileoverview Recorre un directorio y devuelve los archivos que pasan el filtro indicado, omitiendo `.d.ts`.
 * @remarks Omite `node_modules`, `.cache`, `dist` y `.git`. Reemplaza copias previas de `walk*` en scripts TSDoc.
 */
import fs from 'node:fs'
import path from 'node:path'

/** Directorios omitidos en el recorrido recursivo. */
const SKIP_DIRS = new Set(['node_modules', '.cache', 'dist', '.git'])

/**
 * @typedef {(absPath: string, entry: import('node:fs').Dirent) => boolean} FileFilter
 */

/**
 * @param {string} name
 * @returns {boolean}
 */
function isTsLike(name) {
  if (name.endsWith('.d.ts')) return false
  return name.endsWith('.ts') || name.endsWith('.tsx')
}

/**
 * Recorre `dir` recursivamente y devuelve los archivos `.ts`/`.tsx` (sin `.d.ts`)
 * que pasen el filtro opcional.
 *
 * @param {string} dir — directorio raíz absoluto.
 * @param {{ filter?: FileFilter }} [options]
 * @returns {string[]} rutas absolutas en orden de lectura.
 */
export function walk(dir, options = {}) {
  const { filter } = options
  /** @type {string[]} */
  const acc = []
  walkInto(dir, filter, acc)
  return acc
}

/**
 * @param {string} dir
 * @param {FileFilter | undefined} filter
 * @param {string[]} acc
 */
function walkInto(dir, filter, acc) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (!SKIP_DIRS.has(ent.name)) walkInto(abs, filter, acc)
      continue
    }
    if (!ent.isFile()) continue
    if (!isTsLike(ent.name)) continue
    if (filter && !filter(abs, ent)) continue
    acc.push(abs)
  }
}

/**
 * Atajo: solo archivos de test (`*.test.*` / `*.spec.*`).
 *
 * @param {string} dir
 * @returns {string[]}
 */
export function walkTestFiles(dir) {
  return walk(dir, {
    filter: (_abs, ent) => /\.(test|spec)\.tsx?$/iu.test(ent.name),
  })
}
