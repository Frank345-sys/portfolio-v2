/**
 * Medición de geometría para el subrayado animado de la nav desktop (`left`, `width`, `visible`)
 * y mapping a props Motion ({@link navDesktopUnderlineMotion}).
 *
 * Reacciona a `activeHref`, `resize` de `window`, `ResizeObserver` sobre la fila (`rowRef`) y
 * vuelve a medir en `requestAnimationFrame` tras cambios de layout.
 *
 * @module components/Header/hooks/useNavUnderlinePosition
 * @fileoverview Mide geometría del enlace activo respecto a la fila de nav y expone métricas para Motion (`navDesktopUnderlineMotion`).
 * @remarks Usa `ResizeObserver` y `resize` global; el callback de medición se mantiene estable vía ref para el Compiler.
 */
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

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

  const [underline, setUnderline] =
    useState<NavUnderlineMetrics>(UNDERLINE_HIDDEN)

  /** Devuelve un callback ref que registra/desregistra el `<a>` de `href` en `linkRefs`. */
  const registerLink = useCallback((href: string) => {
    return (el: HTMLAnchorElement | null) => {
      if (el) linkRefs.current.set(href, el)
      else linkRefs.current.delete(href)
    }
  }, [])

  /** Mide y actualiza la posición del subrayado según `activeHref` y la geometría actual del DOM. */
  const measureUnderline = useCallback(() => {
    if (navItems.length === 0) {
      setUnderline(UNDERLINE_HIDDEN)
      return
    }

    const row = rowRef.current
    if (!row || !activeHref) {
      setUnderline(UNDERLINE_HIDDEN)
      return
    }
    const link = linkRefs.current.get(activeHref)
    if (!link) {
      setUnderline(UNDERLINE_HIDDEN)
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

  // Ref estable al callback de medición — evita que los efectos de resize/ResizeObserver
  // capturen una closure obsoleta sin necesidad de re-suscribirse al cambiar activeHref.
  const measureUnderlineRef = useRef(measureUnderline)

  // Effect 1: sincroniza measureUnderlineRef con la versión más reciente de measureUnderline.
  useLayoutEffect(() => {
    measureUnderlineRef.current = measureUnderline
  }, [measureUnderline])

  // Effect 2: mide en el siguiente RAF tras cambiar activeHref o navItems.
  useLayoutEffect(() => {
    const id = window.requestAnimationFrame(() => {
      measureUnderlineRef.current()
    })
    return () => window.cancelAnimationFrame(id)
  }, [measureUnderline])

  // Effect 3: re-mide en resize de ventana y en cambios de tamaño de la fila (ResizeObserver).
  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row) return

    const onResize = () => {
      measureUnderlineRef.current()
    }

    window.addEventListener('resize', onResize)

    if (typeof ResizeObserver === 'undefined') {
      return () => window.removeEventListener('resize', onResize)
    }

    const ro = new ResizeObserver(onResize)
    ro.observe(row)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

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
