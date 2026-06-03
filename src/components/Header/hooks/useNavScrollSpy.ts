/**
 * Scroll-spy por `IntersectionObserver` según ítems de navegación (`#id` ↔ `getElementById`).
 *
 * Las opciones del observer (`rootMargin`, `threshold`) viven en este archivo junto a la lógica
 * que las consume, para ajustarlas si cambia la altura del header o la sensibilidad del spy.
 *
 * @module components/Header/hooks/useNavScrollSpy
 * @fileoverview Elige el `href` de nav activo según qué sección intersecta la banda del viewport bajo la cabecera fija.
 * @remarks `IntersectionObserver` con `rootMargin` calibrado; si las secciones llegan lazy, re-registra vía `MutationObserver` bajo `#contenido-principal`.
 */
import { useEffect, useRef, useState } from 'react'

import { hashSectionId } from '@/shared/utils/hashSectionId'

import type { NavItem } from '../types'

const MAIN_LAZY_ROOT_ID = 'contenido-principal' as const

/**
 * Desplazamiento superior del área de intersección del scroll-spy (px), alineado con
 * la cabecera fija aproximada. Si cambia mucho la altura del header, revisar este valor.
 */
const HEADER_SCROLL_SPY_TOP_OFFSET_PX = 80 as const

/** Opciones de `IntersectionObserver` para scroll-spy: banda bajo la cabecera fija y
 * por encima del fondo del viewport (evita que varias secciones altas activen todo a la vez). */
const NAV_SCROLL_SPY_OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: `-${HEADER_SCROLL_SPY_TOP_OFFSET_PX}px 0px -45% 0px`,
  threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
} as const

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
  const navItemsRef = useRef(navItems)

  useEffect(() => {
    navItemsRef.current = navItems
  }, [navItems])

  /** Último estado `isIntersecting` por elemento observado (solo dentro del effect). */
  const intersectingByEl = useRef(new Map<Element, boolean>())

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const intersecting = intersectingByEl.current
    // Clave de la última lista sincronizada: hrefs unidos por '|'; evita recrear el observer si el DOM no cambió.
    let lastSectionsKey = ''
    let observer: IntersectionObserver | null = null
    const observedElements: Element[] = []
    // RAF pendiente para debounce del MutationObserver.
    let rafId: number | null = null
    // MutationObserver que detecta secciones lazy montadas bajo #contenido-principal.
    let mo: MutationObserver | null = null

    /** Desconecta el observer activo y limpia el mapa de intersección. */
    const disconnectObserver = () => {
      observer?.disconnect()
      observer = null
      for (const el of observedElements) {
        intersecting.delete(el)
      }
      observedElements.length = 0
    }

    /** Lista ordenada de `{ href, el }` para ítems con nodo en el DOM (observables). */
    const getObservableSections = (): { href: string; el: Element }[] => {
      const sections: { href: string; el: Element }[] = []
      for (const item of navItemsRef.current) {
        const id = hashSectionId(item.href)
        if (!id) continue
        const el = document.getElementById(id)
        if (el) sections.push({ href: item.href, el })
      }
      return sections
    }

    /**
     * Crea o recrea el `IntersectionObserver` si la lista de elementos observados cambió.
     * Usa `lastSectionsKey` para evitar recreaciones innecesarias cuando el DOM no cambió.
     */
    const syncObserver = () => {
      const sections = getObservableSections()
      const sectionsKey = sections.map((o) => o.href).join('|')

      if (sections.length === 0) {
        disconnectObserver()
        lastSectionsKey = ''
        return
      }

      if (sectionsKey === lastSectionsKey && observer) {
        return
      }
      lastSectionsKey = sectionsKey
      disconnectObserver()

      const callback: IntersectionObserverCallback = (observedEntries) => {
        for (const entry of observedEntries) {
          intersecting.set(entry.target, entry.isIntersecting)
        }

        let next: string | null = null
        for (const { href, el } of sections) {
          if (intersecting.get(el)) next = href
        }
        setActiveHref(next)
      }

      const nextObserver = new IntersectionObserver(
        callback,
        NAV_SCROLL_SPY_OBSERVER_OPTIONS
      )
      observer = nextObserver

      for (const { el } of sections) {
        intersecting.set(el, false)
        observedElements.push(el)
        nextObserver.observe(el)
      }
    }

    queueMicrotask(() => {
      syncObserver()
    })

    /** Debounce de `syncObserver` en un `requestAnimationFrame` para no disparar en cada mutación del DOM. */
    const scheduleSyncObserver = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(() => {
        rafId = null
        syncObserver()
      })
    }

    const main = document.getElementById(MAIN_LAZY_ROOT_ID)
    if (main) {
      mo = new MutationObserver(() => {
        scheduleSyncObserver()
      })
      mo.observe(main, { childList: true, subtree: true })
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      mo?.disconnect()
      disconnectObserver()
      lastSectionsKey = ''
    }
  }, [])

  return activeHref
}
