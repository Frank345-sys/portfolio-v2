import { m } from 'motion/react'
import { MOTION_ANIMATION } from '@/shared/constants/motion'
import { ANIMATION, Z, LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { useHeader } from './hooks'
import { HamburgerButton, MobileDrawer, SiteLogo } from './subcomponents'
import { DEFAULT_NAV_ITEMS } from './constants'
import type { NavItem } from './types'
import {
  desktopNavLinkClassName,
  desktopNavUnderline,
  headerContainer,
} from './styles'

interface HeaderProps {
  /** Texto junto al logo; por defecto `"Mi Portfolio"`. */
  siteName?: string
  /** Enlaces de navegación; por defecto anclas a inicio, sobre mí y proyectos. */
  navItems?: ReadonlyArray<NavItem>
  /** Contenido a la derecha en desktop; si se omite, `<ThemeToggle />`. */
  rightSlot?: React.ReactNode
  /** Clases extra del `<header>`. */
  className?: string
}

/**
 * Cabecera con logo, navegación central y slot derecho.
 *
 * - **Scroll-spy:** la sección visible se infiere con `IntersectionObserver` y se refleja
 *   en estilos, `aria-current` y subrayado animado en desktop.
 * - **Móvil:** `HamburgerButton` abre `MobileDrawer` (diálogo modal con trampa de foco).
 *
 * @example
 * ```tsx
 * <Header siteName="Mi Portfolio" navItems={NAV_ITEMS} />
 * ```
 */
export function Header({
  siteName = 'Mi Portfolio',
  navItems = DEFAULT_NAV_ITEMS,
  rightSlot,
  className,
}: HeaderProps) {
  const resolvedRightSlot = rightSlot ?? <ThemeToggle />

  const {
    isOpen,
    setIsOpen,
    isAtTop,
    activeNavHref,
    prefersReducedMotion,
    rowRef,
    registerLink,
    underline,
  } = useHeader(navItems)

  return (
    <>
      <header
        className={cn(
          'bg-bg-white fixed top-0 w-full',
          isAtTop ? 'bg-transparent' : 'shadow-elevation-md',
          Z.header,
          ANIMATION.transition.shadow,
          className
        )}
        aria-label="Cabecera"
      >
        <div className={cn(headerContainer, LAYOUT.container.full)}>
          <SiteLogo siteName={siteName} />

          {/* Nav desktop: scroll-spy + línea inferior animada */}
          <nav className="hidden md:block" aria-label="Navegación principal">
            <div
              ref={rowRef}
              className="relative flex items-center gap-6 lg:gap-8"
            >
              {navItems.map((item) => {
                const isActive = item.href === activeNavHref
                return (
                  <a
                    key={item.href}
                    ref={registerLink(item.href)}
                    href={item.href}
                    className={desktopNavLinkClassName(isActive)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                )
              })}
              <m.span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute bottom-0 left-0 h-0.5',
                  desktopNavUnderline
                )}
                initial={false}
                animate={{
                  left: underline.left,
                  width: underline.width,
                  opacity: underline.visible ? 1 : 0,
                }}
                transition={
                  prefersReducedMotion === true
                    ? { duration: 0 }
                    : MOTION_ANIMATION.spring.control
                }
              />
            </div>
          </nav>

          {/* Right slot + hamburguesa */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden md:block">{resolvedRightSlot}</div>
            <HamburgerButton
              isOpen={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>
      </header>

      {/* Drawer — fuera del header para evitar problemas de stacking context */}
      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        siteName={siteName}
        navItems={navItems}
        activeNavHref={activeNavHref}
      />
    </>
  )
}
