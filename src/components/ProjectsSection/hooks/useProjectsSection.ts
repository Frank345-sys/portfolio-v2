/**
 * Orquestador de la sección Proyectos: datos, scroll sync, modal y carrusel.
 *
 * @module components/ProjectsSection/hooks/useProjectsSection
 * @fileoverview Compone hooks especializados; el enriquecimiento de slides vive en `enrichProjectsWithSlides`.
 * @remarks `modal.close` persiste el slide en tarjeta antes de cerrar; `modal.dismiss` (solo interno, vía scroll sync al salir de `lg`) limpia el índice sin persistir.
 */

import {
  useMemo,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from 'react'

import { useProjectsCarousel } from './useProjectsCarousel'
import { useProjectsModal } from './useProjectsModal'
import { useProjectsScrollSync } from './useProjectsScrollSync'
import { enrichProjectsWithSlides } from '../utils/enrichProjectsWithSlides'

import type { Project, ProjectWithSlides } from '../types'

interface UseProjectsSectionResult {
  data: {
    projects: ProjectWithSlides[]
    totalProjects: number
    activeProject: ProjectWithSlides | undefined
    activeIndex: number
  }
  ui: {
    showInfo: boolean
    scrollSyncEnabled: boolean
  }
  modal: {
    index: number | null
    slide: number
    project: ProjectWithSlides | undefined
    setSlide: Dispatch<SetStateAction<number>>
    open: (projectIndex: number, slideIndex: number) => void
    close: () => void
  }
  carousel: {
    articleRefAssigners: Array<(el: HTMLElement | null) => void>
    handleDotClick: (event: MouseEvent<HTMLButtonElement>) => void
    getSlideIndex: (projectIndex: number) => number
    handleSlideChange: (projectIndex: number, index: number) => void
  }
}

/**
 * Compone scroll sync, modal y carrusel para `ProjectsSection`.
 *
 * @param projects - Lista fuente (`PROJECTS`): cada `images` debe tener al menos una URL válida tras trim.
 */
export function useProjectsSection(
  projects: Project[]
): UseProjectsSectionResult {
  const projectsWithSlides = useMemo(
    () => enrichProjectsWithSlides(projects),
    [projects]
  )

  const totalProjects = projectsWithSlides.length

  const modal = useProjectsModal({
    projects: projectsWithSlides,
  })

  const scroll = useProjectsScrollSync(totalProjects, modal.dismiss)

  const carousel = useProjectsCarousel({
    projectCount: totalProjects,
    setItemRef: scroll.setItemRef,
    scrollItemIntoView: scroll.scrollItemIntoView,
    modalProjectIndex: modal.index,
    modalSlide: modal.slide,
    setModalSlide: modal.setSlide,
  })

  function handleCloseModal() {
    if (modal.index !== null) {
      carousel.persistCardSlide(modal.index, modal.slide)
    }
    modal.dismiss()
  }

  const activeProject =
    totalProjects > 0
      ? (projectsWithSlides[scroll.activeIndex] ?? projectsWithSlides[0])
      : undefined

  return {
    data: {
      projects: projectsWithSlides,
      totalProjects,
      activeProject,
      activeIndex: scroll.activeIndex,
    },
    ui: {
      showInfo: scroll.showInfo,
      scrollSyncEnabled: scroll.scrollSyncEnabled,
    },
    modal: {
      index: modal.index,
      slide: modal.slide,
      project: modal.project,
      setSlide: modal.setSlide,
      open: modal.open,
      close: handleCloseModal,
    },
    carousel: {
      articleRefAssigners: carousel.articleRefAssigners,
      handleDotClick: carousel.handleDotClick,
      getSlideIndex: carousel.getSlideIndex,
      handleSlideChange: carousel.handleSlideChange,
    },
  }
}
