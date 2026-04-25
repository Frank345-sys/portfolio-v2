/**
 * Breakpoints alineados con Tailwind (`@theme` / prefijos `xs`, `sm`, `md`, `lg`, …).
 *
 * Valores por defecto de Tailwind v4 en píxeles. Si añades `--breakpoint-xs`, `--breakpoint-sm`, etc.
 * en `src/index.css` (`@theme`), actualiza los valores en este módulo para que coincidan.
 *
 * @module shared/constants/breakpoints
 */

/**
 * Anchos mínimos (px) por prefijo Tailwind: clase `xs:` → viewport ≥ `xs`, etc.
 * (Referencia alineada con `index.css` / `@theme`; no exportar evita falso "unused" en análisis estático.)
 */
const BREAKPOINT_MIN_PX = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

/**
 * Media query `min-width` para viewport ≥ `lg` (1024px), alineada con scroll sync
 * en Projects. El resto de prefijos: `(min-width: ${BREAKPOINT_MIN_PX[clave]}px)`.
 */
export const MEDIA_QUERY_LG_MIN = `(min-width: ${BREAKPOINT_MIN_PX.lg}px)`
