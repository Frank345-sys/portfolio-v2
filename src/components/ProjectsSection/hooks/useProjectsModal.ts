/**
 * Estado del modal de vista ampliada de un proyecto (índice, slide y apertura/cierre).
 *
 * @module components/ProjectsSection/hooks/useProjectsModal
 * @fileoverview Expone `open` y cierre vía `close` (limpia el índice del modal).
 * @remarks La persistencia del slide en tarjeta la coordina el orquestador (`handleCloseModal`); `close` solo limpia el índice (p. ej. scroll sync al salir de `lg`).
 */

import { useState, type Dispatch, type SetStateAction } from 'react'

import type { ProjectWithSlides } from '../types'

interface UseProjectsModalParams {
  projects: ProjectWithSlides[]
}

interface UseProjectsModalResult {
  index: number | null
  slide: number
  project: ProjectWithSlides | undefined
  setSlide: Dispatch<SetStateAction<number>>
  open: (projectIndex: number, slideIndex: number) => void
  close: () => void
}

/**
 * Gestiona el modal de preview ampliado y su slide activo.
 */
export function useProjectsModal({
  projects,
}: UseProjectsModalParams): UseProjectsModalResult {
  const [index, setIndex] = useState<number | null>(null)
  const [slide, setSlide] = useState(0)

  function close() {
    setIndex(null)
  }

  function open(projectIndex: number, slideIndex: number) {
    setIndex(projectIndex)
    setSlide(slideIndex)
  }

  return {
    index,
    slide,
    project: index !== null ? projects[index] : undefined,
    setSlide,
    open,
    close,
  }
}
