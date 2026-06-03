/**
 * Pruebas de `useHeader` — drawer, breakpoint `lg`, scroll y acoplamiento al scroll-spy.
 *
 * @fileoverview Vitest + Testing Library con mock de `useMediaQuery`; valida la composición del hook de cabecera.
 * @remarks Simula `ResizeObserver` global; no usa `renderWithMotion`.
 */

import { act, render, screen, waitFor } from '@testing-library/react'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from 'vitest'

import { makeIoEntry, ResizeObserverMock } from '@/test/helpers'

import {
  DEFAULT_NAV_ITEMS,
  SECTION_ANCHOR_ID,
  sectionHref,
} from '../../constants/navigation'
import { useHeader } from '../useHeader'

const { mockUseMediaQuery } = vi.hoisted(() => ({
  mockUseMediaQuery: vi.fn(() => false),
}))

vi.mock('@/shared/hooks', () => ({
  useMediaQuery: () => mockUseMediaQuery(),
}))

/**
 * Componente de test que monta `useHeader` y expone su estado en `data-testid` para assertions.
 * Incluye secciones con IDs reales para que el scroll-spy pueda observarlas.
 */
function TestHarness() {
  const {
    isOpen,
    isMobileDrawerOpen,
    setIsOpen,
    isAtTop,
    activeNavHref,
    rowRef,
    registerLink,
    underline,
  } = useHeader(DEFAULT_NAV_ITEMS)

  return (
    <div>
      <div
        id={SECTION_ANCHOR_ID.inicio}
        data-testid="sec-inicio"
        style={{ height: 80 }}
      />
      <div
        id={SECTION_ANCHOR_ID.sobreMi}
        data-testid="sec-sobre"
        style={{ height: 80 }}
      />
      <div
        id={SECTION_ANCHOR_ID.proyectos}
        data-testid="sec-proyectos"
        style={{ height: 80 }}
      />
      <div
        id={SECTION_ANCHOR_ID.contacto}
        data-testid="sec-contacto"
        style={{ height: 80 }}
      />
      <span data-testid="is-open">{isOpen ? 'yes' : 'no'}</span>
      <span data-testid="is-mobile-drawer-open">
        {isMobileDrawerOpen ? 'yes' : 'no'}
      </span>
      <span data-testid="is-at-top">{isAtTop ? 'yes' : 'no'}</span>
      <span data-testid="active">{activeNavHref ?? 'none'}</span>
      <span data-testid="underline-visible">
        {underline.visible ? 'yes' : 'no'}
      </span>
      <button
        type="button"
        data-testid="toggle-drawer"
        onClick={() => setIsOpen((v) => !v)}
      >
        Alternar drawer
      </button>
      <div
        ref={rowRef}
        className="flex"
        style={{ width: 500, position: 'relative' }}
      >
        {DEFAULT_NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            ref={registerLink(item.href)}
            href={item.href}
            style={{ width: 100, flexShrink: 0, display: 'block' }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

/**
 * {@link useHeader} — estado del drawer, breakpoint `lg`, `isAtTop` / scroll
 * y ensamblaje scroll-spy + subrayado (callback de IO aquí; reglas del spy en `useNavScrollSpy.test.tsx`).
 *
 * **Mocks:** `IntersectionObserver`, `ResizeObserver`, `@/shared/hooks/useMediaQuery` (`lg`).
 *
 * **Composición y Motion:** `Header.test.tsx`.
 * **Solo geometría del subrayado:** `useNavUnderlinePosition.test.tsx`.
 */
describe('useHeader', () => {
  type IoCallback = IntersectionObserverCallback

  // Captura el callback del IO para dispararlo manualmente en cada it de scroll-spy.
  let storedCallback: IoCallback | null = null
  // Spy sobre window.scrollY para simular posición de scroll sin mover el viewport real.
  let scrollYGetter: MockInstance<() => number> | null = null

  beforeEach(() => {
    storedCallback = null
    mockUseMediaQuery.mockReturnValue(false)
    globalThis.ResizeObserver =
      ResizeObserverMock as unknown as typeof ResizeObserver
    globalThis.IntersectionObserver = vi.fn(function MockIo(
      this: unknown,
      cb: IoCallback
    ) {
      storedCallback = cb
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
        takeRecords: () => [],
        root: null,
        rootMargin: '',
        thresholds: [],
      }
    }) as unknown as typeof IntersectionObserver
    scrollYGetter = vi.spyOn(window, 'scrollY', 'get') as MockInstance<
      () => number
    >
    scrollYGetter.mockReturnValue(0)
  })

  afterEach(() => {
    scrollYGetter?.mockRestore()
    vi.restoreAllMocks()
  })

  /** Estado del drawer y comportamiento según breakpoint `lg` (`useMediaQuery` mockeado). */
  describe('drawer y viewport', () => {
    it('estado inicial: drawer cerrado y arriba del scroll', () => {
      render(<TestHarness />)
      expect(screen.getByTestId('is-open')).toHaveTextContent('no')
      expect(screen.getByTestId('is-mobile-drawer-open')).toHaveTextContent(
        'no'
      )
      expect(screen.getByTestId('is-at-top')).toHaveTextContent('yes')
    })

    it('setIsOpen alterna el drawer', () => {
      render(<TestHarness />)
      act(() => {
        screen.getByTestId('toggle-drawer').click()
      })
      expect(screen.getByTestId('is-open')).toHaveTextContent('yes')
      expect(screen.getByTestId('is-mobile-drawer-open')).toHaveTextContent(
        'yes'
      )
      act(() => {
        screen.getByTestId('toggle-drawer').click()
      })
      expect(screen.getByTestId('is-open')).toHaveTextContent('no')
      expect(screen.getByTestId('is-mobile-drawer-open')).toHaveTextContent(
        'no'
      )
    })

    it('en lg isMobileDrawerOpen es false y se cierra el estado interno del drawer', async () => {
      const { rerender } = render(<TestHarness />)
      act(() => {
        screen.getByTestId('toggle-drawer').click()
      })
      expect(screen.getByTestId('is-open')).toHaveTextContent('yes')
      expect(screen.getByTestId('is-mobile-drawer-open')).toHaveTextContent(
        'yes'
      )

      mockUseMediaQuery.mockReturnValue(true)
      rerender(<TestHarness />)

      expect(screen.getByTestId('is-mobile-drawer-open')).toHaveTextContent(
        'no'
      )
      await waitFor(() => {
        expect(screen.getByTestId('is-open')).toHaveTextContent('no')
      })
    })

    it('en lg isMobileDrawerOpen permanece no aunque se pulse alternar', async () => {
      mockUseMediaQuery.mockReturnValue(true)
      render(<TestHarness />)
      expect(screen.getByTestId('is-mobile-drawer-open')).toHaveTextContent(
        'no'
      )

      act(() => {
        screen.getByTestId('toggle-drawer').click()
      })
      expect(screen.getByTestId('is-mobile-drawer-open')).toHaveTextContent(
        'no'
      )
      await waitFor(() => {
        expect(screen.getByTestId('is-open')).toHaveTextContent('no')
      })
    })
  })

  /** `isAtTop` reacciona al evento `scroll` de `window` con `scrollY` espiado. */
  describe('scroll vertical → isAtTop', () => {
    it('isAtTop refleja window.scrollY en el listener de scroll', () => {
      render(<TestHarness />)
      expect(screen.getByTestId('is-at-top')).toHaveTextContent('yes')

      scrollYGetter!.mockReturnValue(120)
      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })
      expect(screen.getByTestId('is-at-top')).toHaveTextContent('no')

      scrollYGetter!.mockReturnValue(0)
      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })
      expect(screen.getByTestId('is-at-top')).toHaveTextContent('yes')
    })
  })

  /** `activeNavHref` y visibilidad del subrayado propagados desde el IO capturado. */
  describe('scroll-spy + subrayado (IO simulado)', () => {
    it('propaga activeNavHref y subrayado cuando el scroll-spy marca sección', async () => {
      render(<TestHarness />)
      await act(async () => {
        await Promise.resolve()
      })
      expect(typeof storedCallback).toBe('function')

      const inicio = screen.getByTestId('sec-inicio')
      act(() => {
        storedCallback!(
          [
            makeIoEntry(inicio, {
              isIntersecting: true,
              intersectionRatio: 0.4,
            }),
          ],
          {} as IntersectionObserver
        )
      })

      expect(screen.getByTestId('active')).toHaveTextContent(
        sectionHref(SECTION_ANCHOR_ID.inicio)
      )
      await waitFor(() => {
        expect(screen.getByTestId('underline-visible')).toHaveTextContent('yes')
      })
    })
  })

  /** Limpieza de efectos: listener de `scroll` removido al desmontar el componente. */
  describe('efectos al desmontar', () => {
    it('al desmontar, quita el listener de scroll', () => {
      const removeSpy = vi.spyOn(window, 'removeEventListener')
      const { unmount } = render(<TestHarness />)
      unmount()
      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
      removeSpy.mockRestore()
    })
  })
})
