/**
 * Datos estáticos, copy y claves usados por el submódulo «TimelineItem».
 *
 * @fileoverview Centraliza valores importados por componentes colindantes; evita cadenas mágicas en el JSX.
 * @remarks Los cambios de texto o `href` suelen requerir actualizar tests que fijen el contrato de la sección.
 */

export { SITE_PROFILE } from '@/shared/constants/siteProfile/siteProfile'
import type { SkillLabel } from '@/shared/constants/skills/skillLabels'

import {
  TIMELINE_CHIP_VARIANT,
  TIMELINE_MODALIDAD,
  type TimelineChip,
  type TimelineChipVariant,
} from './types'

export { TIMELINE_MODALIDAD }

/**
 * Orden de categorías al ordenar chips (ver `utils/orderTimelineChipsByLegend.ts` y `TimelineItem`).
 * Debe coincidir con los `id` en `ABOUT_TIMELINE_LEGEND_ITEMS`
 * (`components/AboutSection/constants.ts`).
 */
export const TIMELINE_LEGEND_ORDER_IDS = [
  'tech',
  'impact',
  'learned',
  'applied',
] as const

/** `variant` del chip → `id` de la leyenda del timeline. */
export const TIMELINE_CHIP_VARIANT_LEGEND_ID: Record<
  TimelineChipVariant,
  (typeof TIMELINE_LEGEND_ORDER_IDS)[number]
> = {
  [TIMELINE_CHIP_VARIANT.TECHNOLOGY]: 'tech',
  [TIMELINE_CHIP_VARIANT.IMPACT_METRIC]: 'impact',
  [TIMELINE_CHIP_VARIANT.LEARNED]: 'learned',
  [TIMELINE_CHIP_VARIANT.APPLIED]: 'applied',
}

// ─── Helpers de factory ───────────────────────────────────────────────────────

/**
 * Atajos para construir chips en datasets `ABOUT_*` sin repetir la clave `variant`.
 *
 * `applied` y `learned` aceptan solo `SkillLabel` para alinearlos con `ABOUT_SKILLS`
 * por label canónico.
 *
 * @example
 * ```ts
 * import { SKILL_LABEL } from '@/shared/constants/skills/skillLabels'
 * import { TIMELINE_CHIP } from '@/shared/components/primitives/TimelineItem/constants'
 *
 * chips: [
 *   TIMELINE_CHIP.technology('E-commerce'),
 *   TIMELINE_CHIP.impactMetric('−50% tiempo de carga'),
 *   TIMELINE_CHIP.applied(SKILL_LABEL.REACT),
 *   TIMELINE_CHIP.learned(SKILL_LABEL.TYPESCRIPT),
 * ]
 * ```
 */
export const TIMELINE_CHIP = {
  technology: (label: string): TimelineChip => ({
    label,
    variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY,
  }),
  impactMetric: (label: string): TimelineChip => ({
    label,
    variant: TIMELINE_CHIP_VARIANT.IMPACT_METRIC,
  }),
  applied: (label: SkillLabel): TimelineChip => ({
    label,
    variant: TIMELINE_CHIP_VARIANT.APPLIED,
  }),
  learned: (label: SkillLabel): TimelineChip => ({
    label,
    variant: TIMELINE_CHIP_VARIANT.LEARNED,
  }),
} as const
