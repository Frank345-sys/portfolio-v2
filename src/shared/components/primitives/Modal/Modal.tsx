/**
 * Pieza de interfaz del portfolio (`Modal`).
 *
 * @fileoverview Implementación del archivo `Modal.tsx` dentro de `shared/components/Modal`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { AnimatePresence, m } from 'motion/react'
import { createPortal } from 'react-dom'

import { OVERLAY_FADE } from '@/shared/constants/motionAnimations'
import { BUTTON, CARD, LAYOUT, Z } from '@/shared/constants/tokens'
import { useFocusTrap, useModalOverlayEffects } from '@/shared/hooks'
import { CloseIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

import { PANEL_VARIANTS } from './constants'
import { ModalBody } from './subcomponentes/ModalBody'
import { ModalFooter } from './subcomponentes/ModalFooter'
import { ModalHeader } from './subcomponentes/ModalHeader'

import type { ReactNode } from 'react'

const CLOSE_BUTTON_POSITION = 'absolute right-4 top-4 z-10 sm:right-6 sm:top-6'

interface ModalRootProps {
  isOpen: boolean
  onClose: () => void
  ariaLabelledBy: string
  children: ReactNode
  closeButtonAriaLabel?: string
  className?: string
  overlayClassName?: string
}

/**
 * @module shared/components/Modal/Modal
 *
 * Diálogo modal accesible con portal, focus trap y animación de entrada/salida.
 */
export function Modal({
  isOpen,
  onClose,
  ariaLabelledBy,
  children,
  closeButtonAriaLabel = 'Cerrar diálogo',
  className,
  overlayClassName,
}: ModalRootProps) {
  const panelRef = useFocusTrap<HTMLDivElement>(isOpen)
  useModalOverlayEffects({ isOpen, onClose })

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div
          {...OVERLAY_FADE}
          className={cn(
            'flex items-center justify-center p-4 sm:p-8',
            LAYOUT.overlay.scrim,
            Z.backdrop,
            overlayClassName
          )}
          onClick={onClose}
          role="presentation"
        >
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ariaLabelledBy}
            {...PANEL_VARIANTS}
            className={cn(CARD.overlay.modal, 'relative', className)}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeButtonAriaLabel}
              className={cn(
                BUTTON.special.icon.text.neutral,
                CLOSE_BUTTON_POSITION
              )}
            >
              <CloseIcon className="size-7" aria-hidden />
            </button>
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
