/**
 * Pausa animaciones decorativas mientras el usuario hace scroll y las reanuda tras un breve idle.
 *
 * @fileoverview Listener `scroll` pasivo, debounce de reanudación y registro de drivers Motion pausables.
 * @remarks Compatible con scroll nativo y Lenis; el parallax usa el booleano, la flotación el registro.
 */

import { useEffect, useState } from 'react'

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
  return () => registeredControls.delete(controls)
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

/**
 * `true` mientras dura el scroll (y un margen corto tras el último evento).
 * React solo re-renderiza al entrar en pausa y al reanudar gracias al bailout de `useState`.
 */
export function useScrollAnimationPause(
  resumeDelayMs: number = SCROLL_ANIMATION_PAUSE_RESUME_MS
): boolean {
  const [animationsPaused, setAnimationsPaused] = useState(false)

  useEffect(() => {
    let resumeTimeoutId: ReturnType<typeof setTimeout> | null = null

    const onScroll = () => {
      setAnimationsPaused(true)
      pauseScrollRegisteredAnimations()

      if (resumeTimeoutId !== null) {
        clearTimeout(resumeTimeoutId)
      }

      resumeTimeoutId = setTimeout(() => {
        setAnimationsPaused(false)
        resumeScrollRegisteredAnimations()
        resumeTimeoutId = null
      }, resumeDelayMs)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (resumeTimeoutId !== null) {
        clearTimeout(resumeTimeoutId)
      }
    }
  }, [resumeDelayMs])

  return animationsPaused
}
