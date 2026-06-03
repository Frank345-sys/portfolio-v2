/**
 * Tests para shared/components/TimelineItem/utils/__tests__/orderTimelineChipsByLegend.test.ts.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { describe, expect, it } from 'vitest'

import { SKILL_LABEL } from '@/shared/constants/skills/skillLabels'

import { TIMELINE_CHIP_VARIANT } from '../../types'
import { orderTimelineChipsByLegend } from '../orderTimelineChipsByLegend'

/**
 * Comparador puro ({@link orderTimelineChipsByLegend}): mismo orden visual que los `id`
 * en `TIMELINE_LEGEND_ORDER_IDS` / leyenda About. El hook `useTimelineItem` consume esto indirectamente.
 */
describe('orderTimelineChipsByLegend', () => {
  it('ordena technology antes que impactMetric que learned antes que applied', () => {
    const chips = [
      {
        label: SKILL_LABEL.CSS3,
        variant: TIMELINE_CHIP_VARIANT.APPLIED,
      },
      {
        label: SKILL_LABEL.HTML5,
        variant: TIMELINE_CHIP_VARIANT.LEARNED,
      },
      { label: '-30%', variant: TIMELINE_CHIP_VARIANT.IMPACT_METRIC },
      { label: 'Web', variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY },
    ] as const

    const result = chips.toSorted(orderTimelineChipsByLegend)
    expect(result.map((c) => c.variant)).toEqual([
      TIMELINE_CHIP_VARIANT.TECHNOLOGY,
      TIMELINE_CHIP_VARIANT.IMPACT_METRIC,
      TIMELINE_CHIP_VARIANT.LEARNED,
      TIMELINE_CHIP_VARIANT.APPLIED,
    ])
  })

  it('desempata por label alfabético en español dentro de una variante', () => {
    const chips = [
      { label: 'Zeta', variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY },
      { label: 'Alpha', variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY },
    ] as const

    const result = chips.toSorted(orderTimelineChipsByLegend)
    expect(result.map((c) => c.label)).toEqual(['Alpha', 'Zeta'])
  })
})
