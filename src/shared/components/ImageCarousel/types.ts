/** Dirección de navegación circular del carrusel. */
export type ImageCarouselNavDirection = 'prev' | 'next'

/**
 * Opciones compartidas entre `ImageCarousel` y `useImageCarousel`
 * (contenido, movimiento reducido, autoplay, región y modo controlado).
 */
export interface ImageCarouselSharedOptions {
  /** URLs de cada slide (una sola imagen oculta controles). */
  slides: string[]
  /** Texto alternativo base; con varias imágenes se enriquece con índice. */
  imageAlt: string
  /** Preferencia del sistema/usuario; `null` hasta hidratar (evitar flash de animación). */
  reduceMotion: boolean | null
  /** Activa el avance automático (respetando `reduceMotion` internamente). */
  autoplay: boolean
  /**
   * Etiqueta accesible del `role="region"` cuando hay más de un slide.
   * Si se omite, se usa «Capturas de» + `imageAlt`.
   */
  carouselAriaLabel?: string
  /**
   * Modo controlado: mismo índice en varios carruseles (p. ej. preview + lightbox).
   * Requiere pasar ambos junto con `onSlideChange`.
   */
  slideIndex?: number
  onSlideChange?: (index: number) => void
}
