import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import type { NavItem } from '../types'
import { useNavScrollSpy } from './useNavScrollSpy'
import { useNavUnderlinePosition } from './useNavUnderlinePosition'

/**
 * Orquesta el estado de la cabecera: drawer móvil, sombra al hacer scroll,
 * scroll-spy (`activeNavHref`) y métricas del subrayado animado en desktop.
 */
export function useHeader(navItems: ReadonlyArray<NavItem>) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const activeNavHref = useNavScrollSpy(navItems)
  const prefersReducedMotion = useReducedMotion()
  const { rowRef, registerLink, underline } = useNavUnderlinePosition(
    activeNavHref,
    navItems
  )

  useEffect(() => {
    const updateScrollState = () => {
      setIsAtTop(window.scrollY <= 0)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return {
    isOpen,
    setIsOpen,
    isAtTop,
    activeNavHref,
    prefersReducedMotion,
    rowRef,
    registerLink,
    underline,
  }
}
