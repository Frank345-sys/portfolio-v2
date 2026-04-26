import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { LAYOUT } from '@/shared/constants/tokens'

import { SectionLabel } from '../SectionLabel'

describe('SectionLabel', () => {
  it('variante prefix por defecto muestra // y el texto', () => {
    render(<SectionLabel>Stack técnico</SectionLabel>)

    expect(screen.getByText('//')).toBeInTheDocument()
    expect(screen.getByText('Stack técnico')).toBeInTheDocument()
  })

  it('variante rule muestra guión largo y el texto', () => {
    render(<SectionLabel variant="rule">Sobre mí</SectionLabel>)

    expect(screen.getByText('−')).toBeInTheDocument()
    expect(screen.getByText('Sobre mí')).toBeInTheDocument()
  })

  it('showLine false oculta la línea decorativa en variante prefix', () => {
    const { container } = render(
      <SectionLabel showLine={false}>Sin línea</SectionLabel>
    )

    const dividerSelector = `.${LAYOUT.divider.horizontal.split(' ').join('.')}`
    expect(container.querySelector(dividerSelector)).toBeNull()
  })

  it('showLine true incluye la línea decorativa en variante prefix', () => {
    const { container } = render(
      <SectionLabel showLine>Con línea</SectionLabel>
    )

    const dividerSelector = `.${LAYOUT.divider.horizontal.split(' ').join('.')}`
    expect(container.querySelector(dividerSelector)).toBeInTheDocument()
  })

  it('renderiza con el elemento indicado en as', () => {
    render(
      <SectionLabel as="h3" variant="rule">
        Subtítulo
      </SectionLabel>
    )

    expect(
      screen.getByRole('heading', { level: 3, name: /subtítulo/i })
    ).toBeInTheDocument()
  })
})
