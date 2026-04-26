/**
 * Medición de geometría para el subrayado animado de la nav desktop.
 *
 * @module components/Header/hooks/useNavUnderlinePosition
 */
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import type { NavItem } from '../types'

/** Métricas en px del subrayado animado respecto al contenedor de la fila de enlaces. */
interface NavUnderlineMetrics {
  left: number
  width: number
  visible: boolean
}

/**
 * Mide la posición del enlace activo respecto a la fila de nav (`rowRef`) para colocar
 * una línea indicadora (p. ej. con Motion).
 *
 * Requiere `registerLink(href)` en cada `<a>` de la misma lista que `navItems`. Preferir
 * referencia estable a `navItems` (misma recomendación que {@link useNavScrollSpy}).
 */
export function useNavUnderlinePosition(
  activeHref: string | null,
  navItems: ReadonlyArray<NavItem>
) {
  const rowRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>())

  const [underline, setUnderline] = useState<NavUnderlineMetrics>({
    left: 0,
    width: 0,
    visible: false,
  })

  const registerLink = useCallback((href: string) => {
    return (el: HTMLAnchorElement | null) => {
      if (el) linkRefs.current.set(href, el)
      else linkRefs.current.delete(href)
    }
  }, [])

  const update = useCallback(() => {
    if (navItems.length === 0) {
      setUnderline({ left: 0, width: 0, visible: false })
      return
    }

    const row = rowRef.current
    if (!row || !activeHref) {
      setUnderline({ left: 0, width: 0, visible: false })
      return
    }
    const link = linkRefs.current.get(activeHref)
    if (!link) {
      setUnderline({ left: 0, width: 0, visible: false })
      return
    }
    const rowRect = row.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    setUnderline({
      left: Math.round(linkRect.left - rowRect.left + row.scrollLeft),
      width: Math.round(linkRect.width),
      visible: true,
    })
  }, [activeHref, navItems])

  useLayoutEffect(() => {
    const id = window.requestAnimationFrame(() => {
      update()
    })
    return () => window.cancelAnimationFrame(id)
  }, [update])

  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row) return

    window.addEventListener('resize', update)

    if (typeof ResizeObserver === 'undefined') {
      return () => window.removeEventListener('resize', update)
    }

    const ro = new ResizeObserver(() => {
      update()
    })
    ro.observe(row)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [update])

  return { rowRef, registerLink, underline }
}
