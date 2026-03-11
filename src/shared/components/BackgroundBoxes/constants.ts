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
import type { ViewportConfig } from './types'

export const OPACITIES = [1, 0.85, 0.7, 0.55, 0.4] as const

export const ICONS = [
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

export const VIEWPORT_CONFIG: Record<
  'mobile-sm' | 'mobile' | 'tablet' | 'desktop',
  ViewportConfig
> = {
  'mobile-sm': {
    count: 14,
    sizeMin: 40,
    sizeMax: 52,
    leftZone: { xMin: 2, xMax: 20 },
    rightZone: { xMin: 68, xMax: 90 },
  },
  mobile: {
    count: 14,
    sizeMin: 52,
    sizeMax: 62,
    leftZone: { xMin: 2, xMax: 22 },
    rightZone: { xMin: 68, xMax: 90 },
  },
  tablet: {
    count: 14,
    sizeMin: 52,
    sizeMax: 68,
    leftZone: { xMin: 1, xMax: 24 },
    rightZone: { xMin: 74, xMax: 96 },
  },
  desktop: {
    count: 14,
    sizeMin: 58,
    sizeMax: 82,
    leftZone: { xMin: 1, xMax: 32 },
    rightZone: { xMin: 66, xMax: 96 },
  },
}
