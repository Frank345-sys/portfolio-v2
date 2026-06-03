/**
 * Orquesta la cabecera: drawer móvil, breakpoint `lg`, sombra al scroll y Motion del subrayado desktop.
 *
 * @fileoverview Compone {@link useNavScrollSpy}, {@link useNavUnderlinePosition} y `useMediaQuery`; expone la API consumida por `Header.tsx`.
 * @remarks Mantén una referencia estable a `navItems` para no recrear observers; `isMobileDrawerOpen` solo aplica por debajo de `lg`.
 */

import { useEffect, useState } from 'react'

import { MEDIA_QUERY_LG_MIN } from '@/shared/constants/breakpoints'
import { useMediaQuery } from '@/shared/hooks'

import { useNavScrollSpy } from './useNavScrollSpy'
import {
  navDesktopUnderlineMotion,
  useNavUnderlinePosition,
} from './useNavUnderlinePosition'

import type { NavItem } from '../types'
import type { Dispatch, SetStateAction } from 'react'

type NavUnderlineBundle = Pick<
  ReturnType<typeof useNavUnderlinePosition>,
  'rowRef' | 'registerLink' | 'underline'
>

/** Props Motion (`initial` / `animate` / `transition`) del subrayado desktop sobre la fila de nav. */
type DesktopNavUnderlineMotion = ReturnType<typeof navDesktopUnderlineMotion>

/** Retorno de {@link useHeader} (anotación explícita para consumidores como `Header.tsx`). */
type UseHeaderResult = NavUnderlineBundle & {
  /** Estado crudo del drawer; en `lg+` el effect lo fuerza a `false`. */
  isOpen: boolean
  /** Drawer visible solo si `isOpen` y viewport &lt; `lg` ({@link useMediaQuery} `lg`). */
  isMobileDrawerOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isAtTop: boolean
  activeNavHref: string | null
  /** Spread en `m.span` bajo los enlaces desktop (ver {@link navDesktopUnderlineMotion}). */
  desktopNavUnderlineMotion: DesktopNavUnderlineMotion
}

/**
 * Orquesta la cabecera: ensambla hooks especializados y estado local de UI.
 *
 * | Ámbito | Dónde vive la lógica |
 * |--------|----------------------|
 * | `href` activo (scroll-spy) | {@link useNavScrollSpy} |
 * | Geometría + Motion del subrayado desktop | {@link useNavUnderlinePosition} → `desktopNavUnderlineMotion` |
 * | Drawer, breakpoint `lg`, sombra al scroll | Este hook |
 *
 * @param navItems - Misma lista que la nav; referencia **estable** (p. ej. `DEFAULT_NAV_ITEMS`) para
 *   no recrear observers en {@link useNavScrollSpy} / {@link useNavUnderlinePosition}.
 * @example
 * ```tsx
 * const { isMobileDrawerOpen, activeNavHref, desktopNavUnderlineMotion } = useHeader(navItems)
 * ```
 */
export function useHeader(navItems: ReadonlyArray<NavItem>): UseHeaderResult {
  // Estado local de UI (orden fijo de hooks — no reordenar sin motivo fuerte).
  const [isOpen, setIsOpen] = useState(false)
  const [isAtTop, setIsAtTop] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY <= 0 : true
  )

  // Nav desktop: spy devuelve `href`; el subrayado solo mide geometría a partir de ese `href`.
  const activeNavHref = useNavScrollSpy(navItems)
  const { rowRef, registerLink, underline } = useNavUnderlinePosition(
    activeNavHref,
    navItems
  )

  // Drawer: en `lg+` no aplica; `queueMicrotask` evita `setState` síncrono en el effect (eslint).
  const isLgMin = useMediaQuery(MEDIA_QUERY_LG_MIN)

  // Drawer: en lg+ forzamos cierre con queueMicrotask para evitar setState síncrono en effect.
  // queueMicrotask difiere la actualización al siguiente microtask — compatible con React Compiler.
  useEffect(() => {
    if (!isLgMin || !isOpen) return
    queueMicrotask(() => {
      setIsOpen(false)
    })
  }, [isLgMin, isOpen, setIsOpen])

  // Drawer: solo visible en viewport < lg (isLgMin).
  const isMobileDrawerOpen = isOpen && !isLgMin

  // Sombra al scroll: passive:true para no bloquear el hilo principal.
  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY <= 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const desktopNavUnderlineMotion = navDesktopUnderlineMotion(underline)

  return {
    isOpen,
    isMobileDrawerOpen,
    setIsOpen,
    isAtTop,
    activeNavHref,
    rowRef,
    registerLink,
    underline,
    desktopNavUnderlineMotion,
  }
}
