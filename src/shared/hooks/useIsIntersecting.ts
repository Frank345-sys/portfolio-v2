/**
 * Visibilidad en viewport mediante `IntersectionObserver` (ref + boolean).
 *
 * @fileoverview Devuelve `[ref, isIntersecting]` para pausar animaciones o autoplay fuera de pantalla.
 * @remarks Re-observa al cambiar `threshold` o `rootMargin` vía callback ref.
 */
import { useRef, useState } from 'react'

export interface UseIsIntersectingOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * Devuelve `true` mientras el elemento referenciado intersecta el viewport según las opciones del observer.
 */
export function useIsIntersecting<T extends HTMLElement = HTMLElement>(
  options: UseIsIntersectingOptions = {}
): [(el: T | null) => void, boolean] {
  const { threshold = 0, rootMargin = '0px' } = options
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  function ref(el: T | null) {
    observerRef.current?.disconnect()
    observerRef.current = null

    if (!el) {
      setIsIntersecting(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsIntersecting(entry.isIntersecting)
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    observerRef.current = observer
  }

  return [ref, isIntersecting]
}
