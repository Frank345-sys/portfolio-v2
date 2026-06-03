/**
 * Landmarks y copy de accesibilidad de la sección Proyectos.
 *
 * @module components/ProjectsSection/constants/landmarks
 * @fileoverview IDs de ancla, encabezado y `aria-label` del rail; import directo sin `constants/index.ts`.
 * @remarks Import: `import { PROJECTS_SECTION_ANCHOR_ID } from '@/components/ProjectsSection/constants/landmarks'`.
 */
import { SECTION_ANCHOR_ID } from '@/shared/constants/sectionAnchors'

/** `id` del `h2` de cabecera; referenciado por el `<section>`. */
export const PROJECTS_SECTION_TITLE_ID = 'projects-section-heading' as const

/**
 * `aria-label` del `<nav>` del rail de puntos (`lg`).
 * Cada botón añade título de proyecto vía `Ir al proyecto N: {title}` en `ProjectsSection`.
 */
export const PROJECTS_NAV_RAIL_ARIA_LABEL =
  'Navegación entre proyectos' as const

/** `id` del ancla de la sección. */
export const PROJECTS_SECTION_ANCHOR_ID = SECTION_ANCHOR_ID.proyectos
