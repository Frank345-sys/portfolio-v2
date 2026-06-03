/**
 * Tests para components/ProjectsSection/subcomponents/ProjectPreviewModal/ProjectPreviewModal.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { getValidUrls } from '@/shared/utils/getValidUrls'
import { renderWithMotion } from '@/test/helpers'

import { ProjectPreviewModal } from './ProjectPreviewModal'
import { PROJECTS } from '../../constants/projects'

import type { ProjectWithSlides } from '../../types'

function projectWithSlides(index: number): ProjectWithSlides {
  const base = PROJECTS[index]!
  return {
    ...base,
    slides: getValidUrls(base.images) as unknown as ProjectWithSlides['slides'],
  }
}

describe('ProjectPreviewModal', () => {
  it('no renderiza diálogo cuando modalProject es undefined', () => {
    renderWithMotion(
      <ProjectPreviewModal
        modalProject={undefined}
        modalSlide={0}
        setModalSlide={vi.fn()}
        onClose={vi.fn()}
        resolveProjectImageAttributes={(src) => ({ src, sizes: '100vw' })}
      />
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('con proyecto abre el diálogo, título accesible y botón cerrar según props', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const project = projectWithSlides(0)

    renderWithMotion(
      <ProjectPreviewModal
        modalProject={project}
        modalSlide={0}
        setModalSlide={vi.fn()}
        onClose={onClose}
        resolveProjectImageAttributes={(src) => ({ src, sizes: '100vw' })}
      />
    )

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')

    expect(
      screen.getByRole('heading', { level: 2, name: project.title })
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /cerrar vista ampliada/i })
    )
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
