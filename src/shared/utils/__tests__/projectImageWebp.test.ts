import { describe, expect, it } from 'vitest'
import { projectPngPathToWebpAttributes } from '../projectImageWebp'

describe('projectPngPathToWebpAttributes', () => {
  const sizes =
    '(max-width: 1023px) 100vw, (max-width: 1279px) 35vw, min(40vw, 34rem)'

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
