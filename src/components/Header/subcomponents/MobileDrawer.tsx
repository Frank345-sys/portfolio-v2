import { m, AnimatePresence } from 'motion/react'
import { useFocusTrap } from '@/shared/hooks/useFocusTrap'
import { BUTTON, LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { CodeIcon, CloseIcon } from '@/shared/icons'
import { DRAWER_VARIANTS, OVERLAY_VARIANTS } from '../constants'
import type { NavItem } from '../types'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  siteName: string
  navItems: ReadonlyArray<NavItem>
}

/**
 * Drawer de navegación para mobile. Se abre desde la derecha con
 * animación spring. Incluye links de navegación y ThemeToggle.
 * Controlado externamente mediante `isOpen` y `onClose`.
 *
 * @param props - Estado del drawer, callback de cierre, nombre del sitio e ítems de nav.
 * @returns {JSX.Element} Overlay + panel dialog animado o null si está cerrado.
 *
 * @example
 * ```tsx
 * <MobileDrawer
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   siteName="Mi Portfolio"
 *   navItems={navItems}
 * />
 * ```
 */
export function MobileDrawer({
  isOpen,
  onClose,
  siteName,
  navItems,
}: MobileDrawerProps) {
  const drawerRef = useFocusTrap<HTMLDivElement>(isOpen)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            key="overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={OVERLAY_VARIANTS}
            className="bg-bg-white/40 fixed inset-0 z-50 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={drawerRef}
            key="drawer"
            id="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={DRAWER_VARIANTS}
            className={cn(
              'bg-bg-white border-stroke-soft fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l md:hidden',
              'shadow-elevation-lg'
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Header — misma altura que LAYOUT.header.wrapper (py-4) */}
            <div
              className={cn(
                LAYOUT.flex.between,
                LAYOUT.header.wrapper,
                'border-stroke-soft border-b'
              )}
            >
              <div className="flex items-center gap-2">
                <CodeIcon
                  aria-hidden="true"
                  className="h-7 w-7 md:h-10 md:w-10"
                />
                <span
                  id="mobile-menu-title"
                  className={TYPOGRAPHY.label.default}
                >
                  {siteName}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className={BUTTON.special.icon}
              >
                <CloseIcon className="h-7 w-7" />
              </button>
            </div>

            {/* Nav mobile */}
            <nav
              className="flex flex-1 flex-col gap-4 px-4 py-6"
              aria-label="Navegación mobile"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    TYPOGRAPHY.link.nav,
                    'hover:bg-bg-soft rounded-lg px-3 py-2',
                    TYPOGRAPHY.paragraph.small
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* ThemeToggle */}
            <div className="border-stroke-soft border-t px-6 py-4">
              <ThemeToggle />
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
