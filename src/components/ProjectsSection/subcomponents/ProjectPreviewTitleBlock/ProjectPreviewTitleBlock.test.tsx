/**
 * Tests para components/ProjectsSection/subcomponents/ProjectPreviewTitleBlock/ProjectPreviewTitleBlock.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithMotion } from '@/test/helpers'

import { ProjectPreviewTitleBlock } from './ProjectPreviewTitleBlock'

describe('ProjectPreviewTitleBlock', () => {
  it('sin titleHeadingId renderiza el título en un párrafo (sin h2)', () => {
    renderWithMotion(
      <ProjectPreviewTitleBlock subtitle="Landing" title="Mi proyecto" />
    )

    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument()
    expect(screen.getByText('Landing')).toBeInTheDocument()
    const titleParagraph = screen.getByText('Mi proyecto')
    expect(titleParagraph.tagName.toLowerCase()).toBe('p')
  })

  it('con titleHeadingId expone el título como h2 con ese id para aria-labelledby', () => {
    renderWithMotion(
      <ProjectPreviewTitleBlock
        subtitle="Web"
        title="Catálogo"
        titleHeadingId="modal-title-stable-id"
      />
    )

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Catálogo')
    expect(heading).toHaveAttribute('id', 'modal-title-stable-id')
  })
})
