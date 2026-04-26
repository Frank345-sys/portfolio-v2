import { m } from 'motion/react'

import { BUTTON } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { HAMBURGER_SPRING } from '../constants'

import type { Variants } from 'motion/react'

interface HamburgerButtonProps {
  /** Si el menú móvil está abierto (afecta `aria-expanded` y la animación). */
  isOpen: boolean
  /** Alterna el estado del drawer; lo invoca el contenedor (p. ej. `Header`). */
  onClick: () => void
  /** Clases adicionales del `<button>`. */
  className?: string
}

const HAMBURGER_LINE_BASE_CLASS = 'bg-bg-strong block h-0.5 w-4.5 rounded-full'

const hamburgerBarTopVariants: Variants = {
  open: { rotate: 45, y: 6 },
  closed: { rotate: 0, y: 0 },
}

const hamburgerBarMidVariants: Variants = {
  open: { opacity: 0, scaleX: 0 },
  closed: { opacity: 1, scaleX: 1 },
}

const hamburgerBarBottomVariants: Variants = {
  open: { rotate: -45, y: -6 },
  closed: { rotate: 0, y: 0 },
}

/**
 * Botón hamburguesa con Motion: tres líneas que forman una X cuando `isOpen` es true.
 * Debe controlarse desde fuera con `isOpen` y `onClick`.
 *
 * @example
 * ```tsx
 * <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(prev => !prev)} />
 * ```
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
      aria-controls="mobile-menu"
      className={cn(
        BUTTON.special.icon,
        'flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full p-0 md:hidden',
        className
      )}
    >
      <m.span
        animate={toggleState}
        variants={hamburgerBarTopVariants}
        transition={HAMBURGER_SPRING}
        className={cn(HAMBURGER_LINE_BASE_CLASS, 'origin-center')}
      />
      <m.span
        animate={toggleState}
        variants={hamburgerBarMidVariants}
        transition={{ duration: 0.15 }}
        className={HAMBURGER_LINE_BASE_CLASS}
      />
      <m.span
        animate={toggleState}
        variants={hamburgerBarBottomVariants}
        transition={HAMBURGER_SPRING}
        className={cn(HAMBURGER_LINE_BASE_CLASS, 'origin-center')}
      />
    </button>
  )
}
