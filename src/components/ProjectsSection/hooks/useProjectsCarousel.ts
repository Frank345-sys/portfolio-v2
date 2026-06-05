/**
 * Carruseles por tarjeta, refs de artículos y rail de puntos.
 *
 * @module components/ProjectsSection/hooks/useProjectsCarousel
 * @fileoverview Estado de slide por proyecto y sincronización con modal.
 * @remarks Cuando el modal está abierto, `getSlideIndex` y `handleSlideChange` delegan en el slide del modal; al cerrar, el orquestador persiste vía `persistCardSlide`.
 */

import {
  useMemo,
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from 'react'

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
}

/**
 * Estado del carrusel en tarjetas y refs para scroll sync.
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

  function persistCardSlide(projectIndex: number, slide: number) {
    setCardSlideByProject((prev) => ({
      ...prev,
      [projectIndex]: slide,
    }))
  }

  const articleRefAssigners = useMemo(
    () =>
      Array.from(
        { length: projectCount },
        (_, i) => (el: HTMLElement | null) => {
          setItemRef(i, el)
        }
      ),
    [projectCount, setItemRef]
  )

  function handleDotClick(event: MouseEvent<HTMLButtonElement>) {
    const raw = event.currentTarget.dataset.projectDotIndex
    const index = raw === undefined ? NaN : Number(raw)
    if (Number.isNaN(index)) return
    scrollItemIntoView(index)
  }

  function getSlideIndex(projectIndex: number) {
    return modalProjectIndex === projectIndex
      ? modalSlide
      : (cardSlideByProject[projectIndex] ?? 0)
  }

  function handleSlideChange(projectIndex: number, nextSlide: number) {
    if (modalProjectIndex === projectIndex) {
      setModalSlide(nextSlide)
      return
    }
    setCardSlideByProject((prev) => ({
      ...prev,
      [projectIndex]: nextSlide,
    }))
  }

  return {
    persistCardSlide,
    articleRefAssigners,
    handleDotClick,
    getSlideIndex,
    handleSlideChange,
  }
}
