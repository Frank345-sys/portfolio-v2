/**
 * Tests para `formatLastAttempt`.
 *
 * @fileoverview Suite Vitest que fija umbrales de «Justo ahora» y minutos relativos.
 * @remarks Usa `vi.useFakeTimers`; sin Testing Library.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { formatLastAttempt } from './formatLastAttempt'

describe('formatLastAttempt', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-21T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('devuelve «Justo ahora» para intentos recientes', () => {
    const at = new Date('2026-05-21T11:59:30.000Z')
    expect(formatLastAttempt(at)).toBe('Justo ahora')
  })

  describe('cuando han pasado entre ~45 s y 59 min', () => {
    it('devuelve "Hace N min"', () => {
      const cincoMinAntes = new Date('2026-05-21T11:55:00.000Z')
      expect(formatLastAttempt(cincoMinAntes)).toBe('Hace 5 min')
    })

    it('devuelve "Hace 59 min" en el límite superior', () => {
      vi.setSystemTime(new Date('2026-05-21T12:59:00.000Z'))

      const cincuentaNueveMin = new Date('2026-05-21T12:00:00.000Z')
      expect(formatLastAttempt(cincuentaNueveMin)).toBe('Hace 59 min')
    })
  })

  describe('cuando han pasado 60 min o más', () => {
    it('devuelve la hora en formato HH:MM', () => {
      const dosHorasAntes = new Date('2026-05-21T10:00:00.000Z')
      expect(formatLastAttempt(dosHorasAntes)).toMatch(/^\d{1,2}:\d{2}$/)
    })
  })
})
