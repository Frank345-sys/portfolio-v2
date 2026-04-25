import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMotion } from '@/test/renderWithMotion'
import { ProjectPreviewLightbox } from '../subcomponents/ProjectPreviewLightbox'

describe('ProjectPreviewLightbox', () => {
  const onClose = vi.fn()
  const onSlideChange = vi.fn()

  beforeEach(() => {
    onClose.mockClear()
    onSlideChange.mockClear()
  })

  it('no muestra el diálogo cuando isOpen es false', () => {
    renderWithMotion(
      <ProjectPreviewLightbox
        isOpen={false}
        onClose={onClose}
        images={['/a.png']}
        imageAlt="Proyecto"
        title="Mi proyecto"
        subtitle="Web"
        reduceMotion
        carouselSlideIndex={0}
        onCarouselSlideChange={onSlideChange}
      />
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('con isOpen e imágenes válidas, expone diálogo modal con título vinculado y cierre', async () => {
    const user = userEvent.setup()
    renderWithMotion(
      <ProjectPreviewLightbox
        isOpen
        onClose={onClose}
        images={['/shot.png']}
        imageAlt="Proyecto X"
        title="Proyecto X"
        subtitle="App"
        reduceMotion
        carouselSlideIndex={0}
        onCarouselSlideChange={onSlideChange}
      />
    )

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')

    const title = screen.getByRole('heading', { level: 2, name: 'Proyecto X' })
    const labelId = title.getAttribute('id')
    expect(labelId).toBeTruthy()
    expect(dialog).toHaveAttribute('aria-labelledby', labelId!)

    await user.click(
      screen.getByRole('button', { name: /cerrar vista ampliada/i })
    )
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
