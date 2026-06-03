/**
 * Estado del modal de vista ampliada de un proyecto (índice, slide y apertura/cierre).
 *
 * @module components/ProjectsSection/hooks/useProjectsModal
 * @fileoverview Expone `open` y cierre vía `close` / `dismiss` (misma función: limpia el índice del modal).
 * @remarks La persistencia del slide en tarjeta la coordina el orquestador (`handleCloseModal`); `dismiss` solo limpia el índice (p. ej. scroll sync al salir de `lg`).
 */

import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

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
  /**
   * Misma referencia que `close` en runtime (`close: dismiss` en el return).
   * Nombre reservado para scroll sync (`onExitLgLayout`): cierre sin persistencia en tarjeta vía orquestador.
   */
  dismiss: () => void
}

/**
 * Gestiona el modal de preview ampliado y su slide activo.
 */
export function useProjectsModal({
  projects,
}: UseProjectsModalParams): UseProjectsModalResult {
  const [modalProjectIndex, setModalProjectIndex] = useState<number | null>(
    null
  )
  const [modalSlide, setModalSlide] = useState(0)

  const dismiss = useCallback(() => {
    setModalProjectIndex(null)
  }, [])

  const open = useCallback((projectIndex: number, slideIndex: number) => {
    setModalProjectIndex(projectIndex)
    setModalSlide(slideIndex)
  }, [])

  const project =
    modalProjectIndex !== null ? projects[modalProjectIndex] : undefined

  return {
    index: modalProjectIndex,
    slide: modalSlide,
    project,
    setSlide: setModalSlide,
    open,
    close: dismiss,
    dismiss,
  }
}
