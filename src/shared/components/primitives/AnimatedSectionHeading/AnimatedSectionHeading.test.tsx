/**
 * Tests para `AnimatedSectionHeading` — overline, título `h2` y highlight opcional.
 *
 * @fileoverview Valida semántica fija (`h2`), overline en `<p>` y nombre accesible con highlight.
 * @remarks Usa `render` con stub de `IntersectionObserver` para Motion `whileInView`.
 */

import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { AnimatedSectionHeading } from './AnimatedSectionHeading'

const IOReserve = globalThis.IntersectionObserver

describe('AnimatedSectionHeading', () => {
  beforeEach(() => {
    globalThis.IntersectionObserver = class {
      disconnect() {}
      observe() {}
      takeRecords() {
        return []
      }
      unobserve() {}
    } as unknown as typeof IntersectionObserver
  })

  afterEach(() => {
    globalThis.IntersectionObserver = IOReserve
  })

  it('renderiza overline y título como h2 por defecto', () => {
    render(<AnimatedSectionHeading overline="Portafolio" title="Proyectos" />)
    expect(screen.getByText('Portafolio')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Proyectos' })
    ).toBeInTheDocument()
  })

  it('renderiza el overline como párrafo visible antes del título', () => {
    render(<AnimatedSectionHeading overline="Mis" title="Proyectos" />)
    expect(screen.getByText('Mis').closest('p')).toBeInTheDocument()
  })

  it('aplica titleId al h2 y renderiza titleHighlight en el nombre accesible', () => {
    const { container } = render(
      <AnimatedSectionHeading
        overline="X"
        title="Ada"
        titleHighlight="Lovelace"
        titleId="hero-heading"
      />
    )
    expect(document.getElementById('hero-heading')).toHaveTextContent(/Ada/)
    expect(
      screen.getByRole('heading', { name: 'Ada Lovelace' })
    ).toBeInTheDocument()
    const span = container.querySelector('.text-information-base')
    expect(span?.textContent).toBe('Lovelace')
  })
})
