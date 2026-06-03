/**
 * Vista derivada para `TimelineItem`: chips ordenados y atributos de `<time>` para el periodo.
 *
 * @fileoverview Memoiza chips con {@link orderTimelineChipsByLegend} y `dateTime` vía {@link resolvePeriodDatetime}.
 * @remarks Sin efectos secundarios; se recalcula cuando cambian chips o las fechas ISO de inicio/fin.
 */

import { useMemo } from 'react'

import { orderTimelineChipsByLegend } from '../utils/orderTimelineChipsByLegend'
import { resolvePeriodDatetime } from '../utils/resolvePeriodDatetime'

import type { TimelineChip } from '../types'

/**
 * Entrada alineada con `TimelineItemData` (chips / fechas ISO);
 * `exactOptionalPropertyTypes` para poder pasar valores explícitamente `undefined` desde el destructuring de props.
 */
interface UseTimelineItemParams {
  chips?: TimelineChip[] | undefined
  periodStartDatetime?: string | undefined
  periodEndDatetime?: string | undefined
}

interface UseTimelineItemResult {
  orderedChips: TimelineChip[]
  hasChips: boolean
  /** Spread en `<time>` cuando hay valor máquina-legible (`datetime`). */
  periodTimeProps: { dateTime: string } | undefined
}

/**
 * Prepara chips ordenados según la leyenda del timeline y props de `<time>` desde fechas ISO opcionales.
 */
export function useTimelineItem({
  chips,
  periodStartDatetime,
  periodEndDatetime,
}: UseTimelineItemParams): UseTimelineItemResult {
  return useMemo(() => {
    const orderedChips =
      chips === undefined || chips.length === 0
        ? []
        : chips.toSorted(orderTimelineChipsByLegend)

    const periodDatetime = resolvePeriodDatetime(
      periodStartDatetime,
      periodEndDatetime
    )
    const periodTimeProps =
      periodDatetime !== undefined ? { dateTime: periodDatetime } : undefined

    return {
      orderedChips,
      hasChips: orderedChips.length > 0,
      periodTimeProps,
    }
  }, [chips, periodStartDatetime, periodEndDatetime])
}
