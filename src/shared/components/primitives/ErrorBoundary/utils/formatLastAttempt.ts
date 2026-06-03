/**
 * Formatea la hora del último intento de recuperación para el panel de estado.
 *
 * @fileoverview Etiquetas relativas en español para el panel «Último intento» del fallback.
 * @remarks Usa `Date.now()`; en tests fijar el reloj con `vi.setSystemTime`.
 */

const LAST_ATTEMPT_TIME_FORMAT = new Intl.DateTimeFormat('es', {
  hour: '2-digit',
  minute: '2-digit',
})

/**
 * Etiqueta relativa breve en español (`Justo ahora`, `Hace N min`).
 */
export function formatLastAttempt(at: Date): string {
  const diffMs = Date.now() - at.getTime()

  if (diffMs < 45_000) return 'Justo ahora'

  const minutes = Math.round(diffMs / 60_000)
  if (minutes < 60) {
    return minutes === 1 ? 'Hace 1 min' : `Hace ${minutes} min`
  }

  return LAST_ATTEMPT_TIME_FORMAT.format(at)
}
