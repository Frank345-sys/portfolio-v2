/**
 * Tests para `Header` — integración con Motion, landmark, nav desktop, drawer móvil y scroll-spy.
 *
 * @fileoverview Valida props (`siteName`, `navItems`, `className`), landmark `banner`,
 * nav desktop, apertura/cierre del drawer móvil, foco hamburguesa ↔ drawer y `aria-current`
 * vía `IntersectionObserver` stub con callback capturado.
 * @remarks Usa `renderWithMotion` — `Header` tiene animaciones de Motion y scroll-spy con `IntersectionObserver`,
 * que se mockea en `beforeEach`. Responsabilidades complementarias documentadas en el `describe` principal.
 */
import { act, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { makeIoEntry, renderWithMotion } from '@/test/helpers'

import {
  DEFAULT_NAV_ITEMS,
  HEADER_DRAWER_NAV_ARIA_LABEL,
  SECTION_ANCHOR_ID,
  SITE_DISPLAY_NAME,
  sectionHref,
} from './constants/navigation'
import {
  Header,
  HEADER_LANDMARK_ARIA_LABEL,
  HEADER_DESKTOP_NAV_ARIA_LABEL,
} from './Header'

vi.mock('@/shared/components/primitives/ThemeToggle', () => ({
  ThemeToggle: () => <span data-testid="theme-toggle">ThemeToggle</span>,
}))

vi.mock('@/shared/icons', () => ({
  CodeIcon: () => <svg data-testid="code-icon" />,
  CloseIcon: () => <svg data-testid="close-icon" />,
}))

/** Drawer bajo velo con `aria-hidden`: RTL necesita `hidden: true` para roles del panel. */
const inMobileDrawer = { hidden: true } as const

/**
 * **`Header` (integración con Motion)** — cómo se componen landmark, nav desktop, drawer, props y
 * el cableado de `aria-current` respecto al scroll-spy.
 *
 * **Responsabilidades en otros archivos**
 * - **`HamburgerButton.test.tsx`** — estados a11y del botón y `aria-controls`.
 * - **`MobileDrawer.test.tsx`** — `onClose` (Escape, overlay, nav, logo, botón cerrar), tema, `aria-current` aislado.
 * - **Foco hamburguesa ↔ drawer** — un caso aquí comprueba foco al primer enlace del panel y restauración al cerrar con Escape (complementa `useFocusTrap.test.tsx`).
 * - **`useHeader.test.tsx`** — drawer/`lg`, sombra al scroll (`isAtTop`), subrayado + `activeNavHref` vía IO.
 * - **`useNavScrollSpy.test.tsx`** — reglas del spy (orden, null).
 * - **`useNavUnderlinePosition.test.tsx`** — medición `left`/`width`/`visible` del subrayado.
 *
 * **`IntersectionObserver`** — stub ligero fuera del bloque de scroll-spy (p. ej. hooks de navegación);
 * ese bloque sustituye el mock por uno que guarda `callback`.
 */
describe('Header', () => {
  const ioReserve = globalThis.IntersectionObserver

  beforeEach(() => {
    globalThis.IntersectionObserver = class {
      disconnect() {}
      observe() {}
      takeRecords(): IntersectionObserverEntry[] {
        return []
      }
      unobserve() {}
    } as unknown as typeof IntersectionObserver
  })

  afterEach(() => {
    globalThis.IntersectionObserver = ioReserve
  })

  /**
   * Props públicas, landmark `banner`, nav desktop y ThemeToggle en escritorio.
   */
  describe('props, landmark y navegación desktop', () => {
    it('usa SITE_DISPLAY_NAME si no pasas siteName', () => {
      renderWithMotion(<Header />)
      expect(screen.getByText(SITE_DISPLAY_NAME)).toBeInTheDocument()
    })

    it('usa el siteName que le pases', () => {
      renderWithMotion(<Header siteName="Mi Sitio" />)
      expect(screen.getByText('Mi Sitio')).toBeInTheDocument()
    })

    it('los links por defecto apuntan a las secciones del portfolio', () => {
      renderWithMotion(<Header />)
      const desktopNav = screen.getByRole('navigation', {
        name: HEADER_DESKTOP_NAV_ARIA_LABEL,
      })
      const desktopNavLinks = DEFAULT_NAV_ITEMS.map(({ href, label }) => ({
        href,
        namePattern: new RegExp(
          `^${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
          'i'
        ),
      }))
      for (const { href, namePattern } of desktopNavLinks) {
        expect(
          within(desktopNav).getByRole('link', { name: namePattern })
        ).toHaveAttribute('href', href)
      }
    })

    it('el logo enlaza al inicio con etiqueta accesible', () => {
      renderWithMotion(<Header siteName="Test Portfolio" />)
      const logo = screen.getByRole('link', {
        name: /ir al inicio: test portfolio/i,
      })
      expect(logo).toHaveAttribute(
        'href',
        sectionHref(SECTION_ANCHOR_ID.inicio)
      )
    })

    it('si pasas navItems custom, esos links se ven en desktop', () => {
      const navItems = [
        { href: '#blog', label: 'Blog' },
        { href: '#faq', label: 'FAQ' },
      ]
      renderWithMotion(<Header navItems={navItems} />)
      expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute(
        'href',
        '#blog'
      )
      expect(screen.getByRole('link', { name: /faq/i })).toHaveAttribute(
        'href',
        '#faq'
      )
    })

    it('la nav desktop tiene la etiqueta accesible de navegación principal', () => {
      renderWithMotion(<Header />)
      expect(
        screen.getByRole('navigation', { name: HEADER_DESKTOP_NAV_ARIA_LABEL })
      ).toBeInTheDocument()
    })

    it('incluye ThemeToggle en escritorio', () => {
      renderWithMotion(<Header />)
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    })

    it('expone el landmark header con rol banner y aria-label', () => {
      renderWithMotion(<Header />)
      expect(
        screen.getByRole('banner', { name: HEADER_LANDMARK_ARIA_LABEL })
      ).toBeInTheDocument()
    })

    it('aplica className extra en el elemento header', () => {
      const { container } = renderWithMotion(
        <Header className="test-custom-class" />
      )
      expect(container.querySelector('header')).toHaveClass('test-custom-class')
    })
  })

  /**
   * Estado compartido Header → HamburgerButton + MobileDrawer: apertura, propagación
   * de `navItems` y ciclo de foco hamburguesa ↔ drawer.
   */
  describe('drawer móvil (estado compartido Header → Hamburger + MobileDrawer)', () => {
    it('al abrir el menú aparece el dialog, la nav móvil y el hamburger pasa a expanded', async () => {
      const user = userEvent.setup()
      renderWithMotion(<Header siteName="Sitio Test" />)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

      const abrirMenú = screen.getByRole('button', { name: /abrir menú/i })
      expect(abrirMenú).toHaveAttribute('aria-expanded', 'false')

      await user.click(abrirMenú)

      expect(
        screen.getByRole('button', {
          name: /cerrar menú/i,
          expanded: true,
        })
      ).toHaveAttribute('aria-expanded', 'true')

      const dialog = screen.getByRole('dialog', {
        ...inMobileDrawer,
        name: /menú de navegación/i,
      })
      expect(dialog).toBeInTheDocument()
      expect(within(dialog).getByText('Sitio Test')).toBeInTheDocument()
      expect(
        screen.getByRole('navigation', {
          ...inMobileDrawer,
          name: HEADER_DRAWER_NAV_ARIA_LABEL,
        })
      ).toBeInTheDocument()
    })

    it('propaga navItems custom al drawer cuando está abierto', async () => {
      const user = userEvent.setup()
      const navItems = [
        { href: '#a', label: 'Sección A' },
        { href: '#b', label: 'Sección B' },
      ]
      renderWithMotion(<Header navItems={navItems} />)

      await user.click(screen.getByRole('button', { name: /abrir menú/i }))

      const navMobile = screen.getByRole('navigation', {
        ...inMobileDrawer,
        name: HEADER_DRAWER_NAV_ARIA_LABEL,
      })
      expect(
        within(navMobile).getByRole('link', {
          ...inMobileDrawer,
          name: /sección a/i,
        })
      ).toHaveAttribute('href', '#a')
      expect(
        within(navMobile).getByRole('link', {
          ...inMobileDrawer,
          name: /sección b/i,
        })
      ).toHaveAttribute('href', '#b')
    })

    it('al abrir el menú mueve el foco al primer enlace del drawer y al cerrar con Escape lo devuelve al botón hamburguesa', async () => {
      const user = userEvent.setup()
      renderWithMotion(<Header siteName="Sitio Test" />)

      const menuButton = screen.getByRole('button', { name: /abrir menú/i })
      await user.click(menuButton)

      const dialog = await screen.findByRole('dialog', {
        ...inMobileDrawer,
        name: /menú de navegación/i,
      })

      const firstFocusable = within(dialog).getByRole('link', {
        ...inMobileDrawer,
        name: /^Ir al inicio:\s*Sitio Test$/iu,
      })

      await waitFor(() => {
        expect(firstFocusable).toHaveFocus()
      })

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /abrir menú/i })
        ).toHaveFocus()
      })
    })
  })

  /**
   * Integración IO → `activeNavHref` → `aria-current` en nav desktop.
   * Sustituye el stub genérico por un mock que captura el callback para dispararlo manualmente.
   */
  describe('scroll-spy → aria-current en nav desktop (integración Motion)', () => {
    type IoCallbackStored = IntersectionObserverCallback

    // Captura el callback del IO para dispararlo manualmente en cada it
    let spyIoCallback: IoCallbackStored | null = null
    // Preserva el mock del beforeEach externo para restaurarlo en afterEach de este bloque
    let intersectionObserverBefore:
      | typeof globalThis.IntersectionObserver
      | undefined

    beforeEach(() => {
      spyIoCallback = null
      intersectionObserverBefore = globalThis.IntersectionObserver

      globalThis.IntersectionObserver = vi.fn(function MockIntersectionObserver(
        this: unknown,
        callback: IoCallbackStored
      ) {
        spyIoCallback = callback
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
    })

    afterEach(() => {
      if (intersectionObserverBefore !== undefined) {
        globalThis.IntersectionObserver = intersectionObserverBefore
      } else {
        Reflect.deleteProperty(globalThis, 'IntersectionObserver')
      }
    })

    it('marca aria-current solo en el enlace desktop cuyo href coincide con el spy', async () => {
      renderWithMotion(
        <>
          <Header />
          <div
            id={SECTION_ANCHOR_ID.inicio}
            data-testid="sec-header-spy-inicio"
            style={{ height: 80 }}
          />
          <div
            id={SECTION_ANCHOR_ID.sobreMi}
            data-testid="sec-header-spy-sobre"
            style={{ height: 80 }}
          />
          <div id={SECTION_ANCHOR_ID.proyectos} style={{ height: 80 }} />
          <div id={SECTION_ANCHOR_ID.contacto} style={{ height: 80 }} />
        </>
      )

      await waitFor(() => {
        expect(spyIoCallback).toEqual(expect.any(Function))
      })

      act(() => {
        spyIoCallback!(
          [
            makeIoEntry(screen.getByTestId('sec-header-spy-sobre'), {
              isIntersecting: true,
              intersectionRatio: 0.3,
            }),
          ],
          {} as IntersectionObserver
        )
      })

      await waitFor(() => {
        const desktopNav = screen.getByRole('navigation', {
          name: HEADER_DESKTOP_NAV_ARIA_LABEL,
        })
        expect(
          within(desktopNav).getByRole('link', { name: /sobre mí/i })
        ).toHaveAttribute('aria-current', 'page')
        expect(
          within(desktopNav).getByRole('link', { name: /^inicio$/i })
        ).not.toHaveAttribute('aria-current')
      })
    })
  })
})
