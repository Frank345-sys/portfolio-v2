import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'

interface UseModalOverlayEffectsParams {
  /** Si es true, se activan Escape, bloqueo de scroll y pausa de Lenis. */
  isOpen: boolean
  /** Invocado al pulsar Escape mientras el overlay está abierto. */
  onClose: () => void
}

/**
 * Efectos de documento para modales, drawers y lightboxes: cierre con Escape,
 * bloqueo de scroll en `body`/`html`, `overscroll-behavior: none` y pausa de Lenis.
 * Restaura estilos y reanuda Lenis al cerrar o desmontar.
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
  const lenisRef = useRef(lenis)

  useLayoutEffect(() => {
    lenisRef.current = lenis
  }, [lenis])

  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    const activeLenis = lenisRef.current
    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverscroll = document.body.style.overscrollBehavior
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    activeLenis?.stop()
    return () => {
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overscrollBehavior = prevBodyOverscroll
      activeLenis?.start()
    }
  }, [isOpen])
}
