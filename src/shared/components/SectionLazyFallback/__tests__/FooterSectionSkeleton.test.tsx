import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FooterSectionSkeleton } from '../subcomponents/FooterSectionSkeleton'

describe('FooterSectionSkeleton', () => {
  it('aplica borde superior y fondo de pie', () => {
    const { container } = render(<FooterSectionSkeleton />)
    const root = container.firstElementChild
    expect(root?.className).toMatch(/border-t/)
    expect(root?.className).toMatch(/bg-bg-white/)
  })

  it('marca el bloque como decorativo (aria-hidden)', () => {
    const { container } = render(<FooterSectionSkeleton />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })
})
