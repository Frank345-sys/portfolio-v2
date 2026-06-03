/**
 * Tipos del dominio `AboutSkills`.
 *
 * @fileoverview Define `SKILL_TAG_VARIANT` (objeto const de variantes), `SkillTagVariant` (unión derivada),
 * `SkillTag` (label + variante) y `SkillGroup` (título + tags para una tarjeta del grid).
 * @remarks `SkillTagVariant` representa el dominio **actual** — distinto de `TimelineChip` que narra
 * el recorrido histórico. Mantener `SKILL_TAG_VARIANT` sincronizado con `SKILL_TAG_BADGE_CLASS`
 * en `AboutSkills.tsx` y con `SKILLS_LEGEND_ITEMS` en `./constants`.
 */
import type { LabeledVariantTag } from '@/shared/constants/skills/labeledVariantTag'

/**
 * Conjunto finito de variantes para badges del stack (`ABOUT_SKILLS`, `orderSkillTagsByVariant`).
 */
export const SKILL_TAG_VARIANT = {
  DOMINIO: 'dominio',
  PROFICIENTE: 'proficiente',
  FAMILIAR: 'familiar',
} as const

/**
 * Niveles semánticos del stack técnico — **foto actual** de dominio (no variantes de `TimelineChip`).
 */
export type SkillTagVariant =
  (typeof SKILL_TAG_VARIANT)[keyof typeof SKILL_TAG_VARIANT]

/**
 * Tag en `ABOUT_SKILLS`: nivel hoy + `SkillLabel` canónico.
 * El timeline (`TimelineChip`) cuenta el relato histórico; esto cierra con “cómo lo uso ahora”.
 */
export type SkillTag = LabeledVariantTag<SkillTagVariant>

/**
 * Grupo de habilidades por categoría (una tarjeta en el grid de `AboutSkills`).
 */
export interface SkillGroup {
  /** Título del grupo (encabezado de tarjeta). */
  title: string
  /** Tags con variante de nivel; el render las ordena con `orderSkillTagsByVariant`. */
  tags: readonly SkillTag[]
}
