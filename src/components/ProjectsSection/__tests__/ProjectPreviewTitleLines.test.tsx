import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithMotion } from '@/test/renderWithMotion'

import { ProjectPreviewTitleLines } from '../subcomponents/ProjectPreviewTitleLines'

describe('ProjectPreviewTitleLines', () => {
  const base = { subtitle: 'App Web', title: 'Demo' }

  it('renderiza título como h2 con id cuando titleHeadingId está definido', () => {
    renderWithMotion(
      <ProjectPreviewTitleLines
        {...base}
        titleHeadingId="lightbox-project-title"
      />
    )

    const h2 = screen.getByRole('heading', { level: 2, name: 'Demo' })
    expect(h2).toHaveAttribute('id', 'lightbox-project-title')
  })

  it('renderiza título como párrafo cuando titleHeadingId no se pasa', () => {
    renderWithMotion(<ProjectPreviewTitleLines {...base} />)

    expect(
      screen.queryByRole('heading', { name: 'Demo' })
    ).not.toBeInTheDocument()
    expect(screen.getByText('Demo')).toBeInTheDocument()
  })
})
