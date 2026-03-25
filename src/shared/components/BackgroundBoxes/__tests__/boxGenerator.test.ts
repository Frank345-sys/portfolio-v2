import { describe, it, expect } from 'vitest'
import { generateBoxes, getViewportKey, FLOATING_BOX_COUNT } from '../utils'

describe('getViewportKey', () => {
  it('retorna mobile-sm para width < 480', () => {
    expect(getViewportKey(320)).toBe('mobile-sm')
    expect(getViewportKey(479)).toBe('mobile-sm')
  })

  it('retorna mobile para 480 <= width < 768', () => {
    expect(getViewportKey(480)).toBe('mobile')
    expect(getViewportKey(767)).toBe('mobile')
  })

  it('retorna tablet para 768 <= width < 1024', () => {
    expect(getViewportKey(768)).toBe('tablet')
    expect(getViewportKey(1023)).toBe('tablet')
  })

  it('retorna desktop para width >= 1024', () => {
    expect(getViewportKey(1024)).toBe('desktop')
    expect(getViewportKey(1440)).toBe('desktop')
  })
})

describe('generateBoxes - simétrico (FLOATING_BOX_COUNT cajas)', () => {
  const half = FLOATING_BOX_COUNT / 2

  it('siempre genera FLOATING_BOX_COUNT cajas sin importar el breakpoint', () => {
    expect(generateBoxes(375)).toHaveLength(FLOATING_BOX_COUNT)
    expect(generateBoxes(480)).toHaveLength(FLOATING_BOX_COUNT)
    expect(generateBoxes(900)).toHaveLength(FLOATING_BOX_COUNT)
    expect(generateBoxes(1440)).toHaveLength(FLOATING_BOX_COUNT)
  })

  it('mitad izquierda / mitad derecha en todos los breakpoints', () => {
    ;[375, 480, 900, 1440].forEach((width) => {
      const boxes = generateBoxes(width)
      expect(boxes.filter((b) => b.fromLeft)).toHaveLength(half)
      expect(boxes.filter((b) => !b.fromLeft)).toHaveLength(half)
    })
  })

  it('cada caja derecha tiene el mismo Y que su par izquierda', () => {
    const boxes = generateBoxes(1440)
    for (let i = 0; i < half; i++) {
      expect(boxes[i]!.y).toBeCloseTo(boxes[i + 7]!.y, 5)
    }
  })

  it('las cajas izquierdas y derechas tienen X distintos', () => {
    const boxes = generateBoxes(1440)
    for (let i = 0; i < half; i++) {
      expect(boxes[i]!.x).not.toBeCloseTo(boxes[i + 7]!.x, 0)
    }
  })

  it('en mobile-sm y mobile las cajas están fuera de la zona central (22%–68%)', () => {
    generateBoxes(375).forEach((b) => {
      const inCenter = b.x > 22 && b.x < 68
      expect(inCenter).toBe(false)
    })
    generateBoxes(480).forEach((b) => {
      const inCenter = b.x > 22 && b.x < 68
      expect(inCenter).toBe(false)
    })
  })

  it('todas las cajas tienen opacidad entre 0 y 1', () => {
    generateBoxes(1440).forEach((b) => {
      expect(b.opacity).toBeGreaterThan(0)
      expect(b.opacity).toBeLessThanOrEqual(1)
    })
  })

  it('todas las cajas tienen Icon definido', () => {
    generateBoxes(1440).forEach((b) => {
      expect(b.Icon).toBeDefined()
    })
  })
})
