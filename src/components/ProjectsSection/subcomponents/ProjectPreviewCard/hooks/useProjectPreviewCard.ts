/**
 * Estado de la tarjeta preview: visibilidad en viewport, scroll sync y autoplay.
 *
 * @module components/ProjectsSection/subcomponents/ProjectPreviewCard/hooks/useProjectPreviewCard
 * @fileoverview Unifica intersección (`useIsIntersecting`) y reglas de presentación del carrusel.
 * @remarks Único hook colocalizado con `ProjectPreviewCard`; las reglas se prueban en `useProjectPreviewCard.test.ts`.
 */

import { useIsIntersecting } from '@/shared/hooks'

import type { ProjectPreviewCardProps } from '../types'

/** Umbral de intersección para considerar visible el preview y permitir autoplay. */
export const PROJECT_PREVIEW_INTERSECTION_OPTIONS = {
  threshold: 0.25,
  rootMargin: '0px',
} as const

type UseProjectPreviewCardParams = Pick<
  ProjectPreviewCardProps,
  'scrollSyncEnabled' | 'activeIndex' | 'projectIndex' | 'modalProjectIndex'
>

interface UseProjectPreviewCardResult {
  previewRef: ReturnType<typeof useIsIntersecting<HTMLDivElement>>[0]
  isInactiveByScrollSync: boolean
  shouldAutoplay: boolean
}

/**
 * Deriva ref de preview, atenuación por scroll sync y autoplay del carrusel.
 */
export function useProjectPreviewCard({
  scrollSyncEnabled,
  activeIndex,
  projectIndex,
  modalProjectIndex,
}: UseProjectPreviewCardParams): UseProjectPreviewCardResult {
  const [previewRef, isPreviewVisible] = useIsIntersecting<HTMLDivElement>(
    PROJECT_PREVIEW_INTERSECTION_OPTIONS
  )

  const isInactiveByScrollSync =
    scrollSyncEnabled && activeIndex !== projectIndex
  const isModalBoundToCard =
    modalProjectIndex !== null && modalProjectIndex === projectIndex
  const shouldAutoplay =
    isPreviewVisible && activeIndex === projectIndex && !isModalBoundToCard

  return {
    previewRef,
    isInactiveByScrollSync,
    shouldAutoplay,
  }
}
