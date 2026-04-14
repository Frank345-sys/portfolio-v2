/**
 * Scroll-spy por `IntersectionObserver` según ítems de navegación.
 *
 * @module components/Header/hooks/useNavScrollSpy
 */
import { useEffect, useRef, useState } from 'react'
import { hashSectionId } from '@/shared/utils/hashSectionId'
import { NAV_SCROLL_SPY_OBSERVER_OPTIONS } from '../constants'
import type { NavItem } from '../types'

/**
 * Observa las secciones del documento asociadas a `navItems` (mismo orden que la nav)
 * y devuelve el `href` activo: el **último** ítem cuyo elemento (`#id` → `getElementById(id)`)
 * intersecta la zona del viewport definida en {@link NAV_SCROLL_SPY_OBSERVER_OPTIONS}.
 *
 * - Solo participan ítems con `href` tipo `#id` y con nodo presente en el DOM.
 * - Pasa una referencia **estable** a `navItems` (p. ej. constante importada) si el padre
 *   re-renderiza a menudo, para no recrear el observer en cada frame.
 */
export function useNavScrollSpy(
  navItems: ReadonlyArray<NavItem>
): string | null {
  const [activeHref, setActiveHref] = useState<string | null>(null)
  const intersectingRef = useRef(new Map<Element, boolean>())

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const intersecting = intersectingRef.current

    const ordered: { href: string; el: Element }[] = []
    for (const item of navItems) {
      const id = hashSectionId(item.href)
      if (!id) continue
      const el = document.getElementById(id)
      if (el) ordered.push({ href: item.href, el })
    }

    if (ordered.length === 0) return

    const observer = new IntersectionObserver((observedEntries) => {
      for (const entry of observedEntries) {
        intersecting.set(entry.target, entry.isIntersecting)
      }

      let next: string | null = null
      for (const { href, el } of ordered) {
        if (intersecting.get(el)) next = href
      }
      setActiveHref(next)
    }, NAV_SCROLL_SPY_OBSERVER_OPTIONS)

    for (const { el } of ordered) {
      intersecting.set(el, false)
      observer.observe(el)
    }

    return () => {
      observer.disconnect()
      for (const { el } of ordered) {
        intersecting.delete(el)
      }
    }
  }, [navItems])

  return activeHref
}
