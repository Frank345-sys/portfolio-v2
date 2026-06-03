/**
 * Valida y corrige cabeceras TSDoc en todos los archivos .ts/.tsx bajo src/.
 *
 * Complementa (no sustituye) `eslint-plugin-tsdoc` (`tsdoc/syntax` en `eslint.config.js`):
 * ESLint valida sintaxis TSDoc según `tsdoc.json`; este script exige estructura de cabecera del repo
 * (@module en barrels, @fileoverview + @remarks en source/tests, línea descriptiva).
 * No compite con Prettier (comentarios de bloque) ni con `import/no-duplicates` (imports, no barrels).
 *
 * Reglas:
 *  - Barrels (index.ts/tsx): @module + @remarks + línea descriptiva (import vía `@/…`; opcional `@since`)
 *  - Tests (.test/.spec):    @fileoverview + @remarks + línea descriptiva
 *  - Fuente:                 @fileoverview + @remarks + línea descriptiva (opcional `@throws` / `@since` en utils o APIs frágiles)
 *
 * Scripts fuera de CI (`fill-tsdoc-placeholders`, `homogenize-barrel-tsdoc`, `fix-*`): migración puntual;
 * las cabeceras que generan deben seguir pasando este check y `tsdoc/syntax` tras aplicarlos.
 *
 * Uso:
 *  node scripts/check-tsdoc.mjs                    # valida todo src/
 *  node scripts/check-tsdoc.mjs --fix              # inserta cabecera en archivos sin TSDoc
 *  node scripts/check-tsdoc.mjs src/foo/Bar.tsx    # solo rutas bajo src/ (lint-staged)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  barrelRemarksLine,
  buildTemplate,
  genericBarrelProseTsdocLine,
  getFileKind,
  hasDescriptiveLine,
  modulePathFromFile,
  SOURCE_TSDOC_TAG_LINES,
  splitTsdocInnerProseAndTags,
  testTsdocTagLines,
} from './utils/tsdoc-templates.mjs'
import { walk } from './utils/walk.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const srcDir = path.join(root, 'src')

const fix = process.argv.includes('--fix')

/**
 * @param {string} name
 * @returns {boolean}
 */
function isTsSourceFile(name) {
  if (name.endsWith('.d.ts')) return false
  return name.endsWith('.ts') || name.endsWith('.tsx')
}

/**
 * Recorrido completo de `src/` o subconjunto desde argumentos CLI (p. ej. lint-staged).
 *
 * @returns {string[]}
 */
function resolveTargetFiles() {
  const cliPaths = process.argv
    .slice(2)
    .filter((arg) => !arg.startsWith('-'))
    .map((arg) => path.resolve(process.cwd(), arg))

  if (cliPaths.length === 0) {
    return walk(srcDir)
  }

  return cliPaths
    .filter((abs) => {
      const rel = path.relative(srcDir, abs)
      if (rel.startsWith('..') || path.isAbsolute(rel)) return false
      if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) return false
      return isTsSourceFile(path.basename(abs))
    })
    .sort()
}

/**
 * @param {string} raw
 * @returns {string | null}
 */
