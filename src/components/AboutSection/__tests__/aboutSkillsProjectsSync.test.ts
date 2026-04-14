import { describe, expect, it } from 'vitest'
import { ABOUT_SKILLS } from '../constants'
import { PROJECTS } from '@/components/ProjectsSection/constants'
import { stackSkillLabelSet } from '@/shared/utils/stackSkillLabelSet'

function projectSkillLabels(): string[] {
  return [...new Set(PROJECTS.flatMap((p) => p.skills))]
}

describe('AboutSection — sincronía stack / proyectos', () => {
  it('cada skill listada en PROJECTS existe en ABOUT_SKILLS', () => {
    const stack = stackSkillLabelSet(ABOUT_SKILLS)
    const faltantes = projectSkillLabels().filter((label) => !stack.has(label))
    expect(faltantes).toEqual([])
  })
})
