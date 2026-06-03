/**
 * Utilidades de test (`test/helpers/makeIoEntry.ts`).
 *
 * @fileoverview Helpers compartidos por Vitest (mocks, render, setup).
 * @remarks Importado solo desde archivos `*.test.*` o `setup.ts`; no incluir en el bundle de producción.
 */

/**
 * Construye una entrada sintética de `IntersectionObserver` para tests de scroll-spy.
 * Rellena los campos requeridos por la interfaz usando el `boundingClientRect` del target.
 *
 * @param target - Elemento DOM observado
 * @param opts - `isIntersecting` y `intersectionRatio` opcional (default 1/0 según intersección)
 * @returns Entrada sintética compatible con `IntersectionObserverEntry`
 */
export function makeIoEntry(
  target: HTMLElement,
  opts: { isIntersecting: boolean; intersectionRatio?: number }
): IntersectionObserverEntry {
  const rect = target.getBoundingClientRect()
  return {
    boundingClientRect: rect,
    intersectionRect: rect,
    intersectionRatio: opts.intersectionRatio ?? (opts.isIntersecting ? 1 : 0),
    isIntersecting: opts.isIntersecting,
    rootBounds: null,
    target,
    time: performance.now(),
  }
}
