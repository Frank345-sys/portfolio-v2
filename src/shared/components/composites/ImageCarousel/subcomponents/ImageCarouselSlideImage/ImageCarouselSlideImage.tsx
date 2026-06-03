/**
 * Pieza de interfaz del portfolio (`ImageCarouselSlideImage`).
 *
 * @fileoverview Implementación del archivo `ImageCarouselSlideImage.tsx` dentro de `shared/components/ImageCarousel/subcomponents/ImageCarouselSlideImage`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { useCallback, useState } from 'react'

import { Z } from '@/shared/constants/tokens'
import { ImageBrokenIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

/** Props del subcomponente interno `ImageCarouselSlideImage`. */
interface ImageCarouselSlideImageProps {
  /**
   * Indica si este slide es el primero de la lista.
   * El primer slide usa `loading="eager"` para evitar el flash de contenido;
   * el resto usan `loading="lazy"`.
   */
  isFirstSlide: boolean
  /** URL de la imagen. Si es cadena vacía se renderiza un placeholder invisible. */
  src: string
  /** `srcset` opcional resuelto por el consumidor del carrusel. */
  srcSet?: string
  /** `sizes` opcional resuelto por el consumidor del carrusel. */
  sizes?: string
  /** Texto alternativo accesible de la imagen. */
  alt: string
  /** Clases extra que se añaden a la `<img>` (p. ej. efecto hover del ancestro `group`). */
  imageClassName?: string
}

/**
 * Imagen de un slide del carrusel con fallback accesible.
 *
 * Si `src` está vacío muestra un `div` invisible (`aria-hidden`).
 * Si la imagen falla al cargar muestra un `<img>` con `alt` descriptivo
 * e icono decorativo (sin `alert` intrusivo).
 *
 * @internal Uso exclusivo desde `ImageCarouselImpl`.
 *
 * @example
 * ```tsx
 * <ImageCarouselSlideImage
 *   isFirstSlide
 *   src="/hero.webp"
 *   srcSet="/hero-400.webp 400w, /hero-800.webp 800w"
 *   sizes="(max-width: 640px) 100vw, 50vw"
 *   alt="Captura del proyecto — imagen 1 de 3"
 * />
 * ```
 */
export function ImageCarouselSlideImage({
  isFirstSlide,
  src,
  srcSet,
  sizes,
  alt,
  imageClassName,
}: ImageCarouselSlideImageProps) {
  const [hasImageError, setHasImageError] = useState(false)

  const handleImageError = useCallback(() => {
    setHasImageError(true)
  }, [])

  if (!src) {
    return <div className="relative h-full w-full" aria-hidden />
  }

  return (
    <div className="relative h-full w-full">
      {!hasImageError ? (
        <img
          src={src}
          {...(srcSet !== undefined ? { srcSet } : {})}
          {...(sizes !== undefined ? { sizes } : {})}
          alt={alt}
          className={cn(
            'absolute inset-0 h-full w-full object-cover object-top',
            imageClassName
          )}
          loading={isFirstSlide ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          onError={handleImageError}
        />
      ) : (
        <div
          className={cn(
            Z.raised,
            'bg-bg-subtle text-text-soft absolute inset-0 flex items-center justify-center'
          )}
        >
          <img
            alt={`No se pudo cargar la imagen (${alt}).`}
            className="sr-only"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            decoding="async"
            draggable={false}
          />
          <ImageBrokenIcon aria-hidden />
        </div>
      )}
    </div>
  )
}
