/**
 * Tests para shared/components/ImageCarousel/subcomponents/ImageCarouselImpl/ImageCarouselImpl.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithMotion } from '@/test/helpers'

import { ImageCarouselImpl } from './ImageCarouselImpl'

const slides = ['/impl/a.png', '/impl/b.png']

describe('ImageCarouselImpl', () => {
  it('invoca resolveImageAttributes con el src activo y aplica srcSet y sizes a la img', () => {
    const resolveImageAttributes = vi.fn((src: string) => ({
      src,
      srcSet: `${src} 1x`,
      sizes: '100vw',
    }))

    renderWithMotion(
      <ImageCarouselImpl
        slides={slides}
        imageAlt="Galería impl"
        autoplay={false}
        resolveImageAttributes={resolveImageAttributes}
      />
    )

    expect(resolveImageAttributes).toHaveBeenCalledWith('/impl/a.png')
    const img = screen.getByRole('img', {
      name: /galería impl — imagen 1 de 2/i,
    })
    expect(img).toHaveAttribute('src', '/impl/a.png')
    expect(img).toHaveAttribute('srcset', '/impl/a.png 1x')
    expect(img).toHaveAttribute('sizes', '100vw')
  })

  it('en modo controlado respeta slideIndex y notifica onSlideChange al avanzar', async () => {
    const user = userEvent.setup()
    const onSlideChange = vi.fn()

    renderWithMotion(
      <ImageCarouselImpl
        slides={slides}
        imageAlt="Ctrl"
        autoplay={false}
        slideIndex={0}
        onSlideChange={onSlideChange}
      />
    )

    await user.click(screen.getByRole('button', { name: /imagen siguiente/i }))

    expect(onSlideChange).toHaveBeenCalledTimes(1)
    expect(onSlideChange).toHaveBeenCalledWith(1)
  })

  it('marca loading eager solo en el primer slide', async () => {
    const user = userEvent.setup()
    renderWithMotion(
      <ImageCarouselImpl slides={slides} imageAlt="Lazy" autoplay={false} />
    )

    const first = screen.getByRole('img', { name: /lazy — imagen 1 de 2/i })
    expect(first).toHaveAttribute('loading', 'eager')

    await user.click(screen.getByRole('button', { name: /imagen siguiente/i }))

    const second = screen.getByRole('img', { name: /lazy — imagen 2 de 2/i })
    expect(second).toHaveAttribute('loading', 'lazy')
  })

  it('fusiona className en el contenedor e imageClassName en la img', () => {
    renderWithMotion(
      <ImageCarouselImpl
        slides={slides}
        imageAlt="Cls"
        autoplay={false}
        className="test-impl-wrap"
        imageClassName="test-impl-img"
      />
    )

    const region = screen.getByRole('region')
    expect(region).toHaveClass('test-impl-wrap')
    expect(region.querySelector('img.test-impl-img')).toBeInTheDocument()
  })
})
