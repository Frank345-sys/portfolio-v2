import type { ReactNode } from 'react'
import { useBackgroundBoxes } from './hooks/useBackgroundBoxes'
import { FloatingBox } from './subcomponents'
import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

interface BackgroundBoxesProps {
  /** Contenido colocado en la capa superior, centrado sobre el fondo decorativo. */
  children: ReactNode
  /**
   * Clases Tailwind adicionales para el contenedor raíz (`relative`, altura máxima, `overflow`, etc.).
   * Se fusionan con las clases base mediante `cn()`.
   */
  className?: string
}

/**
 * Fondo decorativo a pantalla completa: íconos dentro de cajas flotantes animadas y parallax
 * ligado al movimiento del puntero cuando el viewport cumple el breakpoint `lg` (ver `useBackgroundBoxes`).
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
  const { boxes, isLg, mouseX, mouseY } = useBackgroundBoxes()

  return (
    <div
      className={cn(
        'relative h-screen max-h-[680px] min-h-[640px] w-full overflow-hidden',
        className
      )}
    >
      {/* Cajas flotantes */}
      <ul className={cn(LAYOUT.container.wide, 'absolute inset-0 list-none')}>
        {boxes.map((box) => (
          <FloatingBox
            key={box.id}
            box={box}
            mouseX={mouseX}
            mouseY={mouseY}
            parallaxEnabled={isLg}
          />
        ))}
      </ul>
      {/* Contenido del fondo */}
      <div
        className="relative flex h-full w-full flex-col items-center justify-center backdrop-blur-[1.5px]"
        data-testid="background-boxes-content"
      >
        {children}
      </div>
    </div>
  )
}
