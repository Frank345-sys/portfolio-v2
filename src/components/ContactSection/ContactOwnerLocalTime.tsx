import { useEffect, useState } from 'react'
import { TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import { CONTACT_IANA_TIMEZONE } from './constants'

/** Un tick por minuto; la vista muestra hora:minuto (sin segundos). */
const TICK_MS = 60_000

function formatInTimeZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('es-MX', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

type ContactOwnerLocalTimeProps = {
  /**
   * `default`: una sola línea con prefijo “Hora en mi localidad”.
   * `stacked`: solo el reloj (el rótulo va aparte, p. ej. en `dl` / metadatos).
   */
  variant?: 'default' | 'stacked'
  className?: string
}

/**
 * Hora **actual** en la zona IANA del perfil, para quien te contacta desde otra región
 * tenga de referencia qué hora es donde tú estás.
 */
export function ContactOwnerLocalTime({
  variant = 'default',
  className,
}: ContactOwnerLocalTimeProps) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date())
    }, TICK_MS)
    return () => {
      clearInterval(id)
    }
  }, [])

  const formatted = formatInTimeZone(now, CONTACT_IANA_TIMEZONE)

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
      <span className="text-text-soft">Hora en mi localidad: </span>
      {timeEl}
    </p>
  )
}
