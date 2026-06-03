/**
 * Constantes compartidas del proyecto (`shared/constants/tokens/button.ts`).
 *
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.
 */

import { cn } from '@/shared/utils/cn'

import { ANIMATION } from './animation'

// ─────────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────────

/** Paletas de color disponibles para todas las variantes. */
type Palette = 'primary' | 'neutral' | 'error'

/** Mapa tipado de variantes para un conjunto de paletas `P`. */
type VariantMap<P extends string> = Record<P, string>

/**
 * Clases de paleta por modo, compartidas entre botones de texto e ícono.
 * Cada entrada representa solo las clases que difieren entre paletas —
 * la base del modo se aplica por separado en la fábrica.
 *
 * @internal
 */
type PaletteClasses = VariantMap<Palette>

// ─────────────────────────────────────────────────────────────────────────────
// Bases compartidas (interno)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clases compartidas por **todos** los botones — texto e ícono.
 * Layout, transición, accesibilidad y estados globales.
 *
 * @internal — no usar directamente; componer vía {@link base} o {@link iconBase}.
 */
const baseShared = cn(
  'inline-flex shrink-0 items-center justify-center gap-2',
  ANIMATION.transition.default,
  'focus-visible:ring-2 focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-40',
  'cursor-pointer select-none'
)

/**
 * Base para botones de texto.
 * Extiende {@link baseShared} con tipografía, radio y `focus:outline-none`.
 *
 * @internal — usar vía {@link makeVariant}.
 */
const base = cn(
  baseShared,
  'rounded-lg text-[0.8125rem] leading-[1.75] font-medium tracking-wide uppercase',
  'focus:outline-none'
)

/**
 * Base para botones de ícono circular.
 * Extiende {@link baseShared} con radio `full`, padding propio y `focus-visible:outline-none`.
 *
 * @internal — usar vía {@link makeIconVariant}.
 */
const iconBase = cn(
  baseShared,
  'rounded-full p-1',
  'focus-visible:outline-none'
)

// ── Bases por modo ────────────────────────────────────────────────────────────

/** @internal */
const baseOutline = 'bg-transparent border-2 shadow-none'

/** @internal */
const baseLighter = 'border border-transparent shadow-none'

/** @internal */
const baseText = 'bg-transparent shadow-none'

// ─────────────────────────────────────────────────────────────────────────────
// Fábricas (interno)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Une {@link base} con las clases del modo y la paleta.
 * Los conflictos se resuelven con `twMerge` ({@link cn}).
 *
 * @internal
 */
const makeVariant = (...classes: string[]): string => cn(base, ...classes)

/**
 * Une {@link iconBase} con las clases del modo y la paleta.
 * Misma semántica que {@link makeVariant} pero para botones de ícono circular.
 *
 * @internal
 */
const makeIconVariant = (...classes: string[]): string =>
  cn(iconBase, ...classes)

// ─────────────────────────────────────────────────────────────────────────────
// Clases de paleta por modo (fuente única — texto e ícono comparten estos datos)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clases de paleta para el modo **solid**.
 * Se aplican directamente sobre {@link base} / {@link iconBase} — el modo solid
 * no tiene base de modo propia (sin sombra, sin borde, sin `bg-transparent`).
 *
 * @internal
 */
const solidPalette = {
  primary: cn(
    'bg-information-base text-white',
    'hover:bg-information-dark',
    'active:bg-information-dark/40',
    'focus-visible:ring-information-dark'
  ),
  neutral: cn(
    'bg-neutral-base text-text-white',
    'hover:bg-neutral-dark',
    'active:bg-neutral-dark/40',
    'focus-visible:ring-neutral-dark'
  ),
  error: cn(
    'bg-error-base text-white',
    'hover:bg-error-dark',
    'active:bg-error-dark/40',
    'focus-visible:ring-error-dark'
  ),
} satisfies PaletteClasses

/**
 * Clases de paleta para el modo **outline**.
 * Se aplican sobre {@link baseOutline} tanto en botón de texto como de ícono.
 *
 * @internal
 */
