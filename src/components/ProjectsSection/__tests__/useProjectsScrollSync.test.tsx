import { useMemo } from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useProjectsScrollSync } from '../hooks/useProjectsScrollSync'

/** Debe coincidir con `SCROLL_SYNC_MEDIA_QUERY` del hook. */
const LG_MEDIA_QUERY = '(min-width: 1024px)'

let intersectionCallback: IntersectionObserverCallback | undefined

function TestHarness({ itemCount }: { itemCount: number }) {
  const {
    activeIndex,
    showInfo,
    scrollSyncEnabled,
    setItemRef,
    scrollItemIntoView,
  } = useProjectsScrollSync(itemCount)

  const slotKeys = useMemo(
    () =>
      Array.from(
        { length: itemCount },
        (_, position) =>
          `scroll-sync-harness-c${String(itemCount)}-p${String(position)}`
      ),
    [itemCount]
  )

  return (
    <div>
      {slotKeys.map((slotKey, refIndex) => (
        <div
          key={slotKey}
          ref={(el) => {
            setItemRef(refIndex, el)
          }}
          data-project-index={refIndex}
          data-testid={`item-${String(refIndex)}`}
        />
      ))}
      <span data-testid="active-index">{activeIndex}</span>
      <span data-testid="show-info">{String(showInfo)}</span>
      <span data-testid="scroll-sync">{String(scrollSyncEnabled)}</span>
      <button
        type="button"
        data-testid="scroll-first"
        onClick={() => scrollItemIntoView(0)}
      >
        Scroll 0
      </button>
    </div>
  )
}

function setupMatchMedia(initialMatches: boolean) {
  let matches = initialMatches
  const listeners: Array<(e: MediaQueryListEvent) => void> = []
  const mql = {
    get matches() {
      return matches
    },
    media: LG_MEDIA_QUERY,
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
    value: vi.fn(() => mql),
  })

  return {
    setMatches(next: boolean) {
      matches = next
      const evt = { matches: next } as MediaQueryListEvent
      listeners.forEach((cb) => {
        cb(evt)
      })
    },
  }
}

function setupIntersectionObserver() {
  intersectionCallback = undefined
  globalThis.IntersectionObserver = class {
    constructor(cb: IntersectionObserverCallback) {
      intersectionCallback = cb
    }
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn(() => [])
    root = null
    rootMargin = ''
    thresholds = []
  } as unknown as typeof IntersectionObserver
}

function fireIntersection(
  entries: Array<{
    index: number
    ratio: number
    isIntersecting?: boolean
  }>
) {
  const obsEntries = entries.map(({ index, ratio, isIntersecting }) => {
    const target = document.createElement('div')
    target.dataset.projectIndex = String(index)
    return {
      target,
      isIntersecting: isIntersecting ?? ratio > 0,
      intersectionRatio: ratio,
    } as unknown as IntersectionObserverEntry
  })
  act(() => {
    intersectionCallback?.(obsEntries, {} as IntersectionObserver)
  })
}

describe('useProjectsScrollSync', () => {
  const scrollIntoViewMock = vi.fn()

  beforeEach(() => {
    scrollIntoViewMock.mockClear()
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      writable: true,
      value: scrollIntoViewMock,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('en viewport lg inicia con scrollSyncEnabled true y activeIndex 0', () => {
    setupMatchMedia(true)
    setupIntersectionObserver()

    render(<TestHarness itemCount={2} />)

    expect(screen.getByTestId('scroll-sync')).toHaveTextContent('true')
    expect(screen.getByTestId('active-index')).toHaveTextContent('0')
    expect(screen.getByTestId('show-info')).toHaveTextContent('true')
  })

  it('por debajo de lg inicia con scrollSyncEnabled false', () => {
    setupMatchMedia(false)
    setupIntersectionObserver()

    render(<TestHarness itemCount={2} />)

    expect(screen.getByTestId('scroll-sync')).toHaveTextContent('false')
  })

  it('con scroll sync activo elige el slide con mayor intersectionRatio', () => {
    vi.useFakeTimers()
    setupMatchMedia(true)
    setupIntersectionObserver()

    render(<TestHarness itemCount={3} />)

    fireIntersection([
      { index: 0, ratio: 0.3 },
      { index: 1, ratio: 0.85 },
      { index: 2, ratio: 0.2 },
    ])

    expect(screen.getByTestId('show-info')).toHaveTextContent('false')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(screen.getByTestId('active-index')).toHaveTextContent('1')
    expect(screen.getByTestId('show-info')).toHaveTextContent('true')
    vi.useRealTimers()
  })

  it('no actualiza si el índice ganador coincide con el activo', () => {
    vi.useFakeTimers()
    setupMatchMedia(true)
    setupIntersectionObserver()

    render(<TestHarness itemCount={2} />)

    fireIntersection([
      { index: 0, ratio: 0.9 },
      { index: 1, ratio: 0.2 },
    ])

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(screen.getByTestId('active-index')).toHaveTextContent('0')
    expect(screen.getByTestId('show-info')).toHaveTextContent('true')
    vi.useRealTimers()
  })

  it('ignora entries con dataset inválido o índice fuera de rango', () => {
    vi.useFakeTimers()
    setupMatchMedia(true)
    setupIntersectionObserver()

    render(<TestHarness itemCount={2} />)

    act(() => {
      const bad = document.createElement('div')
      intersectionCallback?.(
        [
          {
            target: bad,
            isIntersecting: true,
            intersectionRatio: 1,
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      )
    })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(screen.getByTestId('active-index')).toHaveTextContent('0')
    vi.useRealTimers()
  })

  it('scrollItemIntoView invoca scrollIntoView en el elemento referenciado', async () => {
    setupMatchMedia(false)
    setupIntersectionObserver()

    const user = userEvent.setup()
    render(<TestHarness itemCount={2} />)

    await user.click(screen.getByTestId('scroll-first'))

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'center',
    })
  })

  it('al pasar a viewport móvil fuerza showInfo true', () => {
    vi.useFakeTimers()
    const { setMatches } = setupMatchMedia(true)
    setupIntersectionObserver()

    render(<TestHarness itemCount={2} />)

    fireIntersection([
      { index: 0, ratio: 0.1 },
      { index: 1, ratio: 0.9 },
    ])
    expect(screen.getByTestId('show-info')).toHaveTextContent('false')

    act(() => {
      setMatches(false)
    })

    expect(screen.getByTestId('show-info')).toHaveTextContent('true')
    vi.useRealTimers()
  })

  it('sin scroll sync ajusta activeIndex al ítem más cercano al centro al hacer scroll', () => {
    setupMatchMedia(false)
    setupIntersectionObserver()

    render(<TestHarness itemCount={2} />)

    const item0 = screen.getByTestId('item-0')
    const item1 = screen.getByTestId('item-1')

    vi.spyOn(item0, 'getBoundingClientRect').mockReturnValue({
      top: -100,
      bottom: -20,
      left: 0,
      right: 100,
      width: 100,
      height: 80,
      x: 0,
      y: -100,
      toJSON: () => ({}),
    } as DOMRect)

    vi.spyOn(item1, 'getBoundingClientRect').mockReturnValue({
      top: 350,
      bottom: 450,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 350,
      toJSON: () => ({}),
    } as DOMRect)

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 800,
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(screen.getByTestId('active-index')).toHaveTextContent('1')
  })
})
