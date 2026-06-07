/**
 * Medición de geometría para el subrayado animado de la nav desktop (`left`, `width`, `visible`)
 * y mapping a props Motion ({@link navDesktopUnderlineMotion}).
 *
 * Reacciona a `activeHref`, `resize` de `window`, `ResizeObserver` sobre la fila (`rowRef`) y
 * vuelve a medir en `requestAnimationFrame` tras cambios de layout.
 *
 * @module components/Header/hooks/useNavUnderlinePosition
 * @fileoverview Mide geometría del enlace activo respecto a la fila de nav y expone métricas para Motion (`navDesktopUnderlineMotion`).
 * @remarks `ResizeObserver` solo en la fila; remide en `activeHref`, resize y `document.fonts.ready`.
 */
import { useLayoutEffect, useRef, useState } from 'react'

import { MOTION_ANIMATION } from '@/shared/constants/motionAnimations'

import type { NavItem } from '../types'

/** Métricas en px del subrayado animado respecto al contenedor de la fila de enlaces. */
interface NavUnderlineMetrics {
  left: number
  width: number
  visible: boolean
}

/** Estado inicial/oculto del subrayado — posición cero e invisible. */
const UNDERLINE_HIDDEN: NavUnderlineMetrics = {
  left: 0,
  width: 0,
  visible: false,
}

/** Calcula métricas del subrayado sin efectos secundarios (un solo `setState` en el consumidor). */
function computeNavUnderlineMetrics(
  navItemsLength: number,
  isNavRowVisible: boolean,
  activeHref: string | null,
  row: HTMLDivElement | null,
  linkRefs: ReadonlyMap<string, HTMLAnchorElement>
): NavUnderlineMetrics {
  if (navItemsLength === 0 || !isNavRowVisible || !row || !activeHref) {
    return UNDERLINE_HIDDEN
  }

  const link = linkRefs.get(activeHref)
  if (!link) {
    return UNDERLINE_HIDDEN
  }

  const rowRect = row.getBoundingClientRect()
  const linkRect = link.getBoundingClientRect()
  return {
    left: Math.round(linkRect.left - rowRect.left + row.scrollLeft),
    width: Math.round(linkRect.width),
    visible: true,
  }
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
  navItems: ReadonlyArray<NavItem>,
  /** `true` cuando la fila desktop es visible (p. ej. viewport `lg+`). */
  isNavRowVisible = true
) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [links] = useState(() => new Map<string, HTMLAnchorElement>())

  const [underline, setUnderline] =
    useState<NavUnderlineMetrics>(UNDERLINE_HIDDEN)

  const registerLink = (href: string) => (el: HTMLAnchorElement | null) => {
    if (el) links.set(href, el)
    else links.delete(href)
  }

  useLayoutEffect(() => {
    const measure = () => {
      setUnderline(
        computeNavUnderlineMetrics(
          navItems.length,
          isNavRowVisible,
          activeHref,
          rowRef.current,
          links
        )
      )
    }

    measure()

    const row = rowRef.current
    if (!row) return

    window.addEventListener('resize', measure)

    let ro: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure)
      ro.observe(row)
    }

    if (typeof document.fonts !== 'undefined') {
      void document.fonts.ready.then(measure)
    }

    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [activeHref, isNavRowVisible, navItems.length, links])

  return { rowRef, registerLink, underline }
}

/**
 * Props Motion del subrayado (`m.span`): `animate`/`transition` desde las métricas del hook
 * (misma idea de spread que `{@link OVERLAY_FADE}`, con valores dinámicos).
 * `MotionConfig` en App aplica `prefers-reduced-motion` de forma global.
 */
export function navDesktopUnderlineMotion(underline: NavUnderlineMetrics) {
  return {
    initial: false as const,
    animate: {
      left: underline.left,
      width: underline.width,
      opacity: underline.visible ? 1 : 0,
    },
    transition: MOTION_ANIMATION.spring.control,
  }
}
