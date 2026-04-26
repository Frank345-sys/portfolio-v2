import { describe, expect, it } from 'vitest'

import { stackSkillLabelSet } from './stackSkillLabelSet'

describe('stackSkillLabelSet', () => {
  it('aplana etiquetas de todos los grupos sin duplicar', () => {
    const set = stackSkillLabelSet([
      { tags: [{ label: 'A' }, { label: 'B' }] },
      { tags: [{ label: 'B' }, { label: 'C' }] },
    ])
    expect([...set].sort()).toEqual(['A', 'B', 'C'])
  })
})
