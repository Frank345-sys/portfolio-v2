/**
 * Variantes semánticas válidas para chips del timeline.
 */
export const TIMELINE_CHIP_VARIANT = {
  TECHNOLOGY: 'technology',
  IMPACT_METRIC: 'impactMetric',
  /**
   * Stack u herramientas ya cubiertas en formación (u otro origen) y aplicadas en el puesto;
   * no implica aprendizaje nuevo en esta experiencia.
   */
  APPLIED: 'applied',
  /** Tecnologías o conocimientos nuevos adquiridos durante el empleo (ver leyenda en AboutExperience). */
  LEARNED: 'learned',
  ACADEMIC: 'academic',
} as const

/**
 * Valores válidos para la variante de chips de timeline.
 */
export type TimelineChipVariant =
  (typeof TIMELINE_CHIP_VARIANT)[keyof typeof TIMELINE_CHIP_VARIANT]
