import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useParallaxMouse } from '../hooks/useParallaxMouse'

describe('useParallaxMouse', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('retorna mouseX y mouseY', () => {
    const { result } = renderHook(() => useParallaxMouse())
    expect(result.current.mouseX).toBeDefined()
    expect(result.current.mouseY).toBeDefined()
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

    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
  })

  it('no lanza al desmontar', () => {
    expect(() => {
      const { unmount } = renderHook(() => useParallaxMouse())
      unmount()
    }).not.toThrow()
  })
})
