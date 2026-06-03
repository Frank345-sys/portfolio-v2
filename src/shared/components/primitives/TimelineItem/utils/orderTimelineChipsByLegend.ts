/**
 * Pieza de interfaz del portfolio (`OrderTimelineChipsByLegend`).
 *
 * @fileoverview Implementación del archivo `orderTimelineChipsByLegend.ts` dentro de `shared/components/TimelineItem/utils`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { createCompareByLegendOrder } from '@/shared/utils/createCompareByLegendOrder'

import {
  TIMELINE_CHIP_VARIANT_LEGEND_ID,
  TIMELINE_LEGEND_ORDER_IDS,
} from '../constants'

import type { TimelineChip } from '../types'

/**
 * Comparador para `sort`: **área o tecnología** → **impacto** → **conocimientos nuevos** → **aplicadas**
 * (`TIMELINE_CHIP_VARIANT` ↔ ids de la leyenda About);
 * mismo criterio visual que {@link TIMELINE_LEGEND_ORDER_IDS} /
 * `ABOUT_TIMELINE_LEGEND_ITEMS` (`components/AboutSection/constants.ts`).
 *
 * Dentro de una misma categoría, orden alfabético por `label` (`es`).
 */
export const orderTimelineChipsByLegend: (
  a: TimelineChip,
  b: TimelineChip
) => number = createCompareByLegendOrder(
  TIMELINE_LEGEND_ORDER_IDS,
  (chip) => TIMELINE_CHIP_VARIANT_LEGEND_ID[chip.variant],
  (a, b) => a.label.localeCompare(b.label, 'es')
)
