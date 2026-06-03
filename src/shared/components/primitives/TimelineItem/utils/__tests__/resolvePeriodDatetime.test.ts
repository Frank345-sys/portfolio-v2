/**
 * Tests para shared/components/TimelineItem/utils/__tests__/resolvePeriodDatetime.test.ts.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { describe, expect, it } from 'vitest'

import { resolvePeriodDatetime } from '../resolvePeriodDatetime'

/**
 * Contrato ISO para `<time datetime>`: intervalo `start/end`, sólo inicio/sólo fin, o indefinido.
 */
describe('resolvePeriodDatetime', () => {
  it('devuelve start/end cuando ambos valores están presentes tras trim', () => {
    expect(resolvePeriodDatetime('2024-09-01', '2026-02-28')).toBe(
      '2024-09-01/2026-02-28'
    )
    expect(resolvePeriodDatetime('  2024-09-01  ', ' 2026-02-28 ')).toBe(
      '2024-09-01/2026-02-28'
    )
  })

  it('con sólo fecha inicial devuelve ese valor único', () => {
    expect(resolvePeriodDatetime('2025-01')).toBe('2025-01')
    expect(resolvePeriodDatetime('  2025-01  ', undefined)).toBe('2025-01')
  })

  it('con sólo fecha final devuelve ese valor', () => {
    expect(resolvePeriodDatetime(undefined, '2026-06')).toBe('2026-06')
    expect(resolvePeriodDatetime(undefined, ' 2026-06 ')).toBe('2026-06')
  })

  it('devuelve undefined si no hay fechas válidas tras trim', () => {
    expect(resolvePeriodDatetime(undefined, undefined)).toBeUndefined()
    expect(resolvePeriodDatetime('', '')).toBeUndefined()
    expect(resolvePeriodDatetime('   ', '  \t')).toBeUndefined()
  })

  it('string vacío o whitespace equivale a omitir ese lado si el otro aporta valor', () => {
    expect(resolvePeriodDatetime('', '2030')).toBe('2030')
    expect(resolvePeriodDatetime('2030', '   ')).toBe('2030')
  })
})
