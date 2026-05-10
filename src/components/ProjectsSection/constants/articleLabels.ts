/**
 * Identificadores accesibles derivados de proyectos (evitar acoplar aria a strings duplicados).
 *
 * @module components/ProjectsSection/constants/articleLabels
 */

/** `id` del nodo (sr-only) que etiqueta cada `<article>` de proyecto (`aria-labelledby`). */
export function projectArticleLabelId(projectId: number): string {
  return `project-${projectId}-title`
}
