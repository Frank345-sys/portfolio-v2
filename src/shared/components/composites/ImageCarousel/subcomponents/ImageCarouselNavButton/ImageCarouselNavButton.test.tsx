/**
 * Tests para shared/components/ImageCarousel/subcomponents/ImageCarouselNavButton/ImageCarouselNavButton.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { ImageCarouselNavButton } from './ImageCarouselNavButton'

describe('ImageCarouselNavButton', () => {
  it('renderiza botón anterior con aria-label', () => {
    render(
      <ImageCarouselNavButton
        direction="prev"
        onClick={vi.fn()}
        aria-label="Ir a la imagen anterior"
      />
    )

    expect(
      screen.getByRole('button', { name: /ir a la imagen anterior/i })
    ).toBeInTheDocument()
  })

  it('renderiza botón siguiente con aria-label', () => {
    render(
      <ImageCarouselNavButton
        direction="next"
        onClick={vi.fn()}
        aria-label="Ir a la imagen siguiente"
      />
    )

    expect(
      screen.getByRole('button', { name: /ir a la imagen siguiente/i })
    ).toBeInTheDocument()
  })

  it('dispara onClick al hacer clic', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <ImageCarouselNavButton
        direction="next"
        onClick={onClick}
        aria-label="Siguiente"
      />
    )

    await user.click(screen.getByRole('button', { name: /siguiente/i }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('con ArrowLeft invoca onKeyDown pasado como prop', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()

    render(
      <ImageCarouselNavButton
        direction="next"
        onClick={vi.fn()}
        onKeyDown={onKeyDown}
        aria-label="Nav"
      />
    )

    const button = screen.getByRole('button', { name: /nav/i })
    await user.click(button)
    await user.keyboard('{ArrowLeft}')

    expect(onKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'ArrowLeft' })
    )
  })

  it('con ArrowRight invoca onKeyDown pasado como prop', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()

    render(
      <ImageCarouselNavButton
        direction="prev"
        onClick={vi.fn()}
        onKeyDown={onKeyDown}
        aria-label="Nav"
      />
    )

    await user.click(screen.getByRole('button', { name: /nav/i }))
    await user.keyboard('{ArrowRight}')

    expect(onKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'ArrowRight' })
    )
  })
})
