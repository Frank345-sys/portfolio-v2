/**
 * Tests para `SectionSubtitle` — semántica `h3`, prefijo `//` y línea decorativa.
 *
 * @fileoverview Valida elemento raíz fijo, `id`, `showLine` y prefijo visual.
 * @remarks No usa `renderWithMotion` — componente estático sin Motion.
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SectionSubtitle } from './SectionSubtitle'

describe('SectionSubtitle', () => {
  it('renderiza siempre un h3 con el texto del subtítulo', () => {
    render(<SectionSubtitle>stack técnico</SectionSubtitle>)
    expect(
      screen.getByRole('heading', { level: 3, name: /stack técnico/i })
    ).toBeInTheDocument()
  })

  it('expone el prefijo // como decorativo (aria-hidden)', () => {
    const { container } = render(<SectionSubtitle>about me</SectionSubtitle>)
    const prefix = container.querySelector('[aria-hidden="true"]')
    expect(prefix).toHaveTextContent('//')
  })

  it('pasa id al h3 y oculta la línea cuando showLine es false', () => {
    const { container } = render(
      <SectionSubtitle id="skills-heading" showLine={false}>
        skills
      </SectionSubtitle>
    )
    expect(document.getElementById('skills-heading')).toHaveTextContent(
      /skills/i
    )
    const dividers = container.querySelectorAll('[aria-hidden="true"]')
    expect(dividers).toHaveLength(1)
  })
})
