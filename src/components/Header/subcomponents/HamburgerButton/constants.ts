/**
 * Datos estáticos, copy y claves usados por el submódulo «HamburgerButton».
 *
 * @fileoverview Variants Motion y presets spreadables (`HAMBURGER_BAR_*`) para las
 * tres barras del ícono; re-exporta `HEADER_MOBILE_DRAWER_PANEL_ID`.
 * @remarks Sin lógica ni efectos — solo constantes declarativas. Los valores
 * numéricos (`y`, `rotate`) deben coincidir con el diseño del ícono; cambiarlos
 * rompe la ilusión de «X» y requiere ajustar los tests de snapshot del botón.
 */

/** Re-export de `../../constants/navigation` — co-localiza la dependencia de `HamburgerButton` sin importar desde el módulo raíz. */
export { HEADER_MOBILE_DRAWER_PANEL_ID } from '../../constants/navigation'

import { MOTION_ANIMATION } from '@/shared/constants/motionAnimations'

import type { Variants } from 'motion/react'

/** Línea superior: en `open` rota 45° y baja 6 px — forma la diagonal izquierda de la «X» de cierre. */
const hamburgerBarTopVariants: Variants = {
  open: { rotate: 45, y: 6 },
  closed: { rotate: 0, y: 0 },
}

/** Línea media: en `open` desaparece con fade y colapsa horizontalmente — elimina la barra central. */
const hamburgerBarMidVariants: Variants = {
  open: { opacity: 0, scaleX: 0 },
  closed: { opacity: 1, scaleX: 1 },
}

/** Línea inferior: en `open` rota -45° y sube 6 px — forma la diagonal derecha de la «X» de cierre. */
const hamburgerBarBottomVariants: Variants = {
  open: { rotate: -45, y: -6 },
  closed: { rotate: 0, y: 0 },
}

type HamburgerBarMotionPreset = {
  readonly variants: Variants
  readonly initial: 'closed'
  readonly transition?: (typeof MOTION_ANIMATION.spring)['control']
}

/**
 * Barras superior e inferior del ícono hamburguesa (spring de control).
 * Uso: `<m.span {...HAMBURGER_BAR_TOP} animate={toggleState} />`.
 */
export const HAMBURGER_BAR_TOP = {
  variants: hamburgerBarTopVariants,
  initial: 'closed',
  transition: MOTION_ANIMATION.spring.control,
} as const satisfies HamburgerBarMotionPreset

/** Barra media — fade y colapso sin spring explícito. */
export const HAMBURGER_BAR_MID = {
  variants: hamburgerBarMidVariants,
  initial: 'closed',
} as const satisfies HamburgerBarMotionPreset

/**
 * @see {@link HAMBURGER_BAR_TOP} — misma transición spring en la barra inferior.
 */
export const HAMBURGER_BAR_BOTTOM = {
  variants: hamburgerBarBottomVariants,
  initial: 'closed',
  transition: MOTION_ANIMATION.spring.control,
} as const satisfies HamburgerBarMotionPreset
