/**
 * Hook de tema claro/oscuro; requiere {@link ThemeProvider} en el árbol.
 *
 * @fileoverview Lee el contexto de `ThemeProvider` (persistencia, clase `dark`, transición CSS).
 * @remarks El cambio de tema usa `.theme-transitioning` en `<html>`, no View Transitions API.
 */

import { use } from 'react'

import { ThemeContext, type ThemeContextValue } from '../ThemeProvider'

/**
 * Tema claro/oscuro compartido. Debe usarse bajo `<ThemeProvider>`.
 */
export function useTheme(): ThemeContextValue {
  const context = use(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }
  return context
}
