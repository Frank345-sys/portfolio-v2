/**
 * Enriquece proyectos con listas de slides validadas para carrusel y modal.
 *
 * @fileoverview Aplica `getValidUrls` sobre `Project.images` y exige al menos una URL tras trim.
 * @remarks Falla de forma explícita si la configuración del proyecto no deja capturas utilizables.
 */

import { getValidUrls } from '@/shared/utils/getValidUrls'

import type { NonEmptySlideList, Project, ProjectWithSlides } from '../types'

function assertNonEmptySlides(
  slides: readonly string[]
): asserts slides is NonEmptySlideList {
  if (slides.length === 0) {
    throw new Error(
      'Se esperaba al menos una URL de captura válida (no vacía tras trim): revisa `Project.images`.'
    )
  }
}

function toNonEmptySlides(urls: NonEmptySlideList): NonEmptySlideList {
  const slides = getValidUrls(urls)
  assertNonEmptySlides(slides)
  return slides
}

/**
 * Mapea cada `Project` a `ProjectWithSlides` con `slides` listos para el carrusel.
 *
 * @param projects - Lista fuente (`PROJECTS`); cada `images` debe tener ≥1 URL válida tras trim.
 */
export function enrichProjectsWithSlides(
  projects: readonly Project[]
): ProjectWithSlides[] {
  return projects.map((project) => ({
    ...project,
    slides: toNonEmptySlides(project.images),
  }))
}
