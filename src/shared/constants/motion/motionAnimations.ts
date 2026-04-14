import type { Variants } from 'motion/react'

/**
 * Curvas de easing reutilizables para Motion.
 * Fuente única para mantener consistencia entre componentes animados.
 */
export const MOTION_ANIMATION = {
  easing: {
    /** Salidas suaves para transiciones de entrada/salida de cards y paneles. */
    expressive: [0.25, 0.46, 0.45, 0.94] as const,
    /** Curva estándar para transiciones de estado en UI. */
    standard: [0.4, 0, 0.2, 1] as const,
    /** Curva con desaceleración marcada para movimientos más largos. */
    smoothOut: [0.23, 1, 0.32, 1] as const,
  },
  spring: {
    /** Spring base para toggles y controles compactos (hamburger, theme switch). */
    control: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    } as const,
  },
} as const

const overlayFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: MOTION_ANIMATION.easing.standard },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: MOTION_ANIMATION.easing.standard },
  },
}

const presenceFadeExpressiveVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: MOTION_ANIMATION.easing.expressive },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: MOTION_ANIMATION.easing.expressive },
  },
}

/**
 * Overlay / velo con `AnimatePresence` (easing standard).
 * Uso: `<m.div {...OVERLAY_FADE} />`.
 */
export const OVERLAY_FADE = {
  variants: overlayFadeVariants,
  initial: 'hidden' as const,
  animate: 'visible' as const,
  exit: 'exit' as const,
}

/**
 * Fade al alternar contenido con `key` (easing expressive; p. ej. etiqueta del tema).
 * Más notorio que {@link OVERLAY_FADE}.
 * Uso: `<m.span {...PRESENCE_FADE_EXPRESSIVE} />`.
 */
export const PRESENCE_FADE_EXPRESSIVE = {
  variants: presenceFadeExpressiveVariants,
  initial: 'hidden' as const,
  animate: 'visible' as const,
  exit: 'exit' as const,
}
