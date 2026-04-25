import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectsSectionSkeleton } from '../subcomponents/ProjectsSectionSkeleton'

describe('ProjectsSectionSkeleton', () => {
  it('renderiza encabezado tipo sección con //', () => {
    render(<ProjectsSectionSkeleton />)
    expect(screen.getByText('//')).toBeInTheDocument()
  })

  it('usa fila principal con gap-10 como ProjectsSection', () => {
    const { container } = render(<ProjectsSectionSkeleton />)
    const row = container.querySelector('.lg\\:gap-10')
    expect(row).toBeInTheDocument()
  })
})
