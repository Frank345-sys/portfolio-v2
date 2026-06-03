/**
 * Visibilidad en viewport mediante `IntersectionObserver` (ref + boolean).
 *
 * @fileoverview Devuelve `[ref, isIntersecting]` para pausar animaciones o autoplay fuera de pantalla.
 * @remarks Re-observa al cambiar `threshold` o `rootMargin`; el ref sigue el tipo `RefObject<T | null>` de React 19.
 */
import { useEffect, useRef, useState, type RefObject } from 'react'

export interface UseIsIntersectingOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * Devuelve `true` mientras el elemento referenciado intersecta el viewport según las opciones del observer.
 */
export function useIsIntersecting<T extends HTMLElement = HTMLElement>(
  options: UseIsIntersectingOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0, rootMargin = '0px' } = options
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsIntersecting(entry.isIntersecting)
      },
      { threshold, rootMargin }
    )
    queueMicrotask(() => {
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, isIntersecting]
}
