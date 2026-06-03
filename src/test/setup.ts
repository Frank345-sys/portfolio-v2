/**
 * Configuración global de Vitest: matchers de `@testing-library/jest-dom` y **`vitest-axe`**
 * (`expect(await axe(...)).toHaveNoViolations()`).
 *
 * @module test/setup
 * @fileoverview Helpers compartidos por Vitest (mocks, render, setup).
 * @remarks Importado solo desde archivos `*.test.*` o `setup.ts`; no incluir en el bundle de producción.
 */
import '@testing-library/jest-dom'
import { expect, vi } from 'vitest'
import * as vitestAxeMatchers from 'vitest-axe/dist/matchers.js'

expect.extend(vitestAxeMatchers)

/**
 * Mock de `matchMedia` para tests.
 *
 * - JSDOM puede no implementar `matchMedia`, o hacerlo de forma que no coincida con lo que
 *   esperan los tests (p. ej. breakpoints `lg`).
 * - **motion-dom** (Motion) llama a `matchMedia("(prefers-reduced-motion)")` al inicializar;
 *   si la implementación nativa de jsdom devuelve `matches: true`, Framer Motion muestra en
 *   consola un aviso engañoso (“Reduced Motion enabled…”). Forzamos `matches: false` para
 *   cualquier consulta de movimiento reducido.
 *
 * Los archivos de test pueden asignar `window.matchMedia` en `beforeEach` cuando necesiten
 * `matches: true` (p. ej. viewport ancho).
 */
window.matchMedia = vi.fn((query: string) => ({
  // Siempre false: evita aviso de Motion si jsdom devolviera prefers-reduced-motion: reduce.
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))
