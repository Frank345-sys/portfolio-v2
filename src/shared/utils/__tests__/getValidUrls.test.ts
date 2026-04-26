import { describe, expect, it } from 'vitest'

import { getValidUrls } from '../getValidUrls'

describe('getValidUrls', () => {
  it('omite cadenas vacías y solo espacios', () => {
    expect(getValidUrls(['', '  ', '\t', '/a.png', ' /b.png '])).toEqual([
      '/a.png',
      ' /b.png ',
    ])
  })

  it('devuelve array vacío si no hay entradas válidas', () => {
    expect(getValidUrls([])).toEqual([])
    expect(getValidUrls(['', ' '])).toEqual([])
  })
})
