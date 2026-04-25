import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AboutSectionSkeleton } from '../subcomponents/AboutSectionSkeleton'

describe('AboutSectionSkeleton', () => {
  it('renderiza el prefijo // del encabezado', () => {
    render(<AboutSectionSkeleton />)
    expect(screen.getByText('//')).toBeInTheDocument()
  })

  it('usa contenedor narrow (max-w-5xl) como AboutSection', () => {
    const { container } = render(<AboutSectionSkeleton />)
    const root = container.firstElementChild
    expect(root?.className).toMatch(/max-w-5xl/)
  })
})
