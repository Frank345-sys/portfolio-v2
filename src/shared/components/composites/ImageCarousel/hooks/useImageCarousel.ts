/**
 * Carrusel de imágenes: índice activo, autoplay, variantes Motion y textos accesibles por slide.
 *
 * @fileoverview Soporta modo controlado o interno, autoplay condicionado y pausa tras navegación manual.
 * @remarks Autoplay desactivado con `prefers-reduced-motion`; transiciones Motion vía `MotionConfig` global.
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { MOTION_ANIMATION } from '@/shared/constants/motionAnimations'
import { useMediaQuery } from '@/shared/hooks'

import type {
  ImageCarouselNavDirection,
  ImageCarouselSharedOptions,
} from '../types'
import type { Variants } from 'motion/react'
import type { MouseEvent } from 'react'

// ---------------------------------------------------------------------------
// Constantes internas
// ---------------------------------------------------------------------------

/** Intervalo entre avances automáticos del carrusel (ms). */
export const IMAGE_CAROUSEL_AUTOPLAY_MS: number = 4000 as const

/**
 * Tiempo de pausa del autoplay tras una navegación manual (ms).
 *
 * Evita que el carrusel avance justo después de que el usuario haya elegido
 * un slide manualmente, lo que resultaría desorientador.
 */
const IMAGE_CAROUSEL_AUTOPLAY_PAUSE_AFTER_MANUAL_MS: number = 5500

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

/** Valor de retorno del hook {@link useImageCarousel}. */
interface UseImageCarouselReturn {
  /** Índice del slide activo (0-based). */
  slide: number
  /** Número total de slides. */
  count: number
  /** `true` cuando hay más de un slide y el carrusel está activo. */
  hasCarousel: boolean
  /** Variantes de Motion para la transición de entrada/salida de cada slide. */
  slideVariants: Variants
  /** Etiqueta accesible del `role="region"` del carrusel. */
  regionLabel: string
  /** Texto alternativo enriquecido de la imagen activa (incluye índice si hay carrusel). */
  imgAlt: string
  /** URL del slide activo; cadena vacía si `slides` está vacío. */
  currentSrc: string
  /** Handler de clic para el botón «siguiente» (llama `stopPropagation`). */
  goNext: (event: MouseEvent) => void
  /** Handler de clic para el botón «anterior» (llama `stopPropagation`). */
  goPrev: (event: MouseEvent) => void
  /**
   * Navega a `'prev'` o `'next'` de forma circular.
   * Con `manual = true` pausa el autoplay durante
   * {@link IMAGE_CAROUSEL_AUTOPLAY_PAUSE_AFTER_MANUAL_MS} ms.
   */
  goToSlide: (target: ImageCarouselNavDirection, manual?: boolean) => void
}

/** Media query para desactivar autoplay (no es animación Motion). */
const MEDIA_QUERY_REDUCED_MOTION = '(prefers-reduced-motion: reduce)' as const

type UseImageCarouselOptions = ImageCarouselSharedOptions

// ---------------------------------------------------------------------------
// Helpers puros (sin estado, fáciles de testear en aislamiento)
// ---------------------------------------------------------------------------

/**
 * Acota `index` al rango `[0, count - 1]`.
 * Devuelve `0` si `count <= 0`.
 */
function clampSlideIndex(index: number, count: number): number {
  if (count <= 0) return 0
  return Math.min(Math.max(0, index), count - 1)
}

/**
 * Resuelve la etiqueta accesible del `role="region"` del carrusel.
 * Usa `carouselAriaLabel` si se proporciona; si no, construye
 * `"Capturas de <imageAlt>"`.
 */
function resolveRegionLabel(
  imageAlt: string,
  carouselAriaLabel?: string
): string {
  return carouselAriaLabel ?? `Capturas de ${imageAlt}`
}

/**
 * Construye el `alt` de la imagen activa.
 *
 * - Modo carrusel (varios slides): `"<imageAlt> — imagen <n> de <total>"`.
 * - Slide único: devuelve `imageAlt` sin modificar.
 */
function resolveImgAlt(
  imageAlt: string,
  slideIndex: number,
  count: number,
  hasCarousel: boolean
): string {
  if (!hasCarousel) return imageAlt
  return `${imageAlt} — imagen ${slideIndex + 1} de ${count}`
}

/**
 * Genera las {@link Variants} de Motion para la transición fade de los slides.
 *
 * @param duration - Duración en segundos del fade entre slides.
 */
function createSlideVariants(duration: number): Variants {
  const transition = {
    duration,
    ease: MOTION_ANIMATION.easing.expressive,
  } as const

  return {
    enter: { opacity: 0, transition },
    center: { opacity: 1, transition },
    exit: { opacity: 0, transition },
  }
}

// ---------------------------------------------------------------------------
// Hook principal
// ---------------------------------------------------------------------------

/**
 * Gestiona el estado, el autoplay y la navegación circular del carrusel de
 * imágenes.
 *
 * ### Modos de operación
 * - **No controlado** (por defecto): el índice activo vive dentro del hook.
 * - **Controlado**: pasa `slideIndex` + `onSlideChange` para sincronizar
 *   varios carruseles (p. ej. tarjeta y modal ampliado).
 *
 * ### Autoplay
 * El autoplay solo se activa cuando `autoplay = true`, no hay
 * `prefers-reduced-motion: reduce` y hay más de un slide. Tras una navegación manual se pausa durante
 * {@link IMAGE_CAROUSEL_AUTOPLAY_PAUSE_AFTER_MANUAL_MS} ms antes de reanudar.
 *
 * @example
 * ```tsx
 * const { slide, goNext, goPrev } = useImageCarousel({
 *   slides: ['/a.png', '/b.png'],
 *   imageAlt: 'Galería',
 *   autoplay: true,
 * })
 * ```
 */
