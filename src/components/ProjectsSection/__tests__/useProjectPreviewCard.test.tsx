import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useProjectPreviewCard } from '../hooks/useProjectPreviewCard'

type ProjectPreviewCardHookResult = ReturnType<typeof useProjectPreviewCard>

const useInViewMock = vi.fn(() => true)

vi.mock('motion/react', async (importOriginal) => {
  const mod = await importOriginal<typeof import('motion/react')>()
  return {
    ...mod,
    useInView: () => useInViewMock(),
  }
})

const useMediaQueryMock = vi.fn(() => false)

vi.mock('@/shared/hooks/useMediaQuery', () => ({
  useMediaQuery: () => useMediaQueryMock(),
}))

describe('useProjectPreviewCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useInViewMock.mockReturnValue(true)
    useMediaQueryMock.mockReturnValue(false)
  })

  const baseProps = {
    images: ['/images/projects/berp-erp.png'] as string[],
    autoplay: false,
    lightboxActive: false,
    lightboxSlideIndex: undefined as number | undefined,
    onLightboxSlideChange: undefined as ((i: number) => void) | undefined,
  }

  it('actualiza slideIndex local con onCarouselSlideChange cuando el lightbox está cerrado', () => {
    const { result } = renderHook(() =>
      useProjectPreviewCard({
        ...baseProps,
        onLightboxSlideChange: vi.fn(),
      })
    )
    expect(result.current.slideIndex).toBe(0)
    act(() => {
      result.current.onCarouselSlideChange(2)
    })
    expect(result.current.slideIndex).toBe(2)
  })

  it('con lightbox abierto usa lightboxSlideIndex y delega cambios al padre', () => {
    const onLightboxSlideChange = vi.fn()
    const { result } = renderHook(() =>
      useProjectPreviewCard({
        ...baseProps,
        lightboxActive: true,
        lightboxSlideIndex: 1,
        onLightboxSlideChange,
      })
    )
    expect(result.current.slideIndex).toBe(1)
    act(() => {
      result.current.onCarouselSlideChange(0)
    })
    expect(onLightboxSlideChange).toHaveBeenCalledWith(0)
  })

  it('canExpand solo en viewport lg con imágenes válidas', () => {
    useMediaQueryMock.mockReturnValue(false)
    const { result: narrow } = renderHook(() =>
      useProjectPreviewCard(baseProps)
    )
    expect(narrow.current.canExpand).toBe(false)

    useMediaQueryMock.mockReturnValue(true)
    const { result: wide } = renderHook(() => useProjectPreviewCard(baseProps))
    expect(wide.current.canExpand).toBe(true)
  })

  it('sin imágenes canExpand y shouldAutoplay son false', () => {
    useMediaQueryMock.mockReturnValue(true)
    const { result } = renderHook(() =>
      useProjectPreviewCard({
        ...baseProps,
        images: [],
        autoplay: true,
      })
    )
    expect(result.current.canExpand).toBe(false)
    expect(result.current.shouldAutoplay).toBe(false)
  })

  it('shouldAutoplay combina autoplay, imágenes y tarjeta en vista', () => {
    useMediaQueryMock.mockReturnValue(true)
    useInViewMock.mockReturnValue(true)
    const { result } = renderHook(() =>
      useProjectPreviewCard({
        ...baseProps,
        autoplay: true,
      })
    )
    expect(result.current.shouldAutoplay).toBe(true)

    useInViewMock.mockReturnValue(false)
    const { result: out } = renderHook(() =>
      useProjectPreviewCard({
        ...baseProps,
        autoplay: true,
      })
    )
    expect(out.current.shouldAutoplay).toBe(false)
  })

  it('al cambiar el conjunto de imágenes reinicia el slide a 0', async () => {
    const { result, rerender } = renderHook(
      (props: { images: string[] }) =>
        useProjectPreviewCard({ ...baseProps, images: props.images }),
      { initialProps: { images: ['/a.png', '/b.png'] } }
    )
    act(() => {
      result.current.onCarouselSlideChange(1)
    })
    expect(result.current.slideIndex).toBe(1)

    rerender({ images: ['/c.png'] })

    await waitFor(() => {
      expect(result.current.slideIndex).toBe(0)
    })
  })

  it('al cerrar el lightbox conserva el último slide visto en el modal', async () => {
    const onLightboxSlideChange = vi.fn()
    type LightboxRerenderProps = {
      lightboxActive: boolean
      lightboxSlideIndex?: number
    }
    const { result, rerender } = renderHook<
      ProjectPreviewCardHookResult,
      LightboxRerenderProps
    >(
      (props) =>
        useProjectPreviewCard({
          ...baseProps,
          lightboxActive: props.lightboxActive,
          lightboxSlideIndex: props.lightboxSlideIndex,
          onLightboxSlideChange,
        }),
      {
        initialProps: {
          lightboxActive: true,
          lightboxSlideIndex: 2,
        },
      }
    )
    expect(result.current.slideIndex).toBe(2)

    rerender({ lightboxActive: false })

    await waitFor(() => {
      expect(result.current.slideIndex).toBe(2)
    })
  })
})
