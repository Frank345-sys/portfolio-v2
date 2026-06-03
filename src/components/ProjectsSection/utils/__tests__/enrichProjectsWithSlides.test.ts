/**
 * Pruebas de `enrichProjectsWithSlides` — mapeo a `ProjectWithSlides` y validación de URLs.
 *
 * @fileoverview Casos felices con `PROJECTS` y error explícito si `images` no deja capturas tras trim.
 * @remarks Usa `getValidUrls` real; no mockea el filtrado de URLs vacías.
 */

import { describe, expect, it } from 'vitest'

import { getValidUrls } from '@/shared/utils/getValidUrls'

import { PROJECTS } from '../../constants/projects'
import { enrichProjectsWithSlides } from '../enrichProjectsWithSlides'

import type { Project } from '../../types'

describe('enrichProjectsWithSlides', () => {
  it('añade slides filtrados y conserva el resto del proyecto', () => {
    const source = PROJECTS[0]!
    const enriched = enrichProjectsWithSlides([source])[0]
    expect(enriched).toBeDefined()
    if (!enriched) return

    expect(enriched.slides).toEqual(getValidUrls(source.images))
    expect(enriched.title).toBe(source.title)
    expect(enriched.id).toBe(source.id)
  })

  it('mapea cada entrada de la lista fuente', () => {
    const sources = PROJECTS.slice(0, 2)
    const enriched = enrichProjectsWithSlides(sources)

    expect(enriched).toHaveLength(sources.length)
    for (const [index, project] of sources.entries()) {
      expect(enriched[index]?.slides).toEqual(getValidUrls(project.images))
    }
  })

  it('lanza si tras trim no queda ninguna URL de captura válida', () => {
    const invalid: Project = {
      ...PROJECTS[0]!,
      images: ['   '],
    }

    expect(() => enrichProjectsWithSlides([invalid])).toThrow(
      'Se esperaba al menos una URL de captura válida (no vacía tras trim): revisa `Project.images`.'
    )
  })
})
