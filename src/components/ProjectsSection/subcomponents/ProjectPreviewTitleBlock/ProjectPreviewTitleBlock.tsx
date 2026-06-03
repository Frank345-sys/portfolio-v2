/**
 * Pieza de interfaz del portfolio (`ProjectPreviewTitleBlock`).
 *
 * @fileoverview Implementación del archivo `ProjectPreviewTitleBlock.tsx` dentro de `components/ProjectsSection/subcomponents/ProjectPreviewTitleBlock`; ver exports para la API pública.
 * @remarks Con `titleHeadingId` el título es `<h2>` (modal); sin él, `<p>` (tarjeta).
 */

import { TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

interface ProjectPreviewTitleBlockProps {
  /** Subtítulo / categoría (tipografía overline). */
  subtitle: string
  /** Título visible del proyecto. */
  title: string
  /**
   * Si se define, el título se renderiza como `<h2 id={titleHeadingId}>` (modal); si no, como `<p>`.
   */
  titleHeadingId?: string
  /** Clases extra del título (p. ej. color sobre overlay). */
  titleClassName?: string
}

/**
 * @module components/ProjectsSection/subcomponents/ProjectPreviewTitleBlock/ProjectPreviewTitleBlock
 *
 * Overline + título compartidos por tarjeta de preview y modal ampliado.
 */
export function ProjectPreviewTitleBlock({
  subtitle,
  title,
  titleHeadingId,
  titleClassName,
}: ProjectPreviewTitleBlockProps) {
  return (
    <div className="flex flex-col gap-1">
      <p
        className={cn(
          TYPOGRAPHY.label.overline,
          'text-information-base font-mono'
        )}
      >
        {subtitle}
      </p>
      {titleHeadingId ? (
        <h2
          id={titleHeadingId}
          className={cn(TYPOGRAPHY.title.small, titleClassName)}
        >
          {title}
        </h2>
      ) : (
        <p className={cn(TYPOGRAPHY.title.small, titleClassName)}>{title}</p>
      )}
    </div>
  )
}
