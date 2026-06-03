/**
 * Pruebas de `useTimelineItem` — orden de chips según leyenda, `hasChips` y `periodTimeProps` / `dateTime`.
 *
 * @fileoverview `renderHook` con variantes de chips y fechas ISO (intervalo, solo inicio, sin fechas resolubles).
 * @remarks Sin IO; comprueba recomputación cuando cambia la lista de chips entre renders del mismo hook.
 */

import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TIMELINE_CHIP_VARIANT } from '../types'
import { useTimelineItem } from './useTimelineItem'

describe('useTimelineItem', () => {
  it('sin chips ni fechas: lista vacía, sin datetime', () => {
    const { result } = renderHook(() => useTimelineItem({}))
    expect(result.current.orderedChips).toEqual([])
    expect(result.current.hasChips).toBe(false)
    expect(result.current.periodTimeProps).toBeUndefined()
  })

  it('chips indefinidos o array vacío: hasChips false', () => {
    const undef = renderHook(() => useTimelineItem({ chips: undefined }))
    expect(undef.result.current.hasChips).toBe(false)

    const empty = renderHook(() => useTimelineItem({ chips: [] }))
    expect(empty.result.current.hasChips).toBe(false)
  })

  it('ordena chips con el mismo criterio que la leyenda del timeline', () => {
    const { result } = renderHook(() =>
      useTimelineItem({
        chips: [
          { label: '-30%', variant: TIMELINE_CHIP_VARIANT.IMPACT_METRIC },
          { label: 'Web', variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY },
          { label: 'Y', variant: TIMELINE_CHIP_VARIANT.LEARNED },
          { label: 'Z', variant: TIMELINE_CHIP_VARIANT.APPLIED },
        ],
      })
    )
    expect(result.current.hasChips).toBe(true)
    expect(result.current.orderedChips.map((c) => c.label)).toEqual([
      'Web',
      '-30%',
      'Y',
      'Z',
    ])
  })

  it('periodTimeProps con intervalo cuando hay dos fechas', () => {
    const { result } = renderHook(() =>
      useTimelineItem({
        periodStartDatetime: '2024-01-01',
        periodEndDatetime: '2025-06-30',
      })
    )
    expect(result.current.periodTimeProps).toEqual({
      dateTime: '2024-01-01/2025-06-30',
    })
  })

  it('periodTimeProps con sólo inicio cuando no hay fin', () => {
    const { result } = renderHook(() =>
      useTimelineItem({ periodStartDatetime: '2025-03' })
    )
    expect(result.current.periodTimeProps).toEqual({ dateTime: '2025-03' })
  })

  it('sin periodTimeProps cuando no hay fechas resolubles', () => {
    const { result } = renderHook(() =>
      useTimelineItem({ periodStartDatetime: '', periodEndDatetime: '   ' })
    )
    expect(result.current.periodTimeProps).toBeUndefined()
  })

  it('recomputa orden y cardinalidad cuando cambian los chips (rerender)', () => {
    type Props = { count: 1 | 2 }

    const { result, rerender } = renderHook(
      ({ count }: Props) =>
        useTimelineItem({
          chips:
            count === 1
              ? [{ label: 'A', variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY }]
              : [
                  { label: 'A', variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY },
                  {
                    label: '-10%',
                    variant: TIMELINE_CHIP_VARIANT.IMPACT_METRIC,
                  },
                ],
        }),
      { initialProps: { count: 1 } as Props }
    )

    expect(result.current.orderedChips).toHaveLength(1)

    rerender({ count: 2 })
    expect(result.current.orderedChips).toHaveLength(2)
    expect(result.current.orderedChips.map((c) => c.variant)).toEqual([
      TIMELINE_CHIP_VARIANT.TECHNOLOGY,
      TIMELINE_CHIP_VARIANT.IMPACT_METRIC,
    ])
  })
})
