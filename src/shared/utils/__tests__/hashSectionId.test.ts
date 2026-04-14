import { describe, it, expect } from 'vitest'
import { hashSectionId } from '../hashSectionId'

describe('hashSectionId', () => {
  it('devuelve el id sin # para anclas internas', () => {
    expect(hashSectionId('#sobre-mi')).toBe('sobre-mi')
  })

  it('devuelve null para # solo o enlaces no ancla', () => {
    expect(hashSectionId('#')).toBeNull()
    expect(hashSectionId('/blog')).toBeNull()
    expect(hashSectionId('')).toBeNull()
  })
})
