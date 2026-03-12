import { motion, AnimatePresence } from 'motion/react'
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
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={OVERLAY_VARIANTS}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="drawer"
            id="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={DRAWER_VARIANTS}
            className="bg-bg-white border-stroke-soft shadow-elevation-lg fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l-2 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            {/* Header */}
            <div
              className={cn(
                LAYOUT.flex.between,
                'border-stroke-soft border-b-2 px-6 py-3'
              )}
            >
              <div className="flex items-center gap-2">
                <CodeIcon aria-hidden="true" className="h-6 w-6" />
                <span
                  className={cn(TYPOGRAPHY.label.default, 'tracking-tight')}
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
                <CloseIcon className="h-6 w-6" />
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
                    'hover:bg-bg-soft rounded-lg px-3 py-2 text-base transition-colors duration-200'
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* ThemeToggle */}
            <div className="border-stroke-soft border-t-2 px-6 py-5">
              <ThemeToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
