/**
 * Pruebas de `useNavScrollSpy` — criterio «último en orden de nav que intersecta» y callbacks sintéticos de IO.
 *
 * @fileoverview Harness con secciones `#id` alineadas a `DEFAULT_NAV_ITEMS`; inyecta `IntersectionObserverEntry` sin layout real.
 * @remarks Drawer y `lg` se cubren en `useHeader.test.tsx`; `aria-current` desktop en `Header.test.tsx`.
 */

import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { makeIoEntry } from '@/test/helpers'

import {
  DEFAULT_NAV_ITEMS,
  SECTION_ANCHOR_ID,
  sectionHref,
} from '../../constants/navigation'
import { useNavScrollSpy } from '../useNavScrollSpy'

/**
 * {@link useNavScrollSpy} — callbacks de `IntersectionObserver` y orden “último ítem intersectando”.
 *
 * El harness monta cuatro `#id` alineados con {@link DEFAULT_NAV_ITEMS}
 * (inicio, sobre mí, proyectos y contacto).
 *
 * Estado de drawer, `lg` y `window.scroll`: `useHeader.test.tsx`.
 * `aria-current` en la nav desktop (Motion + DOM real): `Header.test.tsx`.
 */
describe('useNavScrollSpy', () => {
  type IoCallback = IntersectionObserverCallback

  // Captura el callback del IO para dispararlo manualmente en cada it.
  let storedCallback: IoCallback | null = null
  // Registra los elementos observados — útil para verificar cardinalidad de secciones.
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

  /**
   * Harness mínimo que monta `useNavScrollSpy` con las cuatro secciones del portfolio
   * y expone `activeHref` en `data-testid="active"` para assertions.
   */
  function TestHarness() {
    const active = useNavScrollSpy(DEFAULT_NAV_ITEMS)
    return (
      <div>
        <div
          id={SECTION_ANCHOR_ID.inicio}
          data-testid="sec-inicio"
          style={{ height: 400 }}
        />
        <div
          id={SECTION_ANCHOR_ID.sobreMi}
          data-testid="sec-sobre"
          style={{ height: 400 }}
        />
        <div
          id={SECTION_ANCHOR_ID.proyectos}
          data-testid="sec-proyectos"
          style={{ height: 400 }}
        />
        <div
          id={SECTION_ANCHOR_ID.contacto}
          data-testid="sec-contacto"
          style={{ height: 400 }}
        />
        <span data-testid="active">{active ?? 'none'}</span>
      </div>
    )
  }

  it('marca el último href en orden de nav que intersecta', async () => {
    render(<TestHarness />)
    await act(async () => {
      await Promise.resolve()
    })
    expect(typeof storedCallback).toBe('function')
    expect(observed).toHaveLength(4)

    const sections = {
      inicio: screen.getByTestId('sec-inicio'),
      sobre: screen.getByTestId('sec-sobre'),
      proyectos: screen.getByTestId('sec-proyectos'),
      contacto: screen.getByTestId('sec-contacto'),
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
    expect(screen.getByTestId('active')).toHaveTextContent(
      sectionHref(SECTION_ANCHOR_ID.inicio)
    )

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
    expect(screen.getByTestId('active')).toHaveTextContent(
      sectionHref(SECTION_ANCHOR_ID.sobreMi)
    )

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
    expect(screen.getByTestId('active')).toHaveTextContent(
      sectionHref(SECTION_ANCHOR_ID.proyectos)
    )

    act(() => {
      storedCallback!(
        [
          makeIoEntry(sections.contacto, {
            isIntersecting: true,
            intersectionRatio: 0.25,
          }),
        ],
        {} as IntersectionObserver
      )
    })
    expect(screen.getByTestId('active')).toHaveTextContent(
      sectionHref(SECTION_ANCHOR_ID.contacto)
    )
  })

  it('si ninguna intersecta, mantiene el último href activo', async () => {
    render(<TestHarness />)
    await act(async () => {
      await Promise.resolve()
    })
    const inicio = screen.getByTestId('sec-inicio')

    act(() => {
      storedCallback!(
        [makeIoEntry(inicio, { isIntersecting: true })],
        {} as IntersectionObserver
      )
    })
    expect(screen.getByTestId('active')).toHaveTextContent(
      sectionHref(SECTION_ANCHOR_ID.inicio)
    )

    act(() => {
      storedCallback!(
        [makeIoEntry(inicio, { isIntersecting: false })],
        {} as IntersectionObserver
      )
    })
    expect(screen.getByTestId('active')).toHaveTextContent(
      sectionHref(SECTION_ANCHOR_ID.inicio)
    )
  })
})
