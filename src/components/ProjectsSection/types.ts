import type { SkillLabel } from '@/shared/constants/skills'

/**
 * Tipos compartidos del módulo `ProjectsSection`: datos de dominio (`Project`) y piezas reutilizables
 * para preview, carrusel y lightbox (evita duplicar la misma forma en varias props).
 *
 * @module components/ProjectsSection/types
 */

/**
 * Proyecto destacado en la sección Portafolio.
 */
export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  bullets: string[]
  skills: SkillLabel[]
  images: string[]
  link?: string
  githubLink?: string
}

/**
 * Título y subtítulo mostrados en overlay de card, panel lateral y cabecera del lightbox.
 */
export interface ProjectPreviewCopy {
  title: string
  subtitle: string
}

/**
 * Galería de capturas + texto alternativo base para el carrusel (`ImageCarousel`).
 */
export interface ProjectPreviewGallery {
  images: string[]
  /** Base para `alt` enriquecido por slide (p. ej. nombre del proyecto). */
  imageAlt: string
}

/**
 * Sincronización del índice de slide entre la card y el lightbox (estado elevado en `useProjectsSection`).
 */
export interface ProjectLightboxCarouselSync {
  /** `true` en la card cuyo proyecto tiene el modal abierto. */
  lightboxActive?: boolean
  /** Slide compartido cuando `lightboxActive` (misma fuente que el modal). */
  lightboxSlideIndex?: number | undefined
  /** Notifica cambios de slide al padre mientras el lightbox está abierto. */
  onLightboxSlideChange?: ((index: number) => void) | undefined
}
