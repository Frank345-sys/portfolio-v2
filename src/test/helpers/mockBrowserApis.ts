import { vi } from 'vitest'

import { MEDIA_QUERY_LG_MIN } from '@/shared/constants/breakpoints'

export interface MockMatchMediaOptions {
  lgMatches?: boolean
}

function takeNoIntersectionRecords() {
  return []
}

/**
 * Configura window.matchMedia para tests de ProjectsSection y useProjectsScrollSync.
 * Devuelve `{ setMatches }` para simular cambios de breakpoint en tiempo de ejecución.
 */
export function setupMatchMedia(options?: MockMatchMediaOptions) {
  let lgMatches = options?.lgMatches ?? true
  const listeners: Array<(e: MediaQueryListEvent) => void> = []

  const lgMql = {
    get matches() {
      return lgMatches
    },
    media: MEDIA_QUERY_LG_MIN,
    addEventListener: vi.fn(
      (_: string, cb: (e: MediaQueryListEvent) => void) => {
        listeners.push(cb)
      }
    ),
    removeEventListener: vi.fn(),
  }

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => {
      if (query.includes('prefers-reduced-motion')) {
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }
      }

      return lgMql
    }),
  })

  return {
    setMatches(next: boolean) {
      lgMatches = next
      const evt = { matches: next } as MediaQueryListEvent
      for (const cb of listeners) {
        cb(evt)
      }
    },
  }
}

let intersectionObserverCallback: IntersectionObserverCallback | undefined

export function setupIntersectionObserver() {
  intersectionObserverCallback = undefined
  globalThis.IntersectionObserver = class {
    constructor(cb: IntersectionObserverCallback) {
      intersectionObserverCallback = cb
    }
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn(takeNoIntersectionRecords)
    root = null
    rootMargin = ''
    thresholds = []
  } as unknown as typeof IntersectionObserver
}

export function getIntersectionObserverCallback() {
  return intersectionObserverCallback
}
