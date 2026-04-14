import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { parseEmphasis } from '../parseEmphasis'

describe('parseEmphasis', () => {
  it('devuelve el texto sin marcas cuando no hay **', () => {
    const out = parseEmphasis('Hola mundo', 'font-bold')
    expect(out).toEqual(['Hola mundo'])
  })

  it('convierte **fragmento** en strong con la clase dada', () => {
    const out = parseEmphasis('Hola **mundo**', 'u-em')
    const markup = renderToStaticMarkup(<>{out}</>)
    expect(markup).toContain('<strong class="u-em">mundo</strong>')
    expect(markup).toContain('Hola ')
  })

  it('soporta varios fragmentos resaltados', () => {
    const out = parseEmphasis('**a** y **b**', 'c')
    const markup = renderToStaticMarkup(<>{out}</>)
    expect(markup).toContain('<strong class="c">a</strong>')
    expect(markup).toContain('<strong class="c">b</strong>')
  })

  it('cadena vacía produce array con string vacío', () => {
    expect(parseEmphasis('', 'x')).toEqual([''])
  })
})
