/**
 * Pruebas de `useProjectPreviewCard` — intersección, scroll sync, modal y autoplay.
 *
 * @fileoverview Mock de `useIsIntersecting`; no monta DOM ni `IntersectionObserver`.
 * @remarks Las variantes de `shouldAutoplay` e `isInactiveByScrollSync` viven aquí, no en `ProjectPreviewCard.test.tsx`.
 */

import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  PROJECT_PREVIEW_INTERSECTION_OPTIONS,
  useProjectPreviewCard,
} from './useProjectPreviewCard'

const { useIsIntersectingMock } = vi.hoisted(() => ({
  useIsIntersectingMock: vi.fn<
    (options: unknown) => [{ current: null }, boolean]
  >(() => [{ current: null }, false]),
}))

vi.mock('@/shared/hooks', () => ({
  useIsIntersecting: (options: unknown) => useIsIntersectingMock(options),
}))

const baseParams = {
  scrollSyncEnabled: false,
  activeIndex: 0,
  projectIndex: 0,
  modalProjectIndex: null as number | null,
}

describe('useProjectPreviewCard', () => {
  beforeEach(() => {
    useIsIntersectingMock.mockReturnValue([{ current: null }, false])
  })

  it('delega en useIsIntersecting con PROJECT_PREVIEW_INTERSECTION_OPTIONS', () => {
    renderHook(() => useProjectPreviewCard(baseParams))

    expect(useIsIntersectingMock).toHaveBeenCalledWith(
      PROJECT_PREVIEW_INTERSECTION_OPTIONS
    )
  })

  it('marca inactivo por scroll sync cuando otro proyecto es el activo', () => {
    const { result } = renderHook(() =>
      useProjectPreviewCard({
        ...baseParams,
        scrollSyncEnabled: true,
        activeIndex: 1,
        projectIndex: 0,
      })
    )

    expect(result.current.isInactiveByScrollSync).toBe(true)
    expect(result.current.shouldAutoplay).toBe(false)
  })

  it('shouldAutoplay es true con preview visible, proyecto activo y sin modal en la tarjeta', () => {
    useIsIntersectingMock.mockReturnValue([{ current: null }, true])

    const { result } = renderHook(() => useProjectPreviewCard(baseParams))

    expect(result.current.isInactiveByScrollSync).toBe(false)
    expect(result.current.shouldAutoplay).toBe(true)
  })

  it('shouldAutoplay es false si el preview no intersecta el viewport', () => {
    const { result } = renderHook(() => useProjectPreviewCard(baseParams))

    expect(result.current.shouldAutoplay).toBe(false)
  })

  it('shouldAutoplay es false si el modal está abierto para la misma tarjeta', () => {
    useIsIntersectingMock.mockReturnValue([{ current: null }, true])

    const { result } = renderHook(() =>
      useProjectPreviewCard({
        ...baseParams,
        modalProjectIndex: 0,
      })
    )

    expect(result.current.shouldAutoplay).toBe(false)
  })

  it('shouldAutoplay es false si el proyecto no es el activo aunque sea visible', () => {
    useIsIntersectingMock.mockReturnValue([{ current: null }, true])

    const { result } = renderHook(() =>
      useProjectPreviewCard({
        ...baseParams,
        activeIndex: 1,
        projectIndex: 0,
      })
    )

    expect(result.current.shouldAutoplay).toBe(false)
  })
})
