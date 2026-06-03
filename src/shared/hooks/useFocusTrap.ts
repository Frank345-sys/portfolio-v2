/**
 * Trampa de foco (Tab) dentro de un contenedor mientras la superposición está activa.
 *
 * @fileoverview Al activarse enfoca el primer control focable; al desactivarse restaura el foco al elemento previo.
 * @remarks Escucha `keydown` en captura para ciclar Tab entre elementos del contenedor devuelto por la ref.
 */

import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
}

/**
 * Atrapa el foco dentro de un contenedor mientras `isActive` sea true.
 * Al activarse mueve el foco al primer elemento interactivo.
 * Al desactivarse devuelve el foco al elemento que lo tenía antes.
 *
 * @param isActive - Si es true, se aplica la trampa Tab y se enfoca el primer control.
 * @returns ref a asignar al contenedor que debe atrapar el foco
 *
 * @example
 * ```tsx
 * const drawerRef = useFocusTrap<HTMLDivElement>(isOpen)
 * <div ref={drawerRef}>...</div>
 * ```
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  isActive: boolean
) {
  const containerRef = useRef<T>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive) {
      previousFocusRef.current?.focus()
      return
    }

    // Capturar foco saliente justo al activar, no antes.
    // `document.activeElement` es `Element | null` en TS; en navegadores reales el foco solo
    // recae sobre `HTMLElement` focables (botones, inputs, [tabindex]), por lo que `.focus()`
    // existe en el target — el cast acota el tipo a la API que vamos a invocar.
    previousFocusRef.current = document.activeElement as HTMLElement

    const container = containerRef.current
    if (!container) return

    const focusables = getFocusableElements(container)
    focusables[0]?.focus()

    // Trampa Tab calculando focusables una sola vez por activación
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      // Re-query por si el DOM cambió (ej: pasos de un wizard)
      const current = getFocusableElements(container)
      const first = current[0]
      const last = current[current.length - 1]
      if (!first || !last) return

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive])

  return containerRef
}
