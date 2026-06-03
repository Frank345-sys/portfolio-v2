/**
 * Estado del fondo decorativo: rejilla de cajas según ancho y parallax de puntero en viewports grandes.
 *
 * @fileoverview Regenera cajas al resize (con `requestAnimationFrame`) y enlaza {@link useParallaxMouse} si `lg` y sin movimiento reducido.
 * @remarks El primer render sin `window` usa `SSR_FALLBACK_WIDTH_PX` para dimensionar la rejilla inicial.
 */

import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

import { MEDIA_QUERY_LG_MIN } from '@/shared/constants/breakpoints'
import { useMediaQuery } from '@/shared/hooks'

import { useParallaxMouse } from './useParallaxMouse'
import { generateBoxes } from '../utils/boxGenerator'

import type { BoxData, ParallaxMotionValues } from '../types'

/**
 * Ancho asumido en SSR / entornos sin `window` para el layout inicial de cajas.
 */
const SSR_FALLBACK_WIDTH_PX = 1440

function getInitialBoxes(): BoxData[] {
  return generateBoxes(
    typeof window !== 'undefined' ? window.innerWidth : SSR_FALLBACK_WIDTH_PX
  )
}

interface UseBackgroundBoxesReturn extends ParallaxMotionValues {
  boxes: BoxData[]
  /** `true` si el viewport cumple `lg` y el usuario no pidió movimiento reducido. */
  isLg: boolean
  /** Parallax del puntero activo solo si `isLg` y no hay `prefers-reduced-motion`. */
  parallaxEnabled: boolean
}

/**
 * Estado del fondo decorativo: cajas según ancho de ventana; parallax enlazado a
 * {@link MEDIA_QUERY_LG_MIN} y desactivado con `prefers-reduced-motion: reduce`.
 */
export function useBackgroundBoxes(): UseBackgroundBoxesReturn {
  const isLg = useMediaQuery(MEDIA_QUERY_LG_MIN)
  // Parallax del puntero (no animación Motion): MotionConfig no lo desactiva.
  const prefersReducedMotion = useReducedMotion() ?? false
  const parallaxEnabled = isLg && !prefersReducedMotion
  const { mouseX, mouseY } = useParallaxMouse({ enabled: parallaxEnabled })
  const [boxes, setBoxes] = useState<BoxData[]>(getInitialBoxes)

  useEffect(() => {
    let raf = 0
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setBoxes(generateBoxes(window.innerWidth))
      })
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return { boxes, isLg, parallaxEnabled, mouseX, mouseY }
}
