/**
 * Pruebas de `useBackgroundBoxes` — cardinalidad de cajas, `MotionValue` iniciales y regeneración al `resize`.
 *
 * @fileoverview `renderHook` con `innerWidth` controlado y spy de `requestAnimationFrame` para el ciclo de redimensionado.
 * @remarks Comprueba que el arreglo `boxes` conserva longitud fija y que el layout cambia al variar el ancho simulado.
 */

import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { setupMatchMedia } from '@/test/helpers'

import { FLOATING_BOX_COUNT } from '../../utils/boxGenerator'
import { useBackgroundBoxes } from '../useBackgroundBoxes'

describe('useBackgroundBoxes', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1440,
      writable: true,
    })
  })

  it('expone boxes, parallaxEnabled, mouseX y mouseY', () => {
    const { result } = renderHook(() => useBackgroundBoxes())

    expect(result.current.boxes).toHaveLength(FLOATING_BOX_COUNT)
    expect(typeof result.current.parallaxEnabled).toBe('boolean')
    expect(result.current.mouseX.get()).toBe(0)
    expect(result.current.mouseY.get()).toBe(0)
  })

  it('regenera las cajas al redimensionar la ventana', () => {
    const rafSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb) => {
        cb(0)
        return 0
      })
    const { result } = renderHook(() => useBackgroundBoxes())
    const layoutBefore = result.current.boxes.map((b) => ({
      x: b.x,
      y: b.y,
      size: b.size,
    }))

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 375,
        writable: true,
      })
      window.dispatchEvent(new Event('resize'))
    })

    try {
      expect(result.current.boxes).toHaveLength(FLOATING_BOX_COUNT)
      const layoutAfter = result.current.boxes.map((b) => ({
        x: b.x,
        y: b.y,
        size: b.size,
      }))
      expect(layoutAfter).not.toEqual(layoutBefore)
    } finally {
      rafSpy.mockRestore()
    }
  })

  it('desactiva parallax cuando el viewport está por debajo de lg', () => {
    setupMatchMedia({ lgMatches: false })
    const { result } = renderHook(() => useBackgroundBoxes())
    expect(result.current.parallaxEnabled).toBe(false)
  })

  it('habilita parallax en lg cuando no hay movimiento reducido', () => {
    setupMatchMedia({ lgMatches: true })
    const { result } = renderHook(() => useBackgroundBoxes())
    expect(result.current.parallaxEnabled).toBe(true)
  })
})
