/**
 * Bandas de viewport para el layout de {@link BackgroundBoxes} (`sm` / `md` / `lg`).
 *
 * @fileoverview Resuelve la banda activa según ancho de ventana para `boxGenerator.ts`.
 * @remarks Umbrales importados de {@link BREAKPOINT_MIN_PX}; solo consume este composite.
 */

import { BREAKPOINT_MIN_PX } from '@/shared/constants/breakpoints'

export const BACKGROUND_BOXES_VIEWPORT_TIER = {
  /** Ancho menor que `md` (768px): sin prefijo `md:` (incluye default y `sm:`). */
  SM: 'sm',
  /** Desde `md` hasta antes de `lg` (1024px). */
  MD: 'md',
  /** Ancho mayor o igual que `lg` (1024px). */
  LG: 'lg',
} as const

export type BackgroundBoxesViewportTier =
  (typeof BACKGROUND_BOXES_VIEWPORT_TIER)[keyof typeof BACKGROUND_BOXES_VIEWPORT_TIER]

export function getBackgroundBoxesViewportTier(
  width: number
): BackgroundBoxesViewportTier {
  if (width < BREAKPOINT_MIN_PX.md) return BACKGROUND_BOXES_VIEWPORT_TIER.SM
  if (width < BREAKPOINT_MIN_PX.lg) return BACKGROUND_BOXES_VIEWPORT_TIER.MD
  return BACKGROUND_BOXES_VIEWPORT_TIER.LG
}
