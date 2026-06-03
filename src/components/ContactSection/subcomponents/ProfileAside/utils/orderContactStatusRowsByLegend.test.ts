/**
 * Tests para `orderContactStatusRowsByLegend` y `CONTACT_ASIDE_SERVICE_LIST_ITEMS`.
 *
 * @fileoverview Valida orden por significado (available → limited → unavailable), desempate
 * alfabético en español, y que la lista derivada esté alineada con `CONTACT_STATUS_ROWS`
 * con `dotClassName` correcto por significado.
 * @remarks Test unitario puro — sin DOM ni Testing Library. Usa `Array.toSorted` con la función
 * bajo prueba directamente. El segundo `describe` valida la lista derivada exportada,
 * no solo el comparador.
 */
import { describe, expect, it } from 'vitest'

import { CONTACT_STATUS_ROWS } from '../constants'
import {
  CONTACT_ASIDE_SERVICE_LIST_ITEMS,
  orderContactStatusRowsByLegend,
} from './orderContactStatusRowsByLegend'

import type { ContactStatusRowEntry } from '../types'

/**
 * Casos cubiertos:
 * - Orden por significado de leyenda (`available` → `limited` → `unavailable`)
 * - Desempate alfabético por `label` en locale español dentro del mismo significado
 * - Lista derivada alineada con constantes (`CONTACT_ASIDE_SERVICE_LIST_ITEMS`)
 */
describe('orderContactStatusRowsByLegend', () => {
  it('ordena available antes que limited antes que unavailable', () => {
    const rows = [
      { id: 'part_time', label: 'Z', meaning: 'available' },
      { id: 'freelance', label: 'A', meaning: 'limited' },
      { id: 'onsite', label: 'Último', meaning: 'unavailable' },
    ] as const satisfies readonly ContactStatusRowEntry[]

    const result = rows.toSorted(orderContactStatusRowsByLegend)
    expect(result.map((r) => r.meaning)).toEqual([
      'available',
      'limited',
      'unavailable',
    ])
  })

  it('desempata por label alfabético en español dentro del mismo significado', () => {
    const rows = [
      { id: 'part_time', label: 'Única', meaning: 'available' },
      { id: 'remote', label: 'Ítem', meaning: 'available' },
    ] as const satisfies readonly ContactStatusRowEntry[]

    const result = rows.toSorted(orderContactStatusRowsByLegend)
    expect(result.map((r) => r.label)).toEqual(['Ítem', 'Única'])
  })
})

/**
 * Valida la lista derivada exportada: cardinalidad, orden de leyenda,
 * desempate alfabético en `available` y `dotClassName` por significado.
 */
describe('CONTACT_ASIDE_SERVICE_LIST_ITEMS', () => {
  it('cumple orden de leyenda y etiquetas (es); enriquece con dotClassName', () => {
    expect(CONTACT_ASIDE_SERVICE_LIST_ITEMS).toHaveLength(
      CONTACT_STATUS_ROWS.length
    )

    // Recoge índices de ítems 'available' y 'limited' para validar que
    // todos los available preceden a todos los limited en la lista ordenada.
    const { availableIndices, limitedIndices } =
      CONTACT_ASIDE_SERVICE_LIST_ITEMS.reduce(
        (acc, item, index) => {
          if (item.dotClassName === 'bg-success-base') {
            acc.availableIndices.push(index)
          }
          if (item.dotClassName === 'bg-warning-base') {
            acc.limitedIndices.push(index)
          }
          return acc
        },
        { availableIndices: [] as number[], limitedIndices: [] as number[] }
      )

    expect(Math.max(...availableIndices)).toBeLessThan(
      Math.min(...limitedIndices)
    )

    const availableLabels: string[] = []
    for (const item of CONTACT_ASIDE_SERVICE_LIST_ITEMS) {
      if (item.dotClassName === 'bg-success-base') {
        availableLabels.push(item.label)
      }
    }

    expect(availableLabels).toEqual(
      availableLabels.toSorted((a, b) => a.localeCompare(b, 'es'))
    )

    expect(
      CONTACT_ASIDE_SERVICE_LIST_ITEMS.every(
        (item) =>
          typeof item.dotClassName === 'string' && item.dotClassName.length > 0
      )
    ).toBe(true)

    const freelanceItem = CONTACT_ASIDE_SERVICE_LIST_ITEMS.find(
      (item) => item.id === 'freelance'
    )
    expect(freelanceItem?.dotClassName).toBe('bg-warning-base')
  })
})
