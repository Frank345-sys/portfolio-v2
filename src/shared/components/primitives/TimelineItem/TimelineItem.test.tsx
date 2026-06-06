/**
 * Tests para shared/components/TimelineItem/TimelineItem.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SITE_PROFILE } from './constants'
import { TimelineItem } from './TimelineItem'
import { TIMELINE_CHIP_VARIANT } from './types'

/**
 * Integración ligera del componente (`useTimelineItem` + layout + fila de chips).
 * Los chips se renderizan en un contenedor `BADGE.group.horizontal`.
 * Detalle unitario:
 * – `hooks/useTimelineItem.test.ts`
 * – `utils/__tests__/resolvePeriodDatetime.test.ts`
 * – `utils/__tests__/orderTimelineChipsByLegend.test.ts`
 *
 * Cobertura:
 * - `<time datetime>` duplicado con periodStart / periodEnd
 * - sólo periodStart máquina-legible
 * - Contenido crítico y acento empresarial
 * - Con chips: aparece el contenedor horizontal (`flex-wrap`); sin chips o `[]`, no
 */
describe('TimelineItem', () => {
  it('duplica dateTime en ambos <time> cuando hay periodStart/periodEnd máquina-legibles', () => {
    render(
      <ol aria-label="Timeline de prueba">
        <TimelineItem
          period="Sep 2024 - Feb 2026"
          periodStartDatetime="2024-09-01"
          periodEndDatetime="2026-02-28"
          heading="Dev"
          company="Corp"
          description="..."
        />
      </ol>
    )

    const times = screen
      .getAllByRole('time')
      .filter((el) => el.getAttribute('datetime') === '2024-09-01/2026-02-28')
    expect(times).toHaveLength(2)
  })

  it('sin periodEndDatetime usa sólo periodStartDatetime en datetime', () => {
    render(
      <ol aria-label="Timeline de prueba">
        <TimelineItem
          period="2025 — presente"
          periodStartDatetime="2025-01"
          heading="Dev"
          company="Corp"
          description="..."
        />
      </ol>
    )

    expect(
      screen
        .getAllByRole('time')
        .filter((el) => el.getAttribute('datetime') === '2025-01')
    ).toHaveLength(2)
  })

  it('renderiza contenido base con props críticas', () => {
    render(
      <ol aria-label="Timeline de prueba">
        <TimelineItem
          period="Sep 2024 - Feb 2026"
          heading={SITE_PROFILE.role}
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
    expect(screen.getByText(SITE_PROFILE.role)).toBeInTheDocument()
    expect(screen.getByText('B Life')).toBeInTheDocument()
    expect(screen.getByText('Trabajo en productos web')).toBeInTheDocument()
  })

  it('renderiza chips cuando se envían variantes válidas', () => {
    render(
      <ol>
        <TimelineItem
          period="2025"
          heading="Rol"
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

    const listItem = screen.getByRole('listitem')
    expect(listItem.querySelector('[class*="flex-wrap"]')).not.toBeNull()

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('-30% bugs')).toBeInTheDocument()
  })

  it('muestra la modalidad junto a la empresa cuando se proporciona', () => {
    render(
      <ol>
        <TimelineItem
          period="2025"
          heading="Rol"
          company="Institución"
          modalidad="Híbrido"
          description="Descripción"
        />
      </ol>
    )

    expect(screen.getByText('Institución')).toBeInTheDocument()
    expect(screen.getByText('Híbrido')).toBeInTheDocument()
    expect(screen.getByText('Híbrido')).toHaveClass('text-text-subtle')
  })

  it('aplica acento information en la compañía', () => {
    render(
      <ol>
        <TimelineItem
          period="2025"
          heading="Rol"
          company="Institución"
          description="Descripción"
        />
      </ol>
    )

    expect(screen.getByText('Institución').closest('p')).toHaveClass(
      'text-information-base'
    )
  })

  it('no falla cuando la prop chips está ausente', () => {
    render(
      <ol>
        <TimelineItem
          period="2026"
          heading="Role"
          company="Company"
          description="Desc"
        />
      </ol>
    )

    expect(screen.getByRole('listitem')).toBeInTheDocument()
    expect(screen.queryByText('React')).not.toBeInTheDocument()
  })

  it('no renderiza el grupo horizontal de chips cuando chips es un array vacío', () => {
    render(
      <ol>
        <TimelineItem
          period="2026"
          heading="Role"
          company="Company"
          description="Desc"
          chips={[]}
        />
      </ol>
    )

    const listItem = screen.getByRole('listitem')
    // `BADGE.group.horizontal` incluye `flex-wrap`; no debe aparecer si no hay chips
    expect(listItem.querySelector('[class*="flex-wrap"]')).toBeNull()
  })
})
