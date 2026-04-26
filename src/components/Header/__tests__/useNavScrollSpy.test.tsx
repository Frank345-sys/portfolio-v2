import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { DEFAULT_NAV_ITEMS } from '../constants'
import { useNavScrollSpy } from '../hooks'

function makeIoEntry(
  target: HTMLElement,
  opts: { isIntersecting: boolean; intersectionRatio?: number }
): IntersectionObserverEntry {
  const rect = target.getBoundingClientRect()
  return {
    boundingClientRect: rect,
    intersectionRect: rect,
    intersectionRatio: opts.intersectionRatio ?? (opts.isIntersecting ? 1 : 0),
    isIntersecting: opts.isIntersecting,
    rootBounds: null,
    target,
    time: performance.now(),
  }
}

describe('useNavScrollSpy', () => {
  type IoCallback = IntersectionObserverCallback

  let storedCallback: IoCallback | null = null
  let observed: Element[] = []

  beforeEach(() => {
    storedCallback = null
    observed = []
    globalThis.IntersectionObserver = vi.fn(function MockIo(
      this: unknown,
      cb: IoCallback
    ) {
      storedCallback = cb
      return {
        observe: vi.fn((el: Element) => {
          observed.push(el)
        }),
        unobserve: vi.fn(),
        disconnect: vi.fn(() => {
          observed = []
        }),
        takeRecords: () => [],
        root: null,
        rootMargin: '',
        thresholds: [],
      }
    }) as unknown as typeof IntersectionObserver
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  function TestHarness() {
    const active = useNavScrollSpy(DEFAULT_NAV_ITEMS)
    return (
      <div>
        <div id="inicio" data-testid="sec-inicio" style={{ height: 400 }} />
        <div id="sobre-mi" data-testid="sec-sobre" style={{ height: 400 }} />
        <div
          id="proyectos"
          data-testid="sec-proyectos"
          style={{ height: 400 }}
        />
        <span data-testid="active">{active ?? 'none'}</span>
      </div>
    )
  }

  it('marca el último href en orden de nav que intersecta', () => {
    render(<TestHarness />)
    expect(typeof storedCallback).toBe('function')
    expect(observed).toHaveLength(3)

    const sections = {
      inicio: screen.getByTestId('sec-inicio'),
      sobre: screen.getByTestId('sec-sobre'),
      proyectos: screen.getByTestId('sec-proyectos'),
    }

    act(() => {
      storedCallback!(
        [
          makeIoEntry(sections.inicio, {
            isIntersecting: true,
            intersectionRatio: 0.5,
          }),
        ],
        {} as IntersectionObserver
      )
    })
    expect(screen.getByTestId('active')).toHaveTextContent('#inicio')

    act(() => {
      storedCallback!(
        [
          makeIoEntry(sections.sobre, {
            isIntersecting: true,
            intersectionRatio: 0.3,
          }),
        ],
        {} as IntersectionObserver
      )
    })
    expect(screen.getByTestId('active')).toHaveTextContent('#sobre-mi')

    act(() => {
      storedCallback!(
        [
          makeIoEntry(sections.proyectos, {
            isIntersecting: true,
            intersectionRatio: 0.2,
          }),
        ],
        {} as IntersectionObserver
      )
    })
    expect(screen.getByTestId('active')).toHaveTextContent('#proyectos')
  })

  it('si ninguna intersecta, el activo pasa a null', () => {
    render(<TestHarness />)
    const inicio = screen.getByTestId('sec-inicio')

    act(() => {
      storedCallback!(
        [makeIoEntry(inicio, { isIntersecting: true })],
        {} as IntersectionObserver
      )
    })
    expect(screen.getByTestId('active')).toHaveTextContent('#inicio')

    act(() => {
      storedCallback!(
        [makeIoEntry(inicio, { isIntersecting: false })],
        {} as IntersectionObserver
      )
    })
    expect(screen.getByTestId('active')).toHaveTextContent('none')
  })
})
