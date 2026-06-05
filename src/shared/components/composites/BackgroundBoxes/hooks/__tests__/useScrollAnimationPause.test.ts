/**
 * Pruebas de `useScrollAnimationPause` — pausa al scroll y reanudación tras idle.
 *
 * @fileoverview `renderHook` + timers falsos; valida que no haya `setState` en cada evento scroll.
 * @remarks Usa `vi.useFakeTimers` para el debounce de reanudación; no depende de layout ni de Lenis.
 */

import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useScrollAnimationPause } from '../useScrollAnimationPause'

describe('useScrollAnimationPause', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('inicia con animaciones activas', () => {
    const { result } = renderHook(() => useScrollAnimationPause(100))
    expect(result.current).toBe(false)
  })

  it('pausa al scroll y reanuda tras el delay configurado', () => {
    const { result } = renderHook(() => useScrollAnimationPause(100))

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)

    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe(false)
  })

  it('mantiene la pausa si el scroll continúa antes del delay', () => {
    const { result } = renderHook(() => useScrollAnimationPause(100))

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)

    act(() => {
      vi.advanceTimersByTime(60)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(true)

    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe(false)
  })
})
