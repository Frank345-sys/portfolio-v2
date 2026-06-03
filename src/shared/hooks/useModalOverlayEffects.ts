/**
 * Efectos de documento para overlays: Escape cierra y Lenis se pausa mientras el modal está abierto.
 *
 * @fileoverview Con `isOpen`, registra `keydown` (Escape → `onClose`) y llama `lenis.stop()` / `start()` en cleanup.
 * @remarks No fija `overflow` en el `body`; combina con estilos del overlay (p. ej. `overflow-hidden`) si el diseño lo requiere.
 */

import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

interface UseModalOverlayEffectsParams {
  /** Si es true, se activan Escape, bloqueo de desplazamiento y pausa de Lenis. */
  isOpen: boolean
  /** Invocado al pulsar Escape mientras el overlay está abierto. */
  onClose: () => void
}

/**
 * Efectos de documento para modales, drawers y lightboxes: cierre con Escape y pausa de Lenis.
 *
 * @example
 * ```tsx
 * useModalOverlayEffects({ isOpen, onClose })
 * ```
 */
export function useModalOverlayEffects({
  isOpen,
  onClose,
}: UseModalOverlayEffectsParams): void {
  const lenis = useLenis()

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    lenis?.stop()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      lenis?.start()
    }
  }, [isOpen, onClose, lenis])
}
