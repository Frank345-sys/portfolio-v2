import { useMotionValue } from 'motion/react'
import { useEffect } from 'react'

import type { MotionValue } from 'motion/react'

/**
 * Valores de movimiento del mouse normalizados (-1..1) para efecto parallax.
 * Usado por `FloatingBox` para desplazar las cajas según la posición del cursor.
 */
interface UseParallaxMouseReturn {
  /** Posición horizontal normalizada del cursor respecto al ancho del viewport ([-1, 1]). */
  mouseX: MotionValue<number>
  /** Posición vertical normalizada del cursor respecto al alto del viewport ([-1, 1]). */
  mouseY: MotionValue<number>
}

interface UseParallaxMouseOptions {
  /**
   * Si es `false`, no se registran listeners de `mousemove` y los valores permanecen en 0.
   * Útil en viewports estrechos o táctiles (`BackgroundBoxes` lo enlaza con `useMediaQuery(lg)`).
   * @defaultValue true
   */
  enabled?: boolean
}

/**
 * Expone la posición del mouse normalizada por viewport para parallax (`FloatingBox`).
 */
export function useParallaxMouse(
  options: UseParallaxMouseOptions = {}
): UseParallaxMouseReturn {
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
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [enabled, mouseX, mouseY])

  return { mouseX, mouseY }
}
