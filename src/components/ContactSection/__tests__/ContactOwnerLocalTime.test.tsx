import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, screen } from '@testing-library/react'
import { renderWithMotion } from '@/test/renderWithMotion'
import { ContactOwnerLocalTime } from '../subcomponents/ContactOwnerLocalTime'

describe('ContactOwnerLocalTime', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-24T15:30:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('variante default muestra rótulo y time con dateTime ISO', () => {
    renderWithMotion(<ContactOwnerLocalTime />)

    expect(
      screen.getByText('Hora en mi localidad:', { exact: false })
    ).toBeInTheDocument()
    const time = screen.getByText(/\d{1,2}:\d{2}/)
    expect(time.tagName.toLowerCase()).toBe('time')
    expect(time).toHaveAttribute('dateTime', '2026-04-24T15:30:00.000Z')
  })

  it('variante stacked no muestra el prefijo y renderiza el reloj', () => {
    renderWithMotion(<ContactOwnerLocalTime variant="stacked" />)

    expect(
      screen.queryByText('Hora en mi localidad', { exact: false })
    ).not.toBeInTheDocument()
    expect(screen.getByText(/\d{1,2}:\d{2}/)).toBeInTheDocument()
  })

  it('actualiza el dateTime al avanzar el intervalo de un minuto', () => {
    renderWithMotion(<ContactOwnerLocalTime />)

    const time = screen.getByText(/\d{1,2}:\d{2}/)
    expect(time).toHaveAttribute('dateTime', '2026-04-24T15:30:00.000Z')

    act(() => {
      vi.advanceTimersByTime(60_000)
    })

    expect(time).toHaveAttribute('dateTime', '2026-04-24T15:31:00.000Z')
  })
})
