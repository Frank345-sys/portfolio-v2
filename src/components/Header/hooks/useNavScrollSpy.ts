/**
 * Scroll-spy por `IntersectionObserver` según ítems de navegación (`#id` ↔ `getElementById`).
 *
 * Las opciones del observer (`rootMargin`, `threshold`) viven en este archivo junto a la lógica
 * que las consume, para ajustarlas si cambia la altura del header o la sensibilidad del spy.
 *
 * @module components/Header/hooks/useNavScrollSpy
 * @fileoverview Elige el `href` de nav activo según qué sección intersecta la banda del viewport bajo la cabecera fija.
 * @remarks `IntersectionObserver` con `rootMargin` calibrado; si las secciones llegan lazy, re-registra vía `MutationObserver` bajo el main de contenido.
 */
import { useEffect, useRef, useState } from 'react'

import { hashSectionId } from '@/shared/utils/hashSectionId'

import type { NavItem } from '../types'
import type { Dispatch, RefObject, SetStateAction } from 'react'

/**
 * Desplazamiento superior del área de intersección del scroll-spy (px), alineado con
 * la cabecera fija aproximada. Si cambia mucho la altura del header, revisar este valor.
 */
const HEADER_SCROLL_SPY_TOP_OFFSET_PX = 80 as const

/** Opciones de `IntersectionObserver` para scroll-spy: banda bajo la cabecera fija. */
const NAV_SCROLL_SPY_OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: `-${HEADER_SCROLL_SPY_TOP_OFFSET_PX}px 0px -45% 0px`,
  threshold: [0, 0.1],
} as const

/** Primer ítem con ancla interna; fallback cuando el IO aún no entregó intersecciones. */
function getFirstNavHashHref(navItems: ReadonlyArray<NavItem>): string | null {
  for (const item of navItems) {
    if (hashSectionId(item.href)) return item.href
  }
  return null
}

/**
 * Último `href` intersectando en orden de nav; si ninguno lo hace, conserva el anterior
 * (evita parpadeos del subrayado desktop entre secciones).
 */
function resolveActiveHrefFromIntersection(
  sections: { href: string; el: Element }[],
  intersecting: Map<Element, boolean>,
  previous: string | null,
  navItems: ReadonlyArray<NavItem>
): string | null {
  let next: string | null = null
  for (const { href, el } of sections) {
    if (intersecting.get(el)) next = href
  }
  if (next !== null) return next
  if (previous !== null) return previous
  return getFirstNavHashHref(navItems)
}

interface AttachNavScrollSpyOptions {
  navItemsRef: RefObject<ReadonlyArray<NavItem>>
  intersecting: Map<Element, boolean>
  setActiveHref: Dispatch<SetStateAction<string | null>>
  lazyRootId: string
}

/**
 * Monta `IntersectionObserver` + `MutationObserver` (secciones lazy) y devuelve cleanup.
 * Vive fuera del hook para que `useNavScrollSpy` solo gestione estado React.
 */
function attachNavScrollSpy({
  navItemsRef,
  intersecting,
  setActiveHref,
  lazyRootId,
}: AttachNavScrollSpyOptions): () => void {
  let lastSectionsKey = ''
  let observer: IntersectionObserver | null = null
  const observedElements: Element[] = []
  let rafId: number | null = null
  let mo: MutationObserver | null = null

  const disconnectObserver = () => {
    observer?.disconnect()
    observer = null
    for (const el of observedElements) {
      intersecting.delete(el)
    }
    observedElements.length = 0
  }

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

      setActiveHref((previous) =>
        resolveActiveHrefFromIntersection(
          sections,
          intersecting,
          previous,
          navItemsRef.current
        )
      )
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

  const scheduleSyncObserver = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
    rafId = requestAnimationFrame(() => {
      rafId = null
      syncObserver()
    })
  }

  syncObserver()

  const main = document.getElementById(lazyRootId)
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
}

/**
 * Observa las secciones del documento asociadas a `navItems` (mismo orden que la nav)
 * y devuelve el `href` activo: el **último** ítem cuyo elemento (`#id` → `getElementById(id)`)
 * intersecta la zona del viewport definida en {@link NAV_SCROLL_SPY_OBSERVER_OPTIONS}.
 *
 * - Solo participan ítems con `href` tipo `#id` y con nodo presente en el DOM.
 * - Pasa una referencia **estable** a `navItems` (p. ej. constante importada) si el padre
 *   re-renderiza a menudo, para no recrear el observer en cada frame.
 * - Si las secciones se montan **después** del primer render (p. ej. `React.lazy` bajo
 *   el `<main>` de contenido), se re-registra el observer vía `MutationObserver` cuando
 *   aparezcan los nodos (`lazyRootId`, por defecto `contenido-principal`).
 *
 * @param lazyRootId - `id` del `<main>` donde se montan secciones lazy; default del portfolio.
 */
export function useNavScrollSpy(
  navItems: ReadonlyArray<NavItem>,
  lazyRootId = 'contenido-principal'
): string | null {
  const [activeHref, setActiveHref] = useState<string | null>(() =>
    getFirstNavHashHref(navItems)
  )
  const navItemsRef = useRef(navItems)

  useEffect(() => {
    navItemsRef.current = navItems
  }, [navItems])

  const [intersecting] = useState(() => new Map<Element, boolean>())

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    return attachNavScrollSpy({
      navItemsRef,
      intersecting,
      setActiveHref,
      lazyRootId,
    })
  }, [lazyRootId, intersecting])

  return activeHref
}
