/**
 * Tokens de animación: transiciones, hover, fade, slide, bounce, spin, pulse, stagger, scroll y loading.
 *
 * @example
 * ```tsx
 * <div className={ANIMATION.transition.default}>...</div>
 * <div className={ANIMATION.hover.lift}>...</div>
 * ```
 */
export const ANIMATION = {
  transition: {
    /** Transición rápida */
    fast: 'transition-all duration-150 ease-in-out',

    /** Transición normal */
    default: 'transition-all duration-300 ease-in-out',

    /** Transición lenta */
    slow: 'transition-all duration-500 ease-in-out',

    /** Solo colores */
    colors: 'transition-colors duration-300 ease-in-out',

    /** Solo opacidad */
    opacity: 'transition-opacity duration-300 ease-in-out',

    /** Solo transform */
    transform: 'transition-transform duration-300 ease-in-out',
  },

  hover: {
    /** Escala al hover */
    scale: 'hover:scale-105 transition-transform duration-300',

    /** Escala pequeña */
    scaleSmall: 'hover:scale-102 transition-transform duration-300',

    /** Escala grande */
    scaleLarge: 'hover:scale-110 transition-transform duration-300',

    /** Elevar (shadow + translate) */
    lift: 'hover:-translate-y-1 hover:shadow-lg transition-all duration-300',

    /** Brillo */
    glow: 'hover:shadow-lg hover:shadow-information-lighter transition-shadow duration-300',

    /** Underline animado */
    underline:
      'relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-information-base after:transition-all after:duration-300 hover:after:w-full',
  },

  fade: {
    /** Fade in */
    in: 'animate-in fade-in duration-700',

    /** Fade in desde arriba */
    inFromTop: 'animate-in fade-in slide-in-from-top-4 duration-700',

    /** Fade in desde abajo */
    inFromBottom: 'animate-in fade-in slide-in-from-bottom-4 duration-700',

    /** Fade in desde izquierda */
    inFromLeft: 'animate-in fade-in slide-in-from-left-4 duration-700',

    /** Fade in desde derecha */
    inFromRight: 'animate-in fade-in slide-in-from-right-4 duration-700',

    /** Fade out */
    out: 'animate-out fade-out duration-300',
  },

  slide: {
    /** Slide desde arriba */
    fromTop: 'animate-in slide-in-from-top-8 duration-500',

    /** Slide desde abajo */
    fromBottom: 'animate-in slide-in-from-bottom-8 duration-500',

    /** Slide desde izquierda */
    fromLeft: 'animate-in slide-in-from-left-8 duration-500',

    /** Slide desde derecha */
    fromRight: 'animate-in slide-in-from-right-8 duration-500',
  },

  bounce: {
    /** Bounce suave */
    soft: 'animate-bounce',

    /** Bounce al hover */
    onHover: 'hover:animate-bounce',
  },

  spin: {
    /** Spin continuo */
    continuous: 'animate-spin',

    /** Spin lento */
    slow: 'animate-spin duration-3000',
  },

  pulse: {
    /** Pulso continuo */
    continuous: 'animate-pulse',

    /** Pulso al hover */
    onHover: 'hover:animate-pulse',
  },

  stagger: {
    /** Para usar con group-hover en contenedores */
    child1: 'transition-all duration-300 delay-0',
    child2: 'transition-all duration-300 delay-75',
    child3: 'transition-all duration-300 delay-150',
    child4: 'transition-all duration-300 delay-200',
    child5: 'transition-all duration-300 delay-300',
  },

  scroll: {
    /** Revelar al hacer scroll (usar con Intersection Observer) */
    reveal: 'opacity-0 translate-y-8 transition-all duration-700',

    /** Estado visible (agregar cuando entra en viewport) */
    visible: 'opacity-100 translate-y-0',
  },

  loading: {
    /** Skeleton loader */
    skeleton: 'animate-pulse bg-soft rounded',

    /** Spinner */
    spinner:
      'animate-spin rounded-full border-2 border-stroke-soft border-t-information-base',
  },
} as const

/** Claves del objeto ANIMATION.transition */
export type TransitionKey = keyof typeof ANIMATION.transition
/** Claves del objeto ANIMATION.hover */
export type HoverKey = keyof typeof ANIMATION.hover
/** Claves del objeto ANIMATION.fade */
export type FadeKey = keyof typeof ANIMATION.fade
/** Claves del objeto ANIMATION.slide */
export type SlideKey = keyof typeof ANIMATION.slide
/** Claves del objeto ANIMATION.bounce */
export type BounceKey = keyof typeof ANIMATION.bounce
/** Claves del objeto ANIMATION.spin */
export type SpinKey = keyof typeof ANIMATION.spin
/** Claves del objeto ANIMATION.pulse */
export type PulseKey = keyof typeof ANIMATION.pulse
/** Claves del objeto ANIMATION.stagger */
export type StaggerKey = keyof typeof ANIMATION.stagger
/** Claves del objeto ANIMATION.scroll */
export type ScrollKey = keyof typeof ANIMATION.scroll
/** Claves del objeto ANIMATION.loading */
export type LoadingKey = keyof typeof ANIMATION.loading
