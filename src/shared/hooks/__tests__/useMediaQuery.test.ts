import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useMediaQuery } from '@/shared/hooks/useMediaQuery'

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
      listeners.forEach((l) => {
        l()
      })
    })

    expect(result.current).toBe(false)
  })
})
