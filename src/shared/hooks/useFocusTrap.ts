import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

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

  // Guardar foco anterior y mover al primer elemento al activar
  useEffect(() => {
    if (isActive) {
      previousFocusRef.current = document.activeElement as HTMLElement
      const first =
        containerRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      first?.focus()
    } else {
      previousFocusRef.current?.focus()
    }
  }, [isActive])

  // Trampa de foco con Tab / Shift+Tab
  useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusables =
        containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (!focusables || focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
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
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isActive])

  return containerRef
}
