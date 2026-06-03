/**
 * Tipos TypeScript del submódulo «TimelineItem».
 *
 * @fileoverview Contratos compartidos entre componentes, hooks y constantes del mismo directorio.
 * @remarks Mantener alineado con las props públicas re-exportadas en los `index.ts` del feature.
 */

import type { LabeledVariantTag } from '@/shared/constants/skills/labeledVariantTag'

// ─── Variante ────────────────────────────────────────────────────────────────

/**
 * Variantes semánticas de un chip de timeline.
 *
 * - `technology`   — tecnología usada en el rol o la cursada.
 * - `impactMetric` — métrica de impacto cuantificable (ej. "−50% tiempo de carga").
 * - `applied`      — skill ya dominada antes del rol; visual `light.primary`.
 * - `learned`      — skill como “conocimiento nuevo” en este bloque; visual `light.feature`.
 *
 * Fuente única de verdad para `TIMELINE_CHIP.*` en datasets.
 */
export const TIMELINE_CHIP_VARIANT = {
  TECHNOLOGY: 'technology',
  IMPACT_METRIC: 'impactMetric',
  APPLIED: 'applied',
  LEARNED: 'learned',
} as const

export type TimelineChipVariant =
  (typeof TIMELINE_CHIP_VARIANT)[keyof typeof TIMELINE_CHIP_VARIANT]

// ─── Chip ─────────────────────────────────────────────────────────────────────

/**
 * Chip de un ítem de timeline: etiqueta + variante semántica.
 * Cuando la variante es `applied` o `learned`, `label` es un `SkillLabel` canónico.
 */
export type TimelineChip = LabeledVariantTag<TimelineChipVariant>

// ─── Contrato de props del componente ────────────────────────────────────────

/**
 * Props del componente `TimelineItem`.
 * Para el alias de dominio `About`, ver `AboutTimelineEntry` en
 * `@/components/AboutSection/types`.
 */
export interface TimelineItemData {
  /** Rango de fechas legible (ej. `"Sep 2024 – Feb 2026"`). */
  period: string
  /**
   * Fecha/mes inicial máquina-legible para `<time datetime>` (p. ej. `YYYY-MM-DD` o `YYYY-MM`).
   * Si además existe `periodEndDatetime`, ambos elementos `<time>` usan intervalo ISO `start/end`.
   */
  periodStartDatetime?: string
  /**
   * Fecha/mes final máquina-legible (`YYYY-MM-DD` o `YYYY-MM`). Opcional si el periodo está abierto.
   */
  periodEndDatetime?: string
  /** Título del rol o nombre de la carrera/certificación. */
  heading: string
  /** Institución educativa o empresa. */
  company: string
  /** Resumen de responsabilidades o logros. */
  description: string
  /** Chips opcionales de contexto: tecnologías, métricas e impacto de skills. */
  chips?: TimelineChip[]
}
