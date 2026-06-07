/**
 * Pruebas de `useProjectsModal` — apertura y cierre.
 *
 * @fileoverview `renderHook` con lista mínima de proyectos enriquecidos manualmente.
 * @remarks No depende de scroll sync ni carrusel; la persistencia del slide la prueba `useProjectsSection`.
 */

import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { getValidUrls } from '@/shared/utils/getValidUrls'

import { PROJECTS } from '../../constants/projects'
import { useProjectsModal } from '../useProjectsModal'

import type { ProjectWithSlides } from '../../types'

function projectWithSlides(index: number): ProjectWithSlides {
  const base = PROJECTS[index]!
  return {
    ...base,
    slides: getValidUrls(base.images) as unknown as ProjectWithSlides['slides'],
  }
}

const projects = [projectWithSlides(0), projectWithSlides(1)]

describe('useProjectsModal', () => {
  it('empieza cerrado sin proyecto seleccionado', () => {
    const { result } = renderHook(() => useProjectsModal({ projects }))

    expect(result.current.index).toBeNull()
    expect(result.current.project).toBeUndefined()
    expect(result.current.slide).toBe(0)
  })

  it('open expone índice, slide y proyecto', () => {
    const { result } = renderHook(() => useProjectsModal({ projects }))

    act(() => {
      result.current.open(1, 2)
    })

    expect(result.current.index).toBe(1)
    expect(result.current.slide).toBe(2)
    expect(result.current.project).toMatchObject(PROJECTS[1]!)
  })

  it('close limpia el modal sin alterar el slide en memoria hasta reabrir', () => {
    const { result } = renderHook(() => useProjectsModal({ projects }))

    act(() => {
      result.current.open(0, 0)
    })
    act(() => {
      result.current.setSlide(3)
    })
    act(() => {
      result.current.close()
    })

    expect(result.current.index).toBeNull()
    expect(result.current.slide).toBe(3)
  })
})
