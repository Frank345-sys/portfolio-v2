/**
 * Pieza de interfaz del portfolio (`OwnerLocalTime`).
 *
 * @fileoverview Implementación del archivo `OwnerLocalTime.tsx` dentro de `shared/components/OwnerLocalTime`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { formatOwnerLocalTime } from './formatOwnerLocalTime'
import { useOwnerLocalTime } from './hooks/useOwnerLocalTime'

function resolveViewerLocale(localeProp?: string): string {
  if (localeProp !== undefined && localeProp.trim() !== '') {
    return localeProp
  }

  if (typeof navigator !== 'undefined') {
    const navLocale = navigator.language.trim()
    if (navLocale.length > 0) {
      return navLocale
    }
  }

  return 'es-MX'
}

interface OwnerLocalTimeProps {
  /** Zona horaria IANA (p. ej. `America/Mexico_City`). */
  timeZone: string
  /**
   * Locale para `Intl.DateTimeFormat`. Si se omite, se usa **`navigator.language`**
   * con respaldo **`es-MX`** (SSR o navegadores sin idioma definido).
   */
  locale?: string
  /**
   * `default`: párrafo pequeño; opcionalmente `leadingLabel` + hora.
   * `stacked`: tipografía `title.xsmall`, solo la hora (el rótulo puede ir en el padre, p. ej. un `dl`).
   */
  variant?: 'default' | 'stacked'
  /**
   * Solo con `variant="default"`: texto antes de la hora (se añade `: ` automáticamente).
   */
  leadingLabel?: string
  className?: string
}

/**
 * @module shared/components/OwnerLocalTime/OwnerLocalTime
 *
 * Hora actual en zona IANA, actualizada cada minuto.
 */
export function OwnerLocalTime({
  timeZone,
  locale,
  variant = 'default',
  leadingLabel,
  className,
}: OwnerLocalTimeProps) {
  const now = useOwnerLocalTime()

  const resolvedLocale = resolveViewerLocale(locale)
  const formatted = formatOwnerLocalTime(now, resolvedLocale, timeZone)

  const timeEl = (
    <time
      className="text-text-strong tabular-nums"
      dateTime={now.toISOString()}
    >
      {formatted}
    </time>
  )

  if (variant === 'stacked') {
    return (
      <p
        className={cn(
          TYPOGRAPHY.title.xsmall,
          'min-w-0 wrap-break-word tabular-nums',
          className
        )}
      >
        {timeEl}
      </p>
    )
  }

  return (
    <p className={cn(TYPOGRAPHY.paragraph.small, 'mt-1', className)}>
      {leadingLabel ? (
        <span className="text-text-subtle">{leadingLabel}: </span>
      ) : null}
      {timeEl}
    </p>
  )
}
