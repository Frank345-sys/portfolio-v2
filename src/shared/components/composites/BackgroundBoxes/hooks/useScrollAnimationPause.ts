/**
 * Pausa animaciones decorativas mientras el usuario hace scroll y las reanuda tras un breve idle.
 *
 * @module shared/components/composites/BackgroundBoxes/hooks/useScrollAnimationPause
 * @fileoverview Listener `scroll` pasivo, debounce de reanudación y registro de drivers Motion pausables.
 * @remarks Compatible con scroll nativo y Lenis; el parallax usa el booleano interno, la flotación el registro.
 */
import { useEffect, useReducer, useRef } from 'react'

/** Milisegundos sin scroll antes de reanudar animaciones del fondo. */
const SCROLL_ANIMATION_PAUSE_RESUME_MS = 150 as const

export interface ScrollAnimationControls {
  pause: () => void
  play: () => void
}

let scrollAnimationsPaused = false

const registeredControls = new Set<ScrollAnimationControls>()

/** @internal Solo tests — reinicia el registro entre casos. */
export function resetScrollAnimationControlsRegistryForTests(): void {
  scrollAnimationsPaused = false
  registeredControls.clear()
}

export function registerScrollAnimationControls(
  controls: ScrollAnimationControls
): () => void {
  registeredControls.add(controls)
  if (scrollAnimationsPaused) {
    controls.pause()
  }
  return () => {
    registeredControls.delete(controls)
  }
}

/** @internal Invocado desde el listener de scroll; expuesto para tests unitarios. */
export function pauseScrollRegisteredAnimations(): void {
  scrollAnimationsPaused = true
  for (const controls of registeredControls) {
    controls.pause()
  }
}

function resumeScrollRegisteredAnimations(): void {
  scrollAnimationsPaused = false
  for (const controls of registeredControls) {
    controls.play()
  }
}

type ScrollPauseAction = { type: 'pause' } | { type: 'resume' }

function scrollPauseReducer(
  _state: boolean,
  action: ScrollPauseAction
): boolean {
  switch (action.type) {
    case 'pause':
      return true
    case 'resume':
      return false
  }
}

/**
 * Devuelve `true` mientras dura el scroll (y un margen corto tras el último evento).
 * Solo actualiza React al entrar en pausa y al reanudar, no en cada tick de scroll.
 */
export function useScrollAnimationPause(
  resumeDelayMs: number = SCROLL_ANIMATION_PAUSE_RESUME_MS
): boolean {
  const [animationsPaused, dispatch] = useReducer(scrollPauseReducer, false)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    let resumeTimeoutId: ReturnType<typeof setTimeout> | null = null

    const pauseForScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true
        dispatch({ type: 'pause' })
        pauseScrollRegisteredAnimations()
      }

      if (resumeTimeoutId !== null) {
        clearTimeout(resumeTimeoutId)
      }

      resumeTimeoutId = setTimeout(() => {
        isScrollingRef.current = false
        dispatch({ type: 'resume' })
        resumeScrollRegisteredAnimations()
        resumeTimeoutId = null
      }, resumeDelayMs)
    }

    window.addEventListener('scroll', pauseForScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', pauseForScroll)
      if (resumeTimeoutId !== null) {
        clearTimeout(resumeTimeoutId)
      }
    }
  }, [resumeDelayMs])

  return animationsPaused
}
