/**
 * Constantes del tema claro/oscuro del sitio.
 *
 * @fileoverview Clave de `localStorage` y colores de `meta theme-color`.
 * @remarks Mantener alineado con el script anti-FOUC en `index.html`.
 */

export const THEME_STORAGE_KEY = 'theme' as const

/** Coincide con `html { background-color: var(--color-bg-white) }` y tokens en `.dark`. */
export const THEME_COLOR_HEX = {
  light: '#ffffff',
  dark: '#171717',
} as const

export type Theme = 'light' | 'dark'

/** Comprueba si un valor de storage es un tema válido. */
export function isTheme(value: string | null | undefined): value is Theme {
  return value === 'light' || value === 'dark'
}
