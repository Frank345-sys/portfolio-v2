/**
 * Barrel de utilidades compartidas para Vitest (render con Motion, regex, mocks de IO/RO, `matchMedia`).
 *
 * @module test/helpers
 * @remarks Importar solo desde `*.test.*` o `setup.ts` vía `import { … } from '@/test/helpers'`;
 * no incluir en el bundle de producción.
 */

export { escapeRegex } from './escapeRegex'
export { makeIoEntry } from './makeIoEntry'
export {
  getIntersectionObserverCallback,
  setupIntersectionObserver,
  setupMatchMedia,
} from './mockBrowserApis'
export { renderWithMotion } from './renderWithMotion'
export { ResizeObserverMock } from './resizeObserverMock'
