/**
 * Utilidades de test (`test/helpers/resizeObserverMock.ts`).
 *
 * @fileoverview Helpers compartidos por Vitest (mocks, render, setup).
 * @remarks Importado solo desde archivos `*.test.*` o `setup.ts`; no incluir en el bundle de producción.
 */

import { vi } from 'vitest'

/** Stub de `ResizeObserver` para jsdom — expone spies en `observe`, `unobserve` y `disconnect`. */
export class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  constructor(callback: ResizeObserverCallback) {
    void callback
  }
}
