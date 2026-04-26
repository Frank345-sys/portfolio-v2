import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PROJECTS } from '../constants'
import { useProjectsSection } from '../hooks/useProjectsSection'

/** Misma consulta que `useProjectsScrollSync` / `ProjectsSection.test`. */
const LG_MEDIA = '(min-width: 1024px)'

function mockBrowserForProjectsHooks(options?: { lgMatches?: boolean }) {
  const lgMatches = options?.lgMatches ?? true

  globalThis.IntersectionObserver = class {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn(() => [])
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

  it('expone totales, proyecto activo inicial y lightbox cerrado', () => {
    const { result } = renderHook(() => useProjectsSection(PROJECTS))

    expect(result.current.totalProjects).toBe(PROJECTS.length)
    expect(result.current.activeIndex).toBe(0)
    expect(result.current.activeProject).toEqual(PROJECTS[0])
    expect(result.current.lightboxProjectIndex).toBeNull()
    expect(result.current.lightboxProject).toBeUndefined()
  })

  it('abre y cierra el lightbox con índice de slide', () => {
    const { result } = renderHook(() => useProjectsSection(PROJECTS))

    act(() => {
      result.current.openProjectLightbox(1, 2)
    })

    expect(result.current.lightboxProjectIndex).toBe(1)
    expect(result.current.lightboxSlide).toBe(2)
    expect(result.current.lightboxProject).toEqual(PROJECTS[1])
    expect(result.current.lightboxValidImages).toEqual(
      PROJECTS[1]!.images.filter((u) => u.trim().length > 0)
    )

    act(() => {
      result.current.closeProjectLightbox()
    })

    expect(result.current.lightboxProjectIndex).toBeNull()
  })

  it('setLightboxSlide actualiza el slide del lightbox', () => {
    const { result } = renderHook(() => useProjectsSection(PROJECTS))

    act(() => {
      result.current.openProjectLightbox(0, 0)
    })
    act(() => {
      result.current.setLightboxSlide(3)
    })

    expect(result.current.lightboxSlide).toBe(3)
  })
})
