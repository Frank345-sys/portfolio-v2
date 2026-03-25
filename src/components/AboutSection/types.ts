import type { TimelineChip } from '@/shared/components/TimelineItem'

/**
 * Tipos para AboutSection y sus subcomponentes.
 * @module components/AboutSection/types
 */

/**
 * Tarjeta de valor profesional mostrada en la sección de valores.
 */
export interface ValueItem {
  name: string
  desc: string
  detail: string
}

/**
 * Conjunto finito de variantes para los badges de habilidades.
 * Se usa como alternativa tipada a literales string sueltos.
 */
export const SKILL_TAG_VARIANT = {
  DOMINIO: 'dominio',
  PROFICIENTE: 'proficiente',
  FAMILIAR: 'familiar',
} as const

/**
 * Niveles semánticos del stack técnico.
 */
export type SkillTagVariant =
  (typeof SKILL_TAG_VARIANT)[keyof typeof SKILL_TAG_VARIANT]

/**
 * Badge individual de una habilidad.
 */
export interface SkillTag {
  label: string
  variant: SkillTagVariant
}

/**
 * Grupo de habilidades por categoría (lenguajes, frameworks, etc.).
 */
export interface SkillGroup {
  title: string
  tags: SkillTag[]
}

/**
 * Entrada de experiencia profesional o académica para timeline.
 */
export interface ExpItem {
  period: string
  role: string
  company: string
  description: string
  chips?: TimelineChip[]
}

/** Misma forma que ExpItem; chips con variant 'academic' (violeta suave). */
export type AcademicItem = ExpItem

/**
 * Certificación con enlace verificable.
 */
export interface CertItem {
  icon: string
  name: string
  issuer: string
  href: string
}
