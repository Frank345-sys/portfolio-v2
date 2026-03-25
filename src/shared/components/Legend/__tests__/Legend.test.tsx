import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { Legend } from '../Legend'
import { BADGE } from '@/shared/constants/tokens/badge'

const SAMPLE_ITEMS = [
  { id: 'a', label: 'Primera leyenda', dotClassName: 'bg-information-base' },
  { id: 'b', label: 'Segunda leyenda', dotClassName: 'bg-success-base' },
] as const

describe('Legend', () => {
  it('renderiza cada ítem con su etiqueta', () => {
    render(<Legend items={[...SAMPLE_ITEMS]} />)

    expect(screen.getByText('Primera leyenda')).toBeInTheDocument()
    expect(screen.getByText('Segunda leyenda')).toBeInTheDocument()
  })

  it('usa role list y listitem', () => {
    render(<Legend items={[...SAMPLE_ITEMS]} />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(within(list).getAllByRole('listitem')).toHaveLength(2)
  })

  it('aplica aria-label al contenedor cuando se pasa', () => {
    render(<Legend items={[...SAMPLE_ITEMS]} ariaLabel="Leyenda de prueba" />)

    expect(
      screen.getByRole('list', { name: /leyenda de prueba/i })
    ).toBeInTheDocument()
  })

  it('no define aria-label cuando no se pasa', () => {
    render(<Legend items={[...SAMPLE_ITEMS]} />)
    const list = screen.getByRole('list')
    expect(list).not.toHaveAttribute('aria-label')
  })

  it('combina BADGE.special.dot con dotClassName en el punto', () => {
    render(
      <Legend
        items={[
          {
            id: 'x',
            label: 'Solo uno',
            dotClassName: 'bg-feature-base',
          },
        ]}
      />
    )

    const item = screen.getByRole('listitem')
    const dot = item.querySelector('span[aria-hidden="true"]')
    expect(dot).toHaveClass(BADGE.special.dot)
    expect(dot).toHaveClass('bg-feature-base')
  })

  it('aplica className adicional al contenedor', () => {
    const { container } = render(
      <Legend items={[...SAMPLE_ITEMS]} className="custom-legend-class" />
    )
    expect(container.firstChild).toHaveClass('custom-legend-class')
  })
})
