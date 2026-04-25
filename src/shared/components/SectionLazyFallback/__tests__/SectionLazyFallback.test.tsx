import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionLazyFallback } from '../SectionLazyFallback'

describe('SectionLazyFallback', () => {
  it.each([
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

  it('las variantes de sección aplican contenedor ancho completo y sección', () => {
    const { container, rerender } = render(
      <SectionLazyFallback ariaLabel="A" variant="about" />
    )
    const status = screen.getByRole('status', { name: /a/i })
    expect(status.className).toMatch(/max-w-7xl/)
    expect(status.className).toMatch(/py-20/)

    rerender(<SectionLazyFallback ariaLabel="P" variant="projects" />)
    expect(container.querySelector('[role="status"]')?.className).toMatch(
      /max-w-7xl/
    )
  })

  it('la variante footer no aplica el shell de sección principal', () => {
    render(<SectionLazyFallback ariaLabel="Pie" variant="footer" />)
    const status = screen.getByRole('status', { name: /pie/i })
    expect(status.className).not.toMatch(/py-20/)
    expect(status.firstElementChild?.className).toMatch(/border-t/)
  })
})
