/**
 * Traslación suavizada por muelle de cada caja flotante a partir del parallax global del puntero.
 *
 * @fileoverview Convierte `mouseX`/`mouseY` en objetivos escalados por `depth` y los expone vía `useSpring`.
 * @remarks Si `parallaxEnabled` es false, corta la suscripción y vuelve la traslación a 0.
 */

import { useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'

import type { ParallaxMotionValues } from '@/shared/components/composites/BackgroundBoxes/types'

interface UseFloatingBoxParallaxParams extends ParallaxMotionValues {
  depth: number
  parallaxEnabled: boolean
}

/** Convierte la posición del puntero en traslación parallax suavizada por muelle según `depth`. */
export function useFloatingBoxParallax({
  depth,
  mouseX,
  mouseY,
  parallaxEnabled,
}: UseFloatingBoxParallaxParams): ParallaxMotionValues {
  const stiffness = 50 + Math.abs(depth) * 30
  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const x = useSpring(targetX, { stiffness, damping: 22 })
  const y = useSpring(targetY, { stiffness, damping: 22 })

  useEffect(() => {
    if (!parallaxEnabled) {
      targetX.set(0)
      targetY.set(0)
      return
    }

    const strength = 22 * depth
    const unsubscribeX = mouseX.on('change', (v) => targetX.set(v * strength))
    const unsubscribeY = mouseY.on('change', (v) => targetY.set(v * strength))

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [mouseX, mouseY, depth, parallaxEnabled, targetX, targetY])

  return { mouseX: x, mouseY: y }
}