const outlinePalette = {
  primary: cn(
    'text-information-base border-information-base',
    'hover:bg-information-light hover:border-information-base',
    'active:border-information-light active:bg-information-light/40',
    'focus-visible:ring-information-base'
  ),
  neutral: cn(
    'text-neutral-base border-neutral-base',
    'hover:bg-neutral-light hover:border-neutral-base',
    'active:border-neutral-light active:bg-neutral-light/40',
    'focus-visible:ring-neutral-base'
  ),
  error: cn(
    'text-error-base border-error-base',
    'hover:bg-error-light hover:border-error-base',
    'active:border-error-light active:bg-error-light/40',
    'focus-visible:ring-error-base'
  ),
} satisfies PaletteClasses

/**
 * Clases de paleta para el modo **lighter**.
 * Se aplican sobre {@link baseLighter} tanto en botón de texto como de ícono.
 *
 * @internal
 */
const lighterPalette = {
  primary: cn(
    'bg-information-lighter text-information-base',
    'hover:bg-information-light active:bg-information-light/40',
    'focus-visible:ring-information-base'
  ),
  neutral: cn(
    'bg-neutral-lighter text-neutral-base',
    'hover:bg-neutral-light active:bg-neutral-light/40',
    'focus-visible:ring-neutral-base'
  ),
  error: cn(
    'bg-error-lighter text-error-base',
    'hover:bg-error-light active:bg-error-light/40',
    'focus-visible:ring-error-base'
  ),
} satisfies PaletteClasses

/**
 * Clases de paleta para el modo **text**.
 * Se aplican sobre {@link baseText} tanto en botón de texto como de ícono.
 *
 * @internal
 */
const textPalette = {
  primary: cn(
    'text-information-base',
    'hover:bg-information-light active:bg-information-light/40',
    'focus-visible:ring-information-base'
  ),
  neutral: cn(
    'text-neutral-base',
    'hover:bg-neutral-light active:bg-neutral-light/40',
    'focus-visible:ring-neutral-base'
  ),
  error: cn(
    'text-error-base',
    'hover:bg-error-light active:bg-error-light/40',
    'focus-visible:ring-error-base'
  ),
} satisfies PaletteClasses

// ─────────────────────────────────────────────────────────────────────────────
// Mapas de variante por modo
// Texto e ícono se generan desde la misma paleta — fuente única de verdad.
// ─────────────────────────────────────────────────────────────────────────────

/** Modo **solid** — botón de texto. */
const solid = {
  primary: makeVariant(solidPalette.primary),
  neutral: makeVariant(solidPalette.neutral),
  error: makeVariant(solidPalette.error),
} satisfies VariantMap<Palette>

/** Modo **outline** — botón de texto. */
const outline = {
  primary: makeVariant(baseOutline, outlinePalette.primary),
  neutral: makeVariant(baseOutline, outlinePalette.neutral),
  error: makeVariant(baseOutline, outlinePalette.error),
} satisfies VariantMap<Palette>

/** Modo **lighter** — botón de texto. */
const lighter = {
  primary: makeVariant(baseLighter, lighterPalette.primary),
  neutral: makeVariant(baseLighter, lighterPalette.neutral),
  error: makeVariant(baseLighter, lighterPalette.error),
} satisfies VariantMap<Palette>

/** Modo **text** — botón de texto. */
const text = {
  primary: makeVariant(baseText, textPalette.primary),
  neutral: makeVariant(baseText, textPalette.neutral),
  error: makeVariant(baseText, textPalette.error),
} satisfies VariantMap<Palette>

/** Modo **solid** — botón de ícono. */
const iconSolid = {
  primary: makeIconVariant(solidPalette.primary),
  neutral: makeIconVariant(solidPalette.neutral),
  error: makeIconVariant(solidPalette.error),
} satisfies VariantMap<Palette>

/** Modo **outline** — botón de ícono. */
const iconOutline = {
  primary: makeIconVariant(baseOutline, outlinePalette.primary),
  neutral: makeIconVariant(baseOutline, outlinePalette.neutral),
  error: makeIconVariant(baseOutline, outlinePalette.error),
} satisfies VariantMap<Palette>

/** Modo **lighter** — botón de ícono. */
const iconLighter = {
  primary: makeIconVariant(baseLighter, lighterPalette.primary),
  neutral: makeIconVariant(baseLighter, lighterPalette.neutral),
  error: makeIconVariant(baseLighter, lighterPalette.error),
} satisfies VariantMap<Palette>

