import { cn } from './cn'

describe('cn', () => {
  it('combina varias clases en una sola cadena', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('omite valores falsy', () => {
    expect(cn('a', false, 'b', undefined, null, 'c')).toBe('a b c')
  })

  it('aplica tailwind-merge y resuelve conflictos de clases', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
  })

  it('acepta objetos condicionales', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active')
  })

  it('devuelve string vacío si no hay inputs', () => {
    expect(cn()).toBe('')
  })
})
