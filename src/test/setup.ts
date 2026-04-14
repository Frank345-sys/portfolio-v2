/**
 * Configuración global de Vitest: matchers de `@testing-library/jest-dom`.
 *
 * @module test/setup
 */
import '@testing-library/jest-dom'
import { vi } from 'vitest'

/**
 * JSDOM no define `matchMedia`. Cualquier test que monte `BackgroundBoxes`, `useMediaQuery`,
 * `useProjectsScrollSync`, etc. necesita un mock mínimo con `addEventListener`/`removeEventListener`.
 *
 * Por defecto `matches: false` (viewport &lt; consultas típicas de `lg`). Los archivos de test
 * pueden sustituir `window.matchMedia` en `beforeEach` cuando necesiten `matches: true`.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn((query: string) => {
    // JSDOM: sin preferencia de movimiento reducido para Motion y otros hooks
    // (`matches: false` también para `(prefers-reduced-motion: reduce)`).
    const matches = false
    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
  }),
})
