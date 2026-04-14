import { m, AnimatePresence } from 'motion/react'
import { useFocusTrap } from '@/shared/hooks/useFocusTrap'
import { useModalOverlayEffects } from '@/shared/hooks/useModalOverlayEffects'
import { BUTTON, LAYOUT, Z } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { CloseIcon } from '@/shared/icons'
import { DRAWER_SLIDE } from '../constants'
import { OVERLAY_FADE } from '@/shared/constants/motion'
import type { NavItem } from '../types'
import { mobileNavLinkClassName, headerContainer } from '../styles'
import { SiteLogo } from './SiteLogo'

interface MobileDrawerProps {
  /** Cuando es true, se muestran overlay y panel (hasta `md`, el resto oculto con CSS). */
  isOpen: boolean
  /** Cierra el drawer (backdrop, enlaces, botón cerrar, tecla Escape). */
  onClose: () => void
  /** Nombre del sitio en cabecera del panel y título accesible del diálogo. */
  siteName: string
  /** Mismos ítems que la nav desktop (`href` + `label`). */
  navItems: ReadonlyArray<NavItem>
  /** `href` de la sección visible (scroll-spy); opcional. */
  activeNavHref?: string | null
}

/**
 * Panel de navegación móvil (`role="dialog"`), animado con Motion. Incluye enlaces,
 * `ThemeToggle` y trampa de foco. No renderiza nada si `isOpen` es false.
 *
 * @example
 * ```tsx
 * <MobileDrawer
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   siteName="Mi Portfolio"
 *   navItems={navItems}
 *   activeNavHref="#inicio"
 * />
 * ```
 */
export function MobileDrawer({
  isOpen,
  onClose,
  siteName,
  navItems,
  activeNavHref = null,
}: MobileDrawerProps) {
  const drawerRef = useFocusTrap<HTMLDivElement>(isOpen)

  useModalOverlayEffects({ isOpen, onClose })

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            key="overlay"
            {...OVERLAY_FADE}
            className={cn(LAYOUT.overlay.scrim, 'md:hidden', Z.drawerElevated)}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <m.div
            ref={drawerRef}
            key="drawer"
            id="mobile-menu"
            {...DRAWER_SLIDE}
            className={cn(
              'bg-bg-white border-stroke-soft shadow-elevation-lg fixed right-0 flex h-full w-72 flex-col border-l md:hidden',
              Z.drawerElevated
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Drawer header */}
            <div
              className={cn(
                headerContainer,
                'border-stroke-soft w-full border-b'
              )}
            >
              {/* Site logo */}
              <SiteLogo
                siteName={siteName}
                onNavigate={onClose}
                siteNameSpanId="mobile-menu-title"
              />

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className={BUTTON.special.icon}
              >
                <CloseIcon aria-hidden className="h-7 w-7" />
              </button>
            </div>

            {/* Drawer content */}
            <div className="h-full px-4 py-6">
              {/* Nav mobile */}
              <nav
                className="flex flex-col gap-4"
                aria-label="Navegación mobile"
              >
                {navItems.map((item) => {
                  const isActive = item.href === activeNavHref
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={mobileNavLinkClassName(isActive)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </nav>
            </div>

            {/* Drawer footer */}
            <div className="border-stroke-soft border-t px-6 py-4">
              <ThemeToggle />
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
