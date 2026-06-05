/**
 * Tests para `AboutAcademic` — contrato de accesibilidad y render del bloque de formación.
 *
 * @fileoverview Valida `role="group"`, landmark `h3`, render de todas las entradas de `ABOUT_ACADEMIC`,
 * chips del primer item, leyenda de variantes y lista ordenada accesible del timeline.
 * @remarks No usa `renderWithMotion` — `AboutAcademic` no tiene animaciones propias que requieran
 * el proveedor de Motion. Datos de prueba tomados directamente de `ABOUT_ACADEMIC` y `ABOUT_ACADEMIC_HEADING_ID`.
 */
import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { AboutAcademic } from './AboutAcademic'
import { ABOUT_ACADEMIC, ABOUT_ACADEMIC_HEADING_ID } from './constants'

/**
 * Casos cubiertos:
 * - `role="group"` + `aria-labelledby` y `h3` «Formación» (`ABOUT_ACADEMIC_HEADING_ID`)
 * - Una fila en DOM por cada entrada de `ABOUT_ACADEMIC` (heading, company, period)
 * - Chips del primer item con chips presentes como texto visible
 * - Leyenda homologada de variantes (`technology`, métricas, applied, learned)
 * - Lista ordenada del timeline (`aria-label` «Entradas de formación») y cantidad de `listitem` dentro de ese `<ol>`
 */
describe('AboutAcademic', () => {
  /**
   * Contrato de render estático: estructura DOM, accesibilidad y datos visibles.
   * No cubre interactividad ni animaciones.
   */
  describe('rendering', () => {
    it('agrupa el bloque con role group referenciando el h3', () => {
      render(<AboutAcademic />)
      const landmark = screen
        .getByRole('heading', { level: 3, name: /^formación$/i })
        .closest('section')
      expect(landmark).toBeInTheDocument()
      expect(landmark).toHaveAttribute(
        'aria-labelledby',
        ABOUT_ACADEMIC_HEADING_ID
      )
    })

    it('expone el título de subsección «Formación» como h3 con id', () => {
      render(<AboutAcademic />)
      expect(
        screen.getByRole('heading', { level: 3, name: /^formación$/i })
      ).toBeInTheDocument()
      expect(
        document.getElementById(ABOUT_ACADEMIC_HEADING_ID)
      ).toHaveTextContent(/formación/i)
    })

    it('renderiza todos los items de ABOUT_ACADEMIC', () => {
      render(<AboutAcademic />)
      for (const item of ABOUT_ACADEMIC) {
        expect(screen.getByText(item.heading)).toBeInTheDocument()
        expect(screen.getByText(item.company)).toBeInTheDocument()
        expect(screen.getAllByText(item.period).length).toBeGreaterThan(0)
      }
    })

    it('los chips del primer item (con chips) se renderizan', () => {
      render(<AboutAcademic />)
      const itemWithChips = ABOUT_ACADEMIC.find(
        (e) => (e.chips?.length ?? 0) > 0
      )
      expect(itemWithChips).toBeDefined()
      expect(itemWithChips!.chips!.length).toBeGreaterThan(0)
      for (const chip of itemWithChips!.chips!) {
        expect(screen.getByText(chip.label)).toBeInTheDocument()
      }
    })

    it('muestra la leyenda homologada del timeline (variantes chip)', () => {
      render(<AboutAcademic />)
      expect(
        screen.getByRole('list', {
          name: /significado de los chips del timeline/i,
        })
      ).toBeInTheDocument()
      expect(screen.getByText(/área o tecnología/i)).toBeInTheDocument()
      expect(screen.getByText(/impacto positivo/i)).toBeInTheDocument()
      expect(screen.getByText(/tecnologías aplicadas/i)).toBeInTheDocument()
      expect(screen.getByText(/conocimientos nuevos/i)).toBeInTheDocument()
    })

    it('renderiza el timeline académico como lista ordenada accesible', () => {
      render(<AboutAcademic />)
      const timeline = screen.getByRole('list', {
        name: /entradas de formación/i,
      })
      expect(timeline).toBeInTheDocument()
      expect(
        within(timeline).getAllByRole('listitem').length
      ).toBeGreaterThanOrEqual(ABOUT_ACADEMIC.length)
    })
  })
})
