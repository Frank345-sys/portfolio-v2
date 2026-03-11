import { ANIMATION } from './animation'

/**
 * Tokens de botones inspirados en Material UI: contained, outlined y text.
 * El base está incluido internamente en cada variante — solo combinar
 * BUTTON.variant.* + BUTTON.size.* con cn().
 *
 * Tokens usados:
 *  Colores  → text-text-*, bg-bg-*, border-stroke-*
 *             text-information-base/dark, bg-information-lighter
 *             text-error-base, text-success-base, text-warning-base, etc.
 *  Sombras  → shadow-elevation-xs | sm | md | lg
 *  Animación → ANIMATION.transition.default (transition-all duration-300 ease-in-out)
 *
 * @example
 * ```tsx
 * <button className={cn(BUTTON.variant.contained.primary, BUTTON.size.md)}>
 *   Enviar
 * </button>
 * ```
 */

/** Clases base compartidas por todas las variantes — no usar directo en componentes */
const base = `inline-flex items-center justify-center font-medium tracking-wide rounded-lg ${ANIMATION.transition.default} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none select-none uppercase text-[0.8125rem] leading-[1.75] cursor-pointer`

export const BUTTON = {
  size: {
    /** Tamaño pequeño */
    sm: 'px-[10px] py-[6px] text-[0.8125rem]',

    /** Tamaño mediano */
    md: 'px-4 py-2 text-[0.875rem]',

    /** Tamaño grande */
    lg: 'px-[22px] py-[10px] text-[0.9375rem]',

    /** Tamaño extra grande — solo para CTAs aislados */
    xl: 'px-7 py-3 text-base',

    /** Escala automática: sm en mobile → md en tablet → lg en desktop */
    responsive:
      'px-[10px] sm:px-4 md:px-[22px] py-[6px] sm:py-2 md:py-[10px] text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem]',
  },

  variant: {
    /**
     * Contained — relleno sólido, máxima prominencia.
     */
    contained: {
      primary: `${base} bg-information-base text-text-white shadow-elevation-sm hover:bg-blue-700 hover:shadow-elevation-md active:bg-blue-800 active:shadow-elevation-xs focus-visible:ring-information-base`,
      success: `${base} bg-success-base text-text-white shadow-elevation-sm hover:bg-green-700 hover:shadow-elevation-md active:bg-green-800 active:shadow-elevation-xs focus-visible:ring-success-base`,
      danger: `${base} bg-error-base text-text-white shadow-elevation-sm hover:bg-red-700 hover:shadow-elevation-md active:bg-red-800 active:shadow-elevation-xs focus-visible:ring-error-base`,
      warning: `${base} bg-warning-base text-text-white shadow-elevation-sm hover:bg-orange-700 hover:shadow-elevation-md active:bg-orange-800 active:shadow-elevation-xs focus-visible:ring-warning-base`,
      dark: `${base} bg-bg-strong text-text-white shadow-elevation-sm hover:bg-bg-surface hover:shadow-elevation-md active:shadow-elevation-xs focus-visible:ring-stroke-strong`,
    },

    /**
     * Outlined — borde fino, fondo transparente.
     */
    outlined: {
      primary: `${base} bg-transparent text-information-base border-2 border-information-base hover:bg-information-lighter active:bg-information-light/30 focus-visible:ring-information-base`,
      success: `${base} bg-transparent text-success-base border-2 border-success-base hover:bg-success-lighter active:bg-success-light/30 focus-visible:ring-success-base`,
      danger: `${base} bg-transparent text-error-base border-2 border-error-base hover:bg-error-lighter active:bg-error-light/30 focus-visible:ring-error-base`,
      warning: `${base} bg-transparent text-warning-base border-2 border-warning-base hover:bg-warning-lighter active:bg-warning-light/30 focus-visible:ring-warning-base`,
      neutral: `${base} bg-transparent text-text-strong border-2 border-stroke-subtle hover:bg-bg-soft hover:border-stroke-strong active:bg-bg-subtle focus-visible:ring-stroke-strong`,
    },

    /**
     * Text — sin borde ni fondo, mínima prominencia.
     */
    text: {
      primary: `${base} bg-transparent text-information-base hover:bg-information-lighter active:bg-information-light/40 focus-visible:ring-information-base`,
      success: `${base} bg-transparent text-success-base hover:bg-success-lighter active:bg-success-light/40 focus-visible:ring-success-base`,
      danger: `${base} bg-transparent text-error-base hover:bg-error-lighter active:bg-error-light/40 focus-visible:ring-error-base`,
      warning: `${base} bg-transparent text-warning-base hover:bg-warning-lighter active:bg-warning-light/40 focus-visible:ring-warning-base`,
      neutral: `${base} bg-transparent text-text-strong hover:bg-bg-soft active:bg-bg-subtle focus-visible:ring-stroke-strong`,
    },
  },

  special: {
    /**
     * CTA hero — máximo impacto, sombra elevada, hover suave.
     */
    cta: `inline-flex items-center justify-center gap-2 px-7 py-3 text-[0.9375rem] font-medium tracking-widest uppercase rounded-lg bg-information-base text-text-white shadow-elevation-md hover:bg-blue-700 hover:shadow-elevation-lg active:bg-blue-800 active:shadow-elevation-sm ${ANIMATION.transition.default} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-information-base focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none select-none cursor-pointer`,

    /** Botón icono circular — sin borde, hover fondo soft */
    icon: `p-2 rounded-full text-text-subtle hover:bg-bg-soft active:bg-bg-subtle ${ANIMATION.transition.colors} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-information-base disabled:opacity-40 disabled:pointer-events-none cursor-pointer`,

    /** Botón link simple — underline animado */
    link: `inline-flex items-center gap-1.5 text-information-base hover:text-information-dark font-medium underline underline-offset-4 decoration-information-light hover:decoration-information-base ${ANIMATION.transition.colors} cursor-pointer`,
  },

  group: {
    /** Grupo horizontal de botones */
    horizontal: 'inline-flex gap-2 sm:gap-3 flex-wrap',

    /** Grupo vertical de botones */
    vertical: 'flex flex-col gap-2 sm:gap-3',

    /** Botones pegados (button group) */
    attached:
      'inline-flex [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:border-l-0',
  },
} as const

/** Claves del objeto BUTTON.size */
export type ButtonSizeKey = keyof typeof BUTTON.size
/** Claves del objeto BUTTON.variant */
export type ButtonVariantKey = keyof typeof BUTTON.variant
/** Claves del objeto BUTTON.special */
export type ButtonSpecialKey = keyof typeof BUTTON.special
/** Claves del objeto BUTTON.group */
export type ButtonGroupKey = keyof typeof BUTTON.group
