import { m, useMotionValue, useSpring } from 'motion/react'
import { useEffect } from 'react'

import { MOTION_ANIMATION } from '@/shared/constants'

import type { BoxData } from '../types'
import type { MotionValue } from 'motion/react'

interface FloatingBoxProps {
  /** Posición, profundidad e ícono SVG de esta caja (generado por `generateBoxes`). */
  box: BoxData
  /** Posición X normalizada del puntero para parallax. */
  mouseX: MotionValue<number>
  /** Posición Y normalizada del puntero para parallax. */
  mouseY: MotionValue<number>
  /**
   * Si es `false`, no se enlazan `mouseX`/`mouseY` al offset (viewport &lt; `lg` en `BackgroundBoxes`).
   * La animación de flotación vertical sigue activa.
   * @defaultValue true
   */
  parallaxEnabled?: boolean
}

/**
 * Un ítem `<m.li>` con ícono: entrada, flotación continua y parallax según `mouseX`/`mouseY`.
 * Marcado `aria-hidden` (decorativo dentro de `BackgroundBoxes`).
 */
export function FloatingBox({
  box,
  mouseX,
  mouseY,
  parallaxEnabled = true,
}: FloatingBoxProps) {
  const stiffness = 50 + Math.abs(box.depth) * 30
  const pxVal = useMotionValue(0)
  const pyVal = useMotionValue(0)
  const px = useSpring(pxVal, { stiffness, damping: 22 })
  const py = useSpring(pyVal, { stiffness, damping: 22 })

  useEffect(() => {
    if (!parallaxEnabled) {
      pxVal.set(0)
      pyVal.set(0)
      return
    }
    const strength = 22 * box.depth
    const u1 = mouseX.on('change', (v: number) => pxVal.set(v * strength))
    const u2 = mouseY.on('change', (v: number) => pyVal.set(v * strength))
    return () => {
      u1()
      u2()
    }
  }, [mouseX, mouseY, box.depth, pxVal, pyVal, parallaxEnabled])

  const Icon = box.Icon

  return (
    <m.li
      className="absolute list-none"
      aria-hidden="true"
      style={{
        left: `${box.x}%`,
        top: `${box.y}%`,
        x: px,
        y: py,
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
      <m.div
        className="h-full w-full"
        animate={{ y: [0, -box.floatAmp, 0] }}
        transition={{
          duration: box.floatDur,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 2 + box.floatDelay,
        }}
      >
        <div className="bg-bg-weak shadow-elevation-lg flex h-full w-full items-center justify-center rounded-xl select-none md:rounded-2xl">
          <Icon
            aria-hidden="true"
            className="h-[50%] w-[50%] shrink-0 sm:h-[55%] sm:w-[55%] md:h-[50%] md:w-[50%] lg:h-[60%] lg:w-[60%]"
          />
        </div>
      </m.div>
    </m.li>
  )
}
