import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useReducedMotion } from 'motion/react'
import { useCallback, useState } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getValidUrls } from '@/shared/utils/getValidUrls'
import { renderWithMotion } from '@/test/renderWithMotion'

import { ProjectPreviewCard, ProjectPreviewLightbox } from '../subcomponents'

import type { ProjectPreviewCardProps } from '../subcomponents/ProjectPreviewCard'

type ProjectPreviewCardWithLightboxProps = Omit<
  ProjectPreviewCardProps,
  'reduceMotion'
>

/** Replica el patrón de `ProjectsSection`: card + un solo lightbox enlazado por callback. */
function ProjectPreviewCardWithLightbox(
  props: ProjectPreviewCardWithLightboxProps
) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxSlide, setLightboxSlide] = useState(0)
  const reduceMotion = useReducedMotion()
  const validImages = getValidUrls(props.images)

  const onRequestLightbox = useCallback((slideIndex: number) => {
    setLightboxSlide(slideIndex)
    setLightboxOpen(true)
  }, [])

  return (
    <>
      <ProjectPreviewCard
        {...props}
        reduceMotion={reduceMotion}
        onRequestLightbox={onRequestLightbox}
        lightboxActive={lightboxOpen}
        lightboxSlideIndex={lightboxOpen ? lightboxSlide : undefined}
        onLightboxSlideChange={setLightboxSlide}
      />
      {lightboxOpen && validImages.length > 0 ? (
        <ProjectPreviewLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={validImages}
          imageAlt={props.imageAlt}
          title={props.title}
          subtitle={props.subtitle}
          reduceMotion={reduceMotion}
          carouselSlideIndex={lightboxSlide}
          onCarouselSlideChange={setLightboxSlide}
        />
      ) : null}
    </>
  )
}

function mockIntersectionObserver() {
  globalThis.IntersectionObserver = class {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn(() => [])
    root = null
    rootMargin = ''
    thresholds = []
  } as unknown as typeof IntersectionObserver
}

/** `useMediaQuery` / breakpoint `lg` — por defecto viewport &lt; lg en tests. */
function mockMatchMedia(matches = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  })
}

