/**
 * Pruebas de `useProjectsCarousel` — slides por tarjeta, modal compartido y refs de artículo.
 *
 * @fileoverview `renderHook` con dependencias inyectadas (`setItemRef`, scroll, estado modal simulado).
 * @remarks No monta DOM; valida handlers y refs de artículo.
 */

import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useProjectsCarousel } from '../useProjectsCarousel'

describe('useProjectsCarousel', () => {
  const setItemRef = vi.fn()
  const scrollItemIntoView = vi.fn()
  const setModalSlide = vi.fn()

  function renderCarousel(
    modalProjectIndex: number | null = null,
    modalSlide = 0
  ) {
    return renderHook(() =>
      useProjectsCarousel({
        projectCount: 3,
        setItemRef,
        scrollItemIntoView,
        modalProjectIndex,
        modalSlide,
        setModalSlide,
      })
    )
  }

  it('getSlideIndex devuelve 0 por defecto', () => {
    const { result } = renderCarousel()
    expect(result.current.getSlideIndex(1)).toBe(0)
  })

  it('handleSlideChange sin modal guarda el slide por proyecto', () => {
    const { result } = renderCarousel()

    act(() => {
      result.current.handleSlideChange(1, 3)
    })

    expect(result.current.getSlideIndex(1)).toBe(3)
  })

  it('con modal abierto delega getSlideIndex y handleSlideChange al slide del modal', () => {
    const { result } = renderCarousel(0, 2)

    expect(result.current.getSlideIndex(0)).toBe(2)

    act(() => {
      result.current.handleSlideChange(0, 4)
    })

    expect(setModalSlide).toHaveBeenCalledWith(4)
  })

  it('persistCardSlide actualiza el slide de la tarjeta', () => {
    const { result } = renderCarousel()

    act(() => {
      result.current.persistCardSlide(2, 1)
    })

    expect(result.current.getSlideIndex(2)).toBe(1)
  })

  it('articleRefAssigners registran refs por índice', () => {
    const { result } = renderCarousel()
    const el = document.createElement('article')

    result.current.articleRefAssigners[1]?.(el)

    expect(setItemRef).toHaveBeenCalledWith(1, el)
  })
})
