/**
 * Pieza de interfaz del portfolio (`ImageCarouselImpl`).
 *
 * @fileoverview Implementación del archivo `ImageCarouselImpl.tsx` dentro de `shared/components/ImageCarousel/subcomponents/ImageCarouselImpl`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { AnimatePresence, m } from 'motion/react'

import { TYPOGRAPHY, Z } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { useImageCarousel } from '../../hooks/useImageCarousel'
import { ImageCarouselNavButton } from '../ImageCarouselNavButton/ImageCarouselNavButton'
import { ImageCarouselSlideImage } from '../ImageCarouselSlideImage/ImageCarouselSlideImage'

import type { ImageCarouselSharedOptions } from '../../types'
import type { ImgHTMLAttributes, KeyboardEvent } from 'react'

type ImageCarouselImageAttributes = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'sizes'
>

export interface ImageCarouselImplProps extends ImageCarouselSharedOptions {
  /**
   * Resuelve atributos de imagen (`src`, `srcSet`, `sizes`) a partir del `src`
   * activo del slide. Permite delegar adaptaciones de dominio al consumidor.
   */
  resolveImageAttributes?: (src: string) => ImageCarouselImageAttributes
  /**
   * Etiqueta accesible del botón «imagen anterior».
   * @defaultValue 'Imagen anterior'
   */
  previousSlideAriaLabel?: string
  /**
   * Etiqueta accesible del botón «imagen siguiente».
   * @defaultValue 'Imagen siguiente'
   */
  nextSlideAriaLabel?: string
  /** Clases extra del contenedor exterior (p. ej. `aspect-video`, `rounded-xl`). */
  className?: string
  /**
   * Clases extra para la `<img>` interior
   * (p. ej. `group-hover:scale-[1.03]` si un ancestro usa `group`).
   */
  imageClassName?: string
}

/**
 * Implementación interna del carrusel: monta `useImageCarousel`, controles
 * accesibles (`role="region"`, `aria-live` del contador) y la imagen animada.
 *
 * El consumidor público es {@link ImageCarousel}, que envuelve este componente
 * con un `key` derivado de `slides.join('|')` para resetear el estado interno
 * al cambiar el conjunto completo de slides.
 */
export function ImageCarouselImpl({
  slides,
  imageAlt,
  autoplay,
  carouselAriaLabel,
  previousSlideAriaLabel,
  nextSlideAriaLabel,
  resolveImageAttributes,
  className,
  imageClassName,
  slideIndex,
  onSlideChange,
}: ImageCarouselImplProps) {
  const resolvedPrevLabel = previousSlideAriaLabel ?? 'Imagen anterior'
  const resolvedNextLabel = nextSlideAriaLabel ?? 'Imagen siguiente'

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
    autoplay,
    ...(carouselAriaLabel !== undefined ? { carouselAriaLabel } : {}),
    ...(typeof slideIndex === 'number' && onSlideChange !== undefined
      ? { slideIndex, onSlideChange }
      : {}),
  })

  /** Flechas ← / → en los botones (APG carousel pattern). */
  function handleNavKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goToSlide('prev', true)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goToSlide('next', true)
    }
  }

  /** Atributos de imagen resueltos por el consumidor (si aplica). */
  const {
    src: imageSrc = '',
    srcSet: imageSrcSet,
    sizes: imageSizes,
  } = resolveImageAttributes?.(currentSrc) ?? { src: currentSrc }

  return (
    <div
      className={cn('relative aspect-video w-full overflow-hidden', className)}
      {...(hasCarousel ? { role: 'region', 'aria-label': regionLabel } : {})}
    >
      {/* ── Slide animado ── */}
      <AnimatePresence initial={false} mode="sync">
        <m.div
          key={slide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 size-full"
        >
          <ImageCarouselSlideImage
            key={`${slide}-${imageSrc}`}
            isFirstSlide={slide === 0}
            src={imageSrc}
            srcSet={imageSrcSet}
            sizes={imageSizes}
            alt={imgAlt}
            imageClassName={imageClassName}
          />
        </m.div>
      </AnimatePresence>

      {/* ── Controles de navegación (solo con varios slides) ── */}
      {hasCarousel && (
        <>
          <ImageCarouselNavButton
            direction="prev"
            onClick={goPrev}
            onKeyDown={handleNavKeyDown}
            aria-label={resolvedPrevLabel}
          />
          <ImageCarouselNavButton
            direction="next"
            onClick={goNext}
            onKeyDown={handleNavKeyDown}
            aria-label={resolvedNextLabel}
          />

          {/*
           * Contador accesible:
           * – `.sr-only` con aria-live anuncia el cambio a lectores de pantalla.
           * – `aria-hidden` muestra el formato compacto "N/total" visualmente.
           */}
          <p
            aria-live="polite"
            aria-atomic="true"
            className={cn(
              TYPOGRAPHY.title.small,
              Z.raised,
              'bg-information-base absolute right-5 bottom-5 rounded-md px-2 py-1 font-mono tracking-[0.3em] text-white uppercase'
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
