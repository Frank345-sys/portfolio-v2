/**
 * Compositor de la cabecera del sitio (`Header`).
 *
 * @fileoverview Implementación del archivo `Header.tsx` dentro de `components/Header`; ver exports para la API pública.
 * @remarks Estado en {@link useHeader}; labels `aria` exportados acoplados al JSX del compositor.
 */
import { m } from 'motion/react'

import { SiteLogo } from '@/shared/components/primitives/SiteLogo'
import { ThemeToggle } from '@/shared/components/primitives/ThemeToggle'
import { ANIMATION, TYPOGRAPHY, Z, LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { DEFAULT_NAV_ITEMS } from './constants/navigation'
import { headerContainer, navLinkActive } from './constants/styles'
import { useHeader } from './hooks/useHeader'
import { HamburgerButton } from './subcomponents/HamburgerButton/HamburgerButton'
import { MobileDrawer } from './subcomponents/MobileDrawer/MobileDrawer'

import type { NavItem } from './types'

/** `aria-label` del landmark `<header>`. */
export const HEADER_LANDMARK_ARIA_LABEL = 'Cabecera' as const

/** `aria-label` de la `nav` desktop (scroll-spy). */
export const HEADER_DESKTOP_NAV_ARIA_LABEL = 'Navegación principal' as const

interface HeaderProps {
  /** Sustituye el nombre junto al logo; por defecto `SITE_DISPLAY_NAME` (`siteProfile`). */
  siteName?: string
  /** Enlaces de navegación; por defecto anclas a inicio, sobre mí, proyectos y contacto. */
  navItems?: ReadonlyArray<NavItem>
  /** Clases extra del `<header>`. */
  className?: string
}

/**
 * @module components/Header/Header
 *
 * Landmark **`header`**, nav desktop (scroll-spy + subrayado Motion), `ThemeToggle` y drawer móvil.
 *
 * **Estado** — {@link useHeader} (`./hooks/useHeader.ts`):
 * apertura del drawer (`isMobileDrawerOpen` en &lt; `lg`), `isAtTop` (sombra / fondo),
 * `activeNavHref` (scroll-spy) y **`desktopNavUnderlineMotion`** (`m.span`).
 *
 * **ID del panel drawer:** `./constants/navigation.ts` (**`HEADER_MOBILE_DRAWER_PANEL_ID`** ↔ `HamburgerButton` **`aria-controls`**).
 *
 * **Enlaces por defecto:** `DEFAULT_NAV_ITEMS` en `./constants/` (mismo array que el drawer).
 * Desktop: enlaces dentro de **`ul` &gt; `li`** (`list-none`; subrayado **`m.span`** hermano del `ul`).
 *
 * @example
 * ```tsx
 * <Header navItems={NAV_ITEMS} />
 * ```
 */
export function Header({
  siteName,
  navItems = DEFAULT_NAV_ITEMS,
  className,
}: HeaderProps) {
  const {
    isMobileDrawerOpen,
    setIsOpen,
    isAtTop,
    activeNavHref,
    desktopNavUnderlineMotion,
    rowRef,
    registerLink,
  } = useHeader(navItems)

  return (
    <header
      className={cn(
        'bg-bg-white fixed top-0 w-full',
        isAtTop ? 'bg-transparent' : 'shadow-elevation-md',
        ANIMATION.transition.shadow,
        Z.header,
        className
      )}
      aria-label={HEADER_LANDMARK_ARIA_LABEL}
    >
      <div className={cn(headerContainer, LAYOUT.container.full, LAYOUT.px)}>
        {/* Logo */}
        <SiteLogo displayName={siteName} />

        {/* Nav desktop: scroll-spy + línea inferior animada */}
        <nav
          className="hidden lg:block"
          aria-label={HEADER_DESKTOP_NAV_ARIA_LABEL}
        >
          <div ref={rowRef} className="relative flex items-center">
            <ul className="flex list-none items-center gap-6 lg:gap-8">
              {navItems.map((item) => {
                const isActive = item.href === activeNavHref
                return (
                  <li key={item.href}>
                    <a
                      ref={registerLink(item.href)}
                      href={item.href}
                      className={cn(
                        TYPOGRAPHY.link.nav,
                        isActive && navLinkActive
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
            <m.span
              aria-hidden
              className="bg-information-base pointer-events-none absolute -bottom-0.5 left-0 h-px rounded-full"
              {...desktopNavUnderlineMotion}
            />
          </div>
        </nav>

        {/* ThemeToggle desktop + hamburguesa */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <HamburgerButton
            isOpen={isMobileDrawerOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden"
          />
        </div>
      </div>

      {/* Drawer*/}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsOpen(false)}
        displayName={siteName}
        navItems={navItems}
        activeNavHref={activeNavHref}
      />
    </header>
  )
}
