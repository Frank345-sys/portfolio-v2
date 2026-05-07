import type { SkillLabel } from '@/shared/constants/skills'

import type { ImgHTMLAttributes } from 'react'

/**
 * Tipos compartidos del módulo `ProjectsSection`: datos de dominio (`Project`) y piezas reutilizables
 * para preview, carrusel y modal ampliado (evita duplicar la misma forma en varias props).
 *
 * @module components/ProjectsSection/types
 */

/** Al menos una URL de captura (no array vacío a nivel modelo). Tras cargar datos se valida `trim` en `toNonEmptySlides` (`utils/toNonEmptySlides.ts`). */
export type NonEmptySlideList = readonly [string, ...string[]]

/**
 * Proyecto destacado en la sección Portafolio.
 *
 * Opcionales: **`link`** (sitio/demo pública), **`githubLink`**. Omitir **`link`** o dejar **`''`** si no aplica —
 * `ProjectInfo` solo muestra “Ver sitio en vivo” cuando hay URL no vacía tras trim.
 */
export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  bullets: string[]
  skills: SkillLabel[]
  images: NonEmptySlideList
  link?: string
  githubLink?: string
}

/** Proyecto con `slides` listos para carrusel (derivados del modelo como en `useProjectsSection`). */
export type ProjectWithSlides = Project & { slides: NonEmptySlideList }

export type ProjectImageAttributes = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'sizes'
>
