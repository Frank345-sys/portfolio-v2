/**
 * Pieza de interfaz del portfolio (`BoxGenerator`).
 *
 * @fileoverview Implementación del archivo `boxGenerator.ts` dentro de `shared/components/BackgroundBoxes/utils`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import {
  BREAKPOINT_MIN_PX,
  VIEWPORT_COMPACT_MAX_PX,
} from '@/shared/constants/breakpoints'
import {
  JsIcon,
  TsIcon,
  HtmlIcon,
  CssIcon,
  ReactIcon,
  NextIcon,
  AstroIcon,
  TailwindIcon,
  BootstrapIcon,
  FramerMotionIcon,
  GitIcon,
  GithubIcon,
  FigmaIcon,
  VsCodeIcon,
} from '@/shared/icons'

import type { BoxData } from '../types'

/**
 * @internal
 *
 * Configuración de layout por breakpoint: zonas izquierda/derecha (porcentajes)
 * y rango de tamaño de las cajas. Usado en `VIEWPORT_CONFIG`.
 */
interface ViewportConfig {
  count: number
  sizeMin: number
  sizeMax: number
  leftZone: { xMin: number; xMax: number }
  rightZone: { xMin: number; xMax: number }
}

/** Iconos asignados cíclicamente a cada caja (14 cajas, 14 iconos). */
const ICONS = [
  JsIcon,
  TsIcon,
  HtmlIcon,
  CssIcon,
  ReactIcon,
  NextIcon,
  AstroIcon,
  TailwindIcon,
  BootstrapIcon,
  FramerMotionIcon,
  GitIcon,
  GithubIcon,
  FigmaIcon,
  VsCodeIcon,
] as const

/**
 * Configuración de layout por breakpoint (mobile-sm, mobile, tablet, desktop).
 * Define zonas izquierda/derecha en % y rango de tamaño de cajas.
 */
const VIEWPORT_CONFIG: Record<
  'mobile-sm' | 'mobile' | 'tablet' | 'desktop',
  ViewportConfig
> = {
  'mobile-sm': {
    count: 14,
    sizeMin: 40,
    sizeMax: 52,
    leftZone: { xMin: 3, xMax: 19 },
    rightZone: { xMin: 71, xMax: 89 },
  },
  mobile: {
    count: 14,
    sizeMin: 52,
    sizeMax: 62,
    leftZone: { xMin: 3, xMax: 21 },
    rightZone: { xMin: 71, xMax: 89 },
  },
  tablet: {
    count: 14,
    sizeMin: 52,
    sizeMax: 68,
    leftZone: { xMin: 2, xMax: 22 },
    rightZone: { xMin: 76, xMax: 94 },
  },
  desktop: {
    count: 14,
    sizeMin: 58,
    sizeMax: 82,
    leftZone: { xMin: 2, xMax: 28 },
    rightZone: { xMin: 72, xMax: 92 },
  },
}

/** Opacidades disponibles para las cajas (determinista por seededRand). */
const OPACITIES = [1, 0.9, 0.8, 0.7, 0.6] as const

/**
 * Número fijo de `FloatingBox` (7 a la izquierda, 7 a la derecha).
 */
export const FLOATING_BOX_COUNT = 14

function seededRand(i: number, salt = 0): number {
  const x = Math.sin(i * 127.1 + salt * 311.7 + 43758.5453) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Determina el breakpoint activo según el ancho del viewport.
 * Umbrales alineados con `VIEWPORT_COMPACT_MAX_PX` y `BREAKPOINT_MIN_PX` (`md`, `lg`).
 *
 * @param width - Ancho del viewport en píxeles
 * @returns Clave del breakpoint: 'mobile-sm' | 'mobile' | 'tablet' | 'desktop'
 */
export function getViewportKey(
  width: number
): 'mobile-sm' | 'mobile' | 'tablet' | 'desktop' {
  if (width < VIEWPORT_COMPACT_MAX_PX) return 'mobile-sm'
  if (width < BREAKPOINT_MIN_PX.md) return 'mobile'
  if (width < BREAKPOINT_MIN_PX.lg) return 'tablet'
  return 'desktop'
}

/**
 * Genera un array determinista de 14 BoxData distribuidas simétricamente
 * (7 a la izquierda, 7 a la derecha) según el breakpoint activo.
 * @param viewportWidth - Ancho del viewport en píxeles
 * @returns Array de 14 BoxData listas para renderizar
 */
export function generateBoxes(viewportWidth: number): BoxData[] {
  const key = getViewportKey(viewportWidth)
  const cfg: ViewportConfig = VIEWPORT_CONFIG[key]
  const half = FLOATING_BOX_COUNT / 2

  // Rango vertical compacto y centrado para que las cajas no se vean tan dispersas.
  const totalRange = 82
  const stripeHeight = totalRange / half
  const topMargin = (100 - totalRange) / 2
  // Desplaza el bloque completo hacia abajo (top en %).
  const verticalOffset = 2

  const leftYPositions = Array.from({ length: half }, (_, i) => {
    const r = (salt: number) => seededRand(i, salt)
    const stripeStart = topMargin + i * stripeHeight + verticalOffset
    // Menos variación dentro de cada franja para evitar separación excesiva.
    return stripeStart + r(2) * stripeHeight * 0.58
  })

  return Array.from({ length: FLOATING_BOX_COUNT }, (_, i) => {
    const r = (salt: number) => seededRand(i, salt)
    const isLeft = i < half
    const mirrorIndex = isLeft ? i : i - half

    const zone = isLeft ? cfg.leftZone : cfg.rightZone
    const x = zone.xMin + r(1) * (zone.xMax - zone.xMin)
    const y = leftYPositions[mirrorIndex]!

    const opacityIndex = Math.floor(r(4) * OPACITIES.length)
    const opacity: number =
      OPACITIES[Math.min(opacityIndex, OPACITIES.length - 1)] ?? 1
    const Icon = ICONS[i % ICONS.length]!

    const maxFloatAmp =
      key === 'mobile-sm'
        ? 4
        : key === 'mobile'
          ? 6
          : key === 'tablet'
            ? 10
            : 16

    return {
      id: i,
      x,
      y,
      size: cfg.sizeMin + Math.floor(r(3) * (cfg.sizeMax - cfg.sizeMin)),
      opacity,
      depth: (r(5) - 0.5) * 1.2,
      floatAmp: 4 + r(6) * maxFloatAmp,
      floatDur: 3 + r(7) * 3.5,
      floatDelay: r(8) * 5,
      fromLeft: isLeft,
      Icon,
    }
  })
}
