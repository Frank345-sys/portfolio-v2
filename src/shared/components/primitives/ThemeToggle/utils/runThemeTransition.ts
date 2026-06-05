/**
 * Transición suave al cambiar tema vía clase `.theme-transitioning` en `<html>`.
 *
 * @fileoverview Aplica colores con `transition` CSS; sin View Transitions API ni reveal circular.
 * @remarks Con `prefers-reduced-motion: reduce` omite la clase y aplica el cambio al instante.
 */

/** Duración alineada con `.theme-transitioning` en `index.css` (ms). */
const CSS_THEME_TRANSITION_MS = 300 as const

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Ejecuta `updateDom` con transición suave de colores o de forma inmediata si el usuario prefiere menos movimiento.
 */
export function runThemeTransition(updateDom: () => void): void {
  if (prefersReducedMotion()) {
    updateDom()
    return
  }

  const root = document.documentElement
  root.classList.add('theme-transitioning')
  updateDom()
  window.setTimeout(() => {
    root.classList.remove('theme-transitioning')
  }, CSS_THEME_TRANSITION_MS)
}
