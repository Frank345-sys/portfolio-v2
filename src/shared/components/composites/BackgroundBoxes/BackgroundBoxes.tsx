/**
 * Pieza de interfaz del portfolio (`BackgroundBoxes`).
 *
 * @fileoverview Implementación del archivo `BackgroundBoxes.tsx` dentro de `shared/components/BackgroundBoxes`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { LAYOUT, Z } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { useBackgroundBoxes } from './hooks/useBackgroundBoxes'
import { FloatingBox } from './subcomponents/FloatingBox/FloatingBox'

import type { BackgroundBoxesProps } from './types'

/**
 * @module shared/components/BackgroundBoxes/BackgroundBoxes
 *
 * Fondo decorativo a pantalla completa: íconos dentro de cajas flotantes animadas y parallax
 * ligado al puntero cuando el viewport cumple el breakpoint `lg` (`min-width` 1024px, `MEDIA_QUERY_LG_MIN`)
 * y el usuario no tiene `prefers-reduced-motion` activo (ver `useBackgroundBoxes`).
 *
 * En cada redimensionamiento de ventana se vuelven a generar posiciones y tamaños de las cajas.
 * Las cajas viven en una lista absoluta detrás; `children` se renderiza en un panel relativo
 * centrado con un leve desenfoque de fondo (`backdrop-blur`).
 *
 * @example
 * ```tsx
 * <BackgroundBoxes className="max-h-[720px]">
 *   <HeroSection />
 * </BackgroundBoxes>
 * ```
 */
export function BackgroundBoxes({ children, className }: BackgroundBoxesProps) {
  const { boxes, parallaxEnabled, mouseX, mouseY } = useBackgroundBoxes()

  return (
    <div className={cn('relative h-screen w-full overflow-hidden', className)}>
      {/* Capa decorativa: oculta a AT y no intercepta puntero */}
      <ul
        className={cn(
          LAYOUT.container.wide,
          'pointer-events-none absolute inset-0 list-none'
        )}
        aria-hidden="true"
      >
        {boxes.map((box) => (
          <FloatingBox
            key={box.id}
            box={box}
            mouseX={mouseX}
            mouseY={mouseY}
            parallaxEnabled={parallaxEnabled}
          />
        ))}
      </ul>
      {/* Contenido encima del fondo */}
      <div
        className={cn(
          'relative flex h-full w-full flex-col items-center justify-center backdrop-blur-[1.5px]',
          Z.raised
        )}
        data-testid="background-boxes-content"
      >
        {children}
      </div>
    </div>
  )
}
