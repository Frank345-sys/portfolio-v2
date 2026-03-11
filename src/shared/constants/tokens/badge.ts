import { ANIMATION } from './animation'

/**
 * Tokens de badges: base, tamaños, variantes, especiales, estado y grupos.
 *
 * @example
 * ```tsx
 * <span className={cn(BADGE.base.default, BADGE.variant.primary, BADGE.size.sm)}>
 *   Nuevo
 * </span>
 * ```
 */
export const BADGE = {
  base: {
    /** Base compartido */
    default: 'inline-flex items-center font-semibold rounded-full',

    /** Con icono */
    withIcon: 'inline-flex items-center gap-1.5',

    /** Con dot */
    withDot: 'inline-flex items-center gap-2',
  },

  size: {
    /** Pequeño */
    sm: 'px-2.5 py-0.5 text-xs',

    /** Mediano */
    md: 'px-3 py-1 text-sm',

    /** Grande */
    lg: 'px-4 py-1.5 text-base',
  },

  variant: {
    /** Badge primario */
    primary: 'bg-information-lighter text-information-dark',

    /** Badge de éxito */
    success: 'bg-success-lighter text-success-dark',

    /** Badge de error */
    error: 'bg-error-lighter text-error-dark',

    /** Badge de advertencia */
    warning: 'bg-warning-lighter text-warning-dark',

    /** Badge de feature/nuevo */
    feature: 'bg-feature-lighter text-feature-dark',

    /** Badge neutral */
    neutral: 'bg-soft text-subtle',

    /** Badge oscuro */
    dark: 'bg-strong text-white',

    /** Badge con outline */
    outline: 'bg-white border-2 border-stroke-subtle text-strong',
  },

  special: {
    /** Dot de estado (online/offline) */
    dot: 'w-2 h-2 rounded-full',

    /** New badge (esquina superior derecha) */
    new: 'absolute -top-2 -right-2 bg-error-base text-white px-2 py-0.5 text-xs font-bold rounded-full',

    /** Counter/número */
    counter:
      'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-error-base text-white text-xs font-bold rounded-full',

    /** Pill grande (categoría, tag) */
    pill: `px-4 py-2 bg-weak text-subtle text-sm font-medium rounded-full hover:bg-soft ${ANIMATION.transition.colors}`,

    /** Chip seleccionable */
    chip: `px-4 py-2 bg-white border-2 border-stroke-soft text-subtle text-sm font-medium rounded-full hover:border-information-base hover:bg-information-lighter hover:text-information-dark ${ANIMATION.transition.default} cursor-pointer`,

    /** Chip seleccionado */
    chipActive:
      'px-4 py-2 bg-information-base text-white text-sm font-medium rounded-full',
  },

  status: {
    /** Online/activo */
    online: 'bg-success-lighter text-success-dark',

    /** Offline/inactivo */
    offline: 'bg-soft text-subtle',

    /** Ocupado */
    busy: 'bg-warning-lighter text-warning-dark',

    /** Ausente */
    away: 'bg-idle-lighter text-idle-dark',
  },

  group: {
    /** Grupo horizontal */
    horizontal: 'inline-flex flex-wrap gap-2',

    /** Grupo vertical */
    vertical: 'flex flex-col gap-2',
  },
} as const

/** Claves del objeto BADGE.size */
export type BadgeSizeKey = keyof typeof BADGE.size
/** Claves del objeto BADGE.variant */
export type BadgeVariantKey = keyof typeof BADGE.variant
/** Claves del objeto BADGE.special */
export type BadgeSpecialKey = keyof typeof BADGE.special
/** Claves del objeto BADGE.status */
export type BadgeStatusKey = keyof typeof BADGE.status
/** Claves del objeto BADGE.group */
export type BadgeGroupKey = keyof typeof BADGE.group
