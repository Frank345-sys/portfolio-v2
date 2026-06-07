/**
 * Tests para shared/components/BackgroundBoxes/utils/boxGenerator.test.ts.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { describe, it, expect } from 'vitest'

import { generateBoxes, FLOATING_BOX_COUNT } from './boxGenerator'

describe('generateBoxes', () => {
  it('es determinista: la misma anchura produce el mismo resultado', () => {
    expect(generateBoxes(1440)).toEqual(generateBoxes(1440))
    expect(generateBoxes(375)).toEqual(generateBoxes(375))
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
    for (const width of [375, 480, 900, 1440]) {
      const boxes = generateBoxes(width)
      expect(boxes.filter((b) => b.fromLeft)).toHaveLength(half)
      expect(boxes.filter((b) => !b.fromLeft)).toHaveLength(half)
    }
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

  it('en sm las cajas están fuera de la zona central (22%–68%)', () => {
    for (const b of generateBoxes(375)) {
      const inCenter = b.x > 22 && b.x < 68
      expect(inCenter).toBe(false)
    }
    for (const b of generateBoxes(640)) {
      const inCenter = b.x > 22 && b.x < 68
      expect(inCenter).toBe(false)
    }
  })

  it('todas las cajas tienen opacidad entre 0 y 1', () => {
    for (const b of generateBoxes(1440)) {
      expect(b.opacity).toBeGreaterThan(0)
      expect(b.opacity).toBeLessThanOrEqual(1)
    }
  })

  it('todas las cajas tienen Icon definido', () => {
    for (const b of generateBoxes(1440)) {
      expect(b.Icon).toBeDefined()
    }
  })
})
