/**
 * Tests para shared/components/OwnerLocalTime/OwnerLocalTime.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { act, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { SITE_IANA_TIMEZONE } from '@/shared/constants/siteTimezone'
import { renderWithMotion } from '@/test/helpers'

import { OwnerLocalTime } from './OwnerLocalTime'

describe('OwnerLocalTime', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-24T15:30:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('variante default con leadingLabel muestra rótulo y time con dateTime ISO', () => {
    renderWithMotion(
      <OwnerLocalTime
        timeZone={SITE_IANA_TIMEZONE}
        leadingLabel="Hora en mi localidad"
      />
    )

    expect(
      screen.getByText('Hora en mi localidad:', { exact: false })
    ).toBeInTheDocument()
    const time = screen.getByText(/\d{1,2}:\d{2}/)
    expect(time.tagName.toLowerCase()).toBe('time')
    expect(time).toHaveAttribute('dateTime', '2026-04-24T15:30:00.000Z')
  })

  it('variante stacked no muestra leadingLabel y renderiza el reloj', () => {
    renderWithMotion(
      <OwnerLocalTime
        timeZone={SITE_IANA_TIMEZONE}
        variant="stacked"
        leadingLabel="Hora en mi localidad"
      />
    )

    expect(
      screen.queryByText('Hora en mi localidad', { exact: false })
    ).not.toBeInTheDocument()
    expect(screen.getByText(/\d{1,2}:\d{2}/)).toBeInTheDocument()
  })

  it('actualiza el dateTime al avanzar el intervalo de un minuto', () => {
    renderWithMotion(
      <OwnerLocalTime timeZone={SITE_IANA_TIMEZONE} leadingLabel="Etiqueta" />
    )

    const time = screen.getByText(/\d{1,2}:\d{2}/)
    expect(time).toHaveAttribute('dateTime', '2026-04-24T15:30:00.000Z')

    act(() => {
      vi.advanceTimersByTime(60_000)
    })

    expect(time).toHaveAttribute('dateTime', '2026-04-24T15:31:00.000Z')
  })
})
