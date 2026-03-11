import type { ComponentType } from 'react'

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

export interface ViewportConfig {
  count: number
  sizeMin: number
  sizeMax: number
  leftZone: { xMin: number; xMax: number }
  rightZone: { xMin: number; xMax: number }
}