/** Modo **text** — botón de ícono. */
const iconText = {
  primary: makeIconVariant(baseText, textPalette.primary),
  neutral: makeIconVariant(baseText, textPalette.neutral),
  error: makeIconVariant(baseText, textPalette.error),
} satisfies VariantMap<Palette>

// ─────────────────────────────────────────────────────────────────────────────
// Export público
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tokens de diseño para botones.
 *
 * ## Composición básica
 * Combina `BUTTON.variant.<modo>.<paleta>` con `BUTTON.size.*` usando `cn()`:
 * ```tsx
 * <button className={cn(BUTTON.variant.solid.primary, BUTTON.size.md)}>
 *   Enviar
 * </button>
 * ```
 *
 * ## Botones de ícono
 * Mismos modos y paletas que `variant`, vía `special.icon.<modo>.<paleta>`.
 * Siempre agregar `aria-label` descriptivo:
 * ```tsx
 * <button className={BUTTON.special.icon.solid.primary} aria-label="Guardar">
 *   <Icon />
 * </button>
 * ```
 *
 * ## Especiales autónomos
 * ```tsx
 * <button className={BUTTON.special.cta}>Comenzar</button>
 * ```
 *
 * ## Grupos de botones
 * ```tsx
 * <div className={BUTTON.group.horizontal}>
 *   <button>Cancelar</button>
 *   <button>Aceptar</button>
 * </div>
 * ```
 */
export const BUTTON = {
  // ── Tamaños ───────────────────────────────────────────────────────────────
  size: {
    /** Compacto. Para uso puntual; preferir `md` en la mayoría de los casos. */
    sm: 'px-3 py-2 text-sm',

    /** Uso general — la mayoría de las acciones. */
    md: 'px-4 py-2 text-[0.875rem]',

    /** Mayor presencia: acciones secundarias destacadas, toolbars. */
    lg: 'px-[22px] py-[10px] text-[0.9375rem]',

    /** Se adapta al breakpoint del viewport. */
    responsive:
      'px-2.5 sm:px-4 md:px-[22px] py-1.5 sm:py-2 md:py-2.5 text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem]',
  },

  // ── Variantes ─────────────────────────────────────────────────────────────
  variant: {
    /** Fondo relleno con sombra. */
    solid,
    /** Borde visible, fondo transparente. */
    outline,
    /** Fondo tenue de la paleta. */
    lighter,
    /** Sin fondo ni borde. */
    text,
  },

  // ── Especiales ────────────────────────────────────────────────────────────
  special: {
    /**
     * Call-to-action de alto impacto.
     * Sombra prominente y padding generoso. Usar de forma aislada.
     */
    cta: makeVariant(
      'gap-2 px-7 py-3 text-[0.9375rem]',
      'bg-information-base text-white shadow-elevation-md',
      'hover:bg-information-dark hover:shadow-elevation-lg',
      'active:bg-information-dark/40 active:shadow-elevation-sm',
      'focus-visible:ring-information-base'
    ),

    /**
     * Botón de ícono circular sin etiqueta visible.
     * Mismos modos y paletas que `variant` — `solid` · `outline` · `lighter` · `text`
     * × `primary` · `neutral` · `error`. Requiere `aria-label` descriptivo.
     *
     * @example
     * ```tsx
     * <button className={BUTTON.special.icon.text.neutral} aria-label="Cerrar">
     *   <XIcon />
     * </button>
     * ```
     */
    icon: {
      solid: iconSolid,
      outline: iconOutline,
      lighter: iconLighter,
      text: iconText,
    },
  },

  // ── Grupos ────────────────────────────────────────────────────────────────
  group: {
    /** Botones en fila con separación y ajuste de línea. */
    horizontal: 'inline-flex gap-2 sm:gap-3 flex-wrap',

    /** Botones apilados verticalmente. */
    vertical: 'flex flex-col gap-2 sm:gap-3',

    /**
     * Botones unidos sin separación (estilo segmented control).
     * Los bordes interiores se eliminan automáticamente.
     */
    attached:
      'inline-flex [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:border-l-0',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Tipos derivados
// ─────────────────────────────────────────────────────────────────────────────

/** Modos visuales disponibles en `BUTTON.variant`. */
export type ButtonVariantMode = keyof typeof BUTTON.variant
