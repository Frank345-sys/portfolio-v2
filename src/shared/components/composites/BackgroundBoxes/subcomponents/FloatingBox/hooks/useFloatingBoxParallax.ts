/**
 * Traslación suavizada por muelle de cada caja flotante a partir del parallax global del puntero.
 *
 * @fileoverview Convierte `mouseX`/`mouseY` en objetivos escalados por `depth` y los expone vía `useSpring`.
 * @remarks Si `parallaxEnabled` es false, corta la suscripción a los `MotionValue` del puntero y vuelve la traslación a 0.
 */

import { useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'

import type { ParallaxMotionValues } from '@/shared/components/composites/BackgroundBoxes/types'

interface UseFloatingBoxParallaxParams extends ParallaxMotionValues {
  /** Profundidad del box: condiciona la rigidez del muelle y la fuerza del parallax. */
  depth: number
  /** Si es false, las traslaciones se reinician a 0 y no se suscribe al puntero. */
  parallaxEnabled: boolean
}

/**
 * Calcula la traslación parallax de un `FloatingBox` y la suaviza con muelles.
 *
 * Cuando `parallaxEnabled` es false, los `MotionValue` internos se mantienen en 0
 * y no se suscriben a los `MotionValue` del puntero. Cuando es true, cada cambio en
 * `mouseX`/`mouseY` actualiza los valores objetivo (escalados por `depth`).
 *
 * Encapsular este efecto en un hook evita meter `useEffect` en el componente y
 * mantiene `FloatingBox` como vista pura.
 */
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
    const unsubscribeX = mouseX.on('change', (v: number) =>
      targetX.set(v * strength)
    )
    const unsubscribeY = mouseY.on('change', (v: number) =>
      targetY.set(v * strength)
    )
    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [mouseX, mouseY, depth, targetX, targetY, parallaxEnabled])

  return { mouseX: x, mouseY: y }
}
