/**
 * Estado del fondo decorativo: rejilla de cajas según ancho y parallax de puntero en viewports grandes.
 *
 * @fileoverview Regenera cajas al resize y enlaza parallax si `lg` y sin scroll activo.
 * @remarks El primer render sin `window` usa `SSR_FALLBACK_WIDTH_PX` para dimensionar la rejilla inicial.
 * `prefers-reduced-motion` lo resuelve {@link useParallaxMouse}; las animaciones Motion las atenúa `MotionConfig` en App.
 */

import { useEffect, useState } from 'react'

import { MEDIA_QUERY_LG_MIN } from '@/shared/constants/breakpoints'
import { useMediaQuery } from '@/shared/hooks'

import { useParallaxMouse } from './useParallaxMouse'
import { useScrollAnimationPause } from './useScrollAnimationPause'
import { generateBoxes } from '../utils/boxGenerator'

import type { BoxData, ParallaxMotionValues } from '../types'

const SSR_FALLBACK_WIDTH_PX = 1440 as const

function getInitialBoxes(): BoxData[] {
  const width =
    typeof window !== 'undefined' ? window.innerWidth : SSR_FALLBACK_WIDTH_PX
  return generateBoxes(width)
}

interface UseBackgroundBoxesReturn extends ParallaxMotionValues {
  boxes: BoxData[]
  parallaxEnabled: boolean
}

/** Cajas decorativas según ancho de ventana; parallax activo solo en `lg` sin scroll. */
export function useBackgroundBoxes(): UseBackgroundBoxesReturn {
  const isLg = useMediaQuery(MEDIA_QUERY_LG_MIN)
  const animationsPaused = useScrollAnimationPause()
  const {
    mouseX,
    mouseY,
    parallaxActive: parallaxEnabled,
  } = useParallaxMouse({ enabled: isLg && !animationsPaused })
  const [boxes, setBoxes] = useState<BoxData[]>(getInitialBoxes)

  useEffect(() => {
    const onResize = () => setBoxes(generateBoxes(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return { boxes, parallaxEnabled, mouseX, mouseY }
}
