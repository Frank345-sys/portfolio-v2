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
})
