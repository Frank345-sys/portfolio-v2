import { type MouseEvent } from 'react'
import { m } from 'motion/react'
import { ImageCarousel } from '@/shared/components/ImageCarousel'
import { useProjectPreviewCard } from '../hooks'
import { ANIMATION, BUTTON, TYPOGRAPHY, Z } from '@/shared/constants/tokens'
import { MOTION_ANIMATION } from '@/shared/constants'
import { ExpandScreenIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'
import type {
  ProjectLightboxCarouselSync,
  ProjectPreviewCopy,
  ProjectPreviewGallery,
} from '../types'
import { ProjectPreviewTitleLines } from './ProjectPreviewTitleLines'

export interface ProjectPreviewCardProps
  extends
    ProjectPreviewGallery,
    ProjectPreviewCopy,
    ProjectLightboxCarouselSync {
  /**
   * Indica si esta card corresponde al proyecto activo según el scroll.
   * Controla la opacidad: `1` cuando activo, `0.3` cuando inactivo.
   * @defaultValue false
   */
  isActive?: boolean
  /**
   * Activa el autoplay del carrusel para esta card (`ProjectsSection` lo pasa solo al proyecto activo por scroll).
   * La lógica de `prefers-reduced-motion` se combina dentro de `ImageCarousel`.
   * @defaultValue false
   */
  autoplay?: boolean
  /**
   * Preferencia de movimiento reducido (una sola `useReducedMotion` en el padre de sección).
   */
  reduceMotion: boolean | null
  /**
   * En viewport `lg`, abre el lightbox global con el slide actual del carrusel.
   */
  onRequestLightbox?: (slideIndex: number) => void
}

/**
 * Card de preview de proyecto con carrusel opcional.
 *
 * Compone animación de la superficie, carrusel (o placeholder), botón de ampliar y overlay de título.
 * La vista ampliada es un único modal en `ProjectsSection`.
 */
export function ProjectPreviewCard({
  images,
  imageAlt,
  subtitle,
  title,
  isActive = false,
  autoplay = false,
  reduceMotion,
  onRequestLightbox,
  lightboxActive = false,
  lightboxSlideIndex,
  onLightboxSlideChange,
}: ProjectPreviewCardProps) {
  const {
    cardRef,
    validImages,
    hasImages,
    shouldAutoplay,
    canExpand,
    slideIndex,
    onCarouselSlideChange,
  } = useProjectPreviewCard({
    images,
    autoplay,
    lightboxActive,
    lightboxSlideIndex,
    onLightboxSlideChange,
  })

  function handleCardClick(e: MouseEvent<HTMLDivElement>) {
    if (!canExpand || !isActive) return
    if ((e.target as HTMLElement).closest('button')) return
    onRequestLightbox?.(slideIndex)
  }

  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: isActive ? 1 : 0.3, y: 0 }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.45, ease: MOTION_ANIMATION.easing.expressive }}
      className={cn(
        'group shadow-elevation-xl relative overflow-hidden rounded-lg',
        canExpand && 'cursor-pointer'
      )}
      onClick={handleCardClick}
    >
      <div
        className={cn(
          'ring-stroke-soft group-hover:ring-information-base/50 pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset',
          Z.raised,
          ANIMATION.transition.slow
        )}
      />

      {canExpand ? (
        <button
          type="button"
          className={cn(
            BUTTON.special.icon,
            'hover:bg-information-dark bg-information-base active:bg-information-light/40 absolute top-5 right-5 hidden lg:flex',
            Z.dropdown
          )}
          aria-label={`Ver ${title} a pantalla completa`}
          onClick={(e) => {
            if (!isActive) return
            e.stopPropagation()
            onRequestLightbox?.(slideIndex)
          }}
        >
          <ExpandScreenIcon className="text-text-white h-6 w-6" aria-hidden />
        </button>
      ) : null}

      {hasImages ? (
        <ImageCarousel
          slides={validImages}
          imageAlt={imageAlt}
          reduceMotion={reduceMotion}
          autoplay={shouldAutoplay && !lightboxActive}
          previousSlideAriaLabel="Imagen anterior del proyecto"
          nextSlideAriaLabel="Imagen siguiente del proyecto"
          slideIndex={slideIndex}
          onSlideChange={onCarouselSlideChange}
        />
      ) : (
        <div
          role="img"
          aria-label={`Sin capturas del proyecto: ${title}`}
          className="bg-bg-subtle relative flex aspect-video w-full items-center justify-center"
        >
          <span
            aria-hidden
            className={cn(TYPOGRAPHY.paragraph.muted, 'px-4 text-center')}
          >
            Sin vista previa
          </span>
        </div>
      )}

      <div className="absolute right-0 bottom-0 left-0 flex h-32 flex-col items-start justify-end bg-linear-to-t from-black/80 to-transparent p-5">
        <div
          className={cn(
            ANIMATION.transition.transform,
            Z.dropdown,
            'group-hover:-translate-y-1'
          )}
        >
          <ProjectPreviewTitleLines subtitle={subtitle} title={title} />
        </div>
      </div>
    </m.div>
  )
}
