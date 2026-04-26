import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { IMAGE_CAROUSEL_AUTOPLAY_MS } from '../constants'
import { useImageCarousel } from '../hooks'

import type { MouseEvent } from 'react'

const baseSlides = ['/a.jpg', '/b.jpg', '/c.jpg']

function createMouseEvent(): MouseEvent {
  return {
    stopPropagation: vi.fn(),
  } as unknown as MouseEvent
}

describe('useImageCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('expone slide inicial 0 y datos derivados acordes a slides', () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        slides: baseSlides,
        imageAlt: 'Proyecto demo',
        reduceMotion: false,
        autoplay: false,
      })
    )

    expect(result.current.slide).toBe(0)
    expect(result.current.count).toBe(3)
    expect(result.current.hasCarousel).toBe(true)
    expect(result.current.currentSrc).toBe('/a.jpg')
    expect(result.current.imgAlt).toContain('imagen 1 de 3')
    expect(result.current.regionLabel).toBe('Capturas de Proyecto demo')
  })

  it('usa carouselAriaLabel cuando se pasa', () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        slides: baseSlides,
        imageAlt: 'X',
        reduceMotion: false,
        autoplay: false,
        carouselAriaLabel: 'Galería personalizada',
      })
    )

    expect(result.current.regionLabel).toBe('Galería personalizada')
  })

  it('con un solo slide no activa modo carrusel', () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        slides: ['/solo.png'],
        imageAlt: 'Única',
        reduceMotion: false,
        autoplay: false,
      })
    )

    expect(result.current.hasCarousel).toBe(false)
    expect(result.current.imgAlt).toBe('Única')
  })

  it('goToSlide avanza y retrocede en bucle', () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        slides: baseSlides,
        imageAlt: 'X',
        reduceMotion: false,
        autoplay: false,
      })
    )

    act(() => {
      result.current.goToSlide('next', true)
    })
    expect(result.current.slide).toBe(1)
    expect(result.current.currentSrc).toBe('/b.jpg')

    act(() => {
      result.current.goToSlide('prev', true)
    })
    expect(result.current.slide).toBe(0)

    act(() => {
      result.current.goToSlide('prev', true)
    })
    expect(result.current.slide).toBe(2)
  })

  it('con un slide no cambia el índice al navegar', () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        slides: ['/one.png'],
        imageAlt: 'Solo',
        reduceMotion: false,
        autoplay: false,
      })
    )

    act(() => {
      result.current.goToSlide('next', true)
    })
    expect(result.current.slide).toBe(0)
  })

  it('goNext y goPrev llaman stopPropagation', () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        slides: baseSlides,
        imageAlt: 'X',
        reduceMotion: false,
        autoplay: false,
      })
    )

    const evNext = createMouseEvent()
    const evPrev = createMouseEvent()

    act(() => {
      result.current.goNext(evNext)
    })
    expect(evNext.stopPropagation).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.goPrev(evPrev)
    })
    expect(evPrev.stopPropagation).toHaveBeenCalledTimes(1)
  })

  it('autoplay avanza el slide tras el intervalo configurado', () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        slides: baseSlides,
        imageAlt: 'X',
        reduceMotion: false,
        autoplay: true,
      })
    )

    expect(result.current.slide).toBe(0)

    act(() => {
      vi.advanceTimersByTime(IMAGE_CAROUSEL_AUTOPLAY_MS)
    })

    expect(result.current.slide).toBe(1)
  })

  it('no hace autoplay si reduceMotion es true', () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        slides: baseSlides,
        imageAlt: 'X',
        reduceMotion: true,
        autoplay: true,
      })
    )

    act(() => {
      vi.advanceTimersByTime(IMAGE_CAROUSEL_AUTOPLAY_MS * 5)
    })

    expect(result.current.slide).toBe(0)
  })

  it('no hace autoplay con un solo slide', () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        slides: ['/one.png'],
        imageAlt: 'X',
        reduceMotion: false,
        autoplay: true,
      })
    )

    act(() => {
      vi.advanceTimersByTime(IMAGE_CAROUSEL_AUTOPLAY_MS * 5)
    })

    expect(result.current.slide).toBe(0)
  })

  it('en modo controlado acota slideIndex fuera de rango', () => {
    const onSlideChange = vi.fn()
    const { result: low } = renderHook(() =>
      useImageCarousel({
        slides: baseSlides,
        imageAlt: 'X',
        reduceMotion: false,
        autoplay: false,
        slideIndex: -1,
        onSlideChange,
      })
    )
    expect(low.current.slide).toBe(0)

    const { result: high } = renderHook(() =>
      useImageCarousel({
        slides: baseSlides,
        imageAlt: 'X',
        reduceMotion: false,
        autoplay: false,
        slideIndex: 10,
        onSlideChange,
      })
    )
    expect(high.current.slide).toBe(2)
  })

  it('con slides vacíos expone count 0 y slide 0', () => {
    const { result } = renderHook(() =>
      useImageCarousel({
        slides: [],
        imageAlt: 'X',
        reduceMotion: false,
        autoplay: false,
      })
    )

    expect(result.current.count).toBe(0)
    expect(result.current.slide).toBe(0)
    expect(result.current.currentSrc).toBe('')
  })

  it('en modo controlado refleja slideIndex y notifica con onSlideChange', () => {
    const onSlideChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ slideIndex }: { slideIndex: number }) =>
        useImageCarousel({
          slides: baseSlides,
          imageAlt: 'X',
          reduceMotion: false,
          autoplay: false,
          slideIndex,
          onSlideChange,
        }),
      { initialProps: { slideIndex: 1 } }
    )

    expect(result.current.slide).toBe(1)
    expect(result.current.currentSrc).toBe('/b.jpg')

    act(() => {
      result.current.goToSlide('next', true)
    })
    expect(onSlideChange).toHaveBeenCalledWith(2)

    rerender({ slideIndex: 2 })
    expect(result.current.slide).toBe(2)
  })
})
