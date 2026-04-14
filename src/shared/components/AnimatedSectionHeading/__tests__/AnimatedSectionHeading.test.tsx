import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AnimatedSectionHeading } from '../AnimatedSectionHeading'

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

  it('renderiza overline y título con nivel semántico por defecto h2', () => {
    render(<AnimatedSectionHeading overline="Portafolio" title="Proyectos" />)
    expect(screen.getByText('Portafolio')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Proyectos' })
    ).toBeInTheDocument()
  })

  it('respeta titleAs para el nivel del heading', () => {
    render(<AnimatedSectionHeading overline="A" title="B" titleAs="h1" />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'B' })
    ).toBeInTheDocument()
  })

  it('renderiza titleHighlight dentro del heading con nombre accesible completo', () => {
    const { container } = render(
      <AnimatedSectionHeading
        overline="X"
        title="Ada"
        titleHighlight="Lovelace"
      />
    )
    expect(
      screen.getByRole('heading', { name: 'Ada Lovelace' })
    ).toBeInTheDocument()
    const span = container.querySelector('.text-information-base')
    expect(span?.textContent).toBe('Lovelace')
  })
})
