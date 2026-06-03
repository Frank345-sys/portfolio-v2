/**
 * Posición del puntero normalizada para animar parallax en `BackgroundBoxes` / `FloatingBox`.
 *
 * @fileoverview Expone `mouseX` y `mouseY` como `MotionValue` en rango aproximado [-1, 1] respecto al viewport.
 * @remarks Listener `mousemove` pasivo; con `enabled: false` resetea a 0 y elimina el listener hasta el próximo ciclo.
 */

import { useMotionValue } from 'motion/react'
import { useEffect } from 'react'

import type { ParallaxMotionValues } from '../types'

const MOUSE_MOVE_LISTENER_OPTS: AddEventListenerOptions = { passive: true }

/**
 * Expone la posición del mouse normalizada por viewport para parallax (`FloatingBox`).
 *
 * @param options - Opciones: `enabled` en `false` desactiva listeners y deja los valores en 0
 * (viewport estrecho o cuando el padre desactiva parallax).
 */
export function useParallaxMouse(
  options: { enabled?: boolean } = {}
): ParallaxMotionValues {
  const { enabled = true } = options
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    if (!enabled) {
      mouseX.set(0)
      mouseY.set(0)
      return
    }
    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth
      const h = window.innerHeight
      const nx = w > 0 ? (e.clientX / w - 0.5) * 2 : 0
      const ny = h > 0 ? (e.clientY / h - 0.5) * 2 : 0
      mouseX.set(nx)
      mouseY.set(ny)
    }
    window.addEventListener('mousemove', handleMove, MOUSE_MOVE_LISTENER_OPTS)
    return () =>
      window.removeEventListener(
        'mousemove',
        handleMove,
        MOUSE_MOVE_LISTENER_OPTS
      )
  }, [enabled, mouseX, mouseY])

  return { mouseX, mouseY }
}
