import { ANIMATION } from './animation'

const base =
  'inline-flex items-center gap-2 font-semibold rounded-full' as const

/**
 * Tokens de badges: tamaños, variantes semánticas, especiales, estado y grupos.
 *
 * Composición general:
 * - `BADGE.variant.*` y `BADGE.status.*` se combinan con `BADGE.size.*` via cn().
 * - `BADGE.special.*` son componentes completos — ya incluyen tamaño propio.
 *
 * @example
 * ```tsx
 * // Badge estándar
 * <span className={cn(BADGE.variant.primary, BADGE.size.sm)}>Nuevo</span>
 *
 * // Chip seleccionable
 * <button className={isActive ? BADGE.special.chipActive : BADGE.special.chip}>
 *   React
 * </button>
 *
 * // Dot de estado
 * <span className={cn(BADGE.special.dot, 'bg-success-base')} />
 * ```
 */
export const BADGE = {
  // ── Tamaños ───────────────────────────────────────────────────────────────
  size: {
    /** @use Etiquetas compactas, tablas, espacios muy densos. */
    sm: 'px-2.5 py-0.5 text-xs',

    /** @use Uso general. */
    md: 'px-3 py-1 text-sm',

    /** @use Badges destacados en hero o cabeceras de sección. */
    lg: 'px-4 py-1.5 text-base',
  },

  // ── Variantes semánticas ──────────────────────────────────────────────────
  variant: {
    /**
     * @use Estados informativos, novedades, categorías neutras.
     * @combine BADGE.size.* via cn() para controlar el tamaño.
     */
    primary: `${base} bg-information-light text-information-dark`,

    /**
     * @use Confirmaciones, estados completados, validaciones positivas.
     * @combine BADGE.size.* via cn().
     */
    success: `${base} bg-success-light text-success-dark`,

    /**
     * @use Errores, estados críticos, elementos bloqueados.
     * @combine BADGE.size.* via cn().
     */
    error: `${base} bg-error-light text-error-dark`,

    /**
     * @use Advertencias, acciones preventivas, estados en riesgo.
     * @combine BADGE.size.* via cn().
     */
    warning: `${base} bg-warning-light text-warning-dark`,

    /**
     * @use Novedades de producto, features nuevas, betas.
     * @combine BADGE.size.* via cn().
     */
    feature: `${base} bg-feature-light text-feature-dark`,

    /**
     * @use Categorías sin carga semántica, tags genéricos.
     * @combine BADGE.size.* via cn().
     */
    neutral: `${base} bg-bg-soft text-text-subtle`,

    /**
     * @use Máximo contraste — sobre fondos claros o imágenes.
     * @combine BADGE.size.* via cn().
     */
    dark: `${base} bg-bg-strong text-text-white`,

    /**
     * @use Badges sutiles sin relleno — sobre fondos blancos o cards.
     * @combine BADGE.size.* via cn().
     */
    outline: `${base} bg-bg-white border border-stroke-subtle text-text-strong`,
  },

  // ── Especiales ────────────────────────────────────────────────────────────
  // Componentes completos con tamaño propio.
  // NO combinar con BADGE.size.* — generaría conflicto de padding.
  special: {
    /**
     * @use Indicador circular de color — presencia, disponibilidad, estado.
     * @combine Color de fondo con cn(): `cn(BADGE.special.dot, 'bg-success-base')`
     * @nocombine BADGE.size.* (es un dot de tamaño fijo, no un badge de texto)
     */
    dot: 'w-2.5 h-2.5 rounded-full shrink-0',

    /**
     * @use Notificación de novedad sobre un elemento — posición absoluta esquina superior derecha.
     * @warning El padre debe tener `position: relative` para que el posicionamiento funcione.
     * @nocombine BADGE.size.* (ya tiene padding propio)
     */
    new: 'absolute -top-2 -right-2 z-10 bg-error-base text-text-white px-2 py-0.5 text-xs font-bold rounded-full',

    /**
     * @use Contador de notificaciones o items — número dentro de un círculo pequeño.
     * @nocombine BADGE.size.* (ya tiene dimensiones mínimas propias)
     */
    counter:
      'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-error-base text-text-white text-xs font-bold rounded-full',

    /**
     * @use Tags de categoría, etiquetas de contenido, pills de filtro no interactivos.
     * @nocombine BADGE.size.* (tamaño propio), BADGE.variant.* (estilo propio)
     */
    pill: `px-4 py-2 bg-bg-weak text-text-subtle text-sm font-medium rounded-full hover:bg-bg-soft ${ANIMATION.transition.colors}`,

    /**
     * @use Filtros o tags seleccionables — estado no activo.
     *      Usar en `<button>` — tiene cursor y estados hover/active.
     * @combine BADGE.special.chipActive — alternar entre ambos según estado.
     * @nocombine BADGE.size.* (tamaño propio), BADGE.variant.* (estilo propio)
     */
    chip: `px-4 py-2 bg-bg-white border-2 border-stroke-soft text-text-subtle text-sm font-medium rounded-full cursor-pointer hover:border-information-base hover:bg-information-lighter hover:text-information-dark ${ANIMATION.transition.default}`,

    /**
     * @use Filtros o tags seleccionables — estado activo.
     *      Usar en `<button>` — alternar con chip según estado.
     * @combine BADGE.special.chip — alternar entre ambos según estado.
     * @nocombine BADGE.size.* (tamaño propio), BADGE.variant.* (estilo propio)
     */
    chipActive:
      'px-4 py-2 bg-information-base text-text-white text-sm font-medium rounded-full',
  },

  // ── Estado / presencia ────────────────────────────────────────────────────
  status: {
    /**
     * @use Indicador de presencia activa — usuario online, servicio activo.
     * @combine BADGE.size.* via cn().
     * @warning Usar solo sobre `bg-bg-white` — el fondo success-base pierde
     *          contraste dentro de otros badges de color.
     */
    online: `${base} bg-success-base text-text-white`,

    /**
     * @use Indicador de presencia inactiva — usuario offline, servicio caído.
     * @combine BADGE.size.* via cn().
     */
    offline: `${base} bg-bg-soft text-text-subtle`,

    /**
     * @use Indicador de ocupado — usuario en reunión, servicio con carga alta.
     * @combine BADGE.size.* via cn().
     */
    busy: `${base} bg-warning-light text-warning-dark`,

    /**
     * @use Indicador de ausencia temporal — usuario ausente, servicio en mantenimiento.
     * @combine BADGE.size.* via cn().
     */
    away: `${base} bg-idle-light text-idle-dark`,
  },

  group: {
    /** @use Grupo de badges en fila — filtros, categorías, tags. */
    horizontal: 'inline-flex flex-wrap gap-2',

    /** @use Grupo de badges apilados — listas de estado, listados verticales. */
    vertical: 'flex flex-col gap-2',
  },
} as const

export type BadgeCategory = keyof typeof BADGE
export type BadgeVariant<C extends BadgeCategory> = keyof (typeof BADGE)[C]

export type BadgeSizeKey = BadgeVariant<'size'>
export type BadgeVariantKey = BadgeVariant<'variant'>
export type BadgeSpecialKey = BadgeVariant<'special'>
export type BadgeStatusKey = BadgeVariant<'status'>
export type BadgeGroupKey = BadgeVariant<'group'>
