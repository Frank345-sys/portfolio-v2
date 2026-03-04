/**
 * Tokens de botones: base, tamaños, variantes, especiales y grupos.
 * Combinar BUTTON.base.default + BUTTON.variant.* + BUTTON.size.* con cn().
 *
 * @example
 * ```tsx
 * <button className={cn(BUTTON.base.default, BUTTON.variant.primary, BUTTON.size.md)}>
 *   Enviar
 * </button>
 * ```
 */
export const BUTTON = {
  base: {
    /** Base compartido por todos los botones */
    default:
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',

    /** Con icono */
    withIcon: 'inline-flex items-center gap-2 justify-center',
  },

  size: {
    /** Tamaño pequeño */
    sm: 'px-4 py-2 text-sm',

    /** Tamaño mediano */
    md: 'px-6 py-3 text-base',

    /** Tamaño grande */
    lg: 'px-8 py-4 text-lg',

    /** Tamaño extra grande (CTAs principales) */
    xl: 'px-10 py-5 text-xl',
  },

  variant: {
    /** Botón primario - máxima prominencia */
    primary:
      'bg-information-base text-white hover:bg-information-dark focus:ring-information-base shadow-sm hover:shadow-md',

    /** Botón secundario - outline */
    secondary:
      'bg-white text-strong border-2 border-stroke-subtle hover:bg-weak hover:border-stroke-strong focus:ring-information-base',

    /** Botón terciario - ghost/texto */
    tertiary:
      'bg-transparent text-information-base hover:bg-information-lighter focus:ring-information-base',

    /** Botón de éxito */
    success:
      'bg-success-base text-white hover:bg-success-dark focus:ring-success-base shadow-sm hover:shadow-md',

    /** Botón de peligro */
    danger:
      'bg-error-base text-white hover:bg-error-dark focus:ring-error-base shadow-sm hover:shadow-md',

    /** Botón de advertencia */
    warning:
      'bg-warning-base text-white hover:bg-warning-dark focus:ring-warning-base shadow-sm hover:shadow-md',

    /** Botón oscuro */
    dark: 'bg-strong text-white hover:bg-surface focus:ring-strong shadow-sm hover:shadow-md',

    /** Botón claro */
    light: 'bg-weak text-strong hover:bg-soft focus:ring-stroke-subtle',
  },

  special: {
    /** Botón CTA hero - máximo impacto */
    cta: 'px-10 py-5 text-xl font-bold bg-information-base text-white hover:bg-information-dark rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 focus:ring-2 focus:ring-information-base focus:ring-offset-2',

    /** Botón con gradiente */
    gradient:
      'px-8 py-4 text-lg font-semibold bg-gradient-to-r from-information-base to-information-dark text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105',

    /** Botón icono circular */
    icon: 'p-3 rounded-full bg-weak hover:bg-soft transition-colors focus:ring-2 focus:ring-information-base',

    /** Botón link simple */
    link: 'inline-flex items-center gap-1 text-information-base hover:text-information-dark font-medium underline underline-offset-2 transition-colors',
  },

  group: {
    /** Grupo horizontal de botones */
    horizontal: 'inline-flex gap-3 sm:gap-4 flex-wrap',

    /** Grupo vertical de botones */
    vertical: 'flex flex-col gap-3 sm:gap-4',

    /** Botones pegados (button group) */
    attached:
      'inline-flex [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none',
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
