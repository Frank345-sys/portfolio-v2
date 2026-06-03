/**
 * Utilidad de ordenamiento para badges del stack técnico (`AboutSkills`).
 *
 * @fileoverview Exporta `orderSkillTagsByVariant`, comparador para `Array.toSorted` que ordena
 * `SkillTag` por variante (dominio → proficiente → familiar) y desempata alfabéticamente en español.
 * @remarks Función pura sin efectos secundarios — sin DOM, React ni tokens de diseño.
 * El orden de variantes se deriva de {@link SKILLS_LEGEND_ITEMS} para mantener leyenda y badges sincronizados.
 * Construido con {@link createCompareByLegendOrder} como comparador genérico reutilizable.
 */
import { createCompareByLegendOrder } from '@/shared/utils/createCompareByLegendOrder'

import { SKILLS_LEGEND_ITEMS } from '../constants'

import type { SkillTag } from '../types'

/**
 * Comparador para `sort` en el stack About: **Dominio** → **Proficiente** → **Familiar**;
 * mismo criterio que la leyenda `SKILLS_LEGEND_ITEMS` (`AboutSkills/constants.ts`).
 */
export const orderSkillTagsByVariant: (a: SkillTag, b: SkillTag) => number =
  createCompareByLegendOrder(
    SKILLS_LEGEND_ITEMS.map((item) => item.id),
    (tag) => tag.variant,
    (a, b) => a.label.localeCompare(b.label, 'es')
  )
