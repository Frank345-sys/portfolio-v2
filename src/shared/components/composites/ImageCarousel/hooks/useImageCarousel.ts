/**
 * Carrusel de imágenes: índice activo, autoplay, variantes Motion y textos accesibles por slide.
 *
 * @fileoverview Soporta modo controlado o interno, autoplay condicionado y pausa tras navegación manual.
 * @remarks Autoplay desactivado con `prefers-reduced-motion`; transiciones Motion vía `MotionConfig` global.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { MEDIA_QUERY_REDUCED_MOTION } from '@/shared/constants/breakpoints'
import { MOTION_ANIMATION } from '@/shared/constants/motionAnimations'
import { useMediaQuery } from '@/shared/hooks'

import type {
  ImageCarouselNavDirection,
  ImageCarouselSharedOptions,
} from '../types'
import type { Variants } from 'motion/react'
import type { MouseEvent } from 'react'

export const IMAGE_CAROUSEL_AUTOPLAY_MS = 4000 as const
export const IMAGE_CAROUSEL_AUTOPLAY_PAUSE_AFTER_MANUAL_MS = 5500 as const

interface UseImageCarouselReturn {
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

function resolveRegionLabel(
  imageAlt: string,
  carouselAriaLabel?: string
): string {
  return carouselAriaLabel ?? `Capturas de ${imageAlt}`
}

function resolveImgAlt(
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

const IMAGE_CAROUSEL_SLIDE_VARIANTS = createSlideVariants(0.75)

export function useImageCarousel({
  slides,
  imageAlt,
  autoplay,
  carouselAriaLabel,
  slideIndex: slideIndexProp,
  onSlideChange,
}: ImageCarouselSharedOptions): UseImageCarouselReturn {
  const prefersReducedMotion = useMediaQuery(MEDIA_QUERY_REDUCED_MOTION)
  const controlled =
    typeof slideIndexProp === 'number' && typeof onSlideChange === 'function'

  const [internalSlide, setInternalSlide] = useState(0)
  const pauseUntilRef = useRef(0)
  const timeoutRef = useRef<number | null>(null)
  const onSlideChangeRef = useRef(onSlideChange)
  const slideRef = useRef(0)
  const scheduleAutoplayRef = useRef<(() => void) | null>(null)

  const count = slides.length
  const hasCarousel = count > 1
  const slide = controlled
    ? clampSlideIndex(slideIndexProp, count)
    : internalSlide

  useLayoutEffect(() => {
    onSlideChangeRef.current = onSlideChange
    slideRef.current = slide
  }, [onSlideChange, slide])

  const shouldAutoplay = autoplay && !prefersReducedMotion && hasCarousel

  function clearAutoplayTimeout() {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  function goToSlide(target: ImageCarouselNavDirection, manual = false) {
    if (count <= 1) return

    if (manual) {
      pauseUntilRef.current =
        Date.now() + IMAGE_CAROUSEL_AUTOPLAY_PAUSE_AFTER_MANUAL_MS
      if (shouldAutoplay) {
        scheduleAutoplayRef.current?.()
      }
    }

    const next =
      target === 'prev' ? (slide - 1 + count) % count : (slide + 1) % count

    if (controlled) {
      onSlideChangeRef.current?.(next)
    } else {
      setInternalSlide(next)
    }
  }

  function goNext(event: MouseEvent) {
    event.stopPropagation()
    goToSlide('next', true)
  }

  function goPrev(event: MouseEvent) {
    event.stopPropagation()
    goToSlide('prev', true)
  }

  useEffect(() => {
    function advanceSlide() {
      const next = (slideRef.current + 1) % count

      if (controlled) {
        onSlideChangeRef.current?.(next)
      } else {
        setInternalSlide(next)
      }
    }

    function scheduleAutoplayTick() {
      clearAutoplayTimeout()

      const waitMs = Math.max(
        IMAGE_CAROUSEL_AUTOPLAY_MS,
        pauseUntilRef.current - Date.now()
      )

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null
        advanceSlide()
        scheduleAutoplayTick()
      }, waitMs)
    }

    if (!shouldAutoplay) {
      scheduleAutoplayRef.current = null
      clearAutoplayTimeout()
      return
    }

    scheduleAutoplayRef.current = scheduleAutoplayTick
    scheduleAutoplayTick()

    return () => {
      scheduleAutoplayRef.current = null
      clearAutoplayTimeout()
    }
  }, [shouldAutoplay, count, controlled])

  return {
    slide,
    count,
    hasCarousel,
    slideVariants: IMAGE_CAROUSEL_SLIDE_VARIANTS,
    regionLabel: resolveRegionLabel(imageAlt, carouselAriaLabel),
    imgAlt: resolveImgAlt(imageAlt, slide, count, hasCarousel),
    currentSrc: slides[slide] ?? '',
    goNext,
    goPrev,
    goToSlide,
  }
}
