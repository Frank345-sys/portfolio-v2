/**
 * Tests para `AnimatedSectionHeading` — overline, título `h2` y highlight opcional.
 *
 * @fileoverview Valida semántica fija (`h2`), overline en `<p>` y nombre accesible con highlight.
 * @remarks Usa `renderWithMotion` y stub de `IntersectionObserver` para `whileInView`.
 */

import { screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { renderWithMotion } from '@/test/helpers'

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
    renderWithMotion(
      <AnimatedSectionHeading overline="Portafolio" title="Proyectos" />
    )
    expect(screen.getByText('Portafolio')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Proyectos' })
    ).toBeInTheDocument()
  })

  it('renderiza el overline como párrafo visible antes del título', () => {
    renderWithMotion(
      <AnimatedSectionHeading overline="Mis" title="Proyectos" />
    )
    expect(screen.getByText('Mis').closest('p')).toBeInTheDocument()
  })

  it('aplica titleId al h2 y renderiza titleHighlight en el nombre accesible', () => {
    renderWithMotion(
      <AnimatedSectionHeading
        overline="X"
        title="Ada"
        titleHighlight="Lovelace"
        titleId="hero-heading"
      />
    )
    expect(document.getElementById('hero-heading')).toHaveTextContent(/Ada/)
    const heading = screen.getByRole('heading', { name: 'Ada Lovelace' })
    expect(heading).toBeInTheDocument()
    expect(screen.getByText('Lovelace')).toHaveClass('text-information-base')
  })
})
