/**
 * Pruebas de `useProjectsSection` — datos de carrusel, modal, slides y mocks de viewport `lg`.
 *
 * @fileoverview `renderHook` con `PROJECTS` reales, `getValidUrls` sin mock y entorno `IntersectionObserver` / `matchMedia` alineado a Proyectos.
 * @remarks No monta la sección completa; valida totales, índice activo, modal y `handleSlideChange` con scroll sync simulado.
 */

import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getValidUrls } from '@/shared/utils/getValidUrls'

import { PROJECTS } from '../../constants/projects'
import { useProjectsSection } from '../useProjectsSection'

/** Misma consulta que `useProjectsScrollSync` / `ProjectsSection.test`. */
const LG_MEDIA = '(min-width: 1024px)'
function takeNoIntersectionRecords() {
  return []
}

function mockBrowserForProjectsHooks(options?: { lgMatches?: boolean }) {
  const lgMatches = options?.lgMatches ?? true

  globalThis.IntersectionObserver = class {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn(takeNoIntersectionRecords)
    root = null
    rootMargin = ''
    thresholds = []
  } as unknown as typeof IntersectionObserver

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => {
      if (query.includes('prefers-reduced-motion')) {
        return {
          matches: false,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        } as unknown as MediaQueryList
      }
      return {
        get matches() {
          return query === LG_MEDIA ? lgMatches : false
        },
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as MediaQueryList
    }),
  })
}

describe('useProjectsSection', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    mockBrowserForProjectsHooks()
  })

  it('expone totales, proyecto activo inicial y modal cerrado', () => {
    const { result } = renderHook(() => useProjectsSection(PROJECTS))

    expect(result.current.data.totalProjects).toBe(PROJECTS.length)
    expect(result.current.data.activeIndex).toBe(0)
    expect(result.current.data.activeProject).toMatchObject(PROJECTS[0]!)
    expect(result.current.data.activeProject?.slides).toEqual(
      getValidUrls(PROJECTS[0]!.images)
    )
    expect(result.current.modal.index).toBeNull()
    expect(result.current.modal.project).toBeUndefined()
  })

  it('abre y cierra el modal con índice de slide', () => {
    const { result } = renderHook(() => useProjectsSection(PROJECTS))

    act(() => {
      result.current.modal.open(1, 2)
    })

    expect(result.current.modal.index).toBe(1)
    expect(result.current.modal.slide).toBe(2)
    expect(result.current.modal.project).toMatchObject(PROJECTS[1]!)
    expect(result.current.modal.project?.slides).toEqual(
      getValidUrls(PROJECTS[1]!.images)
    )

    act(() => {
      result.current.modal.close()
    })

    expect(result.current.modal.index).toBeNull()
  })

  it('setModalSlide actualiza el slide del modal', () => {
    const { result } = renderHook(() => useProjectsSection(PROJECTS))

    act(() => {
      result.current.modal.open(0, 0)
    })
    act(() => {
      result.current.modal.setSlide(3)
    })

    expect(result.current.modal.slide).toBe(3)
  })

  it('debajo de lg expone el mismo project del modal cuando está abierto', () => {
    mockBrowserForProjectsHooks({ lgMatches: false })
    const { result } = renderHook(() => useProjectsSection(PROJECTS))

    act(() => {
      result.current.modal.open(0, 2)
    })

    expect(result.current.ui.scrollSyncEnabled).toBe(false)
    expect(result.current.modal.index).toBe(0)
    expect(result.current.modal.slide).toBe(2)
    expect(result.current.modal.project).toMatchObject(PROJECTS[0]!)
    expect(result.current.modal.project?.slides).toEqual(
      getValidUrls(PROJECTS[0]!.images)
    )
  })

  it('al cerrar el modal persiste el slide activo para la tarjeta', () => {
    const { result } = renderHook(() => useProjectsSection(PROJECTS))

    act(() => {
      result.current.modal.open(0, 0)
    })
    act(() => {
      result.current.modal.setSlide(2)
    })
    act(() => {
      result.current.modal.close()
    })

    expect(result.current.modal.index).toBeNull()
    expect(result.current.carousel.getSlideIndex(0)).toBe(2)
  })

  it('handleSlideChange con modal abierto actualiza modalSlide', () => {
    const { result } = renderHook(() => useProjectsSection(PROJECTS))

    act(() => {
      result.current.modal.open(0, 1)
    })
    act(() => {
      result.current.carousel.handleSlideChange(0, 4)
    })

    expect(result.current.modal.slide).toBe(4)
  })

  it('handleSlideChange sin modal abierto guarda el slide por proyecto', () => {
    const { result } = renderHook(() => useProjectsSection(PROJECTS))

    act(() => {
      result.current.carousel.handleSlideChange(1, 3)
    })

    expect(result.current.carousel.getSlideIndex(1)).toBe(3)
  })
})
