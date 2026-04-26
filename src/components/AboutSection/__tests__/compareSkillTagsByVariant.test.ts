import { describe, expect, it } from 'vitest'

import { SKILL_TAG_VARIANT, type SkillTag } from '../types'
import { compareSkillTagsByVariant } from '../utils'

describe('compareSkillTagsByVariant', () => {
  it('ordena Dominio → Proficiente → Familiar', () => {
    const tags: SkillTag[] = [
      { label: 'Z', variant: SKILL_TAG_VARIANT.FAMILIAR },
      { label: 'A', variant: SKILL_TAG_VARIANT.PROFICIENTE },
      { label: 'M', variant: SKILL_TAG_VARIANT.DOMINIO },
    ]
    const sorted = [...tags].sort(compareSkillTagsByVariant)
    expect(sorted.map((t) => t.variant)).toEqual([
      SKILL_TAG_VARIANT.DOMINIO,
      SKILL_TAG_VARIANT.PROFICIENTE,
      SKILL_TAG_VARIANT.FAMILIAR,
    ])
  })

  it('con el mismo nivel, ordena la etiqueta alfabéticamente (es)', () => {
    const tags: SkillTag[] = [
      { label: 'Beta', variant: SKILL_TAG_VARIANT.FAMILIAR },
      { label: 'Alfa', variant: SKILL_TAG_VARIANT.FAMILIAR },
    ]
    expect(
      [...tags].sort(compareSkillTagsByVariant).map((t) => t.label)
    ).toEqual(['Alfa', 'Beta'])
  })
})
