/**
 * Carruseles por tarjeta, refs de artículos, rail de puntos y atributos de imagen.
 *
 * @module components/ProjectsSection/hooks/useProjectsCarousel
 * @fileoverview Estado de slide por proyecto, sincronización con modal, refs y atributos de imagen.
 * @remarks Importa `getProjectImageAttributes` por ruta directa (`../utils/getProjectImageAttributes`), sin barrel en `utils/`.
 */

import {
  useCallback,
  useMemo,
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from 'react'

import { getProjectImageAttributes } from '../utils/getProjectImageAttributes'

import type { ProjectImageAttributes } from '../types'

type ProjectCarouselImageAttributesResolver = (
  src: string
) => ProjectImageAttributes

interface UseProjectsCarouselParams {
  projectCount: number
  setItemRef: (index: number, el: HTMLElement | null) => void
  scrollItemIntoView: (index: number) => void
  modalProjectIndex: number | null
  modalSlide: number
  setModalSlide: Dispatch<SetStateAction<number>>
}

interface UseProjectsCarouselResult {
  persistCardSlide: (projectIndex: number, slide: number) => void
  articleRefAssigners: Array<(el: HTMLElement | null) => void>
  handleDotClick: (event: MouseEvent<HTMLButtonElement>) => void
  getSlideIndex: (projectIndex: number) => number
  handleSlideChange: (projectIndex: number, index: number) => void
  resolveImageAttributes: ProjectCarouselImageAttributesResolver
  resolveModalImageAttributes: ProjectCarouselImageAttributesResolver
}

/**
 * Estado del carrusel en tarjetas, refs para scroll sync y resolución de atributos `img`.
 */
export function useProjectsCarousel({
  projectCount,
  setItemRef,
  scrollItemIntoView,
  modalProjectIndex,
  modalSlide,
  setModalSlide,
}: UseProjectsCarouselParams): UseProjectsCarouselResult {
  const [cardSlideByProject, setCardSlideByProject] = useState<
    Record<number, number>
  >({})

  const persistCardSlide = useCallback(
    (projectIndex: number, slide: number) => {
      setCardSlideByProject((prev) => ({
        ...prev,
        [projectIndex]: slide,
      }))
    },
    []
  )

  const articleRefAssigners = useMemo(
    () =>
      Array.from({ length: projectCount }, (_, i) => {
        const index = i
        return (el: HTMLElement | null) => {
          setItemRef(index, el)
        }
      }),
    [projectCount, setItemRef]
  )

  const handleDotClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const raw = event.currentTarget.dataset.projectDotIndex
      const index = raw === undefined ? NaN : Number(raw)
      if (Number.isNaN(index)) return
      scrollItemIntoView(index)
    },
    [scrollItemIntoView]
  )

  const getSlideIndex = useCallback(
    (projectIndex: number) =>
      modalProjectIndex === projectIndex
        ? modalSlide
        : (cardSlideByProject[projectIndex] ?? 0),
    [cardSlideByProject, modalProjectIndex, modalSlide]
  )

  const handleSlideChange = useCallback(
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
    [modalProjectIndex, setModalSlide]
  )

  const resolveImageAttributes = useCallback(
    (src: string) => getProjectImageAttributes(src),
    []
  )

  const resolveModalImageAttributes = useCallback(
    (src: string) => getProjectImageAttributes(src, { variant: 'lightbox' }),
    []
  )

  return {
    persistCardSlide,
    articleRefAssigners,
    handleDotClick,
    getSlideIndex,
    handleSlideChange,
    resolveImageAttributes,
    resolveModalImageAttributes,
  }
}
