/**
 * Tests para components/ProjectsSection/subcomponents/ProjectPreviewCard/ProjectPreviewCard.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Contrato de render y CTA; reglas de `shouldAutoplay` en `hooks/useProjectsCard.test.ts`.
 */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getValidUrls } from '@/shared/utils/getValidUrls'
import { renderWithMotion, setupIntersectionObserver } from '@/test/helpers'

import { ProjectPreviewCard } from './ProjectPreviewCard'
import { PROJECTS } from '../../constants/projects'

import type { ProjectWithSlides } from '../../types'

vi.mock('@/shared/components/composites/ImageCarousel', () => ({
  ImageCarousel: ({ autoplay }: { autoplay: boolean }) => (
    <div data-testid="image-carousel" data-autoplay={String(autoplay)} />
  ),
}))

function resolveProjectImageAttrs(src: string) {
  return { src, sizes: '100vw' as const }
}

function projectWithSlides(index: number): ProjectWithSlides {
  const base = PROJECTS[index]!
  return {
    ...base,
    slides: getValidUrls(base.images) as unknown as ProjectWithSlides['slides'],
  }
}

describe('ProjectPreviewCard', () => {
  beforeEach(() => {
    setupIntersectionObserver()
  })

  it('desactiva el botón de pantalla completa cuando otro proyecto es activo en scroll sync', () => {
    const project = projectWithSlides(0)

    renderWithMotion(
      <ProjectPreviewCard
        project={project}
        projectIndex={0}
        activeIndex={1}
        scrollSyncEnabled={true}
        modalProjectIndex={null}
        openProjectModal={vi.fn()}
        getProjectPreviewSlideIndex={() => 0}
        handleProjectPreviewSlideChange={vi.fn()}
        resolveProjectImageAttributes={resolveProjectImageAttrs}
      />
    )

    const fullscreen = screen.getByRole('button', {
      name: /ver .* a pantalla completa/i,
      hidden: true,
    })
    expect(fullscreen).toBeDisabled()
  })

  it('invoca openProjectModal con índices de proyecto y slide al pulsar pantalla completa', async () => {
    const user = userEvent.setup()
    const openProjectModal = vi.fn()
    const project = projectWithSlides(1)

    renderWithMotion(
      <ProjectPreviewCard
        project={project}
        projectIndex={1}
        activeIndex={1}
        scrollSyncEnabled={false}
        modalProjectIndex={null}
        openProjectModal={openProjectModal}
        getProjectPreviewSlideIndex={() => 2}
        handleProjectPreviewSlideChange={vi.fn()}
        resolveProjectImageAttributes={resolveProjectImageAttrs}
      />
    )

    const fullscreen = screen.getByRole('button', {
      name: /ver .* a pantalla completa/i,
      hidden: true,
    })
    await user.click(fullscreen)

    expect(openProjectModal).toHaveBeenCalledWith(1, 2)
  })

  it('el CTA de pantalla completa (oculto en viewport estrecho vía CSS) invoca openProjectModal con índices de proyecto y slide', async () => {
    const user = userEvent.setup()
    const openProjectModal = vi.fn()
    const project = projectWithSlides(0)

    renderWithMotion(
      <ProjectPreviewCard
        project={project}
        projectIndex={0}
        activeIndex={0}
        scrollSyncEnabled={false}
        modalProjectIndex={null}
        openProjectModal={openProjectModal}
        getProjectPreviewSlideIndex={() => 1}
        handleProjectPreviewSlideChange={vi.fn()}
        resolveProjectImageAttributes={resolveProjectImageAttrs}
      />
    )

    const fullscreenCta = screen.getByRole('button', {
      name: /ver .* a pantalla completa/i,
      hidden: true,
    })
    await user.click(fullscreenCta)

    expect(openProjectModal).toHaveBeenCalledWith(0, 1)
  })
})
