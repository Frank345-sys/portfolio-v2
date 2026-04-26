import { describe, expect, it } from 'vitest'

import {
  TIMELINE_CHIP_VARIANT,
  type TimelineChipVariant,
} from '@/shared/constants/enums'
import { stackSkillLabelSet } from '@/test/stackSkillLabelSet'

import { ABOUT_ACADEMIC, ABOUT_EXPERIENCE, ABOUT_SKILLS } from '../constants'

function timelineSkillChipLabels(): string[] {
  const variants = new Set<TimelineChipVariant>([
    TIMELINE_CHIP_VARIANT.ACADEMIC,
    TIMELINE_CHIP_VARIANT.APPLIED,
    TIMELINE_CHIP_VARIANT.LEARNED,
  ])
  const out: string[] = []
  for (const section of [ABOUT_ACADEMIC, ABOUT_EXPERIENCE]) {
    for (const item of section) {
      if (item.chips)
        for (const chip of item.chips) {
          if (variants.has(chip.variant)) {
            out.push(chip.label)
          }
        }
    }
  }
  return out
}

describe('AboutSection — sincronía stack / timeline', () => {
  it('cada chip académico o "aprendido" en experiencia existe en ABOUT_SKILLS', () => {
    const stack = stackSkillLabelSet(ABOUT_SKILLS)
    const faltantes = timelineSkillChipLabels().filter(
      (label) => !stack.has(label)
    )
    expect(faltantes).toEqual([])
  })
})
