import { describe, it, expect } from 'vitest'

import { getProjectImageAttributes } from '../getProjectImageAttributes'

describe('getProjectImageAttributes', () => {
  it('en entorno de prueba mantiene el src PNG y añade sizes (srcSet omitido)', () => {
    const src = '/port/images/projects/blife-ecommerce.png'
    const r = getProjectImageAttributes(src)
    expect(r.src).toBe(src)
    expect(r.sizes).toMatch(/100vw|35vw|min\(40vw/)
    expect(r.srcSet).toBeUndefined()
  })

  it('variante lightbox usa sizes acordes al modal ancho', () => {
    const src = '/p/images/projects/x.png'
    const r = getProjectImageAttributes(src, { variant: 'lightbox' })
    expect(r.sizes).toContain('67.5rem')
    expect(r.sizes).toContain('100vw')
  })

  it('no modifica URL que no sea un PNG bajo /images/projects/', () => {
    const src = '/port/assets/photo.png'
    const r = getProjectImageAttributes(src)
    expect(r.src).toBe(src)
  })
})
