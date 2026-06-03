/**
 * Plantillas, placeholders y helpers TSDoc compartidos por los scripts de mantenimiento.
 *
 * @fileoverview Fuente única de verdad para cabeceras canónicas, regex de detección y normalización.
 * @remarks Importado por `check-tsdoc.mjs`, `fill-tsdoc-placeholders.mjs`, `homogenize-barrel-tsdoc.mjs` y scripts de reparación. Heurísticas de ruta: `tsdocCopyFromRoute`; tags mínimos de test/fuente: `testTsdocTagLines` / `SOURCE_TSDOC_TAG_LINES`.
 */
import path from 'node:path'

/** Primer bloque TSDoc del archivo (cabecera). */
export const LEADING_TSDOC = /^\s*\/\*\*[\s\S]*?\*\//u

/** Línea descriptiva genérica de barrels tras `check-tsdoc.mjs --fix` (objetivo de `fill-tsdoc-placeholders`). */
const GENERIC_BARREL_PROSE =
  'Barrel: re-exporta la API pública de este directorio.'

/** Regex de {@link GENERIC_BARREL_PROSE} con margen ` *` en bloques TSDoc. */
export const GENERIC_BARREL_LINE = new RegExp(
  `^\\s*\\*\\s*${GENERIC_BARREL_PROSE.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}\\s*$`,
  'u'
)

/**
 * @returns {string} línea descriptiva genérica de barrel con margen TSDoc (` * …`).
 */
export function genericBarrelProseTsdocLine() {
  return ` * ${GENERIC_BARREL_PROSE}`
}

export const PLACEHOLDER_SUMMARY =
  /^\s*\*\s*Descripción breve del módulo\.\s*$/u
export const PLACEHOLDER_FILEOVERVIEW_SOURCE =
  /^\s*\*\s*@fileoverview Explica la responsabilidad principal de este archivo\.\s*$/u
export const PLACEHOLDER_REMARKS_SOURCE =
  /^\s*\*\s*@remarks Añade contexto técnico relevante si es necesario\.\s*$/u
export const PLACEHOLDER_FILEOVERVIEW_TEST =
  /^\s*\*\s*@fileoverview Suite de pruebas — describe aquí el alcance del caso\.\s*$/u
export const PLACEHOLDER_REMARKS_TEST =
  /^\s*\*\s*@remarks Añade contexto sobre qué escenarios se cubren y cuáles no\.\s*$/u

/** @returns {RegExp[]} */
function placeholderLineMatchers() {
  return [
    PLACEHOLDER_SUMMARY,
    PLACEHOLDER_FILEOVERVIEW_SOURCE,
    PLACEHOLDER_REMARKS_SOURCE,
    PLACEHOLDER_FILEOVERVIEW_TEST,
    PLACEHOLDER_REMARKS_TEST,
  ]
}

/**
 * @param {string} rawInner
 * @returns {boolean}
 */
export function hadPlaceholderLine(rawInner) {
  const matchers = placeholderLineMatchers()
  return rawInner.some((l) => matchers.some((re) => re.test(l)))
}

/**
 * @param {string} absPath
 * @param {string} srcDir
 * @returns {string}
 */
export function modulePathFromFile(absPath, srcDir) {
  const rel = path.relative(srcDir, absPath)
  return rel.replace(/\\/gu, '/').replace(/\/index\.tsx?$/u, '')
}

/**
 * @param {string} file
 * @returns {'barrel' | 'test' | 'source'}
 */
export function getFileKind(file) {
  const base = path.basename(file)
  if (base === 'index.ts' || base === 'index.tsx') return 'barrel'
  if (/\.test\.tsx?$/u.test(base) || /\.spec\.tsx?$/u.test(base)) return 'test'
  return 'source'
}

/**
 * @param {string} tsdoc
 * @returns {boolean}
 */
export function hasDescriptiveLine(tsdoc) {
  return tsdoc.split('\n').some((line) => {
    const content = line.replace(/^\s*\*\s?/u, '').trim()
    return content.length > 0 && !content.startsWith('@')
  })
}

