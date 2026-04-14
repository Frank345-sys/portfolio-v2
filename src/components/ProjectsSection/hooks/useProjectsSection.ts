import {
  useCallback,
  useMemo,
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from 'react'
import { useReducedMotion } from 'motion/react'
import type { Project } from '../types'
import { getValidUrls } from '@/shared/utils/getValidUrls'
import { useProjectsScrollSync } from './useProjectsScrollSync'

export interface UseProjectsSectionResult {
  totalProjects: number
  activeProject: Project | undefined
  activeIndex: number
  showInfo: boolean
  /**
   * Viewport ≥ lg: observer + panel lateral + lightbox montado.
   * Una sola fuente de verdad con `useProjectsScrollSync` (sin duplicar `matchMedia`).
   */
  scrollSyncEnabled: boolean
  articleRefAssigners: Array<(el: HTMLElement | null) => void>
  handleProjectDotClick: (event: MouseEvent<HTMLButtonElement>) => void
  reduceMotion: boolean | null
  lightboxProjectIndex: number | null
  lightboxSlide: number
  setLightboxSlide: Dispatch<SetStateAction<number>>
  openProjectLightbox: (projectIndex: number, slideIndex: number) => void
  closeProjectLightbox: () => void
  lightboxProject: Project | undefined
  lightboxValidImages: string[]
}

/**
 * Orquesta scroll sync (`useProjectsScrollSync`), estado del lightbox y derivados
 * para `ProjectsSection`. Cierra el lightbox al salir de `lg` vía `scrollSyncEnabled`.
 */
export function useProjectsSection(
  projects: Project[]
): UseProjectsSectionResult {
  const totalProjects = projects.length
  const [lightboxProjectIndex, setLightboxProjectIndex] = useState<
    number | null
  >(null)
  const [lightboxSlide, setLightboxSlide] = useState(0)

  const closeProjectLightbox = useCallback(() => {
    setLightboxProjectIndex(null)
  }, [])

  const {
    activeIndex,
    showInfo,
    scrollSyncEnabled,
    setItemRef,
    scrollItemIntoView,
  } = useProjectsScrollSync(totalProjects, closeProjectLightbox)

  const activeProject =
    totalProjects > 0 ? (projects[activeIndex] ?? projects[0]) : undefined

  const articleRefAssigners = useMemo(
    () =>
      projects.map((_, i) => (el: HTMLElement | null) => {
        setItemRef(i, el)
      }),
    [projects, setItemRef]
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

  const reduceMotion = useReducedMotion()

  const openProjectLightbox = useCallback(
    (projectIndex: number, slideIndex: number) => {
      setLightboxProjectIndex(projectIndex)
      setLightboxSlide(slideIndex)
    },
    []
  )

  const lightboxProject =
    lightboxProjectIndex !== null ? projects[lightboxProjectIndex] : undefined

  const lightboxValidImages = getValidUrls(lightboxProject?.images ?? [])

  return {
    totalProjects,
    activeProject,
    activeIndex,
    showInfo,
    scrollSyncEnabled,
    articleRefAssigners,
    handleProjectDotClick,
    reduceMotion,
    lightboxProjectIndex,
    lightboxSlide,
    setLightboxSlide,
    openProjectLightbox,
    closeProjectLightbox,
    lightboxProject,
    lightboxValidImages,
  }
}
