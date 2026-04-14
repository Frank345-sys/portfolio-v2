import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { MouseEvent } from 'react'
import type { Variants } from 'motion/react'
import { MOTION_ANIMATION } from '@/shared/constants/motion'
import {
  IMAGE_CAROUSEL_AUTOPLAY_MS,
  IMAGE_CAROUSEL_AUTOPLAY_PAUSE_AFTER_MANUAL_MS,
} from '../constants'
import type {
  ImageCarouselNavDirection,
  ImageCarouselSharedOptions,
} from '../types'

/** Parámetros del hook (mismas opciones compartidas que el carrusel). */
export type UseImageCarouselParams = ImageCarouselSharedOptions

/** Valor de retorno del hook `useImageCarousel`. */
export interface UseImageCarouselReturn {
  slide: number
  count: number
  hasCarousel: boolean
  slideVariants: Variants
  regionLabel: string
  imgAlt: string
  currentSrc: string
  goNext: (event: MouseEvent) => void
  goPrev: (event: MouseEvent) => void
  goToSlide: (target: ImageCarouselNavDirection, manual?: boolean) => void
}

function clampSlideIndex(index: number, count: number): number {
  if (count <= 0) return 0
  return Math.min(Math.max(0, index), count - 1)
}

function regionLabel(imageAlt: string, carouselAriaLabel?: string): string {
  return carouselAriaLabel ?? `Capturas de ${imageAlt}`
}

function imgAltForSlide(
  imageAlt: string,
  slideIndex: number,
  count: number,
  hasCarousel: boolean
): string {
  if (!hasCarousel) return imageAlt
  return `${imageAlt} — imagen ${slideIndex + 1} de ${count}`
}

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

/**
 * Estado, autoplay y navegación circular del carrusel de imágenes.
 */
export function useImageCarousel({
  slides,
  imageAlt,
  reduceMotion,
  autoplay,
  carouselAriaLabel,
  slideIndex: slideIndexProp,
  onSlideChange,
}: UseImageCarouselParams): UseImageCarouselReturn {
  const controlled =
    typeof slideIndexProp === 'number' && typeof onSlideChange === 'function'

  const [internalSlide, setInternalSlide] = useState(0)
  /** Solo incrementa en prev/next manual: reinicia la cadena de autoplay sin depender de `slide` en el efecto. */
  const [manualNavEpoch, setManualNavEpoch] = useState(0)
  const pauseAutoplayUntilRef = useRef(0)
  const autoplayTimeoutRef = useRef<number | null>(null)
  const onSlideChangeRef = useRef(onSlideChange)

  useLayoutEffect(() => {
    onSlideChangeRef.current = onSlideChange
  }, [onSlideChange])

  const count = slides.length
  const hasCarousel = count > 1

  const slide = controlled
    ? clampSlideIndex(slideIndexProp, count)
    : internalSlide

  const slideRef = useRef(slide)
  useLayoutEffect(() => {
    slideRef.current = slide
  }, [slide])

  const duration: number = reduceMotion === true ? 0.12 : 0.75

  const slideVariants = useMemo(() => createSlideVariants(duration), [duration])

  const goToSlide = useCallback(
    (target: ImageCarouselNavDirection, manual = false) => {
      if (count <= 1) return
      if (manual) {
        if (autoplayTimeoutRef.current) {
          window.clearTimeout(autoplayTimeoutRef.current)
          autoplayTimeoutRef.current = null
        }
        pauseAutoplayUntilRef.current =
          Date.now() + IMAGE_CAROUSEL_AUTOPLAY_PAUSE_AFTER_MANUAL_MS
        if (autoplay && !reduceMotion && hasCarousel) {
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
    [autoplay, count, controlled, hasCarousel, reduceMotion, slide]
  )

  const goNext = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      goToSlide('next', true)
    },
    [goToSlide]
  )

  const goPrev = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      goToSlide('prev', true)
    },
    [goToSlide]
  )

  useEffect(() => {
    const shouldAutoplay = autoplay && !reduceMotion
    if (!shouldAutoplay || !hasCarousel) return

    const scheduleTick = () => {
      const waitMs = Math.max(
        IMAGE_CAROUSEL_AUTOPLAY_MS,
        pauseAutoplayUntilRef.current - Date.now()
      )
      autoplayTimeoutRef.current = window.setTimeout(() => {
        autoplayTimeoutRef.current = null
        const next = (slideRef.current + 1) % count
        if (controlled && onSlideChangeRef.current) {
          onSlideChangeRef.current(next)
        } else {
          setInternalSlide(next)
        }
        if (autoplay && !reduceMotion && hasCarousel) {
          scheduleTick()
        }
      }, waitMs)
    }

    scheduleTick()

    return () => {
      if (autoplayTimeoutRef.current !== null) {
        window.clearTimeout(autoplayTimeoutRef.current)
        autoplayTimeoutRef.current = null
      }
    }
  }, [autoplay, reduceMotion, hasCarousel, count, controlled, manualNavEpoch])

  const regionLabelResolved = regionLabel(imageAlt, carouselAriaLabel)
  const imgAlt = imgAltForSlide(imageAlt, slide, count, hasCarousel)
  const currentSrc = slides[slide] ?? ''

  return {
    slide,
    count,
    hasCarousel,
    slideVariants,
    regionLabel: regionLabelResolved,
    imgAlt,
    currentSrc,
    goNext,
    goPrev,
    goToSlide,
  }
}
