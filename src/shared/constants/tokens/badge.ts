/**
 * Constantes compartidas del proyecto (`shared/constants/tokens/badge.ts`).
 *
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.
 */

import { cn } from '@/shared/utils/cn'

// ─────────────────────────────────────────────────────────────────────────────
// Base compartida (interno)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clases base compartidas por todas las variantes de badge.
 *
 * @internal
 */
const base = 'inline-flex items-center gap-2 font-semibold rounded-full'

/**
 * Tamaño `sm` — una sola fuente de verdad para `BADGE.size.sm` y el default de
 * cada `BADGE.variant.<modo>.<paleta>` vía {@link make}.
 *
 * @internal
 */
const sizeSm = 'px-2.5 py-0.5 text-xs'

/**
 * Helpers internos por modo — badges no interactivos (sin hover/active como el botón).
 *
 * @internal
 */
const make = (...palette: string[]): string => cn(base, sizeSm, ...palette)

/** Paleta de {@link BADGE.variant.light.success} — `special.new` añade solo el borde. */
const lightSuccessPalette = 'bg-success-lighter text-success-base'

/**
 * Tokens de badges: tamaños, variantes semánticas, especiales, estado y grupos.
 *
 * ## Variantes (`BADGE.variant.<modo>.<paleta>`)
 * Misma filosofía que `BUTTON.variant`: **light**, **solid**, **outline**, **text**.
 * Todas incluyen `sizeSm` por defecto; para `md`, `lg` o `responsive` combinar en
 * **segundo** en `cn()` con `BADGE.size.*`.
 *
 * Paletas semánticas: `primary`, `success`, `error`, `warning`, `feature`,
 * `neutral`.
 *
 * - **light** — Fondos *-lighter* (lo que antes era el set único de `variant`).
 * - **solid** — Rellenos densos tipo botón filled.
 * - **outline** — Transparente + borde de color.
 * - **text** — Solo texto, sin borde perceptible (borde transparente para misma métrica).
 *
 * ## Otros
 * - `BADGE.status.*` usa la misma base que las variantes (incluye `size.sm` por
 *   defecto). Para `md`, `lg` o `responsive`, componer en **segundo**:
 *   `cn(BADGE.status.online, BADGE.size.md)` — igual que `BADGE.variant.*.*`.
 * - `BADGE.special.*` son componentes completos — ya incluyen tamaño propio.
 *
 * **Orden en este archivo:** imports → helpers internos → {@link BADGE}.
 *
 * @example
 * ```tsx
 * <span className={BADGE.variant.light.primary}>Etiqueta</span>
 * <span className={cn(BADGE.variant.solid.error, BADGE.size.md)}>Md</span>
 *
 * // Estado / tamaño — mismo orden que variant (tamaño en segundo término)
 * <span className={cn(BADGE.status.online, BADGE.size.md)}>En línea</span>
 *
 * // Dot de estado
 * <span className={cn(BADGE.special.dot, 'bg-success-base')} />
 * ```
 */
