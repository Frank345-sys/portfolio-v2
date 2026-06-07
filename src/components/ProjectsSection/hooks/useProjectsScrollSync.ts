/**
 * Observa bloques por proyecto solo en viewport **≥ lg** y mantiene `activeIndex` alineado al scroll.
 * Debajo de `lg` reposiciona `activeIndex` por proximidad al centro del viewport.
 *
 * @module components/ProjectsSection/hooks/useProjectsScrollSync
 * @fileoverview Sincroniza `activeIndex` con scroll: `IntersectionObserver` en viewport ≥ lg y fallback por distancia al centro en móvil.
 * @remarks Usa Lenis si existe; los refs de bloques deben alinearse con `itemCount` y limpiar timeouts al salir de lg.
 */

import { useLenis } from 'lenis/react'
import { useEffect, useRef, useState } from 'react'

import { MEDIA_QUERY_LG_MIN } from '@/shared/constants/breakpoints'

/** Espera antes de actualizar `activeIndex` tras cambiar el bloque más visible (transición en panel lateral). */
const PROJECTS_SCROLL_ACTIVE_INDEX_TRANSITION_MS = 150 as const

/** Umbrales del `IntersectionObserver` para muestrear `intersectionRatio` por bloque de proyecto. */
const PROJECTS_SCROLL_INTERSECTION_THRESHOLDS = [0, 0.5, 1] as const

interface PanelSyncUi {
  activeIndex: number
  showInfo: boolean
}

interface UseProjectsScrollSyncResult {
  /** Índice del proyecto cuyo bloque tiene mayor ratio de intersección visible. */
  activeIndex: number
  /** `visible` en `ProjectInfo`: breve `false` al cambiar proyecto con scroll sync (transición); `true` el resto del tiempo y en móvil tras reset. */
  showInfo: boolean
  /** Solo en viewport ≥ lg: observer + sidebar sincronizados con el scroll. */
  scrollSyncEnabled: boolean
  /** Registra el nodo DOM del bloque de proyecto `index` (callback de `ref`). */
  setItemRef: (index: number, el: HTMLElement | null) => void
  /** Desplaza el bloque del índice dado al viewport (p. ej. al pulsar un ítem en la lista). */
  scrollItemIntoView: (index: number) => void
}

/**
 * Sincroniza el índice de proyecto activo con el scroll mediante IntersectionObserver.
 * El índice activo es el bloque con mayor `intersectionRatio` visible.
 * En viewports por debajo de `lg` el observer no se registra (lista apilada con su propio texto).
 *
 * @param itemCount - Número de proyectos en la lista (debe coincidir con refs renderizados).
 * @param onExitLgLayout - Invocado en el listener `change` de `matchMedia` al pasar por debajo de `lg` (p. ej. cerrar `ProjectPreviewModal`). No es un `useEffect`.
 */
