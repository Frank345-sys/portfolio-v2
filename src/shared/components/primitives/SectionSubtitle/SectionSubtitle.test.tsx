/**
 * Tests para `SectionSubtitle` — semántica `h3`, prefijo `//` y línea decorativa.
 *
 * @fileoverview Valida elemento raíz fijo, `id`, `showLine` y prefijo visual.
 * @remarks No usa `renderWithMotion` — componente estático sin Motion.
 */

import { render, screen, within } from '@testing-library/react'
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
    render(<SectionSubtitle>about me</SectionSubtitle>)
    const heading = screen.getByRole('heading', { level: 3, name: /about me/i })
    expect(within(heading).getByText('//')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })

  it('pasa id al h3 y oculta la línea cuando showLine es false', () => {
    render(
      <SectionSubtitle id="skills-heading" showLine={false}>
        skills
      </SectionSubtitle>
    )
    expect(document.getElementById('skills-heading')).toHaveTextContent(
      /skills/i
    )
    const heading = screen.getByRole('heading', { level: 3, name: /skills/i })
    expect(heading.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1)
  })
})
