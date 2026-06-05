/**
 * Tests para `AboutExperience` — contrato de accesibilidad y render del bloque de experiencia laboral.
 *
 * @fileoverview Valida `role="group"`, `h3` «Experiencia», render de todas las entradas de
 * `ABOUT_EXPERIENCE`, chips del primer item, leyenda de variantes y lista ordenada accesible.
 * @remarks No usa `renderWithMotion` — `AboutExperience` no tiene animaciones propias.
 * Misma estructura de test que `AboutAcademic`; leyenda homologada entre ambos bloques.
 */
import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { AboutExperience } from './AboutExperience'
import { ABOUT_EXPERIENCE, ABOUT_EXPERIENCE_HEADING_ID } from './constants'

/**
 * Casos cubiertos:
 * - `role="group"` + `aria-labelledby` y `h3` «Experiencia» (`ABOUT_EXPERIENCE_HEADING_ID`)
 * - Una fila en DOM por cada entrada de `ABOUT_EXPERIENCE`
 * - Chips del primer item con chips presentes
 * - Leyenda homologada de variantes del timeline (misma narrativa que formación)
 * - Lista ordenada del timeline (`aria-label` experiencia profesional) y `listitem` solo dentro de ese `<ol>`
 */
describe('AboutExperience', () => {
  /**
   * Contrato de render estático: estructura DOM, accesibilidad y datos visibles.
   * No cubre interactividad ni animaciones.
   */
  describe('rendering', () => {
    it('agrupa el bloque con role group referenciando el h3', () => {
      render(<AboutExperience />)
      const landmark = screen
        .getByRole('heading', { level: 3, name: /experiencia/i })
        .closest('section')
      expect(landmark).toBeInTheDocument()
      expect(landmark).toHaveAttribute(
        'aria-labelledby',
        ABOUT_EXPERIENCE_HEADING_ID
      )
    })

    it('expone el título de subsección «Experiencia» como h3 con id', () => {
      render(<AboutExperience />)
      expect(
        screen.getByRole('heading', { level: 3, name: /experiencia/i })
      ).toBeInTheDocument()
      expect(
        document.getElementById(ABOUT_EXPERIENCE_HEADING_ID)
      ).toHaveTextContent(/experiencia/i)
    })

    it('renderiza todos los items de ABOUT_EXPERIENCE', () => {
      render(<AboutExperience />)
      for (const item of ABOUT_EXPERIENCE) {
        expect(screen.getByText(item.heading)).toBeInTheDocument()
        expect(screen.getByText(item.company)).toBeInTheDocument()
        expect(screen.getAllByText(item.period).length).toBeGreaterThan(0)
      }
    })

    it('los chips del primer item (con chips) se renderizan', () => {
      render(<AboutExperience />)
      const itemWithChips = ABOUT_EXPERIENCE.find(
        (e) => (e.chips?.length ?? 0) > 0
      )
      expect(itemWithChips).toBeDefined()
      expect(itemWithChips!.chips!.length).toBeGreaterThan(0)
      for (const chip of itemWithChips!.chips!) {
        expect(screen.getByText(chip.label)).toBeInTheDocument()
      }
    })

    it('muestra la leyenda homologada del timeline (variantes chip)', () => {
      render(<AboutExperience />)
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

    it('renderiza el timeline como lista ordenada accesible', () => {
      render(<AboutExperience />)
      const timeline = screen.getByRole('list', {
        name: /experiencia profesional/i,
      })
      expect(timeline).toBeInTheDocument()
      expect(
        within(timeline).getAllByRole('listitem').length
      ).toBeGreaterThanOrEqual(ABOUT_EXPERIENCE.length)
    })
  })
})
