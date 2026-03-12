import type { Variants } from 'motion/react'
import type { NavItem } from './types'

/** Ítems de navegación por defecto */
export const DEFAULT_NAV_ITEMS: ReadonlyArray<NavItem> = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

/** Spring compartido para las líneas del botón hamburguesa */
export const HAMBURGER_SPRING = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
} as const

/** Variantes de animación del overlay */
export const OVERLAY_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } },
}

/** Variantes de animación del drawer */
export const DRAWER_VARIANTS: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
}
