/**
 * Tests para `backgroundBoxesViewportTier.ts`.
 *
 * @fileoverview Suite Vitest que valida la resolución de bandas `sm` / `md` / `lg` por ancho.
 * @remarks Umbrales alineados con {@link BREAKPOINT_MIN_PX} en `@/shared/constants/breakpoints`.
 */

import { describe, it, expect } from 'vitest'

import {
  BACKGROUND_BOXES_VIEWPORT_TIER,
  getBackgroundBoxesViewportTier,
} from './backgroundBoxesViewportTier'

describe('getBackgroundBoxesViewportTier', () => {
  it('retorna sm para width < 768', () => {
    expect(getBackgroundBoxesViewportTier(320)).toBe(
      BACKGROUND_BOXES_VIEWPORT_TIER.SM
    )
    expect(getBackgroundBoxesViewportTier(767)).toBe(
      BACKGROUND_BOXES_VIEWPORT_TIER.SM
    )
  })

  it('retorna md para 768 <= width < 1024', () => {
    expect(getBackgroundBoxesViewportTier(768)).toBe(
      BACKGROUND_BOXES_VIEWPORT_TIER.MD
    )
    expect(getBackgroundBoxesViewportTier(1023)).toBe(
      BACKGROUND_BOXES_VIEWPORT_TIER.MD
    )
  })

  it('retorna lg para width >= 1024', () => {
    expect(getBackgroundBoxesViewportTier(1024)).toBe(
      BACKGROUND_BOXES_VIEWPORT_TIER.LG
    )
    expect(getBackgroundBoxesViewportTier(1440)).toBe(
      BACKGROUND_BOXES_VIEWPORT_TIER.LG
    )
  })
})
