import { useCallback } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { TYPOGRAPHY, Z } from '@/shared/constants/tokens'
import { ProgressiveImage } from '@/shared/components/ProgressiveImage'
import { useImageCarousel } from './hooks/useImageCarousel'
import { CarouselNavButton } from './subcomponents'
import type {
  ImageCarouselNavDirection,
  ImageCarouselSharedOptions,
} from './types'
import { cn } from '@/shared/utils/cn'

/** Props públicas del componente `ImageCarousel`. */
export interface ImageCarouselProps extends ImageCarouselSharedOptions {
  /** Si se omite, se usa la etiqueta por defecto en español («Imagen anterior»). */
  previousSlideAriaLabel?: string
  /** Si se omite, se usa la etiqueta por defecto en español («Imagen siguiente»). */
  nextSlideAriaLabel?: string
  /** Clases del contenedor (p. ej. `aspect-video`). */
  className?: string
  /**
   * Clases extra para la `<img>` (p. ej. `group-hover:scale-[1.03]` si un ancestro usa `group`).
   */
  imageClassName?: string
}

/**
 * Carrusel de imágenes con Motion: un solo slide omite región y flechas; varios slides
 * añaden `role="region"`, botones prev/next y contador con `aria-live="polite"`.
 *
 * Al cambiar el conjunto de `slides`, el estado interno del hook se reinicia remontando
 * la implementación con `key` (no hace falta `key` en el padre salvo modo controlado
 * compartido entre varios carruseles).
 *
 * @example
 * ```tsx
 * <ImageCarousel
 *   slides={['/a.png', '/b.png']}
 *   imageAlt="Proyecto"
 *   reduceMotion={false}
 *   autoplay={false}
 * />
 * ```
 */
export function ImageCarousel(props: ImageCarouselProps) {
  const slidesKey = props.slides.join('|')
  return <ImageCarouselImpl key={slidesKey} {...props} />
}

function ImageCarouselImpl({
  slides,
  imageAlt,
  reduceMotion,
  autoplay,
  carouselAriaLabel,
  previousSlideAriaLabel,
  nextSlideAriaLabel,
  className,
  imageClassName,
  slideIndex,
  onSlideChange,
}: ImageCarouselProps) {
  const resolvedPreviousAriaLabel: string =
    previousSlideAriaLabel ?? 'Imagen anterior'
  const resolvedNextAriaLabel: string = nextSlideAriaLabel ?? 'Imagen siguiente'

  const {
    slide,
    count,
    hasCarousel,
    slideVariants,
    regionLabel,
    imgAlt,
    currentSrc,
    goNext,
    goPrev,
    goToSlide,
  } = useImageCarousel({
    slides,
    imageAlt,
    reduceMotion,
    autoplay,
    ...(carouselAriaLabel !== undefined ? { carouselAriaLabel } : {}),
    ...(typeof slideIndex === 'number' && onSlideChange !== undefined
      ? { slideIndex, onSlideChange }
      : {}),
  })

  const handleArrowNavigate = useCallback(
    (target: ImageCarouselNavDirection) => goToSlide(target, true),
    [goToSlide]
  )

  return (
    <div
      className={cn('relative aspect-video w-full overflow-hidden', className)}
      {...(hasCarousel
        ? {
            role: 'region',
            'aria-label': regionLabel,
          }
        : {})}
    >
      <AnimatePresence initial={false} mode="sync">
        <m.div
          key={slide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 h-full w-full"
        >
          <ProgressiveImage
            src={currentSrc}
            alt={imgAlt}
            reduceMotion={reduceMotion}
            wrapperClassName="h-full w-full"
            className={cn(
              'absolute inset-0 h-full w-full object-cover object-top',
              imageClassName
            )}
            loading={slide === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
          />
        </m.div>
      </AnimatePresence>

      {hasCarousel && (
        <>
          <CarouselNavButton
            direction="prev"
            onClick={goPrev}
            onArrowNavigate={handleArrowNavigate}
            ariaLabel={resolvedPreviousAriaLabel}
          />
          <CarouselNavButton
            direction="next"
            onClick={goNext}
            onArrowNavigate={handleArrowNavigate}
            ariaLabel={resolvedNextAriaLabel}
          />

          <p
            aria-live="polite"
            aria-atomic="true"
            className={cn(
              TYPOGRAPHY.title.small,
              Z.raised,
              'text-text-white bg-information-base absolute right-5 bottom-5 rounded-md px-2 py-1 font-mono tracking-[0.3em] uppercase'
            )}
          >
            <span className="sr-only">
              Imagen {slide + 1} de {count}
            </span>
            <span aria-hidden="true">
              {slide + 1}/{count}
            </span>
          </p>
        </>
      )}
    </div>
  )
}