/**
 * @param {string[]} rawInner
 * @returns {{ proseLines: string[], tagLines: string[] }}
 */
export function splitTsdocInnerProseAndTags(rawInner) {
  const proseLines = []
  const tagLines = []
  for (const raw of rawInner) {
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
  return { proseLines, tagLines }
}

/**
 * @param {string} mod — ruta de módulo sin extensión (p. ej. `shared/hooks`).
 * @returns {string}
 */
export function barrelRemarksLine(mod) {
  return ` * @remarks Importar desde este barrel: \`import { … } from '@/${mod}'\`.`
}

/**
 * @typedef {{ fileoverview: string, remarks: string }} TsdocTagLines
 * @typedef {{ summary: string, fileoverview: string, remarks: string }} TsdocRouteCopy
 */

/** Copy canónico de tags para fuente genérica (`buildTemplate`, `completeTsdocBlock`). */
export const SOURCE_TSDOC_TAG_LINES = {
  fileoverview:
    'Implementación bajo esta ruta; ver exports y comentarios en símbolos públicos.',
  remarks:
    'Coordinar con tokens compartidos (`@/shared/constants`) y pruebas del mismo feature.',
}

/**
 * @param {string} relPosix — ruta relativa a `src/` con separadores `/`.
 * @returns {boolean}
 */
function isHookPath(relPosix) {
  return relPosix.includes('/hooks/') || relPosix.includes('\\hooks\\')
}

/**
 * @param {string} base — basename del archivo.
 * @returns {string}
 */
function testSubjectFromBasename(base) {
  const m = base.match(/^(.+)\.(test|spec)\.(tsx?)$/iu)
  return m ? m[1] : base
}

/**
 * @param {string} base
 * @returns {string}
 */
function pascalFromFileBase(base) {
  const stem = base
    .replace(/\.(test|spec)?\.tsx?$/iu, '')
    .replace(/\.(tsx?)$/iu, '')
  return stem
    .split(/[-_]/u)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('')
}

/**
 * Copy canónico de `@fileoverview` + `@remarks` para tests (hook vs componente).
 *
 * @param {string} relPosix
 * @returns {TsdocTagLines}
 */
export function testTsdocTagLines(relPosix) {
  if (isHookPath(relPosix)) {
    return {
      fileoverview:
        'Vitest con `renderHook` y/o Testing Library; revisa `describe` / `it` del archivo para el alcance exacto.',
      remarks:
        'Suele mockear IO, `matchMedia`, Lenis o Motion; restaurar spies y mocks en `afterEach` para no contaminar otros tests.',
    }
  }
  return {
    fileoverview:
      'Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.',
    remarks:
      'Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.',
  }
}

/**
 * Línea descriptiva enriquecida para tests (`fill-tsdoc-placeholders`).
 *
 * @param {string} relPosix
 * @returns {string}
 */
function testTsdocSummaryLine(relPosix) {
  const base = path.basename(relPosix)
  const subject = testSubjectFromBasename(base)
  if (isHookPath(relPosix)) {
    return `Pruebas de \`${subject}\` — contrato del hook y simulación de APIs de plataforma.`
  }
  return `Pruebas de \`${subject}\` (${relPosix}).`
}

/**
 * Heurísticas de cabecera TSDoc según la ruta del archivo (fuente única para `fill-tsdoc-placeholders`).
 *
 * @param {string} relPosix
 * @param {boolean} isTest
 * @returns {TsdocRouteCopy}
 */
export function tsdocCopyFromRoute(relPosix, isTest) {
  const base = path.basename(relPosix)
  const dir = path.dirname(relPosix).replace(/\\/gu, '/')
  const pascal = pascalFromFileBase(base)

  if (isTest) {
    const tags = testTsdocTagLines(relPosix)
    return {
      summary: testTsdocSummaryLine(relPosix),
      fileoverview: tags.fileoverview,
      remarks: tags.remarks,
    }
  }

  if (relPosix.startsWith('shared/icons/') && /Icon\.tsx$/u.test(relPosix)) {
    return {
      summary: `Ícono SVG \`${pascal}\` para marcas, stack o acciones en la interfaz.`,
      fileoverview:
        'Componente de presentación sin estado; delega color en `currentColor` y tamaño en `className`.',
      remarks:
        'Expone las props nativas de `SVGSVGElement`; ver el comentario del símbolo exportado para el uso semántico.',
    }
  }

  if (base === 'constants.ts') {
    const parent = path.basename(dir)
    return {
      summary: `Datos estáticos, copy y claves usados por el submódulo «${parent}».`,
      fileoverview:
        'Centraliza valores importados por componentes colindantes; evita cadenas mágicas en el JSX.',
      remarks:
        'Los cambios de texto o `href` suelen requerir actualizar tests que fijen el contrato de la sección.',
    }
  }

  if (base === 'types.ts') {
    const parent = path.basename(dir)
    return {
      summary: `Tipos TypeScript del submódulo «${parent}».`,
      fileoverview:
        'Contratos compartidos entre componentes, hooks y constantes del mismo directorio.',
      remarks:
        'Mantener alineado con las props públicas re-exportadas en los `index.ts` del feature.',
    }
  }

  if (
    relPosix.startsWith('shared/constants/') ||
    relPosix.startsWith('shared/constants\\')
  ) {
    return {
      summary: `Constantes compartidas del proyecto (\`${relPosix}\`).`,
      fileoverview:
        'Catálogo importado por secciones y utilidades; cambios globales de marca o layout.',
      remarks:
        'Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.',
    }
  }

  if (isHookPath(relPosix)) {
    return {
      summary: `Hook \`${pascal}\` — lógica React del subdirectorio \`hooks\` asociado al feature.`,
      fileoverview:
        'Encapsula efectos, estado o integración DOM; sustituir este texto por un resumen al implementar el hook.',
      remarks:
        'Limpiar listeners y temporizadores en teardown; evitar lecturas/escrituras a refs durante el render (React Compiler).',
    }
  }

  if (
    relPosix.startsWith('shared/utils/') ||
    relPosix.startsWith('shared/utils\\')
  ) {
    return {
      summary: `Utilidad \`${pascal}\` en la capa compartida del proyecto.`,
      fileoverview:
        'Funciones puras o helpers sin acoplar a una sección concreta del portfolio.',
      remarks:
        'Preferir pruebas unitarias directas; evitar importar React salvo que el módulo lo requiera.',
    }
  }

  if (relPosix.startsWith('test/') || relPosix.startsWith('test\\')) {
    return {
      summary: `Utilidades de test (\`${relPosix}\`).`,
      fileoverview: 'Helpers compartidos por Vitest (mocks, render, setup).',
      remarks:
        'Importado solo desde archivos `*.test.*` o `setup.ts`; no incluir en el bundle de producción.',
    }
  }

  if (base === 'App.tsx') {
    return {
      summary:
        'Raíz de la aplicación React del portfolio (montaje de secciones y providers).',
      fileoverview:
        'Orquesta el `<main>`, cabecera, pie y límites de error alrededor del contenido principal.',
      remarks:
        'Las secciones pesadas suelen cargarse con `React.lazy` y `SectionLazyFallback` para el primer pintado.',
    }
  }

  if (base === 'main.tsx') {
    return {
      summary: 'Punto de entrada del bundle Vite (montaje en `#root`).',
      fileoverview:
        'Registra `reportWebVitals`, monta `<App />` y aplica estilos globales.',
      remarks:
        'Mantener mínimo: la composición vive en `App.tsx`; aquí solo bootstrap y telemetría opcional.',
    }
  }

  return {
    summary: `Pieza de interfaz o lógica del portfolio (\`${pascal}\`).`,
    fileoverview: `Implementación del archivo \`${base}\` dentro de \`${dir}\`; ver exports para la API pública.`,
    remarks:
      'Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.',
  }
}

/**
 * @param {'barrel' | 'test' | 'source'} kind
 * @param {string} absPath
 * @param {string} srcDir
 * @returns {string}
 */
export function buildTemplate(kind, absPath, srcDir) {
  if (kind === 'barrel') {
    const mod = modulePathFromFile(absPath, srcDir)
    return `/**
 * ${GENERIC_BARREL_PROSE}
 *
 * @module ${mod}
${barrelRemarksLine(mod)}
 */

`
  }

  const rel = path.relative(srcDir, absPath).replace(/\\/gu, '/')

  if (kind === 'test') {
    const { fileoverview, remarks } = testTsdocTagLines(rel)
    return `/**
 * Tests para ${rel}.
 *
 * @fileoverview ${fileoverview}
 * @remarks ${remarks}
 */

`
  }

  return `/**
 * Módulo fuente: ${rel}.
 *
 * @fileoverview ${SOURCE_TSDOC_TAG_LINES.fileoverview}
 * @remarks ${SOURCE_TSDOC_TAG_LINES.remarks}
 */

`
}

/**
 * Colapsa líneas vacías duplicadas antes de `* @fileoverview` en cabeceras de test.
 * Dos pasadas por iteración (casos distintos); el bucle converge si ambos coexisten.
 * `[ \t]*` tras ` *` tolera espacios finales en la línea (editor sin trim al guardar).
 *
 * @param {string} block
 * @returns {string}
 */
export function collapseTestTsdocDoubleBlank(block) {
  let b = block
  let prev = ''
  while (b !== prev) {
    prev = b
    // Línea en blanco sin margen ` *` entre ` *` y `@fileoverview`.
    b = b.replace(
      /\r?\n \*[ \t]*\r?\n[ \t]*\r?\n \* @fileoverview/gu,
      '\n *\n * @fileoverview'
    )
    // Dos o más líneas consecutivas solo ` *` antes de @fileoverview → una sola.
    b = b.replace(
      /\r?\n \*[ \t]*(?:\r?\n \*[ \t]*)+\r?\n \* @fileoverview/gu,
      '\n *\n * @fileoverview'
    )
  }
  return b
}

/**
 * Normaliza textos legacy de barrels (migración one-shot).
 *
 * @param {string} body
 * @returns {string}
 */
export function homogenizeBarrelTsdoc(body) {
  return (
    body
      .replace(
        / \* Barrel de `[^`]+`: re-exporta la API pública de este directorio\./gu,
        ` * ${GENERIC_BARREL_PROSE}`
      )
      .replace(
        / \* Barrel de `[^`]+`: re-exporta desde este directorio\./gu,
        ` * ${GENERIC_BARREL_PROSE}`
      )
      .replace(
        /Punto de entrada `@module [^`]+`: re-exporta `([^`]+)` para imports estables sin rutas internas\./gu,
        GENERIC_BARREL_PROSE
      )
      .replace(
        /Punto de entrada `@module [^`]+`: re-exporta ([^.\n]+)\./gu,
        GENERIC_BARREL_PROSE
      )
      .replace(
        /Punto de entrada de constantes del módulo `([^`]+)`\./gu,
        'Barrel de constantes de `$1`.'
      )
      .replace(/Punto de entrada del \*\*([^*]+)\*\*:/gu, 'Barrel de `$1`:')
      .replace(
        /@remarks Consumo recomendado: `import \{ … \} from '([^']+)'` \(sustituye los símbolos reexportados\)\./gu,
        "@remarks Importar desde este barrel: `import { … } from '$1'`."
      )
      .replace(
        /@remarks Consumo recomendado: `import \{ … \} from '@\/shared\/hooks'` o import directo al archivo del hook\./gu,
        "@remarks Importar desde este barrel: `import { … } from '@/shared/hooks'` o import directo al archivo del hook."
      )
      // Fallback para variantes «Punto de entrada @module …» no cubiertas arriba (p. ej. salida de fill-tsdoc).
      // Sustituye la línea descriptiva entera; no ejecutar en CI de forma periódica salvo migración consciente.
      .replace(
        / \* Punto de entrada `@module [^`]+`: [^\n]+/gu,
        ` * ${GENERIC_BARREL_PROSE}`
      )
  )
}
