import { useEffect, useState } from 'react'
import type { BoxData } from '../types'
import { generateBoxes } from '../utils'
import { useParallaxMouse } from './useParallaxMouse'
import { MEDIA_QUERY_LG_MIN } from '@/shared/constants/breakpoints'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'

/**
 * Ancho asumido en SSR / entornos sin `window` para el layout inicial de cajas.
 */
const FALLBACK_INNER_WIDTH_PX = 1440

interface UseBackgroundBoxesReturn extends ReturnType<typeof useParallaxMouse> {
  /** Posiciones y metadatos de cada caja flotante (regeneradas en `resize`). */
  boxes: BoxData[]
  /** `true` cuando el viewport cumple `lg` (parallax activo). */
  isLg: boolean
}

/**
 * Estado del fondo decorativo: cajas según ancho de ventana, parallax enlazado a `lg`.
 */
export function useBackgroundBoxes(): UseBackgroundBoxesReturn {
  const isLg = useMediaQuery(MEDIA_QUERY_LG_MIN)
  const { mouseX, mouseY } = useParallaxMouse({ enabled: isLg })
  const [boxes, setBoxes] = useState<BoxData[]>(() =>
    typeof window !== 'undefined'
      ? generateBoxes(window.innerWidth)
      : generateBoxes(FALLBACK_INNER_WIDTH_PX)
  )

  useEffect(() => {
    const onResize = () => {
      setBoxes(generateBoxes(window.innerWidth))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return { boxes, isLg, mouseX, mouseY }
}
