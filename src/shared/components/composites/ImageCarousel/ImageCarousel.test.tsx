/**
 * Tests para shared/components/ImageCarousel/ImageCarousel.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { fireEvent, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { renderWithMotion } from '@/test/helpers'

import { ImageCarousel } from './ImageCarousel'

const slides = ['/img/a.png', '/img/b.png']

describe('ImageCarousel', () => {
  it('con una sola imagen muestra alt simple y sin región ni botones', () => {
    renderWithMotion(
      <ImageCarousel
        slides={['/solo.png']}
        imageAlt="Vista única"
        autoplay={false}
      />
    )

    expect(screen.getByRole('img', { name: /^vista única$/i })).toHaveAttribute(
      'src',
      '/solo.png'
    )
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('si la imagen falla, muestra aviso accesible en lugar del icono roto del navegador', () => {
    renderWithMotion(
      <ImageCarousel
        slides={['/solo.png']}
        imageAlt="Vista única"
        autoplay={false}
      />
    )

    const img = screen.getByRole('img', { name: /^vista única$/i })
    fireEvent.error(img)

    expect(
      screen.queryByRole('img', { name: /^vista única$/i })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('img', {
        name: /no se pudo cargar la imagen \(vista única\)/i,
      })
    ).toBeInTheDocument()
  })

  it('axe: varias slides sin violaciones conocidas', async () => {
    const { container } = renderWithMotion(
      <ImageCarousel slides={slides} imageAlt="Galería axe" autoplay={false} />
    )

    expect(await axe(container)).toHaveNoViolations()
  })

  it('con varias imágenes expone región con etiqueta por defecto', () => {
    renderWithMotion(
      <ImageCarousel slides={slides} imageAlt="Galería demo" autoplay={false} />
    )

    expect(
      screen.getByRole('region', { name: /capturas de galería demo/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /galería demo — imagen 1 de 2/i })
    ).toHaveAttribute('src', '/img/a.png')
  })

  it('permite sobreescribir carouselAriaLabel', () => {
    renderWithMotion(
      <ImageCarousel
        slides={slides}
        imageAlt="X"
        autoplay={false}
        carouselAriaLabel="Rotación de capturas"
      />
    )

    expect(
      screen.getByRole('region', { name: /rotación de capturas/i })
    ).toBeInTheDocument()
  })

  it('usa previousSlideAriaLabel y nextSlideAriaLabel en los botones', () => {
    renderWithMotion(
      <ImageCarousel
        slides={slides}
        imageAlt="Proyecto"
        autoplay={false}
        previousSlideAriaLabel="Anterior personalizado"
        nextSlideAriaLabel="Siguiente personalizado"
      />
    )

    expect(
      screen.getByRole('button', { name: /anterior personalizado/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /siguiente personalizado/i })
    ).toBeInTheDocument()
  })

  it('al pulsar siguiente actualiza la imagen y el contador accesible', async () => {
    const user = userEvent.setup()
    renderWithMotion(
      <ImageCarousel slides={slides} imageAlt="Demo" autoplay={false} />
    )

    const region = screen.getByRole('region', { name: /capturas de demo/i })

    await user.click(screen.getByRole('button', { name: /imagen siguiente/i }))

    expect(
      screen.getByRole('img', { name: /demo — imagen 2 de 2/i })
    ).toHaveAttribute('src', '/img/b.png')

    expect(within(region).getByText('2/2')).toBeInTheDocument()
  })

  it('al pulsar anterior desde la primera va al último slide', async () => {
    const user = userEvent.setup()
    renderWithMotion(
      <ImageCarousel
        slides={['/1.png', '/2.png', '/3.png']}
        imageAlt="Tres"
        autoplay={false}
      />
    )

    await user.click(screen.getByRole('button', { name: /imagen anterior/i }))

    expect(
      screen.getByRole('img', { name: /tres — imagen 3 de 3/i })
    ).toHaveAttribute('src', '/3.png')
  })

  it('añade className al contenedor y imageClassName a la img', () => {
    renderWithMotion(
      <ImageCarousel
        slides={slides}
        imageAlt="C"
        autoplay={false}
        className="test-carousel-wrap"
        imageClassName="test-carousel-img"
      />
    )

    const region = screen.getByRole('region')
    expect(region).toHaveClass('test-carousel-wrap')
    expect(region.querySelector('img.test-carousel-img')).toBeInTheDocument()
  })

  it('expone contador vivo con aria-live para lectores de pantalla', () => {
    renderWithMotion(
      <ImageCarousel slides={slides} imageAlt="Acc" autoplay={false} />
    )

    const live = screen.getByText('Imagen 1 de 2', { selector: '.sr-only' })
    expect(live.closest('p')).toHaveAttribute('aria-live', 'polite')
    expect(live.closest('p')).toHaveAttribute('aria-atomic', 'true')
  })

  it('con foco en «siguiente», ArrowLeft navega al slide previo (circular desde el primero)', () => {
    renderWithMotion(
      <ImageCarousel slides={slides} imageAlt="Teclado" autoplay={false} />
    )

    const nextBtn = screen.getByRole('button', { name: /imagen siguiente/i })
    fireEvent.focus(nextBtn)
    fireEvent.keyDown(nextBtn, { key: 'ArrowLeft' })

    expect(
      screen.getByRole('img', { name: /teclado — imagen 2 de 2/i })
    ).toHaveAttribute('src', '/img/b.png')
  })

  it('con foco en «anterior», ArrowRight navega al slide siguiente', () => {
    renderWithMotion(
      <ImageCarousel slides={slides} imageAlt="Teclado2" autoplay={false} />
    )

    const prevBtn = screen.getByRole('button', { name: /imagen anterior/i })
    fireEvent.focus(prevBtn)
    fireEvent.keyDown(prevBtn, { key: 'ArrowRight' })

    expect(
      screen.getByRole('img', { name: /teclado2 — imagen 2 de 2/i })
    ).toHaveAttribute('src', '/img/b.png')
  })
})
