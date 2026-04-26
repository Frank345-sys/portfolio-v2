/**
 * Scroll-spy por `IntersectionObserver` según ítems de navegación.
 *
 * @module components/Header/hooks/useNavScrollSpy
 */
import { useEffect, useRef, useState } from 'react'

import { hashSectionId } from '@/shared/utils/hashSectionId'

import { NAV_SCROLL_SPY_OBSERVER_OPTIONS } from '../constants'

import type { NavItem } from '../types'

const MAIN_LAZY_ROOT_ID = 'contenido-principal'

/**
 * Observa las secciones del documento asociadas a `navItems` (mismo orden que la nav)
 * y devuelve el `href` activo: el **último** ítem cuyo elemento (`#id` → `getElementById(id)`)
 * intersecta la zona del viewport definida en {@link NAV_SCROLL_SPY_OBSERVER_OPTIONS}.
 *
 * - Solo participan ítems con `href` tipo `#id` y con nodo presente en el DOM.
 * - Pasa una referencia **estable** a `navItems` (p. ej. constante importada) si el padre
 *   re-renderiza a menudo, para no recrear el observer en cada frame.
 * - Si las secciones se montan **después** del primer render (p. ej. `React.lazy` bajo
 *   el `<main id="contenido-principal">`), se re-registra el observer vía
 *   `MutationObserver` cuando aparezcan los nodos.
 */
export function useNavScrollSpy(
  navItems: ReadonlyArray<NavItem>
): string | null {
  const [activeHref, setActiveHref] = useState<string | null>(null)
  const intersectingRef = useRef(new Map<Element, boolean>())

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const intersecting = intersectingRef.current
    const lastOrderedKeyRef = { current: '' as string }
    const observerInstanceRef: { current: IntersectionObserver | null } = {
      current: null,
    }
    const lastObservedEls: Element[] = []
    let rafId: number | null = null
    let mo: MutationObserver | null = null

    const disconnect = () => {
      observerInstanceRef.current?.disconnect()
      observerInstanceRef.current = null
      for (const el of lastObservedEls) {
        intersecting.delete(el)
      }
      lastObservedEls.length = 0
    }

    const buildOrdered = (): { href: string; el: Element }[] => {
      const ordered: { href: string; el: Element }[] = []
      for (const item of navItems) {
        const id = hashSectionId(item.href)
        if (!id) continue
        const el = document.getElementById(id)
        if (el) ordered.push({ href: item.href, el })
      }
      return ordered
    }

    const runSetup = () => {
      const ordered = buildOrdered()
      const key = ordered.map((o) => o.href).join('|')

      if (ordered.length === 0) {
        disconnect()
        lastOrderedKeyRef.current = ''
        setActiveHref(null)
        return
      }

      if (key === lastOrderedKeyRef.current && observerInstanceRef.current) {
        return
      }
      lastOrderedKeyRef.current = key
      disconnect()

      const callback: IntersectionObserverCallback = (observedEntries) => {
        for (const entry of observedEntries) {
          intersecting.set(entry.target, entry.isIntersecting)
        }

        let next: string | null = null
        for (const { href, el } of ordered) {
          if (intersecting.get(el)) next = href
        }
        setActiveHref(next)
      }

      const observer = new IntersectionObserver(
        callback,
        NAV_SCROLL_SPY_OBSERVER_OPTIONS
      )
      observerInstanceRef.current = observer

      for (const { el } of ordered) {
        intersecting.set(el, false)
        lastObservedEls.push(el)
        observer.observe(el)
      }
    }

    runSetup()

    const schedule = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(() => {
        rafId = null
        runSetup()
      })
    }

    const main = document.getElementById(MAIN_LAZY_ROOT_ID)
    if (main) {
      mo = new MutationObserver(() => {
        schedule()
      })
      mo.observe(main, { childList: true, subtree: true })
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      mo?.disconnect()
      disconnect()
      lastOrderedKeyRef.current = ''
    }
  }, [navItems])

  return activeHref
}
