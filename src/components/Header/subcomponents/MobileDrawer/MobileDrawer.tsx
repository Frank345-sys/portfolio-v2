/**
 * Pieza de interfaz del portfolio (`MobileDrawer`).
 *
 * @fileoverview Implementación del archivo `MobileDrawer.tsx` dentro de `components/Header/subcomponents/MobileDrawer`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { m, AnimatePresence } from 'motion/react'
import { createPortal } from 'react-dom'

import { SiteLogo } from '@/shared/components/primitives/SiteLogo'
import { ThemeToggle } from '@/shared/components/primitives/ThemeToggle'
import { OVERLAY_FADE } from '@/shared/constants/motionAnimations'
import { TYPOGRAPHY, BUTTON, LAYOUT, Z } from '@/shared/constants/tokens'
import { useFocusTrap, useModalOverlayEffects } from '@/shared/hooks'
import { CloseIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

import {
  DRAWER_SLIDE,
  HEADER_DRAWER_NAV_ARIA_LABEL,
  HEADER_MOBILE_DRAWER_PANEL_ID,
} from './constants'
import { headerContainer, navLinkActive } from '../../constants/styles'

import type { MobileDrawerProps } from './types'

/** `id` del título del diálogo (heading oculto; `aria-labelledby` del panel lo referencia). */
const DRAWER_DIALOG_TITLE_ID = 'mobile-menu-title' as const

/**
 * @module components/Header/subcomponents/MobileDrawer/MobileDrawer
 *
 * Panel móvil (`role="dialog"`) con nav, `ThemeToggle` y trampa de foco; no renderiza si `isOpen` es false.
 *
 * @example
 * ```tsx
 * <MobileDrawer isOpen={isDrawerOpen} onClose={closeDrawer} navItems={navItems} />
 * ```
 */
export function MobileDrawer({
  isOpen,
  onClose,
  displayName,
  navItems,
  activeNavHref = null,
}: MobileDrawerProps) {
  const drawerRef = useFocusTrap<HTMLDivElement>(isOpen)

  useModalOverlayEffects({ isOpen, onClose })

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div
          key="overlay"
          {...OVERLAY_FADE}
          className={cn('flex justify-end', LAYOUT.overlay.scrim, Z.backdrop)}
          onClick={onClose}
          role="presentation"
        >
          {/* Panel móvil — `stopPropagation` aísla el dialog del onClick del velo. */}
          <m.div
            ref={drawerRef}
            key="drawer"
            id={HEADER_MOBILE_DRAWER_PANEL_ID}
            {...DRAWER_SLIDE}
            className="bg-bg-white border-stroke-soft shadow-elevation-lg flex h-full w-72 flex-col border-l"
            role="dialog"
            aria-modal="true"
            aria-labelledby={DRAWER_DIALOG_TITLE_ID}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Heading oculto: referencia `aria-labelledby` del panel. */}
            <h2 id={DRAWER_DIALOG_TITLE_ID} className="sr-only">
              Menú de navegación
            </h2>

            {/* Header: logo + botón cerrar */}
            <div
              className={cn(
                headerContainer,
                'border-stroke-soft w-full border-b px-6'
              )}
            >
              {/* Logo */}
              <SiteLogo displayName={displayName} onNavigate={onClose} />

              {/* Botón cerrar */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className={BUTTON.special.icon.text.neutral}
              >
                <CloseIcon aria-hidden className="size-7" />
              </button>
            </div>

            {/* Contenido: nav + footer */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {/* Nav mobile */}
              <nav aria-label={HEADER_DRAWER_NAV_ARIA_LABEL}>
                <ul className="flex list-none flex-col gap-4">
                  {navItems.map((item) => {
                    const isActive = item.href === activeNavHref
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            TYPOGRAPHY.link.nav,
                            isActive && navLinkActive,
                            'hover:bg-bg-soft block rounded-lg px-3 py-2'
                          )}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            {/* Footer */}
            <div className="border-stroke-soft border-t px-6 py-4">
              <ThemeToggle />
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
