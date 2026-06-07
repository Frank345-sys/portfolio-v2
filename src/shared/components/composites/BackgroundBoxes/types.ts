/**
 * Tipos TypeScript del submódulo «BackgroundBoxes».
 *
 * @fileoverview Contratos compartidos entre componentes, hooks y constantes del mismo directorio.
 * @remarks Mantener alineado con las props públicas re-exportadas en los `index.ts` del feature.
 */

import type { MotionValue } from 'motion/react'
import type { ComponentType, ReactNode, SVGProps } from 'react'

/**
 * Datos de una caja flotante: posición (%), tamaño, opacidad, parámetros
 * de animación e ícono. Generada por `generateBoxes` y consumida por `FloatingBox`.
 */
export interface BoxData {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  depth: number
  floatAmp: number
  floatDur: number
  floatDelay: number
  fromLeft: boolean
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

/**
 * Valores Motion del puntero normalizados (típicamente [-1, 1]) para parallax.
 * Base compartida por `useParallaxMouse`, `useBackgroundBoxes` y `FloatingBox`.
 * @internal — no exportar; usar tipos derivados (`UseParallaxMouseReturn`, etc.).
 */
export interface ParallaxMotionValues {
  /** Posición horizontal normalizada respecto al ancho del viewport ([-1, 1]). */
  mouseX: MotionValue<number>
  /** Posición vertical normalizada respecto al alto del viewport ([-1, 1]). */
  mouseY: MotionValue<number>
}

/** Retorno de `useParallaxMouse`: valores Motion y si el listener de puntero está activo. */
export interface UseParallaxMouseReturn extends ParallaxMotionValues {
  /** `true` solo si `enabled` y no hay `prefers-reduced-motion` (parallax decorativo off). */
  parallaxActive: boolean
}

/**
 * Props de `FloatingBox`: una caja generada más el estado Motion de parallax.
 */
export interface FloatingBoxProps extends ParallaxMotionValues {
  /** Posición, profundidad e ícono SVG de esta caja (generado por `generateBoxes`). */
  box: BoxData
  /**
   * Si es `false`, no se enlazan `mouseX`/`mouseY` al offset (viewport &lt; `lg`, movimiento reducido, scroll activo, etc.).
   * La flotación vertical se pausa en el listener de scroll vía registro interno, no por esta prop.
   * @defaultValue true
   */
  parallaxEnabled?: boolean
}

/**
 * Props del contenedor `BackgroundBoxes`: capa decorativa + `children` sobre el blur.
 */
export interface BackgroundBoxesProps {
  /** Contenido colocado en la capa superior, centrado sobre el fondo decorativo. */
  children: ReactNode
  /**
   * Clases Tailwind adicionales para el contenedor raíz (`relative`, altura máxima, `overflow`, etc.).
   * Se fusionan con las clases base mediante `cn()`.
   */
  className?: string
}