describe('ProjectPreviewCard', () => {
  beforeEach(() => {
    mockIntersectionObserver()
    mockMatchMedia(false)
  })

  it('renderiza título, subtítulo e imagen principal', () => {
    renderWithMotion(
      <ProjectPreviewCard
        images={['/images/projects/blife-app-landing.png']}
        imageAlt="Blife App Landing"
        subtitle="Landing Page"
        title="Blife App Landing"
        reduceMotion={false}
        isActive={true}
        autoplay={false}
      />
    )

    expect(screen.getByText('Landing Page')).toBeInTheDocument()
    expect(screen.getByText('Blife App Landing')).toBeInTheDocument()
    expect(
      screen.getByRole('img', {
        name: /blife app landing/i,
      })
    ).toBeInTheDocument()
  })

  it('con múltiples imágenes renderiza controles y avanza slide con click', async () => {
    const user = userEvent.setup()
    renderWithMotion(
      <ProjectPreviewCard
        images={[
          '/images/projects/blife-ecommerce.png',
          '/images/projects/blife-ecommerce-cart.png',
        ]}
        imageAlt="E-commerce Blife"
        subtitle="App Web"
        title="E-commerce Blife"
        reduceMotion={false}
        isActive={true}
        autoplay={false}
      />
    )

    expect(
      screen.getByRole('region', { name: /capturas de e-commerce blife/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /imagen anterior del proyecto/i })
    ).toBeInTheDocument()
    const nextButton = screen.getByRole('button', {
      name: /imagen siguiente del proyecto/i,
    })
    expect(nextButton).toBeInTheDocument()

    await user.click(nextButton)

    expect(
      screen.getByRole('img', {
        name: /e-commerce blife — imagen 2 de 2/i,
      })
    ).toBeInTheDocument()
  })

  it('sin imágenes válidas muestra placeholder accesible sin img', () => {
    renderWithMotion(
      <ProjectPreviewCard
        images={[]}
        imageAlt="Proyecto vacío"
        subtitle="Demo"
        title="Proyecto sin capturas"
        reduceMotion={false}
        isActive={true}
        autoplay={false}
      />
    )

    expect(
      screen.getByRole('img', {
        name: /sin capturas del proyecto: proyecto sin capturas/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('img', { name: /proyecto vacío/i })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /imagen siguiente del proyecto/i })
    ).not.toBeInTheDocument()
  })

  it('con una sola imagen no muestra controles de carrusel', () => {
    renderWithMotion(
      <ProjectPreviewCard
        images={['/images/projects/berp-erp.png']}
        imageAlt="Proyecto con una imagen"
        subtitle="Demo"
        title="Proyecto Demo"
        reduceMotion={false}
        isActive={false}
        autoplay={false}
      />
    )

    expect(
      screen.getByRole('img', { name: /proyecto con una imagen/i })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /imagen siguiente del proyecto/i })
    ).not.toBeInTheDocument()
  })

  it('en viewport lg abre el diálogo de vista ampliada al pulsar el botón', async () => {
    mockMatchMedia(true)
    const user = userEvent.setup()
    renderWithMotion(
      <ProjectPreviewCardWithLightbox
        images={['/images/projects/berp-erp.png']}
        imageAlt="BERP"
        subtitle="App Web"
        title="BERP ERP"
        isActive={true}
        autoplay={false}
      />
    )

    await user.click(
      screen.getByRole('button', { name: /ver berp erp a pantalla completa/i })
    )

    expect(
      screen.getByRole('dialog', { name: /berp erp/i })
    ).toBeInTheDocument()
    const imgs = screen.getAllByRole('img', { name: /^berp$/i })
    expect(imgs.length).toBeGreaterThanOrEqual(1)
  })

  it('en lg, clic en la imagen invoca onRequestLightbox con el slide actual', async () => {
    mockMatchMedia(true)
    const onRequestLightbox = vi.fn()
    const user = userEvent.setup()
    renderWithMotion(
      <ProjectPreviewCard
        images={['/images/projects/berp-erp.png']}
        imageAlt="BERP"
        subtitle="App Web"
        title="BERP ERP"
        reduceMotion={false}
        isActive={true}
        autoplay={false}
        onRequestLightbox={onRequestLightbox}
      />
    )

    await user.click(screen.getByRole('img', { name: /^berp$/i }))
    expect(onRequestLightbox).toHaveBeenCalledTimes(1)
    expect(onRequestLightbox).toHaveBeenCalledWith(0)
  })

  it('en lg no invoca onRequestLightbox al pulsar la card si no está activa', async () => {
    mockMatchMedia(true)
    const onRequestLightbox = vi.fn()
    const user = userEvent.setup()
    renderWithMotion(
      <ProjectPreviewCard
        images={['/images/projects/berp-erp.png']}
        imageAlt="BERP"
        subtitle="App Web"
        title="BERP ERP"
        reduceMotion={false}
        isActive={false}
        autoplay={false}
        onRequestLightbox={onRequestLightbox}
      />
    )

    await user.click(screen.getByRole('img', { name: /^berp$/i }))
    expect(onRequestLightbox).not.toHaveBeenCalled()
  })

  it('en viewport lg no cierra el diálogo al pulsar el contenido del panel', async () => {
    mockMatchMedia(true)
    const user = userEvent.setup()
    renderWithMotion(
      <ProjectPreviewCardWithLightbox
        images={['/images/projects/berp-erp.png']}
        imageAlt="BERP"
        subtitle="App Web"
        title="BERP ERP"
        isActive={true}
        autoplay={false}
      />
    )

    await user.click(
      screen.getByRole('button', { name: /ver berp erp a pantalla completa/i })
    )

    const dialog = screen.getByRole('dialog', { name: /berp erp/i })
    expect(dialog).toBeInTheDocument()

    await user.click(
      screen.getByRole('heading', { level: 2, name: /berp erp/i })
    )

    expect(
      screen.getByRole('dialog', { name: /berp erp/i })
    ).toBeInTheDocument()
  })
})
