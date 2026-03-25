import { m } from 'motion/react'
import { cn } from '@/shared/utils/cn'
import { BUTTON, LAYOUT } from '@/shared/constants/tokens'
import { HAMBURGER_SPRING } from '../constants'

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

/**
 * Botón hamburguesa animado con Motion (`m`).
 * Las tres líneas se transforman en X al abrirse.
 * Controlado externamente mediante `isOpen` y `onClick`.
 *
 * @param props - `isOpen`, `onClick` y `className` opcional.
 * @returns {JSX.Element} Botón accesible con tres barras animadas.
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
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      className={cn(
        BUTTON.special.icon,
        LAYOUT.flex.center,
        'h-11 w-11 flex-col gap-1.5 rounded-full p-0 md:hidden',
        className
      )}
    >
      <m.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={HAMBURGER_SPRING}
        className="bg-bg-strong block h-0.5 w-4.5 origin-center rounded-full"
      />
      <m.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
        className="bg-bg-strong block h-0.5 w-4.5 rounded-full"
      />
      <m.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={HAMBURGER_SPRING}
        className="bg-bg-strong block h-0.5 w-4.5 origin-center rounded-full"
      />
    </button>
  )
}
