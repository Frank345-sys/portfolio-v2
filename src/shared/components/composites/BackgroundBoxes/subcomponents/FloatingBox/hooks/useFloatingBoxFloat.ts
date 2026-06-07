/**
 * Flotación vertical infinita de un `FloatingBox`; al pausar congela el frame actual.
 *
 * @fileoverview Un solo ciclo `animate()` por montaje; pausa/reanuda vía registro de scroll.
 * @remarks Evita `stop()` + reinicio, que provocaba saltos al reposo (`y: 0`) al pausar o reanudar.
 */

import { animate, useMotionValue } from 'motion/react'
import { useEffect } from 'react'

import type { BoxData } from '@/shared/components/composites/BackgroundBoxes/types'

import { registerScrollAnimationControls } from '../../../hooks/useScrollAnimationPause'

import type { MotionValue } from 'motion/react'

/** Flotación vertical infinita; la pausa por scroll congela el frame actual sin saltar a 0. */
export function useFloatingBoxFloat(
  box: Pick<BoxData, 'floatAmp' | 'floatDur' | 'floatDelay'>
): MotionValue<number> {
  const floatY = useMotionValue(0)

  useEffect(() => {
    const controls = animate(floatY, [0, -box.floatAmp, 0], {
      duration: box.floatDur,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: 2 + box.floatDelay,
    })

    const unregister = registerScrollAnimationControls({
      pause: () => controls.pause(),
      play: () => controls.play(),
    })

    return () => {
      unregister()
      controls.stop()
    }
  }, [box.floatAmp, box.floatDur, box.floatDelay, floatY])

  return floatY
}
