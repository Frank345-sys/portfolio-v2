/**
 * Pieza de interfaz del portfolio (`HamburgerButton`).
 *
 * @fileoverview Implementación del archivo `HamburgerButton.tsx` dentro de `components/Header/subcomponents/HamburgerButton`; ver exports para la API pública.
 * @remarks `aria-controls` alineado con {@link HEADER_MOBILE_DRAWER_PANEL_ID} en `MobileDrawer`
 * ({@link HEADER_MOBILE_DRAWER_PANEL_ID}). Las barras llevan `aria-hidden` porque el
 * `aria-label` del botón comunica el estado al lector de pantalla.
 */

import { m } from 'motion/react'

import { MOTION_ANIMATION } from '@/shared/constants/motionAnimations'
import { BUTTON } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import {
  HEADER_MOBILE_DRAWER_PANEL_ID,
  hamburgerBarBottomVariants,
  hamburgerBarMidVariants,
  hamburgerBarTopVariants,
} from './constants'

interface HamburgerButtonProps {
  /** Si el menú móvil está abierto (afecta `aria-expanded` y la animación). */
  isOpen: boolean
  /** Alterna el estado del drawer; lo invoca el contenedor (p. ej. `Header`). */
  onClick: () => void
  /** Clases adicionales del `<button>`. */
  className?: string
}

/** Clases Tailwind compartidas por las tres barras `motion.span`; extraídas para evitar repetición. */
const HAMBURGER_LINE_BASE_CLASS =
  'bg-bg-strong block h-0.5 w-5 rounded-full' as const

/**
 * @module components/Header/subcomponents/HamburgerButton/HamburgerButton
 *
 * Botón hamburguesa (Motion) con `aria-controls` al panel {@link MobileDrawer}.
 *
 * @example
 * ```tsx
 * <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(prev => !prev)} />
 * ```
 * @see {@link HEADER_MOBILE_DRAWER_PANEL_ID} para el id del panel controlado
 * @see {@link hamburgerBarTopVariants} {@link hamburgerBarMidVariants} {@link hamburgerBarBottomVariants} para las variantes de animación
 */
export function HamburgerButton({
  isOpen,
  onClick,
  className,
}: HamburgerButtonProps) {
  const toggleState = isOpen ? 'open' : 'closed'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isOpen}
      aria-controls={HEADER_MOBILE_DRAWER_PANEL_ID}
      className={cn(
        BUTTON.special.icon.text.neutral,
        'flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-full p-0',
        className
      )}
    >
      <m.span
        aria-hidden
        animate={toggleState}
        variants={hamburgerBarTopVariants}
        transition={MOTION_ANIMATION.spring.control}
        className={cn(HAMBURGER_LINE_BASE_CLASS, 'origin-center')}
      />
      <m.span
        aria-hidden
        animate={toggleState}
        variants={hamburgerBarMidVariants}
        className={HAMBURGER_LINE_BASE_CLASS}
      />
      <m.span
        aria-hidden
        animate={toggleState}
        variants={hamburgerBarBottomVariants}
        transition={MOTION_ANIMATION.spring.control}
        className={cn(HAMBURGER_LINE_BASE_CLASS, 'origin-center')}
      />
    </button>
  )
}
