import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  CardSkeleton,
  SectionTitleSkeleton,
  ShimmerBar,
} from '../subcomponents/skeletonPrimitives'

describe('skeletonPrimitives', () => {
  describe('ShimmerBar', () => {
    it('combina className con el estilo base', () => {
      const { container } = render(
        <ShimmerBar className="test-shimmer-unique h-2 w-8" />
      )
      const el = container.querySelector('.test-shimmer-unique')
      expect(el).toBeInTheDocument()
      expect(el?.className).toMatch(/animate-pulse/)
    })
  })

  describe('SectionTitleSkeleton', () => {
    it('muestra el prefijo // como en SectionLabel', () => {
      render(<SectionTitleSkeleton />)
      expect(screen.getByText('//')).toBeInTheDocument()
    })
  })

  describe('CardSkeleton', () => {
    it('marca el contenedor como decorativo para lectores de pantalla', () => {
      render(<CardSkeleton />)
      const card = document.querySelector('[aria-hidden="true"]')
      expect(card).toBeInTheDocument()
    })
  })
})
