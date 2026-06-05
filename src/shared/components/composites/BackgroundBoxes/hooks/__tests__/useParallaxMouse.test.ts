/**
 * Pruebas de `useParallaxMouse` — normalización de coordenadas y ciclo de vida del listener `mousemove`.
 *
 * @fileoverview `renderHook` con eventos de puntero sintéticos y lectura de `MotionValue.get()`.
 * @remarks Cubre `enabled: false`, desmontaje sin errores y eliminación del listener al destruir el hook.
 */

import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useParallaxMouse } from '../useParallaxMouse'

describe('useParallaxMouse', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('retorna mouseX y mouseY', () => {
    const { result } = renderHook(() => useParallaxMouse())
    expect(result.current.mouseX.get()).toBe(0)
    expect(result.current.mouseY.get()).toBe(0)
  })

  it('inicializa mouseX y mouseY en 0', () => {
    const { result } = renderHook(() => useParallaxMouse())
    expect(result.current.mouseX.get()).toBe(0)
    expect(result.current.mouseY.get()).toBe(0)
  })

  it('actualiza mouseX y mouseY al mover el cursor', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1000)
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(800)

    const { result } = renderHook(() => useParallaxMouse())

    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 1000, clientY: 800 })
      )
    })

    expect(result.current.mouseX.get()).toBe(1)
    expect(result.current.mouseY.get()).toBe(1)
  })

  it('elimina el listener mousemove al desmontar', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useParallaxMouse())

    unmount()

    expect(removeSpy).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function),
      expect.objectContaining({ passive: true })
    )
  })

  it('con enabled false no registra mousemove y mantiene valores en 0', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    const { result } = renderHook(() => useParallaxMouse({ enabled: false }))

    expect(addSpy.mock.calls.filter((c) => c[0] === 'mousemove')).toHaveLength(
      0
    )
    expect(result.current.mouseX.get()).toBe(0)
    expect(result.current.mouseY.get()).toBe(0)

    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 500, clientY: 400 })
      )
    })
    expect(result.current.mouseX.get()).toBe(0)
    expect(result.current.mouseY.get()).toBe(0)

    addSpy.mockRestore()
  })

  it('no lanza al desmontar', () => {
    expect(() => {
      const { unmount } = renderHook(() => useParallaxMouse())
      unmount()
    }).not.toThrow()
  })
})