export function useImageCarousel({
  slides,
  imageAlt,
  autoplay,
  carouselAriaLabel,
  slideIndex: slideIndexProp,
  onSlideChange,
}: UseImageCarouselOptions): UseImageCarouselReturn {
  const prefersReducedMotion = useMediaQuery(MEDIA_QUERY_REDUCED_MOTION)
  // ── Modo controlado vs. no controlado ───────────────────────────────────
  const controlled =
    typeof slideIndexProp === 'number' && typeof onSlideChange === 'function'

  // ── Estado interno ───────────────────────────────────────────────────────
  const [internalSlide, setInternalSlide] = useState(0)
  /**
   * Epoch que crece con cada navegación manual.
   * Al cambiar reinicia el `useEffect` de autoplay sin incluir `slide` en
   * las dependencias, evitando un loop de referencias.
   */
  const [manualNavEpoch, setManualNavEpoch] = useState(0)

  // ── Refs ─────────────────────────────────────────────────────────────────
  /** Timestamp hasta el cual el autoplay permanece pausado. */
  const pauseAutoplayUntilRef = useRef(0)
  /** Handle del timeout activo de autoplay (`null` si no hay ninguno). */
  const autoplayTimeoutRef = useRef<number | null>(null)
  /** Ref estable a `onSlideChange` para usarla dentro de efectos/callbacks. */
  const onSlideChangeRef = useRef(onSlideChange)

  useLayoutEffect(() => {
    onSlideChangeRef.current = onSlideChange
  }, [onSlideChange])

  // ── Valores derivados ────────────────────────────────────────────────────
  const count = slides.length
  const hasCarousel = count > 1

  const slide = controlled
    ? clampSlideIndex(slideIndexProp, count)
    : internalSlide

  /** Ref estable al índice activo para usarlo dentro del timeout de autoplay. */
  const slideRef = useRef(slide)
  useLayoutEffect(() => {
    slideRef.current = slide
  }, [slide])

  const slideVariants = useMemo(() => createSlideVariants(0.75), [])

  // ── Navegación ───────────────────────────────────────────────────────────

  /**
   * Navega al slide anterior o siguiente de forma circular.
   * Con `manual = true`:
   * 1. Cancela el timeout de autoplay pendiente.
   * 2. Establece una pausa antes del siguiente ciclo automático.
   * 3. Incrementa `manualNavEpoch` para reiniciar el efecto de autoplay.
   */
  const goToSlide = useCallback(
    (target: ImageCarouselNavDirection, manual = false) => {
      if (count <= 1) return

      if (manual) {
        if (autoplayTimeoutRef.current !== null) {
          window.clearTimeout(autoplayTimeoutRef.current)
          autoplayTimeoutRef.current = null
        }
        pauseAutoplayUntilRef.current =
          Date.now() + IMAGE_CAROUSEL_AUTOPLAY_PAUSE_AFTER_MANUAL_MS
        if (autoplay && !prefersReducedMotion && hasCarousel) {
          setManualNavEpoch((e) => e + 1)
        }
      }

      const next =
        target === 'prev' ? (slide - 1 + count) % count : (slide + 1) % count

      if (controlled) {
        onSlideChangeRef.current?.(next)
      } else {
        setInternalSlide(next)
      }
    },
    [autoplay, count, controlled, hasCarousel, prefersReducedMotion, slide]
  )

  /** Handler de clic para el botón «siguiente» — detiene la propagación. */
  const goNext = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      goToSlide('next', true)
    },
    [goToSlide]
  )

  /** Handler de clic para el botón «anterior» — detiene la propagación. */
  const goPrev = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      goToSlide('prev', true)
    },
    [goToSlide]
  )

  // ── Autoplay ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const shouldAutoplay = autoplay && !prefersReducedMotion
    if (!shouldAutoplay || !hasCarousel) return

    let cancelled = false
    let timeoutId: number | null = null

    /**
     * Programa el siguiente avance automático respetando la pausa post-manual.
     * Se llama recursivamente hasta que el efecto se desmonte.
     */
    const scheduleTick = () => {
      if (cancelled) return
      const waitMs = Math.max(
        IMAGE_CAROUSEL_AUTOPLAY_MS,
        pauseAutoplayUntilRef.current - Date.now()
      )
      timeoutId = window.setTimeout(() => {
        timeoutId = null
        if (cancelled) return
        const next = (slideRef.current + 1) % count

        if (controlled && onSlideChangeRef.current) {
          onSlideChangeRef.current(next)
        } else {
          setInternalSlide(next)
        }

        scheduleTick()
      }, waitMs)
    }

    scheduleTick()

    return () => {
      cancelled = true
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
        timeoutId = null
      }
    }
  }, [
    autoplay,
    prefersReducedMotion,
    hasCarousel,
    count,
    controlled,
    manualNavEpoch,
  ])

  // ── Valores de retorno ───────────────────────────────────────────────────
  return {
    slide,
    count,
    hasCarousel,
    slideVariants,
    regionLabel: resolveRegionLabel(imageAlt, carouselAriaLabel),
    imgAlt: resolveImgAlt(imageAlt, slide, count, hasCarousel),
    currentSrc: slides[slide] ?? '',
    goNext,
    goPrev,
    goToSlide,
  }
}
