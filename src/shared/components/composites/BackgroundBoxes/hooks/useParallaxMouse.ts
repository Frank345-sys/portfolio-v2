/**
 * Posición del puntero normalizada para animar parallax en `BackgroundBoxes` / `FloatingBox`.
 *
 * @fileoverview Expone `mouseX` y `mouseY` como `MotionValue` en rango aproximado [-1, 1] respecto al viewport.
 * @remarks `MotionConfig` en App atenúa animaciones Motion; aquí se corta el listener `mousemove` con `prefers-reduced-motion`.
 */

import { useMotionValue } from 'motion/react'
import { useEffect } from 'react'

import { MEDIA_QUERY_REDUCED_MOTION } from '@/shared/constants/breakpoints'
import { useMediaQuery } from '@/shared/hooks'

import type { UseParallaxMouseReturn } from '../types'

/** Posición del puntero normalizada al viewport ([-1, 1]) para parallax decorativo. */
export function useParallaxMouse(
  options: { enabled?: boolean } = {}
): UseParallaxMouseReturn {
  const { enabled = true } = options
  const prefersReducedMotion = useMediaQuery(MEDIA_QUERY_REDUCED_MOTION)
  const parallaxActive = enabled && !prefersReducedMotion
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    if (!parallaxActive) {
      mouseX.set(0)
      mouseY.set(0)
      return
    }

    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      mouseX.set(w > 0 ? (e.clientX / w - 0.5) * 2 : 0)
      mouseY.set(h > 0 ? (e.clientY / h - 0.5) * 2 : 0)
    }

    const opts: AddEventListenerOptions = { passive: true }
    window.addEventListener('mousemove', handleMove, opts)
    return () => window.removeEventListener('mousemove', handleMove, opts)
  }, [parallaxActive, mouseX, mouseY])

  return { mouseX, mouseY, parallaxActive }
}
