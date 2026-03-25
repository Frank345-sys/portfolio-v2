import { useEffect, useState } from 'react'
import { LAYOUT, TYPOGRAPHY, ANIMATION } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { CodeIcon } from '@/shared/icons'
import { HamburgerButton, MobileDrawer } from './subcomponents'
import { DEFAULT_NAV_ITEMS } from './constants'
import type { NavItem } from './types'

export interface HeaderProps {
  siteName?: string
  navItems?: ReadonlyArray<NavItem>
  rightSlot?: React.ReactNode
  className?: string
}

/**
 * Cabecera reutilizable con logo/nombre, navegación central y slot derecho.
 * En mobile muestra un HamburgerButton que abre el MobileDrawer.
 *
 * @param props - `siteName`, `navItems`, `rightSlot` y `className` opcionales.
 * @returns {JSX.Element} Fragmento con `<header>` y `MobileDrawer` asociado.
 *
 * @example
 * ```tsx
 * <Header siteName="Mi Portfolio" navItems={NAV_ITEMS} />
 * ```
 */
export function Header({
  siteName = 'Mi Portfolio',
  navItems = DEFAULT_NAV_ITEMS,
  rightSlot = <ThemeToggle />,
  className,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const updateScrollState = () => {
      setIsAtTop(window.scrollY <= 0)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <>
      <header
        className={cn(
          LAYOUT.header.bar,
          isAtTop ? 'bg-transparent' : 'shadow-elevation-md',
          ANIMATION.transition.shadow,
          className
        )}
        aria-label="Cabecera"
      >
        <div
          className={cn(LAYOUT.header.wrapper, LAYOUT.flex.between, 'gap-4')}
        >
          {/* Logo */}
          <div className="flex shrink-0 items-center gap-2">
            <CodeIcon aria-hidden="true" className="h-7 w-7 md:h-10 md:w-10" />
            <span className={cn(TYPOGRAPHY.label.default, 'tracking-tight')}>
              {siteName}
            </span>
          </div>

          {/* Nav desktop */}
          <nav className={LAYOUT.header.nav} aria-label="Navegación principal">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(TYPOGRAPHY.link.nav, TYPOGRAPHY.paragraph.small)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right slot + hamburguesa */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden md:block">{rightSlot}</div>
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
      />
    </>
  )
}
