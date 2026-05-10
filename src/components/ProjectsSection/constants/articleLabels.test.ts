import { describe, expect, it } from 'vitest'

import { projectArticleLabelId } from './articleLabels'

describe('projectArticleLabelId', () => {
  it('construye el id sr-only enlazado por aria-labelledby del artículo de proyecto', () => {
    expect(projectArticleLabelId(42)).toBe('project-42-title')
  })
})
