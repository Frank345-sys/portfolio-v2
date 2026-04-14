import { describe, it, expect } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMotion } from '@/test/renderWithMotion'
import { ImageCarousel } from '../ImageCarousel'

const slides = ['/img/a.png', '/img/b.png']

describe('ImageCarousel', () => {
  it('con una sola imagen muestra alt simple y sin región ni botones', () => {
    renderWithMotion(
      <ImageCarousel
        slides={['/solo.png']}
        imageAlt="Vista única"
        reduceMotion={false}
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

  it('con varias imágenes expone región con etiqueta por defecto', () => {
    renderWithMotion(
      <ImageCarousel
        slides={slides}
        imageAlt="Galería demo"
        reduceMotion={false}
        autoplay={false}
      />
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
        reduceMotion={false}
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
        reduceMotion={false}
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
      <ImageCarousel
        slides={slides}
        imageAlt="Demo"
        reduceMotion={false}
        autoplay={false}
      />
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
        reduceMotion={false}
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
        reduceMotion={false}
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
      <ImageCarousel
        slides={slides}
        imageAlt="Acc"
        reduceMotion={false}
        autoplay={false}
      />
    )

    const live = screen.getByText('Imagen 1 de 2', { selector: '.sr-only' })
    expect(live.closest('p')).toHaveAttribute('aria-live', 'polite')
    expect(live.closest('p')).toHaveAttribute('aria-atomic', 'true')
  })
})
