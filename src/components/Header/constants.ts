/**
 * Constantes de la cabecera: ítems de nav por defecto, scroll-spy y Motion del drawer.
 *
 * @module components/Header/constants
 */
import type { Variants } from 'motion/react'
import { MOTION_ANIMATION } from '@/shared/constants'
import type { NavItem } from './types'

/**
 * Desplazamiento superior del área de intersección del scroll-spy (px), alineado con
 * la cabecera fija aproximada. Si cambia mucho la altura del header, revisar este valor.
 */
const HEADER_SCROLL_SPY_TOP_OFFSET_PX = 80

/**
 * Opciones de `IntersectionObserver` para scroll-spy: banda bajo la cabecera fija y
 * por encima del fondo del viewport (evita que varias secciones altas activen todo a la vez).
 */
export const NAV_SCROLL_SPY_OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: `-${HEADER_SCROLL_SPY_TOP_OFFSET_PX}px 0px -45% 0px`,
  threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
}

/**
 * Ítems de navegación por defecto del portfolio. Cada `href` `#…` debe coincidir con el
 * `id` de la sección en la página (p. ej. `#inicio`, `#sobre-mi`, `#proyectos`, `#contacto`).
 */
export const DEFAULT_NAV_ITEMS: ReadonlyArray<NavItem> = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

/** Spring compartido para las líneas del botón hamburguesa */
export const HAMBURGER_SPRING = MOTION_ANIMATION.spring.control

const drawerSlideVariants: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30, duration: 0.3 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30, duration: 0.3 },
  },
}

/**
 * Entrada/salida del panel móvil desde la derecha (`AnimatePresence`).
 * Uso: `<m.div {...DRAWER_SLIDE} />` o `const { variants, initial } = DRAWER_SLIDE`.
 */
export const DRAWER_SLIDE = {
  variants: drawerSlideVariants,
  initial: 'hidden' as const,
  animate: 'visible' as const,
  exit: 'exit' as const,
}
