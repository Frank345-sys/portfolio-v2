/**
 * Tipos TypeScript del submódulo «ProjectsSection».
 *
 * Tipos compartidos del módulo `ProjectsSection`: datos de dominio (`Project`) y piezas reutilizables
 * para preview, carrusel y modal ampliado (evita duplicar la misma forma en varias props).
 *
 * @fileoverview Contratos compartidos entre componentes, hooks y constantes del mismo directorio.
 * @remarks Mantener alineado con las props públicas re-exportadas en los `index.ts` del feature.
 */

import type { SkillLabel } from '@/shared/constants/skills/skillLabels'

import type { ImgHTMLAttributes } from 'react'

/**
 * Al menos una URL de captura (no array vacío a nivel modelo).
 * Antes del carrusel, `enrichProjectsWithSlides` (`./utils/enrichProjectsWithSlides.ts`) aplica `getValidUrls`;
 * si no queda ninguna URL válida tras trim, lanza error.
 */
export type NonEmptySlideList = readonly [string, ...string[]]

/**
 * URL absoluta HTTPS de enlace público del proyecto (sitio en vivo, GitHub Pages o repositorio).
 * No incluye `mailto:` ni rutas relativas.
 */
type ProjectHttpsUrl = `https://${string}`

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
  /** Sitio o demo en HTTPS; cadena vacía equivale a “sin enlace” tras `trim`. */
  link?: ProjectHttpsUrl | ''
  /** Repositorio u otro recurso en HTTPS (p. ej. `https://github.com/...`). */
  githubLink?: ProjectHttpsUrl
}

/** Proyecto con `slides` listos para carrusel (derivados del modelo como en `useProjectsSection`). */
export type ProjectWithSlides = Project & { slides: NonEmptySlideList }

export type ProjectImageAttributes = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'sizes'
>
