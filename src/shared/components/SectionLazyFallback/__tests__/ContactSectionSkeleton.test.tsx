import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ContactSectionSkeleton } from '../subcomponents/ContactSectionSkeleton'

describe('ContactSectionSkeleton', () => {
  it('renderiza encabezado con //', () => {
    render(<ContactSectionSkeleton />)
    expect(screen.getByText('//')).toBeInTheDocument()
  })

  it('usa grid de contacto con columna fija 400px en lg', () => {
    const { container } = render(<ContactSectionSkeleton />)
    const grid = container.querySelector(
      '.lg\\:grid-cols-\\[minmax\\(0\\,1fr\\)_400px\\]'
    )
    expect(grid).toBeInTheDocument()
  })
})
