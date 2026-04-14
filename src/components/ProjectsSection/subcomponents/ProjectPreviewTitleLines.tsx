import { TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import type { ProjectPreviewCopy } from '../types'

export interface ProjectPreviewTitleLinesProps extends ProjectPreviewCopy {
  /**
   * Si está definido, el nombre se renderiza como `h2` con ese `id` (p. ej. `aria-labelledby` del diálogo).
   * Si no, como párrafo con color para el overlay sobre la imagen.
   */
  titleHeadingId?: string
}

/**
 * Subtítulo (overline) + título del proyecto: compartido entre la franja de la card y el encabezado del lightbox.
 */
export function ProjectPreviewTitleLines({
  subtitle,
  title,
  titleHeadingId,
}: ProjectPreviewTitleLinesProps) {
  return (
    <>
      <p
        className={cn(
          TYPOGRAPHY.label.overline,
          'text-information-base mb-1 font-mono'
        )}
      >
        {subtitle}
      </p>
      {titleHeadingId ? (
        <h2 id={titleHeadingId} className={TYPOGRAPHY.title.small}>
          {title}
        </h2>
      ) : (
        <p className={cn(TYPOGRAPHY.title.small, 'text-text-white')}>{title}</p>
      )}
    </>
  )
}
