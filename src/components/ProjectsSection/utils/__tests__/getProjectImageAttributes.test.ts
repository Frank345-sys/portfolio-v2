/**
 * Tests para components/ProjectsSection/utils/__tests__/getProjectImageAttributes.test.ts.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { describe, it, expect } from 'vitest'

import {
  getProjectImageAttributes,
  projectPngPathToWebpAttributes,
} from '../getProjectImageAttributes'

describe('getProjectImageAttributes', () => {
  const sizes =
    '(max-width: 1023px) 100vw, (max-width: 1279px) 35vw, min(40vw, 34rem)'

  it('en entorno de prueba mantiene el src PNG y añade sizes (srcSet omitido)', () => {
    const src = '/port/images/projects/blife-ecommerce.png'
    const r = getProjectImageAttributes(src)
    expect(r.src).toBe(src)
    expect(r.sizes).toMatch(/100vw|35vw|min\(40vw/)
    expect(r.srcSet).toBeUndefined()
  })

  it('no modifica URL que no sea un PNG bajo /images/projects/', () => {
    const src = '/port/assets/photo.png'
    const r = getProjectImageAttributes(src)
    expect(r.src).toBe(src)
  })

  it('variante lightbox usa sizes acordes al modal ancho', () => {
    const src = '/p/images/projects/x.png'
    const r = getProjectImageAttributes(src, { variant: 'lightbox' })
    expect(r.sizes).toContain('67.5rem')
    expect(r.sizes).toContain('100vw')
  })

  it('transforma PNG bajo /images/projects/ a src y srcSet webp', () => {
    const src = '/base/images/projects/blife-ecommerce.png'
    const r = projectPngPathToWebpAttributes(src, sizes)
    expect(r).not.toBeNull()
    expect(r!.sizes).toBe(sizes)
    expect(r!.src).toBe('/base/images/projects/blife-ecommerce-1200.webp')
    expect(r!.srcSet).toBe(
      '/base/images/projects/blife-ecommerce-600.webp 600w, /base/images/projects/blife-ecommerce-1200.webp 1200w'
    )
  })

  it('preserva query string en src y srcSet', () => {
    const src = '/x/images/projects/foo.png?v=3'
    const r = projectPngPathToWebpAttributes(src, sizes)
    expect(r!.src).toBe('/x/images/projects/foo-1200.webp?v=3')
    expect(r!.srcSet).toContain('foo-600.webp?v=3')
    expect(r!.srcSet).toContain('foo-1200.webp?v=3')
  })

  it('devuelve null si no es PNG de projects', () => {
    expect(projectPngPathToWebpAttributes('/a/b.jpg', sizes)).toBeNull()
    expect(
      projectPngPathToWebpAttributes('/images/other/foo.png', sizes)
    ).toBeNull()
    expect(
      projectPngPathToWebpAttributes('/images/projects-sub/foo.png', sizes)
    ).toBeNull()
  })
})
