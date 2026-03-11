import type { ComponentType } from 'react'

/**
 * Datos de una caja flotante: posición (%), tamaño, opacidad, parámetros
 * de animación e icono. Generada por `generateBoxes` y consumida por `FloatingBox`.
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
  Icon: ComponentType
}

/**
 * Configuración de layout por breakpoint: zonas izquierda/derecha (porcentajes)
 * y rango de tamaño de las cajas. Usado en `VIEWPORT_CONFIG`.
 */
export interface ViewportConfig {
  count: number
  sizeMin: number
  sizeMax: number
  leftZone: { xMin: number; xMax: number }
  rightZone: { xMin: number; xMax: number }
}
