/**
 * Breakpoints alineados con Tailwind (`@theme` / prefijos `xs`, `sm`, `md`, `lg`, …).
 *
 * Valores por defecto de Tailwind v4 en píxeles. Si añades `--breakpoint-xs`, `--breakpoint-sm`, etc.
 * en `src/index.css` (`@theme`), actualiza los valores en este módulo para que coincidan.
 *
 * @module shared/constants/breakpoints
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.
 */

/**
 * Anchos mínimos (px) por prefijo Tailwind: clase `xs:` → viewport ≥ `xs`, etc.
 * (Referencia alineada con `index.css` / `@theme`; no exportar evita falso "unused" en análisis estático.)
 */
export const BREAKPOINT_MIN_PX = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

/**
 * Media queries `min-width` alineadas con los prefijos Tailwind.
 * Uso: `window.matchMedia(MEDIA_QUERY_LG_MIN).matches`
 */
export const MEDIA_QUERY_LG_MIN =
  `(min-width: ${BREAKPOINT_MIN_PX.lg}px)` as const // ≥ 1024px

/** Media query para respetar `prefers-reduced-motion: reduce` (autoplay, Lenis, transiciones CSS). */
export const MEDIA_QUERY_REDUCED_MOTION =
  '(prefers-reduced-motion: reduce)' as const
