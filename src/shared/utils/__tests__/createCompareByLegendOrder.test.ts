/**
 * Tests para shared/utils/__tests__/createCompareByLegendOrder.test.ts.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { describe, expect, it } from 'vitest'

import { createCompareByLegendOrder } from '../createCompareByLegendOrder'

describe('createCompareByLegendOrder', () => {
  it('respeta el orden de ids de la leyenda', () => {
    const order = ['a', 'b', 'c']
    const cmp = createCompareByLegendOrder<{ id: string }>(
      order,
      (item) => item.id
    )
    const sorted = ['c', 'a', 'b'].map((id) => ({ id })).toSorted(cmp)
    expect(sorted.map((x) => x.id)).toEqual(['a', 'b', 'c'])
  })

  it('coloca ids desconocidos al final', () => {
    const cmp = createCompareByLegendOrder<{ tag: string }>(
      ['x'],
      (item) => item.tag
    )
    const sorted = [{ tag: 'zzz' }, { tag: 'x' }, { tag: 'unknown' }].toSorted(
      cmp
    )
    expect(sorted[0]!.tag).toBe('x')
    expect(sorted.slice(1).map((x) => x.tag)).toEqual(
      expect.arrayContaining(['zzz', 'unknown'])
    )
  })

  it('desempata con tieBreak cuando el rango coincide', () => {
    const cmp = createCompareByLegendOrder<{ tier: string; label: string }>(
      ['p', 's'],
      (item) => item.tier,
      (a, b) => a.label.localeCompare(b.label, 'es')
    )
    const sorted = [
      { tier: 'p', label: 'Beta' },
      { tier: 'p', label: 'Alfa' },
    ].toSorted(cmp)
    expect(sorted.map((x) => x.label)).toEqual(['Alfa', 'Beta'])
  })
})
