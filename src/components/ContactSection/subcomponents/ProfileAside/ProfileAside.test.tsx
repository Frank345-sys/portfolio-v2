import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  CONTACT_ASIDE_AVAILABILITY_HEADING_ID,
  CONTACT_ASIDE_METADATA_HEADING_ID,
  CONTACT_ASIDE_SERVICES_HEADING_ID,
  CONTACT_ASIDE_ZONE_LABEL_TRIM,
  CONTACT_STATUS_ROWS,
} from './constants'
import { ProfileAside } from './ProfileAside'

/**
 * {@link ProfileAside}: `complementary` con leyenda, lista de servicios y `dl` de metadatos
 * (`OwnerLocalTime`, zona). Subbloques con `h3` e IDs estables en `./constants`.
 *
 * **Cobertura**
 * - Landmark: `complementary` y `aria-label`
 * - Subbloques: `role="group"` + `aria-labelledby` hacia cada `h3`
 * - Leyenda: lista con nombre accesible; textos Disponible / Limitado / No disponible
 * - Servicios: cardinalidad (`CONTACT_STATUS_ROWS`) y `aria-label` del `ul`
 * - Metadatos: grupo accesible, `dl`, respuesta; hora local (`time` + `datetime` ISO); «Zona» solo si `CONTACT_ASIDE_ZONE_LABEL_TRIM` no está vacío
 */
describe('ProfileAside', () => {
  it('expone complementary con nombre accesible de resumen de perfil', () => {
    render(<ProfileAside />)
    expect(
      screen.getByRole('complementary', {
        name: /resumen de perfil y disponibilidad/i,
      })
    ).toBeInTheDocument()
  })

  it('agrupa disponibilidad, servicios y metadatos con role=group y aria-labelledby', () => {
    const { container } = render(<ProfileAside />)
    expect(
      container.querySelector(
        `[role="group"][aria-labelledby="${CONTACT_ASIDE_AVAILABILITY_HEADING_ID}"]`
      )
    ).toBeInTheDocument()
    expect(
      container.querySelector(
        `[role="group"][aria-labelledby="${CONTACT_ASIDE_SERVICES_HEADING_ID}"]`
      )
    ).toBeInTheDocument()
    expect(
      container.querySelector(
        `[role="group"][aria-labelledby="${CONTACT_ASIDE_METADATA_HEADING_ID}"]`
      )
    ).toBeInTheDocument()
  })

  it('expone h3 visibles para disponibilidad y servicios; sr-only para el bloque de metadatos', () => {
    render(<ProfileAside />)
    const aside = screen.getByRole('complementary', {
      name: /resumen de perfil y disponibilidad/i,
    })
    expect(
      within(aside).getByRole('heading', { level: 3, name: 'Disponibilidad' })
    ).toBeInTheDocument()
    expect(
      within(aside).getByRole('heading', {
        level: 3,
        name: 'Servicios disponibles',
      })
    ).toBeInTheDocument()
    const metadataHeading = within(aside).getByRole('heading', {
      level: 3,
      name: /tiempo de respuesta, hora local y zona horaria de referencia/i,
    })
    const rect = metadataHeading.getBoundingClientRect()
    expect(rect.width <= 1 && rect.height <= 1).toBe(true)
  })

  it('renderiza la leyenda de significados con nombre accesible', () => {
    render(<ProfileAside />)

    expect(
      screen.getByRole('list', {
        name: /significado de los colores en la tarjeta de disponibilidad/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Disponible', { exact: true })).toBeInTheDocument()
    expect(screen.getByText('Limitado', { exact: true })).toBeInTheDocument()
    expect(
      screen.getByText('No disponible', { exact: true })
    ).toBeInTheDocument()
  })

  it('lista servicios con un listitem por fila de datos y aria-label en la lista', () => {
    render(<ProfileAside />)
    const aside = screen.getByRole('complementary', {
      name: /resumen de perfil y disponibilidad/i,
    })
    const list = within(aside).getByRole('list', {
      name: /indicadores de disponibilidad por tipo de colaboración/i,
    })
    const items = within(list).getAllByRole('listitem')
    expect(items).toHaveLength(CONTACT_STATUS_ROWS.length)
    for (const row of CONTACT_STATUS_ROWS) {
      expect(
        within(list).getByText(row.label, { exact: true })
      ).toBeInTheDocument()
    }
  })

  it('metadatos: dl con respuesta y hora local; Zona condicionada al texto de zona', () => {
    render(<ProfileAside />)

    const aside = screen.getByRole('complementary', {
      name: /resumen de perfil y disponibilidad/i,
    })
    const metaGroup = within(aside).getByRole('group', {
      name: /tiempo de respuesta, hora local y zona horaria de referencia/i,
    })
    const dl = metaGroup.querySelector('dl')
    expect(dl).toBeTruthy()
    const inDl = within(dl as HTMLElement)

    expect(inDl.getByText('Respuesta', { exact: true })).toBeInTheDocument()
    expect(inDl.getByText('Hora local', { exact: true })).toBeInTheDocument()
    expect(inDl.getByText(/~ 2 h/i)).toBeInTheDocument()

    expect(!!inDl.queryByText('Zona', { exact: true })).toBe(
      Boolean(CONTACT_ASIDE_ZONE_LABEL_TRIM)
    )
  })

  it('renderiza hora local con elemento time y datetime ISO válido', () => {
    render(<ProfileAside />)

    const aside = screen.getByRole('complementary', {
      name: /resumen de perfil y disponibilidad/i,
    })
    const timeEl = aside.querySelector('time[datetime]')
    expect(timeEl).toBeTruthy()
    const iso = timeEl?.getAttribute('datetime') ?? ''
    expect(iso.length).toBeGreaterThan(0)
    expect(Number.isNaN(Date.parse(iso))).toBe(false)
    expect(timeEl?.textContent ?? '').toMatch(/\d{1,2}:\d{2}/)
  })
})
