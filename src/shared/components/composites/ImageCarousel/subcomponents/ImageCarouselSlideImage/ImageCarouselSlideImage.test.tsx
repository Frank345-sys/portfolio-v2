/**
 * Tests para shared/components/ImageCarousel/subcomponents/ImageCarouselSlideImage/ImageCarouselSlideImage.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ImageCarouselSlideImage } from './ImageCarouselSlideImage'

describe('ImageCarouselSlideImage', () => {
  it('renderiza la imagen con el alt y src correctos', () => {
    render(
      <ImageCarouselSlideImage
        isFirstSlide
        src="/hero.png"
        alt="Captura del proyecto"
      />
    )

    const img = screen.getByRole('img', { name: /captura del proyecto/i })
    expect(img).toHaveAttribute('src', '/hero.png')
  })

  it('primer slide usa loading="eager"', () => {
    render(<ImageCarouselSlideImage isFirstSlide src="/hero.png" alt="Hero" />)

    expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager')
  })

  it('slide no primero usa loading="lazy"', () => {
    render(
      <ImageCarouselSlideImage
        isFirstSlide={false}
        src="/hero.png"
        alt="Hero"
      />
    )

    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy')
  })

  it('aplica imageClassName a la img', () => {
    render(
      <ImageCarouselSlideImage
        isFirstSlide
        src="/hero.png"
        alt="Hero"
        imageClassName="test-img-class"
      />
    )

    expect(screen.getByRole('img')).toHaveClass('test-img-class')
  })

  it('pasa srcSet y sizes a la img cuando se proporcionan', () => {
    render(
      <ImageCarouselSlideImage
        isFirstSlide
        src="/hero.png"
        srcSet="/hero-400.webp 400w, /hero-800.webp 800w"
        sizes="(max-width: 640px) 100vw, 50vw"
        alt="Hero"
      />
    )

    const img = screen.getByRole('img')
    expect(img).toHaveAttribute(
      'srcset',
      '/hero-400.webp 400w, /hero-800.webp 800w'
    )
    expect(img).toHaveAttribute('sizes', '(max-width: 640px) 100vw, 50vw')
  })

  it('no añade srcSet ni sizes si no se pasan', () => {
    render(<ImageCarouselSlideImage isFirstSlide src="/hero.png" alt="Hero" />)

    const img = screen.getByRole('img')
    expect(img).not.toHaveAttribute('srcset')
    expect(img).not.toHaveAttribute('sizes')
  })

  it('con src vacío renderiza placeholder aria-hidden sin img', () => {
    const { container } = render(
      <ImageCarouselSlideImage isFirstSlide={false} src="" alt="Vacío" />
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(container.querySelector('[aria-hidden]')).toBeInTheDocument()
  })

  it('al fallar la carga oculta la img nativa y expone marcador img con etiqueta accesible', () => {
    render(
      <ImageCarouselSlideImage isFirstSlide src="/rota.png" alt="Imagen rota" />
    )

    const img = screen.getByRole('img', { name: /^imagen rota$/i })
    fireEvent.error(img)

    expect(
      screen.queryByRole('img', { name: /^imagen rota$/i })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('img', {
        name: /no se pudo cargar la imagen \(imagen rota\)/i,
      })
    ).toBeInTheDocument()
  })
})
