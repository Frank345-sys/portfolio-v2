/**
 * Pruebas de `useMediaQuery` — `matchMedia`, lista de listeners y transiciones de `matches`.
 *
 * @fileoverview `renderHook` con `window.matchMedia` mockeado para una query fija y disparo manual de `change`.
 * @remarks Usa `act` al togglear `matches`; restaura el mock en `afterEach` para no contaminar otros tests.
 */

import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useMediaQuery } from '@/shared/hooks'

describe('useMediaQuery', () => {
  const query = '(min-width: 800px)'

  let matches = false
  const listeners: Array<() => void> = []

  beforeEach(() => {
    matches = false
    listeners.length = 0

    vi.spyOn(window, 'matchMedia').mockImplementation((q: string) => {
      if (q !== query) {
        return {
          matches: false,
          media: q,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        } as unknown as MediaQueryList
      }
      return {
        get matches() {
          return matches
        },
        media: q,
        addEventListener: (_type: string, cb: () => void) => {
          listeners.push(cb)
        },
        removeEventListener: vi.fn(),
      } as unknown as MediaQueryList
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('devuelve el valor actual de matchMedia', () => {
    matches = true
    const { result } = renderHook(() => useMediaQuery(query))
    expect(result.current).toBe(true)
  })

  it('se actualiza al disparar el evento change del MediaQueryList', () => {
    matches = true
    const { result } = renderHook(() => useMediaQuery(query))
    expect(result.current).toBe(true)

    act(() => {
      matches = false
      for (const l of listeners) {
        l()
      }
    })

    expect(result.current).toBe(false)
  })
})
