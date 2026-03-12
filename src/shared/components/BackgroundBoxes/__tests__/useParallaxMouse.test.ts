import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useParallaxMouse } from '../hooks/useParallaxMouse'

describe('useParallaxMouse', () => {
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

  it('no lanza al desmontar', () => {
    expect(() => {
      const { unmount } = renderHook(() => useParallaxMouse())
      unmount()
    }).not.toThrow()
  })
})
