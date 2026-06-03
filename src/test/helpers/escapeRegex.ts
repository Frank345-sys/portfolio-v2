/**
 * Utilidades de test (`test/helpers/escapeRegex.ts`).
 *
 * @fileoverview Helpers compartidos por Vitest (mocks, render, setup).
 * @remarks Importado solo desde archivos `*.test.*` o `setup.ts`; no incluir en el bundle de producción.
 */

/**
 * Escapa metacaracteres de regex en `s` para uso seguro en `new RegExp(…)`.
 * Útil en matchers de Testing Library cuando el texto puede contener `.`, `()`, etc.
 *
 * @param s - Cadena a escapar
 * @returns Cadena con metacaracteres escapados
 */
export function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
