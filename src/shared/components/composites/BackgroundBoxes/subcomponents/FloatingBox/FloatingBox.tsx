/**
 * Pieza de interfaz del portfolio (`FloatingBox`).
 *
 * @fileoverview Implementación del archivo `FloatingBox.tsx` dentro de `shared/components/BackgroundBoxes/subcomponents/FloatingBox`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { m, useTransform } from 'motion/react'

import { MOTION_ANIMATION } from '@/shared/constants/motionAnimations'

import { useFloatingBoxFloat } from './hooks/useFloatingBoxFloat'
import { useFloatingBoxParallax } from './hooks/useFloatingBoxParallax'

import type { FloatingBoxProps } from '../../types'

/**
 * Un ítem `<m.li>` con ícono: entrada, flotación continua y parallax según `mouseX`/`mouseY`.
 * El árbol decorativo vive bajo `<ul aria-hidden>` en `BackgroundBoxes`; los íconos van con
 * `aria-hidden` (puramente decorativos).
 */
export function FloatingBox({
  box,
  mouseX,
  mouseY,
  parallaxEnabled = true,
}: FloatingBoxProps) {
  const { mouseX: px, mouseY: py } = useFloatingBoxParallax({
    depth: box.depth,
    mouseX,
    mouseY,
    parallaxEnabled,
  })
  const floatY = useFloatingBoxFloat(box)
  const y = useTransform(
    [py, floatY],
    ([parallaxY, floatOffset]: number[]) =>
      (parallaxY ?? 0) + (floatOffset ?? 0)
  )

  const Icon = box.Icon

  return (
    <m.li
      className="bg-bg-weak shadow-elevation-lg absolute flex list-none items-center justify-center rounded-xl select-none md:rounded-2xl"
      style={{
        left: `${box.x}%`,
        top: `${box.y}%`,
        x: px,
        y,
        width: box.size,
        height: box.size,
      }}
      initial={{ opacity: 0, translateX: box.fromLeft ? -100 : 100 }}
      animate={{ opacity: box.opacity, translateX: 0 }}
      transition={{
        opacity: { duration: 0.5, delay: 0.1 + box.id * 0.035 },
        translateX: {
          duration: 1,
          ease: MOTION_ANIMATION.easing.smoothOut,
          delay: 0.1 + box.id * 0.035,
        },
      }}
    >
      <Icon
        aria-hidden="true"
        className="size-[50%] sm:size-[55%] lg:size-[60%]"
      />
    </m.li>
  )
}