export function useProjectsScrollSync(
  itemCount: number,
  onExitLgLayout?: () => void
): UseProjectsScrollSyncResult {
  const [panelUi, setPanelUi] = useState<PanelSyncUi>({
    activeIndex: 0,
    showInfo: true,
  })
  const [scrollSyncEnabled, setScrollSyncEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(MEDIA_QUERY_LG_MIN).matches
  })
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const visibilityRatiosRef = useRef<Array<number>>([])
  const transitionTimeoutRef = useRef<number | null>(null)
  const activeIndexRef = useRef(0)
  const itemCountRef = useRef(itemCount)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lenis = useLenis()

  const activeIndex =
    itemCount <= 0 ? 0 : Math.min(panelUi.activeIndex, itemCount - 1)

  useEffect(() => {
    itemCountRef.current = itemCount
    activeIndexRef.current = activeIndex
  }, [itemCount, activeIndex])

  useEffect(() => {
    const mq = window.matchMedia(MEDIA_QUERY_LG_MIN)
    const onChange = () => {
      const matches = mq.matches
      setScrollSyncEnabled(matches)
      if (!matches) {
        if (transitionTimeoutRef.current) {
          window.clearTimeout(transitionTimeoutRef.current)
          transitionTimeoutRef.current = null
        }
        setPanelUi((prev) => ({ ...prev, showInfo: true }))
        onExitLgLayout?.()
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [onExitLgLayout])

  useEffect(() => {
    if (!scrollSyncEnabled) {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
        transitionTimeoutRef.current = null
      }
      return
    }

    const count = itemCountRef.current
    visibilityRatiosRef.current = Array.from({ length: count }, () => 0)
    const observer = new IntersectionObserver(
      (entries) => {
        const currentCount = itemCountRef.current
        if (visibilityRatiosRef.current.length !== currentCount) {
          visibilityRatiosRef.current = Array.from(
            { length: currentCount },
            () => 0
          )
        }
        for (const entry of entries) {
          const index = Number(
            (entry.target as HTMLElement).dataset.projectIndex
          )
          if (Number.isNaN(index)) continue
          if (index < 0 || index >= currentCount) continue
          visibilityRatiosRef.current[index] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0
        }

        let nextIndex = -1
        let maxRatio = 0

        for (const [index, ratio] of visibilityRatiosRef.current.entries()) {
          if (ratio > maxRatio) {
            maxRatio = ratio
            nextIndex = index
          }
        }

        if (nextIndex === -1 || nextIndex === activeIndexRef.current) {
          return
        }

        if (transitionTimeoutRef.current) {
          window.clearTimeout(transitionTimeoutRef.current)
        }

        setPanelUi((prev) => ({ ...prev, showInfo: false }))
        transitionTimeoutRef.current = window.setTimeout(() => {
          activeIndexRef.current = nextIndex
          setPanelUi({ activeIndex: nextIndex, showInfo: true })
          transitionTimeoutRef.current = null
        }, PROJECTS_SCROLL_ACTIVE_INDEX_TRANSITION_MS)
      },
      { threshold: [...PROJECTS_SCROLL_INTERSECTION_THRESHOLDS] }
    )
    observerRef.current = observer

    for (const el of itemRefs.current) {
      if (el) observer.observe(el)
    }

    return () => {
      observer.disconnect()
      observerRef.current = null
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [scrollSyncEnabled])

  useEffect(() => {
    if (scrollSyncEnabled) return

    function updateClosestActiveIndex() {
      const viewportCenter = window.innerHeight / 2
      let nextIndex = 0
      let minDistance = Number.POSITIVE_INFINITY

      for (const [index, el] of itemRefs.current.entries()) {
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue

        const itemCenter = rect.top + rect.height / 2
        const distance = Math.abs(itemCenter - viewportCenter)
        if (distance < minDistance) {
          minDistance = distance
          nextIndex = index
        }
      }

      if (nextIndex === activeIndexRef.current) return
      activeIndexRef.current = nextIndex
      setPanelUi((prev) =>
        prev.activeIndex === nextIndex
          ? prev
          : { ...prev, activeIndex: nextIndex }
      )
    }

    queueMicrotask(updateClosestActiveIndex)

    const unsubscribeLenisScroll = lenis
      ? lenis.on('scroll', updateClosestActiveIndex)
      : undefined

    if (!lenis) {
      window.addEventListener('scroll', updateClosestActiveIndex, {
        passive: true,
      })
    }
    window.addEventListener('resize', updateClosestActiveIndex, {
      passive: true,
    })

    return () => {
      unsubscribeLenisScroll?.()
      if (!lenis) {
        window.removeEventListener('scroll', updateClosestActiveIndex)
      }
      window.removeEventListener('resize', updateClosestActiveIndex)
    }
  }, [scrollSyncEnabled, lenis])

  function setItemRef(index: number, el: HTMLElement | null) {
    if (index < 0) return
    const refs = itemRefs.current
    while (refs.length <= index) {
      refs.push(null)
    }
    const previous = refs[index]
    refs[index] = el
    const observer = observerRef.current
    if (!observer) return
    if (previous) observer.unobserve(previous)
    if (el) observer.observe(el)
  }

  function scrollItemIntoView(index: number) {
    const el = itemRefs.current[index]
    if (!el) return
    if (lenis) {
      const rect = el.getBoundingClientRect()
      const marginTop = Number.parseFloat(getComputedStyle(el).scrollMarginTop)
      const scrollMarginTop = Number.isNaN(marginTop) ? 0 : marginTop
      const centerY =
        rect.top +
        lenis.scroll -
        scrollMarginTop +
        rect.height / 2 -
        window.innerHeight / 2
      const target = Math.max(0, Math.min(centerY, lenis.limit))
      lenis.scrollTo(target, { duration: 1.2, lock: true })
      return
    }
    el.scrollIntoView({ behavior: 'auto', block: 'center' })
  }

  return {
    activeIndex,
    showInfo: panelUi.showInfo,
    scrollSyncEnabled,
    setItemRef,
    scrollItemIntoView,
  }
}
