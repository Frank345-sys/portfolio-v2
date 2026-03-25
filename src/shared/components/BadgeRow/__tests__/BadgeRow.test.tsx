import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BadgeRow } from '../BadgeRow'
import { BADGE } from '@/shared/constants/tokens/badge'

describe('BadgeRow', () => {
  /**
   * El componente retorna null si no hay ítems — el contenedor de testing queda vacío.
   */
  it('no renderiza nada cuando items está vacío', () => {
    const { container } = render(<BadgeRow items={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renderiza un chip por ítem con variantes', () => {
    render(
      <BadgeRow
        items={[
          { label: 'A', variantClassName: BADGE.variant.primary },
          { label: 'B', variantClassName: BADGE.variant.neutral },
        ]}
      />
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('A')).toHaveClass(BADGE.size.sm)
    expect(screen.getByText('A')).toHaveClass(BADGE.variant.primary)
  })
})
