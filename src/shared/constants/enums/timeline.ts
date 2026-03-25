/**
 * Variantes semánticas válidas para chips del timeline.
 */
export const TIMELINE_CHIP_VARIANT = {
  TECHNOLOGY: 'technology',
  IMPACT_METRIC: 'impactMetric',
  LEARNED: 'learned',
  ACADEMIC: 'academic',
} as const

/**
 * Valores válidos para la variante de chips de timeline.
 */
export type TimelineChipVariant =
  (typeof TIMELINE_CHIP_VARIANT)[keyof typeof TIMELINE_CHIP_VARIANT]
