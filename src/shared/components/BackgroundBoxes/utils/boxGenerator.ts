import type { BoxData, ViewportConfig } from '../types'
import { OPACITIES, ICONS, VIEWPORT_CONFIG } from '../constants'

/**
 * Número fijo de `FloatingBox` (7 a la izquierda, 7 a la derecha).
 */
export const FLOATING_BOX_COUNT = 14

/** Función interna determinista — no exportar */
function seededRand(i: number, salt = 0): number {
  const x = Math.sin(i * 127.1 + salt * 311.7 + 43758.5453) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Determina el breakpoint activo según el ancho del viewport.
 * @param width - Ancho del viewport en píxeles
 * @returns Clave del breakpoint: 'mobile-sm' | 'mobile' | 'tablet' | 'desktop'
 */
export function getViewportKey(
  width: number
): 'mobile-sm' | 'mobile' | 'tablet' | 'desktop' {
  if (width < 480) return 'mobile-sm'
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
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
