/**
 * Pieza de interfaz del portfolio (`ImageCarousel`).
 *
 * @fileoverview Implementación del archivo `ImageCarousel.tsx` dentro de `shared/components/ImageCarousel`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import {
  ImageCarouselImpl,
  type ImageCarouselImplProps,
} from './subcomponents/ImageCarouselImpl/ImageCarouselImpl'

/** Props públicas del componente `ImageCarousel`. */
type ImageCarouselProps = ImageCarouselImplProps

/**
 * @module shared/components/ImageCarousel/ImageCarousel
 *
 * Carrusel de imágenes accesible con animaciones Motion.
 *
 * - **Un slide**: renderiza solo la imagen, sin `role="region"` ni controles.
 * - **Varios slides**: añade `role="region"` con etiqueta ARIA, botones
 *   prev/next, y un contador vivo con `aria-live="polite"`.
 *
 * El estado interno se reinicia automáticamente al cambiar `slides` gracias
 * a la prop `key` derivada en `ImageCarousel` → `ImageCarouselImpl`.
 * Para sincronizar varios carruseles usa las props `slideIndex` / `onSlideChange`.
 *
 * @example
 * ```tsx
 * // Modo no controlado (estado interno)
 * <ImageCarousel
 *   slides={['/a.png', '/b.png']}
 *   imageAlt="Capturas del proyecto"
 *   autoplay
 * />
 *
 * // Modo controlado (preview + modal sincronizados)
 * <ImageCarousel
 *   slides={slides}
 *   imageAlt="Galería"
 *   autoplay={false}
 *   slideIndex={activeSlide}
 *   onSlideChange={setActiveSlide}
 * />
 * ```
 */
export function ImageCarousel(props: ImageCarouselProps) {
  const slidesKey = props.slides.join('|')
  return <ImageCarouselImpl key={slidesKey} {...props} />
}
