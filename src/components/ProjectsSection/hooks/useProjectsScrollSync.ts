import { useLenis } from 'lenis/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { MEDIA_QUERY_LG_MIN } from '@/shared/constants/breakpoints'

import {
  PROJECTS_SCROLL_ACTIVE_INDEX_TRANSITION_MS,
  PROJECTS_SCROLL_INTERSECTION_THRESHOLDS,
} from '../constants'

interface UseProjectsScrollSyncResult {
  /** Índice del proyecto cuyo bloque tiene mayor ratio de intersección visible. */
  activeIndex: number
  /** `visible` en `ProjectInfo`: breve `false` al cambiar proyecto con scroll sync (transición); `true` el resto del tiempo y en móvil tras reset. */
  showInfo: boolean
  /** Solo en viewport ≥ lg: observer + sidebar sincronizados con el scroll. */
  scrollSyncEnabled: boolean
  /**
   * Registra el nodo DOM del bloque de proyecto `index` (callback de `ref`).
   * La mutación del array interno queda encapsulada en el hook (compatible con React Compiler).
   */
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
 * @param onExitLgLayout - Invocado en el listener `change` de `matchMedia` al pasar por debajo de `lg` (p. ej. cerrar lightbox). No es un `useEffect`.
 */
export function useProjectsScrollSync(
  itemCount: number,
  onExitLgLayout?: () => void
): UseProjectsScrollSyncResult {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showInfo, setShowInfo] = useState(true)
  const [scrollSyncEnabled, setScrollSyncEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(MEDIA_QUERY_LG_MIN).matches
  })
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const visibilityRatiosRef = useRef<Array<number>>([])
  const transitionTimeoutRef = useRef<number | null>(null)
  const activeIndexRef = useRef(0)
  const lenis = useLenis()

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
        setShowInfo(true)
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

    visibilityRatiosRef.current = Array.from({ length: itemCount }, () => 0)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number(
            (entry.target as HTMLElement).dataset.projectIndex
          )
          if (Number.isNaN(index)) continue
          if (index < 0 || index >= itemCount) continue
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

        setShowInfo(false)
        transitionTimeoutRef.current = window.setTimeout(() => {
          setActiveIndex(nextIndex)
          activeIndexRef.current = nextIndex
          setShowInfo(true)
        }, PROJECTS_SCROLL_ACTIVE_INDEX_TRANSITION_MS)
      },
      { threshold: [...PROJECTS_SCROLL_INTERSECTION_THRESHOLDS] }
    )

    for (const el of itemRefs.current) {
      if (el) observer.observe(el)
    }

    return () => {
      observer.disconnect()
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [itemCount, scrollSyncEnabled])

  useEffect(() => {
    if (scrollSyncEnabled) return

    const pickClosestToViewportCenter = () => {
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

      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex
        setActiveIndex(nextIndex)
      }
    }

    pickClosestToViewportCenter()

    const unsubscribeLenisScroll = lenis
      ? lenis.on('scroll', pickClosestToViewportCenter)
      : undefined

    if (!lenis) {
      window.addEventListener('scroll', pickClosestToViewportCenter, {
        passive: true,
      })
    }
    window.addEventListener('resize', pickClosestToViewportCenter)

    return () => {
      unsubscribeLenisScroll?.()
      if (!lenis) {
        window.removeEventListener('scroll', pickClosestToViewportCenter)
      }
      window.removeEventListener('resize', pickClosestToViewportCenter)
    }
  }, [scrollSyncEnabled, lenis])

  const setItemRef = useCallback((index: number, el: HTMLElement | null) => {
    if (index < 0) return
    const refs = itemRefs.current
    while (refs.length <= index) {
      refs.push(null)
    }
    refs[index] = el
  }, [])

  const scrollItemIntoView = useCallback(
    (index: number) => {
      const el = itemRefs.current[index]
      if (!el) return
      if (lenis) {
        const rect = el.getBoundingClientRect()
        const marginTop = Number.parseFloat(
          getComputedStyle(el).scrollMarginTop
        )
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
    },
    [lenis]
  )

  return {
    activeIndex,
    showInfo,
    scrollSyncEnabled,
    setItemRef,
    scrollItemIntoView,
  }
}
