/**
 * Breakpoints alineados con Tailwind (`@theme` / prefijos `sm`, `md`, `lg`, …).
 *
 * Valores por defecto de Tailwind v4 en píxeles. Si añades `--breakpoint-sm`, etc.
 * en `src/index.css` (`@theme`), actualiza {@link BREAKPOINT_MIN_PX} para que coincidan.
 *
 * @module shared/constants/breakpoints
 */

/**
 * Anchos mínimos (px) por prefijo Tailwind: clase `sm:` → viewport ≥ `sm`, etc.
 */
export const BREAKPOINT_MIN_PX = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type BreakpointMinToken = keyof typeof BREAKPOINT_MIN_PX

/** Ancho mínimo del breakpoint Tailwind `sm` (640px). */
export const BREAKPOINT_SM_MIN_PX = BREAKPOINT_MIN_PX.sm

/** Ancho mínimo del breakpoint Tailwind `md` (768px). */
export const BREAKPOINT_MD_MIN_PX = BREAKPOINT_MIN_PX.md

/** Ancho mínimo del breakpoint Tailwind `lg` (1024px). */
export const BREAKPOINT_LG_MIN_PX = BREAKPOINT_MIN_PX.lg

/** Ancho mínimo del breakpoint Tailwind `xl` (1280px). */
export const BREAKPOINT_XL_MIN_PX = BREAKPOINT_MIN_PX.xl

/** Ancho mínimo del breakpoint Tailwind `2xl` (1536px). */
export const BREAKPOINT_2XL_MIN_PX = BREAKPOINT_MIN_PX['2xl']

/** Media query para viewport ≥ `sm`. */
export const MEDIA_QUERY_SM_MIN = `(min-width: ${BREAKPOINT_SM_MIN_PX}px)`

/** Media query para viewport ≥ `md`. */
export const MEDIA_QUERY_MD_MIN = `(min-width: ${BREAKPOINT_MD_MIN_PX}px)`

/** Media query para viewport ≥ `lg` — mismo criterio que scroll sync en Projects. */
export const MEDIA_QUERY_LG_MIN = `(min-width: ${BREAKPOINT_LG_MIN_PX}px)`

/** Media query para viewport ≥ `xl`. */
export const MEDIA_QUERY_XL_MIN = `(min-width: ${BREAKPOINT_XL_MIN_PX}px)`

/** Media query para viewport ≥ `2xl`. */
export const MEDIA_QUERY_2XL_MIN = `(min-width: ${BREAKPOINT_2XL_MIN_PX}px)`
