/**
 * Reloj de pared para `OwnerLocalTime`: un tick por minuto (sin segundos en la UI).
 *
 * @fileoverview Mantiene un `Date` en estado con `setInterval` fijo a {@link TICK_MS}.
 * @remarks El formateo con zona IANA y locale lo resuelve el componente (`formatOwnerLocalTime`), no este hook.
 */

import { useEffect, useState } from 'react'

/** Un tick por minuto; la vista muestra hora:minuto (sin segundos). */
const TICK_MS = 60_000 as const

/**
 * Provee una fecha reactiva actualizada cada minuto para mostrar la hora local.
 */
export function useOwnerLocalTime(): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date())
    }, TICK_MS)

    return () => {
      clearInterval(id)
    }
  }, [])

  return now
}