function getLeadingTsdoc(raw) {
  const body = raw.replace(/^\uFEFF/u, '')
  const match = body.match(/^\s*\/\*\*[\s\S]*?\*\//u)
  return match?.[0] ?? null
}

/**
 * @param {string[]} tagLines
 * @param {RegExp} tagStarterRe — aplicado al contenido de la línea sin el margen asteriscado.
 * @returns {string | undefined}
 */
function findTagLine(tagLines, tagStarterRe) {
  return tagLines.find((l) =>
    tagStarterRe.test(l.replace(/^\s*\*\s?/u, '').trim())
  )
}

/**
 * @param {'barrel' | 'test' | 'source'} kind
 * @param {string} absPath
 * @param {string} tsdoc
 * @returns {string}
 */
function completeTsdocBlock(kind, absPath, tsdoc) {
  const hasModule = /@module\s+\S/u.test(tsdoc)
  const hasFileoverview = /@fileoverview\b/u.test(tsdoc)
  const hasRemarks = /@remarks\b/u.test(tsdoc)
  const hasDescription = hasDescriptiveLine(tsdoc)

  const needsModule = kind === 'barrel' && !hasModule
  const needsFileoverview = kind !== 'barrel' && !hasFileoverview
  const needsRemarks = !hasRemarks
  const needsDescription = !hasDescription

  if (
    !needsModule &&
    !needsFileoverview &&
    !needsRemarks &&
    !needsDescription
  ) {
    return tsdoc
  }

  const lines = tsdoc.split('\n')
  if (lines.length < 2) return tsdoc

  const rawInner = lines.slice(1, -1)
  const { proseLines, tagLines } = splitTsdocInnerProseAndTags(rawInner)

  const mod = modulePathFromFile(absPath, srcDir)
  const rel = path.relative(srcDir, absPath).replace(/\\/gu, '/')

  const existingModule = findTagLine(tagLines, /^@module\b/u)
  const existingFo = findTagLine(tagLines, /^@fileoverview\b/u)
  const existingRemarks = findTagLine(tagLines, /^@remarks\b/u)

  const residualTags = tagLines.filter(
    (l) => l !== existingModule && l !== existingFo && l !== existingRemarks
  )

  /** @type {string[]} */
  const outProse = [...proseLines]
  if (needsDescription) {
    if (kind === 'barrel') {
      outProse.unshift(genericBarrelProseTsdocLine())
    } else if (kind === 'test') {
      outProse.unshift(` * Tests para ${rel}.`)
    } else {
      outProse.unshift(` * Módulo fuente: ${rel}.`)
    }
  }

  /** @type {string[]} */
  const outTags = []
  if (kind === 'barrel') {
    outTags.push(existingModule ?? ` * @module ${mod}`)
    outTags.push(existingRemarks ?? barrelRemarksLine(mod))
  } else {
    const tagCopy =
      kind === 'test' ? testTsdocTagLines(rel) : SOURCE_TSDOC_TAG_LINES
    outTags.push(existingFo ?? ` * @fileoverview ${tagCopy.fileoverview}`)
    outTags.push(existingRemarks ?? ` * @remarks ${tagCopy.remarks}`)
  }
  outTags.push(...residualTags)

  /** @type {string[]} */
  const out = ['/**']
  for (const raw of outProse) {
    out.push(/^\s*\*/u.test(raw) ? raw : ` * ${raw}`)
  }
  if (outProse.length > 0 && outTags.length > 0) out.push(' *')
  for (const raw of outTags) {
    out.push(/^\s*\*/u.test(raw) ? raw : ` * ${raw}`)
  }
  out.push(' */')
  return out.join('\n')
}

/**
 * @param {string} file
 * @param {'barrel' | 'test' | 'source'} kind
 * @param {string} tsdoc
 * @returns {string[]}
 */
function getRuleErrors(file, kind, tsdoc) {
  const errors = []
  const rel = path.relative(root, file)

  if (kind === 'barrel' && !/@module\s+\S/u.test(tsdoc)) {
    errors.push(
      `${rel}: debe incluir \`@module\` en el bloque TSDoc de cabecera`
    )
  }

  if (kind === 'barrel' && !/@remarks\b/u.test(tsdoc)) {
    errors.push(
      `${rel}: debe incluir \`@remarks\` en el barrel (patrón de import vía \`@/…\`)`
    )
  }

  if (kind !== 'barrel' && !/@fileoverview\b/u.test(tsdoc)) {
    errors.push(
      `${rel}: debe incluir \`@fileoverview\` en el bloque TSDoc de cabecera`
    )
  }

  if ((kind === 'test' || kind === 'source') && !/@remarks\b/u.test(tsdoc)) {
    errors.push(`${rel}: debe incluir \`@remarks\` para documentar el contexto`)
  }

  if (!hasDescriptiveLine(tsdoc)) {
    errors.push(
      `${rel}: el bloque TSDoc debe contener al menos una línea descriptiva de texto`
    )
  }

  return errors
}

function main() {
  const hadCliPaths = process.argv.slice(2).some((arg) => !arg.startsWith('-'))
  const files = resolveTargetFiles()

  if (files.length === 0) {
    if (hadCliPaths) {
      console.log(
        'TSDoc consistency: omitido (ningún archivo bajo src/ en esta invocación).'
      )
    }
    return
  }
  /** @type {string[]} */
  const fixedFiles = []
  const issues = []
  const postFixIssues = []

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8')
    const body = raw.replace(/^\uFEFF/u, '')
    let tsdoc = getLeadingTsdoc(body)
    const kind = getFileKind(file)
    const rel = path.relative(root, file)
    let wasFixed = false

    if (!tsdoc) {
      if (fix) {
        fs.writeFileSync(file, buildTemplate(kind, file, srcDir) + body, 'utf8')
        fixedFiles.push(rel)
        continue
      }
      issues.push(
        `${rel}: falta bloque TSDoc de cabecera al inicio del archivo`
      )
      continue
    }

    if (fix) {
      const updated = completeTsdocBlock(kind, file, tsdoc)
      if (updated !== tsdoc) {
        const nextBody = body.replace(tsdoc, () => updated)
        fs.writeFileSync(file, nextBody, 'utf8')
        tsdoc = updated
        fixedFiles.push(rel)
        wasFixed = true
      }
    }

    const errs = getRuleErrors(file, kind, tsdoc)
    if (errs.length === 0) continue
    if (wasFixed) postFixIssues.push(...errs)
    else issues.push(...errs)
  }

  if (fix && fixedFiles.length > 0) {
    console.log(
      `TSDoc: se insertó o completó cabecera en ${fixedFiles.length} archivo(s). ` +
        'Revisa y personaliza el texto generado.'
    )
  }

  if (postFixIssues.length > 0) {
    console.warn(
      `\nTSDoc: ${postFixIssues.length} aviso(s) en archivos modificados (la corrección automática no cubrió todo; revísalos):`
    )
    for (const issue of postFixIssues) {
      console.warn(` - ${issue}`)
    }
  }

  if (issues.length === 0) {
    if (postFixIssues.length === 0) {
      console.log(
        `TSDoc consistency: OK (${files.length} archivo(s) ts/tsx revisados).`
      )
    }
    return
  }

  console.error(
    '\nTSDoc consistency: se detectaron incumplimientos de estándar:'
  )
  for (const issue of issues) {
    console.error(` - ${issue}`)
  }
  console.error(
    '\nEstándar esperado: @module + @remarks en barrels; @fileoverview + @remarks en source/tests.'
  )
  console.error(
    'Corre: node scripts/check-tsdoc.mjs --fix  para insertar cabeceras faltantes.'
  )
  process.exitCode = 1
}

main()
