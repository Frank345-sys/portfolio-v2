import {
  useCallback,
  useMemo,
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from 'react'

import { getValidUrls } from '@/shared/utils/getValidUrls'

import { useProjectsScrollSync } from './useProjectsScrollSync'
import { getProjectImageAttributes } from '../utils'

import type {
  Project,
  NonEmptySlideList,
  ProjectImageAttributes,
  ProjectWithSlides,
} from '../types'

export type ProjectCarouselImageAttributesResolver = (
  src: string
) => ProjectImageAttributes

/**
 * Obtiene lista de URLs no vacías a partir del modelo (`Project.images`).
 *
 * Lanza si tras `trim` no queda ninguna URL válida — el modelo de dominio garantiza ≥1 pero
 * un error aquí anticipa configuración corrupta antes de llegar al carrusel.
 */
function toNonEmptySlides(urls: NonEmptySlideList): NonEmptySlideList {
  const slides = getValidUrls(urls)
  if (slides.length === 0) {
    throw new Error(
      'Se esperaba al menos una URL de captura válida (no vacía tras trim): revisa `Project.images`.'
    )
  }
  return slides as unknown as NonEmptySlideList
}

interface UseProjectsSectionResult {
  data: {
    projects: ProjectWithSlides[]
    totalProjects: number
    activeProject: ProjectWithSlides | undefined
    activeIndex: number
  }
  /**
   * Estado UI derivado de viewport/scroll sync.
   */
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
    resolveImageAttributes: ProjectCarouselImageAttributesResolver
  }
}

/**
 * Orquesta scroll sync (`useProjectsScrollSync`), estado del modal de vista ampliada y derivados
 * para `ProjectsSection`. Cierra el modal al salir de `lg` vía `scrollSyncEnabled`.
 */
export function useProjectsSection(
  projects: Project[]
): UseProjectsSectionResult {
  const projectsWithSlides = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        slides: toNonEmptySlides(project.images),
      })),
    [projects]
  )

  const totalProjects = projectsWithSlides.length
  const [modalProjectIndex, setModalProjectIndex] = useState<number | null>(
    null
  )
  const [modalSlide, setModalSlide] = useState(0)
  const [cardSlideByProject, setCardSlideByProject] = useState<
    Record<number, number>
  >({})

  const closeProjectModal = useCallback(() => {
    setModalProjectIndex(null)
  }, [])

  const {
    activeIndex,
    showInfo,
    scrollSyncEnabled,
    setItemRef,
    scrollItemIntoView,
  } = useProjectsScrollSync(totalProjects, closeProjectModal)

  const activeProject =
    totalProjects > 0
      ? (projectsWithSlides[activeIndex] ?? projectsWithSlides[0])
      : undefined

  const articleRefAssigners = useMemo(
    () =>
      Array.from({ length: projectsWithSlides.length }, (_, i) => {
        const index = i
        return (el: HTMLElement | null) => {
          setItemRef(index, el)
        }
      }),
    // Solo la longitud: el índice es lo relevante para `setItemRef`; mismo N de proyectos → mismos callbacks.
    [projectsWithSlides.length, setItemRef]
  )

  const handleProjectDotClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const raw = event.currentTarget.dataset.projectDotIndex
      const index = raw === undefined ? NaN : Number(raw)
      if (Number.isNaN(index)) return
      scrollItemIntoView(index)
    },
    [scrollItemIntoView]
  )

  const openProjectModal = useCallback(
    (projectIndex: number, slideIndex: number) => {
      setModalProjectIndex(projectIndex)
      setModalSlide(slideIndex)
    },
    []
  )

  const selectedModalProject =
    modalProjectIndex !== null
      ? projectsWithSlides[modalProjectIndex]
      : undefined
  const modalProject =
    scrollSyncEnabled && modalProjectIndex !== null
      ? selectedModalProject
      : undefined

  const handleCloseProjectPreviewModal = useCallback(() => {
    if (modalProjectIndex !== null) {
      setCardSlideByProject((prev) => ({
        ...prev,
        [modalProjectIndex]: modalSlide,
      }))
    }
    closeProjectModal()
  }, [closeProjectModal, modalProjectIndex, modalSlide])

  const getProjectPreviewSlideIndex = useCallback(
    (projectIndex: number) =>
      modalProjectIndex === projectIndex
        ? modalSlide
        : (cardSlideByProject[projectIndex] ?? 0),
    [cardSlideByProject, modalProjectIndex, modalSlide]
  )

  const handleProjectPreviewSlideChange = useCallback(
    (projectIndex: number, index: number) => {
      if (modalProjectIndex === projectIndex) {
        setModalSlide(index)
        return
      }
      setCardSlideByProject((prev) => ({
        ...prev,
        [projectIndex]: index,
      }))
    },
    [modalProjectIndex]
  )

  return {
    data: {
      projects: projectsWithSlides,
      totalProjects,
      activeProject,
      activeIndex,
    },
    ui: {
      showInfo,
      scrollSyncEnabled,
    },
    modal: {
      index: modalProjectIndex,
      slide: modalSlide,
      project: modalProject,
      setSlide: setModalSlide,
      open: openProjectModal,
      close: handleCloseProjectPreviewModal,
    },
    carousel: {
      articleRefAssigners,
      handleDotClick: handleProjectDotClick,
      getSlideIndex: getProjectPreviewSlideIndex,
      handleSlideChange: handleProjectPreviewSlideChange,
      resolveImageAttributes: getProjectImageAttributes,
    },
  }
}
