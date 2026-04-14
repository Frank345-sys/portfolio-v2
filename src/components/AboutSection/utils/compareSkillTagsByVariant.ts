import {
  SKILL_TAG_VARIANT,
  type SkillTag,
  type SkillTagVariant,
} from '../types'

const SKILL_TAG_ORDER: Record<SkillTagVariant, number> = {
  [SKILL_TAG_VARIANT.DOMINIO]: 0,
  [SKILL_TAG_VARIANT.PROFICIENTE]: 1,
  [SKILL_TAG_VARIANT.FAMILIAR]: 2,
}

/**
 * Ordena badges del stack: **Dominio** → **Proficiente** → **Familiar**.
 */
export function compareSkillTagsByVariant(a: SkillTag, b: SkillTag): number {
  const diff = SKILL_TAG_ORDER[a.variant] - SKILL_TAG_ORDER[b.variant]
  if (diff !== 0) return diff
  return a.label.localeCompare(b.label, 'es')
}
