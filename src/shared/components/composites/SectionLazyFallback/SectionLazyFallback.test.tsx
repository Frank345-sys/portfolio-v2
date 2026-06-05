/**
 * Tests para `SectionLazyFallback` — variantes de carga y shells por sección.
 *
 * @fileoverview Valida `role="status"`, `aria-busy`/`aria-live` y clases de layout por variante.
 * Los skeletons concretos (`*SectionSkeleton`, `SkeletonPrimitives`) no llevan test propio; se cubren aquí vía `variant`.
 * @remarks No usa `renderWithMotion`.
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SectionLazyFallback } from './SectionLazyFallback'

/**
 * Integración del dispatcher de skeletons: una prueba por variante + reglas de shell.
 * Sin `HeroSectionSkeleton.test.tsx` ni similares (evitar duplicar smoke por archivo).
 */
describe('SectionLazyFallback', () => {
  it.each([
    ['hero', 'Cargando portada'],
    ['about', 'Cargando sección Sobre mí'],
    ['projects', 'Cargando sección Proyectos'],
    ['contact', 'Cargando sección Contacto'],
    ['footer', 'Cargando pie de página'],
  ] as const)(
    'variante %s expone estado de carga accesible',
    (variant, label) => {
      render(<SectionLazyFallback ariaLabel={label} variant={variant} />)
      const status = screen.getByRole('status', {
        name: new RegExp(label, 'i'),
      })
      expect(status).toHaveAttribute('aria-busy', 'true')
      expect(status).toHaveAttribute('aria-live', 'polite')
    }
  )

  it.each(['hero', 'about', 'projects', 'contact', 'footer'] as const)(
    'variante %s se renderiza sin errores',
    (variant) => {
      expect(() => {
        render(
          <SectionLazyFallback
            ariaLabel={`Cargando sección ${variant}`}
            variant={variant}
          />
        )
      }).not.toThrow()
    }
  )

  it('las variantes de sección aplican contenedor ancho completo y sección', () => {
    const { rerender } = render(
      <SectionLazyFallback ariaLabel="A" variant="about" />
    )
    const status = screen.getByRole('status', { name: /a/i })
    expect(status.className).toMatch(/max-w-7xl/)
    expect(status.className).toMatch(/py-20/)

    rerender(<SectionLazyFallback ariaLabel="P" variant="projects" />)
    expect(screen.getByRole('status', { name: /p/i }).className).toMatch(
      /max-w-7xl/
    )
  })

  it('la variante footer no aplica el shell de sección principal', () => {
    render(<SectionLazyFallback ariaLabel="Pie" variant="footer" />)
    const status = screen.getByRole('status', { name: /pie/i })
    expect(status.className).not.toMatch(/py-20/)
    expect(status.firstElementChild?.className).toMatch(/border-t/)
  })

  it('las variantes hero y footer omiten el shell ancho completo de sección', () => {
    const { rerender } = render(
      <SectionLazyFallback ariaLabel="Portada" variant="hero" />
    )
    let status = screen.getByRole('status', { name: /portada/i })
    expect(status.className).not.toMatch(/max-w-7xl/)
    expect(status.className).not.toMatch(/py-20/)

    rerender(<SectionLazyFallback ariaLabel="Pie" variant="footer" />)
    status = screen.getByRole('status', { name: /pie/i })
    expect(status.className).not.toMatch(/max-w-7xl/)
    expect(status.className).not.toMatch(/py-20/)
  })
})
