import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useBackgroundBoxes } from '../hooks/useBackgroundBoxes'
import { FLOATING_BOX_COUNT } from '../utils'

describe('useBackgroundBoxes', () => {
  it('expone boxes, isLg, mouseX y mouseY', () => {
    const { result } = renderHook(() => useBackgroundBoxes())

    expect(result.current.boxes).toHaveLength(FLOATING_BOX_COUNT)
    expect(typeof result.current.isLg).toBe('boolean')
    expect(result.current.mouseX.get()).toBe(0)
    expect(result.current.mouseY.get()).toBe(0)
  })

  it('regenera las cajas al redimensionar la ventana', () => {
    const { result } = renderHook(() => useBackgroundBoxes())
    const layoutBefore = result.current.boxes.map((b) => ({
      x: b.x,
      y: b.y,
      size: b.size,
    }))

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        value: 375,
        writable: true,
      })
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.boxes).toHaveLength(FLOATING_BOX_COUNT)
    const layoutAfter = result.current.boxes.map((b) => ({
      x: b.x,
      y: b.y,
      size: b.size,
    }))
    expect(layoutAfter).not.toEqual(layoutBefore)
  })
})
