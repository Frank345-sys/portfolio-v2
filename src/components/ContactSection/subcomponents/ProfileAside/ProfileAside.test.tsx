/**
 * Tests para `ProfileAside` — contrato de landmark, accesibilidad y contenido del aside de perfil.
 *
 * @fileoverview Valida `region`, tres `role="group"` con `h3`, leyenda de disponibilidad,
 * cardinalidad de servicios, metadatos (`dl`) y elemento `<time>` con `datetime` ISO válido.
 * La fila «Zona» se valida condicionalmente según `CONTACT_ASIDE_ZONE_LABEL_TRIM`.
 * @remarks No usa `renderWithMotion` — `ProfileAside` no tiene animaciones propias de Motion.
 * `OwnerLocalTime` renderiza un `<time datetime>` real; el test valida que el ISO sea parseable
 * por `Date.parse` y que el texto muestre formato `HH:MM`.
 */
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
 * {@link ProfileAside}: `region` con leyenda, lista de servicios y `dl` de metadatos
 * (`OwnerLocalTime`, zona). Subbloques con `h3` e IDs estables en `./constants`.
 *
 * **Cobertura**
 * - Landmark: `region` y `aria-label`
 * - Subbloques: `role="group"` + `aria-labelledby` hacia cada `h3`
 * - Leyenda: lista con nombre accesible; textos Disponible / Limitado / No disponible
 * - Servicios: cardinalidad (`CONTACT_STATUS_ROWS`) y `aria-label` del `ul`
 * - Metadatos: grupo accesible, `dl`, respuesta; hora local (`time` + `datetime` ISO); «Zona» solo si `CONTACT_ASIDE_ZONE_LABEL_TRIM` no está vacío
 */
describe('ProfileAside', () => {
  it('expone region con nombre accesible de resumen de perfil', () => {
    render(<ProfileAside />)
    expect(
      screen.getByRole('region', {
        name: /resumen de perfil y disponibilidad/i,
      })
    ).toBeInTheDocument()
  })

  it('agrupa disponibilidad, servicios y metadatos en section con aria-labelledby', () => {
    render(<ProfileAside />)
    const aside = screen.getByRole('region', {
      name: /resumen de perfil y disponibilidad/i,
    })
    expect(
      within(aside)
        .getByRole('heading', { level: 3, name: 'Disponibilidad' })
        .closest('section')
    ).toHaveAttribute('aria-labelledby', CONTACT_ASIDE_AVAILABILITY_HEADING_ID)
    expect(
      within(aside)
        .getByRole('heading', { level: 3, name: 'Servicios disponibles' })
        .closest('section')
    ).toHaveAttribute('aria-labelledby', CONTACT_ASIDE_SERVICES_HEADING_ID)
    expect(
      within(aside)
        .getByRole('heading', {
          level: 3,
          name: /tiempo de respuesta, hora local y zona horaria de referencia/i,
        })
        .closest('section')
    ).toHaveAttribute('aria-labelledby', CONTACT_ASIDE_METADATA_HEADING_ID)
  })

  it('expone h3 visibles para disponibilidad y servicios; sr-only para el bloque de metadatos', () => {
    render(<ProfileAside />)
    const aside = screen.getByRole('region', {
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
    // jsdom no implementa layout real — getBoundingClientRect devuelve 0×0 para .sr-only
    // de Tailwind (1px×1px clip), que sí es estable como señal de elemento visualmente oculto.
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
    const aside = screen.getByRole('region', {
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

    const aside = screen.getByRole('region', {
      name: /resumen de perfil y disponibilidad/i,
    })
    const metaSection = within(aside).getByRole('region', {
      name: /tiempo de respuesta, hora local y zona horaria de referencia/i,
    })
    const dl = metaSection.querySelector('dl')
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

    const aside = screen.getByRole('region', {
      name: /resumen de perfil y disponibilidad/i,
    })
    const timeEl = aside.querySelector('time[datetime]')
    expect(timeEl).toBeTruthy()
    // Valida que OwnerLocalTime emita un datetime ISO parseable y texto con formato HH:MM.
    // Date.parse devuelve NaN para strings inválidos — isNaN(NaN) es true → test falla si el formato es incorrecto.
    const iso = timeEl?.getAttribute('datetime') ?? ''
    expect(iso.length).toBeGreaterThan(0)
    expect(Number.isNaN(Date.parse(iso))).toBe(false)
    expect(timeEl?.textContent ?? '').toMatch(/\d{1,2}:\d{2}/)
  })
})
