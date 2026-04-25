import { useId, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'motion/react'
import { ImageCarousel } from '@/shared/components/ImageCarousel'
import { useFocusTrap } from '@/shared/hooks/useFocusTrap'
import { useModalOverlayEffects } from '@/shared/hooks/useModalOverlayEffects'
import { BUTTON, CARD, LAYOUT, Z } from '@/shared/constants/tokens'
import { MOTION_ANIMATION, OVERLAY_FADE } from '@/shared/constants/motion'
import { CloseIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'
import { getValidUrls } from '@/shared/utils/getValidUrls'
import type { ProjectPreviewCopy, ProjectPreviewGallery } from '../types'
import { ProjectPreviewTitleLines } from './ProjectPreviewTitleLines'

const PANEL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: MOTION_ANIMATION.easing.standard },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.3, ease: MOTION_ANIMATION.easing.standard },
  },
}

interface ProjectPreviewLightboxProps
  extends ProjectPreviewGallery, ProjectPreviewCopy {
  isOpen: boolean
  onClose: () => void
  reduceMotion: boolean | null
  /**
   * Autoplay del carrusel en vista ampliada (`ImageCarousel`; respeta `reduceMotion`).
   * @defaultValue true
   */
  autoplay?: boolean
  /** Índice compartido con el carrusel de la card (misma galería). */
  carouselSlideIndex: number
  onCarouselSlideChange: (index: number) => void
}

/**
 * Vista ampliada del carrusel de un proyecto: overlay + diálogo centrado (solo invocado en viewport lg+).
 *
 * El diálogo usa `w-max` para ceñirse al ancho del carrusel, con tope `min(1080px, viewport)`.
 * La imagen limita altura (`min(72vh,760px)`); el ancho sigue 16:9 (`aspect-video` + `w-auto`) y `object-contain`.
 */
export function ProjectPreviewLightbox({
  isOpen,
  onClose,
  images,
  imageAlt,
  title,
  subtitle,
  reduceMotion,
  autoplay = true,
  carouselSlideIndex,
  onCarouselSlideChange,
}: ProjectPreviewLightboxProps) {
  const titleId = useId()

  const panelRef = useFocusTrap<HTMLDivElement>(isOpen)

  const validImages = useMemo(() => getValidUrls(images), [images])

  useModalOverlayEffects({ isOpen, onClose })

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && validImages.length > 0 ? (
        <m.div
          key="project-lightbox"
          {...OVERLAY_FADE}
          className={cn(
            'flex items-center justify-center p-4 sm:p-8',
            LAYOUT.overlay.scrim,
            Z.drawerElevated
          )}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          role="presentation"
        >
          <m.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={PANEL_VARIANTS}
            className={cn(
              CARD.overlay.modal,
              'flex max-h-[min(92vh,920px)] min-h-0 w-max max-w-[min(1080px,calc(100vw-2rem))] min-w-0 flex-col gap-4'
            )}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className={cn(CARD.layout.header, 'w-full min-w-0')}>
              <div className="min-w-0">
                <ProjectPreviewTitleLines
                  subtitle={subtitle}
                  title={title}
                  titleHeadingId={titleId}
                />
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar vista ampliada"
                className={BUTTON.special.icon}
              >
                <CloseIcon className="h-7 w-7" aria-hidden />
              </button>
            </div>
            <div className="bg-bg-subtle flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden rounded-md">
              <ImageCarousel
                slides={validImages}
                imageAlt={imageAlt}
                reduceMotion={reduceMotion}
                autoplay={autoplay}
                carouselAriaLabel={`Capturas ampliadas de ${imageAlt}`}
                previousSlideAriaLabel="Imagen anterior (vista ampliada)"
                nextSlideAriaLabel="Imagen siguiente (vista ampliada)"
                projectImageVariant="lightbox"
                slideIndex={carouselSlideIndex}
                onSlideChange={onCarouselSlideChange}
                className={cn(
                  // Ancho del modal = min(16/9×altura, tope del panel vía `max-w` del diálogo).
                  'aspect-video h-[min(72vh,760px)] w-auto max-w-full min-w-0'
                )}
                imageClassName="!object-contain !object-center"
              />
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}
