/**
 * Tests para shared/components/ImageCarousel/subcomponents/ImageCarouselNavButton/ImageCarouselNavButton.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { ImageCarouselNavButton } from './ImageCarouselNavButton'

describe('ImageCarouselNavButton', () => {
  it('renderiza botón anterior con aria-label', () => {
    const onClick = vi.fn()
    const onArrowNavigate = vi.fn()

    render(
      <ImageCarouselNavButton
        direction="prev"
        onClick={onClick}
        onArrowNavigate={onArrowNavigate}
        ariaLabel="Ir a la imagen anterior"
      />
    )

    expect(
      screen.getByRole('button', { name: /ir a la imagen anterior/i })
    ).toBeInTheDocument()
  })

  it('renderiza botón siguiente con aria-label', () => {
    const onClick = vi.fn()
    const onArrowNavigate = vi.fn()

    render(
      <ImageCarouselNavButton
        direction="next"
        onClick={onClick}
        onArrowNavigate={onArrowNavigate}
        ariaLabel="Ir a la imagen siguiente"
      />
    )

    expect(
      screen.getByRole('button', { name: /ir a la imagen siguiente/i })
    ).toBeInTheDocument()
  })

  it('dispara onClick al hacer clic', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const onArrowNavigate = vi.fn()

    render(
      <ImageCarouselNavButton
        direction="next"
        onClick={onClick}
        onArrowNavigate={onArrowNavigate}
        ariaLabel="Siguiente"
      />
    )

    await user.click(screen.getByRole('button', { name: /siguiente/i }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onArrowNavigate).not.toHaveBeenCalled()
  })

  it('con ArrowLeft llama onArrowNavigate("prev")', () => {
    const onClick = vi.fn()
    const onArrowNavigate = vi.fn()

    render(
      <ImageCarouselNavButton
        direction="next"
        onClick={onClick}
        onArrowNavigate={onArrowNavigate}
        ariaLabel="Nav"
      />
    )

    const button = screen.getByRole('button', { name: /nav/i })
    fireEvent.keyDown(button, { key: 'ArrowLeft' })

    expect(onArrowNavigate).toHaveBeenCalledWith('prev')
  })

  it('con ArrowRight llama onArrowNavigate("next")', () => {
    const onArrowNavigate = vi.fn()

    render(
      <ImageCarouselNavButton
        direction="prev"
        onClick={vi.fn()}
        onArrowNavigate={onArrowNavigate}
        ariaLabel="Nav"
      />
    )

    fireEvent.keyDown(screen.getByRole('button', { name: /nav/i }), {
      key: 'ArrowRight',
    })

    expect(onArrowNavigate).toHaveBeenCalledWith('next')
  })
})