export const BADGE = {
  // ── Tamaños ───────────────────────────────────────────────────────────────
  size: {
    /** @use Etiquetas compactas, tablas, espacios muy densos (misma cadena que incluyen `BADGE.variant.*.*`). */
    sm: sizeSm,

    /** @use Uso general. */
    md: 'px-3 py-1 text-sm',

    /** @use Badges destacados en hero o cabeceras de sección. */
    lg: 'px-4 py-1.5 text-base',

    /**
     * @use Badges que deben adaptarse al ancho del viewport (equivalente a `sm` → `md` → `lg` por breakpoint).
     * @nocombine BADGE.special.* (tamaño propio en esos casos)
     */
    responsive:
      'px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 text-xs sm:text-sm md:text-base',
  },

  // ── Variantes por modo (light / solid / outline / text) + paleta semántica ──
  variant: {
    /**
     * Fondos pastel / *lighter* — apariencia suave por defecto en listados y filtros.
     */
    light: {
      primary: make('bg-information-lighter text-information-base'),
      success: make(lightSuccessPalette),
      error: make('bg-error-lighter text-error-base'),
      warning: make('bg-warning-lighter text-warning-base'),
      feature: make('bg-feature-lighter text-feature-base'),
      neutral: make('bg-bg-soft'),
    },

    /** Rellenos densos — máximo peso sobre el contenido cercano */
    solid: {
      primary: make('bg-information-base text-white'),
      success: make('bg-success-base text-white'),
      error: make('bg-error-base text-white'),
      warning: make('bg-warning-base text-white'),
      feature: make('bg-feature-base text-white'),
      neutral: make('bg-neutral-base text-text-white'),
    },

    /** Solo borde y texto — mismo criterio visual que outline de botón, sin hover */
    outline: {
      primary: make(
        'border border-information-base bg-transparent text-information-base'
      ),
      success: make(
        'border border-success-base bg-transparent text-success-base'
      ),
      error: make('border border-error-base bg-transparent text-error-base'),
      warning: make(
        'border border-warning-base bg-transparent text-warning-base'
      ),
      feature: make(
        'border border-feature-base bg-transparent text-feature-base'
      ),
      neutral: make(
        'border border-neutral-base bg-transparent text-neutral-base'
      ),
    },

    /** Solo tipografía coloreada — sin relleno ni borde visible */
    text: {
      primary: make(
        'border border-transparent bg-transparent text-information-base'
      ),
      success: make(
        'border border-transparent bg-transparent text-success-base'
      ),
      error: make('border border-transparent bg-transparent text-error-base'),
      warning: make(
        'border border-transparent bg-transparent text-warning-base'
      ),
      feature: make(
        'border border-transparent bg-transparent text-feature-base'
      ),
      neutral: make(
        'border border-transparent bg-transparent text-neutral-base'
      ),
    },
  },

  // ── Especiales ────────────────────────────────────────────────────────────
  // Componentes completos con tamaño propio.
  // NO combinar con BADGE.size.* — generaría conflicto de padding.
  special: {
    /**
     * @use Indicador circular de color — presencia, disponibilidad, estado.
     * @combine Tamaño + color via `cn()`:
     *          `cn(BADGE.special.dot, BADGE.special.dotSize.md, 'bg-success-base')`
     * @nocombine BADGE.size.* (es un dot, no un badge de texto)
     */
    dot: 'rounded-full shrink-0',

    dotSize: {
      /** @use Dot compacto en layouts densos. */
      sm: 'size-2',
      /** @use Dot estándar. */
      md: 'size-2.5',
      /** @use Dot destacado para métricas o estado principal. */
      lg: 'size-3',
      /** @use Dot extra grande para uso en hero o cabeceras de sección. */
      xl: 'size-4',
    },

    /**
     * @use Etiqueta de novedad — misma base que {@link BADGE.variant.light.success} más borde.
     * Posicionamiento (p. ej. `absolute`, offsets, `z-*`) debe aplicarlo el consumidor.
     * @nocombine BADGE.size.* (usa el mismo tamaño compacto que `variant.light.*`)
     */
    new: make(lightSuccessPalette, 'border border-success-base'),
  },

  // ── Estado / presencia ────────────────────────────────────────────────────
  status: {
    /**
     * @use Indicador de presencia activa — usuario online, servicio activo.
     * Incluye el mismo tamaño compacto (`size.sm`) que {@link BADGE.variant};
     * sobrescribir con `BADGE.size.md` \| `lg` \| `responsive` en **segundo** en {@link cn}.
     * @warning Usar solo sobre `bg-bg-white` — el fondo success-base pierde
     *          contraste dentro de otros badges de color.
     */
    online: make('bg-success-base text-text-white'),

    /**
     * @use Indicador de presencia inactiva — usuario offline, servicio caído.
     * @combine BADGE.size.* — segundo término en {@link cn}, como las variantes.
     */
    offline: make('bg-bg-soft text-text-subtle'),

    /**
     * @use Indicador de ocupado — usuario en reunión, servicio con carga alta.
     * @combine BADGE.size.* — segundo término en {@link cn}.
     */
    busy: make('bg-warning-lighter text-warning-base'),

    /**
     * @use Indicador de ausencia temporal — usuario ausente, servicio en mantenimiento.
     * @combine BADGE.size.* — segundo término en {@link cn}.
     */
    away: make('bg-idle-lighter text-idle-base'),
  },

  group: {
    /** @use Grupo de badges en fila — filtros, categorías, tags. */
    horizontal: 'inline-flex flex-wrap gap-2',

    /** @use Grupo de badges apilados — listas de estado, listados verticales. */
    vertical: 'flex flex-col gap-2',
  },
} as const
