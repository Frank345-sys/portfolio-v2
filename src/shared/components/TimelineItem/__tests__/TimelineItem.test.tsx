import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TimelineItem } from '@/shared/components/TimelineItem'
import { TIMELINE_CHIP_VARIANT } from '@/shared/constants/enums'

/**
 * Casos mínimos:
 * - render sin errores
 * - props críticas visibles
 * - variación visual principal por `accent`
 */
describe('TimelineItem', () => {
  it('renderiza contenido base con props críticas', () => {
    render(
      <ol aria-label="Timeline de prueba">
        <TimelineItem
          period="Sep 2024 - Feb 2026"
          role="Frontend Developer"
          company="B Life"
          description="Trabajo en productos web"
        />
      </ol>
    )

    expect(
      screen.getByRole('list', { name: /timeline de prueba/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('listitem')).toBeInTheDocument()
    expect(screen.getAllByText('Sep 2024 - Feb 2026').length).toBeGreaterThan(0)
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('B Life')).toBeInTheDocument()
    expect(screen.getByText('Trabajo en productos web')).toBeInTheDocument()
  })

  it('renderiza chips cuando se envían variantes válidas', () => {
    render(
      <ol>
        <TimelineItem
          period="2025"
          role="Rol"
          company="Compañía"
          description="Descripción"
          chips={[
            { label: 'React', variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY },
            {
              label: '-30% bugs',
              variant: TIMELINE_CHIP_VARIANT.IMPACT_METRIC,
            },
          ]}
        />
      </ol>
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('-30% bugs')).toBeInTheDocument()
  })

  it('aplica acento feature en la compañía cuando corresponde', () => {
    render(
      <ol>
        <TimelineItem
          period="2025"
          role="Rol"
          company="Institución"
          description="Descripción"
          accent="feature"
        />
      </ol>
    )

    expect(screen.getByText('Institución')).toHaveClass('text-feature-base')
  })

  it('no falla cuando no se envían chips (prop opcional)', () => {
    render(
      <ol>
        <TimelineItem
          period="2026"
          role="Role"
          company="Company"
          description="Desc"
        />
      </ol>
    )

    expect(screen.getByRole('listitem')).toBeInTheDocument()
    expect(screen.queryByText('React')).not.toBeInTheDocument()
  })
})
