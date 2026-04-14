import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithMotion } from '@/test/renderWithMotion'
import { ProgressiveImage } from '../ProgressiveImage'

function getImageFadeWrapper(img: HTMLElement) {
  const parent = img.parentElement
  if (!parent) throw new Error('img sin contenedor')
  return parent
}

describe('ProgressiveImage', () => {
  it('muestra skeleton mientras la imagen no ha cargado', () => {
    const { container } = renderWithMotion(
      <ProgressiveImage
        src="https://example.com/photo.png"
        alt="Foto de ejemplo"
        data-testid="img"
      />
    )

    const skeleton = container.querySelector('.u-skeleton-shimmer')
    expect(skeleton).toBeInTheDocument()
    expect(getImageFadeWrapper(screen.getByTestId('img'))).toHaveStyle({
      opacity: 0,
    })
  })

  it('oculta skeleton y muestra la imagen tras onLoad', async () => {
    const onLoad = vi.fn()
    const { container } = renderWithMotion(
      <ProgressiveImage
        src="https://example.com/photo.png"
        alt="Foto"
        data-testid="img"
        onLoad={onLoad}
      />
    )

    fireEvent.load(screen.getByTestId('img'))
    expect(onLoad).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(
        container.querySelector('.u-skeleton-shimmer')
      ).not.toBeInTheDocument()
    })
    await waitFor(() => {
      expect(getImageFadeWrapper(screen.getByTestId('img'))).toHaveStyle({
        opacity: 1,
      })
    })
  })

  it('muestra fallback de error y llama onError', async () => {
    const onError = vi.fn()
    renderWithMotion(
      <ProgressiveImage
        src="https://example.com/missing.png"
        alt="Foto"
        data-testid="img"
        onError={onError}
      />
    )

    fireEvent.error(screen.getByTestId('img'))
    expect(onError).toHaveBeenCalledTimes(1)
    expect(screen.queryByTestId('img')).not.toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('reinicia estado al cambiar src', async () => {
    const { rerender, container } = renderWithMotion(
      <ProgressiveImage
        src="https://example.com/a.png"
        alt="A"
        data-testid="img"
      />
    )

    fireEvent.load(screen.getByTestId('img'))
    await waitFor(() => {
      expect(getImageFadeWrapper(screen.getByTestId('img'))).toHaveStyle({
        opacity: 1,
      })
    })

    rerender(
      <ProgressiveImage
        src="https://example.com/b.png"
        alt="B"
        data-testid="img"
      />
    )

    expect(screen.getByTestId('img')).toHaveAttribute(
      'src',
      'https://example.com/b.png'
    )
    expect(getImageFadeWrapper(screen.getByTestId('img'))).toHaveStyle({
      opacity: 0,
    })
    expect(container.querySelector('.u-skeleton-shimmer')).toBeInTheDocument()
  })

  it('no muestra skeleton si showSkeleton es false', () => {
    const { container } = renderWithMotion(
      <ProgressiveImage
        src="https://example.com/photo.png"
        alt="Foto"
        data-testid="img"
        showSkeleton={false}
      />
    )

    expect(
      container.querySelector('.u-skeleton-shimmer')
    ).not.toBeInTheDocument()
  })
})
