/**
 * Formateo de hora en zona IANA para {@link OwnerLocalTime}.
 *
 * @fileoverview Delega en `Date#toLocaleString` con opciones fijas de hora.
 * @remarks Misma salida que un `DateTimeFormat` explícito; el motor cachea internamente.
 */

/**
 * Devuelve la hora formateada (`hour` + `minute`, `hour12`) para `date` en `timeZone` con `locale`.
 */
export function formatOwnerLocalTime(
  date: Date,
  locale: string,
  timeZone: string
): string {
  return date.toLocaleString(locale, {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}
