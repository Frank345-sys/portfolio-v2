/**
 * Pruebas de `useIsIntersecting` — `IntersectionObserver`, ref al DOM y estado `isIntersecting`.
 *
 * @fileoverview Harness con `div` referenciado; dispara manualmente el callback del observer mockeado.
 * @remarks Dispara el callback del observer mockeado; verifica opciones y `disconnect` al desmontar.
 */

import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  useIsIntersecting,
  type UseIsIntersectingOptions,
} from '../useIsIntersecting'

import type { Ref } from 'react'

let observerOptions: IntersectionObserverInit | undefined
let intersectionObserverCallback: IntersectionObserverCallback | undefined
const disconnectSpy = vi.fn()

function takeNoIntersectionRecords() {
  return []
}

function installIntersectionObserverMock() {
  observerOptions = undefined
  intersectionObserverCallback = undefined
  disconnectSpy.mockClear()

  globalThis.IntersectionObserver = class {
    constructor(
      cb: IntersectionObserverCallback,
      options?: IntersectionObserverInit
    ) {
      intersectionObserverCallback = cb
      observerOptions = options
    }

    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = disconnectSpy
    takeRecords = vi.fn(takeNoIntersectionRecords)
    root = null
    rootMargin = ''
    thresholds = []
  } as unknown as typeof IntersectionObserver
}

function fireIntersection(isIntersecting: boolean) {
  act(() => {
    intersectionObserverCallback?.(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    )
  })
}

function Harness({ options }: { options?: UseIsIntersectingOptions }) {
  const [ref, isIntersecting] = useIsIntersecting(options)

  return (
    <div ref={ref as Ref<HTMLDivElement | null>} data-testid="visible">
      {String(isIntersecting)}
    </div>
  )
}

describe('useIsIntersecting', () => {
  const ioReserve = globalThis.IntersectionObserver

  beforeEach(() => {
    installIntersectionObserverMock()
  })

  afterEach(() => {
    globalThis.IntersectionObserver = ioReserve
    vi.restoreAllMocks()
  })

  it('empieza con isIntersecting en false', () => {
    render(<Harness />)
    expect(screen.getByTestId('visible')).toHaveTextContent('false')
  })

  it('actualiza a true cuando el observer reporta intersección', () => {
    render(<Harness />)
    fireIntersection(true)
    expect(screen.getByTestId('visible')).toHaveTextContent('true')
  })

  it('vuelve a false cuando el observer reporta que ya no intersecta', () => {
    render(<Harness />)
    fireIntersection(true)
    fireIntersection(false)
    expect(screen.getByTestId('visible')).toHaveTextContent('false')
  })

  it('ignora entradas vacías del callback', () => {
    render(<Harness />)
    act(() => {
      intersectionObserverCallback?.([], {} as IntersectionObserver)
    })
    expect(screen.getByTestId('visible')).toHaveTextContent('false')
  })

  it('pasa threshold y rootMargin al IntersectionObserver', () => {
    render(<Harness options={{ threshold: 0.25, rootMargin: '10px' }} />)
    expect(observerOptions).toEqual({ threshold: 0.25, rootMargin: '10px' })
  })

  it('usa valores por defecto cuando no se pasan opciones', () => {
    render(<Harness />)
    expect(observerOptions).toEqual({ threshold: 0, rootMargin: '0px' })
  })

  it('desconecta el observer al desmontar', () => {
    const { unmount } = render(<Harness />)
    unmount()
    expect(disconnectSpy).toHaveBeenCalledTimes(1)
  })

  it('recrea el observer si cambian las opciones', () => {
    const { rerender } = render(<Harness options={{ threshold: 0 }} />)
    expect(observerOptions?.threshold).toBe(0)

    rerender(<Harness options={{ threshold: 0.5 }} />)
    expect(disconnectSpy).toHaveBeenCalled()
    expect(observerOptions?.threshold).toBe(0.5)
  })
})
