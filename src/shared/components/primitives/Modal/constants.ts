/**
 * Datos estáticos, copy y claves usados por el submódulo «Modal».
 *
 * @fileoverview Centraliza valores importados por componentes colindantes; evita cadenas mágicas en el JSX.
 * @remarks Los cambios de texto o `href` suelen requerir actualizar tests que fijen el contrato de la sección.
 */

import { MOTION_ANIMATION } from '@/shared/constants/motionAnimations'

import type { Variants } from 'motion/react'

const PANEL_VARIANTS_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: MOTION_ANIMATION.easing.standard },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3, ease: MOTION_ANIMATION.easing.standard },
  },
}

export const PANEL_VARIANTS = {
  variants: PANEL_VARIANTS_VARIANTS,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
} as const satisfies {
  readonly variants: Variants
  readonly initial: 'hidden'
  readonly animate: 'visible'
  readonly exit: 'exit'
}
