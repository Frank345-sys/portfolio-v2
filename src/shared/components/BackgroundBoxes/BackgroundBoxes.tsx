import { useEffect, useState } from 'react'
import type { BoxData } from './types'
import { generateBoxes } from './utils'
import { useParallaxMouse } from './hooks/useParallaxMouse'
import { FloatingBox } from './subcomponents/FloatingBox'
import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
export interface BackgroundBoxesProps {
  /** Contenido a renderizar centrado sobre el fondo de cajas flotantes */
  children?: React.ReactNode
}

/**
 * Fondo animado con cajas flotantes distribuidas simétricamente
 * a los laterales del viewport. Reacciona al movimiento del mouse
 * con efecto parallax y se adapta a cambios de tamaño de pantalla.
 *
 * @param props - `children` opcional centrado sobre el fondo.
 * @returns {JSX.Element} Contenedor a pantalla completa con lista de `FloatingBox` y slot de contenido.
 * @example
 * ```tsx
 * <BackgroundBoxes>
 *   <HeroSection />
 * </BackgroundBoxes>
 * ```
 */
export function BackgroundBoxes({ children }: BackgroundBoxesProps) {
  const { mouseX, mouseY } = useParallaxMouse()
  const [boxes, setBoxes] = useState<BoxData[]>(() =>
    typeof window !== 'undefined'
      ? generateBoxes(window.innerWidth)
      : generateBoxes(1440)
  )

  useEffect(() => {
    const onResize = () => {
      setBoxes(generateBoxes(window.innerWidth))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div
      className={
        'bg-bg-white relative h-screen max-h-[680px] min-h-[640px] w-full overflow-hidden'
      }
    >
      {/* Cajas flotantes */}
      <ul className={cn(LAYOUT.container.wide, 'absolute inset-0 list-none')}>
        {boxes.map((box) => (
          <FloatingBox key={box.id} box={box} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </ul>
      {/* Contenido del fondo */}
      <div
        className={cn(
          LAYOUT.flex.center,
          'relative h-full flex-col backdrop-blur-[1.5px]'
        )}
        data-testid="background-boxes-content"
      >
        {children}
      </div>
    </div>
  )
}
