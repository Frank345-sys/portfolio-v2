/**
 * Tests para components/ProjectsSection/subcomponents/ProjectInfo/subcomponents/ProjectLink/ProjectLink.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderWithMotion } from '@/test/helpers'

import { ProjectLink } from './ProjectLink'

describe('ProjectLink', () => {
  it('solid: enlaza con target blank, seguridad referrer y etiqueta por nueva pestaña', () => {
    renderWithMotion(
      <ProjectLink
        href="https://demo.example/page"
        label="Ver demo"
        variant="solid"
      />
    )

    const link = screen.getByRole('link', {
      name: /ver demo.*nueva pestaña/i,
    })
    expect(link).toHaveAttribute('href', 'https://demo.example/page')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link.tagName.toLowerCase()).toBe('a')
  })

  it('outline: mismo contrato de enlace externo seguro', () => {
    renderWithMotion(
      <ProjectLink
        href="https://github.com/u/r"
        label="Código"
        variant="outline"
      />
    )

    const link = screen.getByRole('link', {
      name: /código.*nueva pestaña/i,
    })
    expect(link).toHaveAttribute('href', 'https://github.com/u/r')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('es activable desde teclado (flujo esperado)', async () => {
    const user = userEvent.setup()
    renderWithMotion(
      <ProjectLink href="https://x.test" label="Sitio" variant="solid" />
    )

    const link = screen.getByRole('link', {
      name: /sitio.*nueva pestaña/i,
    })
    link.focus()
    expect(link).toHaveFocus()
    await user.keyboard('{Enter}')
  })
})
