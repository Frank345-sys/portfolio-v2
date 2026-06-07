/**
 * Utilidades de test (`test/helpers/expectNoAxeViolations.ts`).
 *
 * @fileoverview Ejecuta axe-core sobre un subárbol; la aserción vive en el test (`expect(...).toHaveNoViolations()`).
 * @remarks Importar solo desde `*.test.*`; fijar timeout del caso en el `it(..., 15_000)`.
 */

import { axe } from 'vitest-axe'

/**
 * Audita un subárbol con axe-core (sin aserción; cumple `vitest/expect-expect` en el test).
 *
 * @param container - Nodo raíz del árbol a auditar.
 * @returns Resultado de axe para encadenar con `expect(...).toHaveNoViolations()`.
 */
export function runAxeAudit(container: HTMLElement) {
  return axe(container)
}
