import { motion } from 'motion/react'
import { cn } from '@/shared/utils/cn'
import { BUTTON } from '@/shared/constants/tokens/button'
import { HAMBURGER_SPRING } from '../constants'

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

/**
 * Botón hamburguesa animado con Framer Motion.
 * Las tres líneas se transforman en X al abrirse.
 * Controlado externamente mediante `isOpen` y `onClick`.
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
        'flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md p-0 md:hidden',
        className
      )}
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={HAMBURGER_SPRING}
        className="bg-text-strong block h-[2px] w-[18px] origin-center rounded-full"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
        className="bg-text-strong block h-[2px] w-[18px] rounded-full"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={HAMBURGER_SPRING}
        className="bg-text-strong block h-[2px] w-[18px] origin-center rounded-full"
      />
    </button>
  )
}
