import { useEffect } from 'react'
import { useMotionValue } from 'motion/react'
import type { MotionValue } from 'motion/react'

/**
 * Valores de movimiento del mouse normalizados (-1..1) para efecto parallax.
 * Usado por `FloatingBox` para desplazar las cajas según la posición del cursor.
 */
export interface UseParallaxMouseReturn {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

/**
 * Hook que expone la posición del mouse normalizada por viewport.
 * Valores en rango [-1, 1] para usar en efectos parallax.
 *
 * @returns Objeto con mouseX y mouseY (MotionValue)
 */
export function useParallaxMouse(): UseParallaxMouseReturn {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return { mouseX, mouseY }
}
