import { describe, expect, it } from 'vitest'
import { ABOUT_ACADEMIC, ABOUT_EXPERIENCE, ABOUT_SKILLS } from '../constants'
import {
  TIMELINE_CHIP_VARIANT,
  type TimelineChipVariant,
} from '@/shared/constants/enums'
import { stackSkillLabelSet } from '@/test/stackSkillLabelSet'

function timelineSkillChipLabels(): string[] {
  const variants = new Set<TimelineChipVariant>([
    TIMELINE_CHIP_VARIANT.ACADEMIC,
    TIMELINE_CHIP_VARIANT.LEARNED,
  ])
  const out: string[] = []
  for (const section of [ABOUT_ACADEMIC, ABOUT_EXPERIENCE]) {
    for (const item of section) {
      item.chips?.forEach((chip) => {
        if (variants.has(chip.variant)) {
          out.push(chip.label)
        }
      })
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
