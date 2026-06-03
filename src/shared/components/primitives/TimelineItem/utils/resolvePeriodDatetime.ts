/**
 * Pieza de interfaz del portfolio (`ResolvePeriodDatetime`).
 *
 * @fileoverview Implementación del archivo `resolvePeriodDatetime.ts` dentro de `shared/components/TimelineItem/utils`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */
/** Valor válido para `datetime` según contenido textual de `period` (intervalo `start/end` cuando hay fin). */
export function resolvePeriodDatetime(
  start?: string,
  end?: string
): string | undefined {
  const trimmedStart = start?.trim()
  const trimmedEnd = end?.trim()
  if (trimmedStart && trimmedEnd) return `${trimmedStart}/${trimmedEnd}`
  if (trimmedStart) return trimmedStart
  if (trimmedEnd) return trimmedEnd
  return undefined
}
