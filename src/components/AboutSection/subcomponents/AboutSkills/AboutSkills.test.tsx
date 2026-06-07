/**
 * Tests para `AboutSkills` — contrato de render y accesibilidad del bloque de stack técnico.
 *
 * @fileoverview Valida `role="group"`, `h3` «Stack técnico», un `listitem` por grupo de `ABOUT_SKILLS`,
 * visibilidad de todos los tags y leyenda de niveles accesible.
 * @remarks No usa `renderWithMotion` — `AboutSkills` es puramente presentacional sin animaciones.
 * El conteo de `listitem` incluye tanto los grupos de skills como los ítems de la leyenda
 * (`ABOUT_SKILLS.length + SKILLS_LEGEND_ITEMS.length`).
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { AboutSkills } from './AboutSkills'
import {
  ABOUT_SKILLS,
  ABOUT_SKILLS_HEADING_ID,
  SKILLS_LEGEND_ITEMS,
} from './constants'

/**
 * Casos cubiertos:
 * - `role="group"` + `aria-labelledby` y `h3` «Stack técnico» (`ABOUT_SKILLS_HEADING_ID`)
 * - Un ítem de lista (`listitem`) accesible por título por cada grupo en `ABOUT_SKILLS`
 * - Cada tag visible como texto
 * - Leyenda de niveles en lista accesible
 */
describe('AboutSkills', () => {
  /**
   * Render estático: estructura DOM, accesibilidad y contenido visible.
   * No cubre interactividad ni animaciones.
   */
  describe('rendering', () => {
    it('agrupa el bloque con role group referenciando el h3', () => {
      render(<AboutSkills />)
      const landmark = screen
        .getByRole('heading', { level: 3, name: /stack técnico/i })
        .closest('section')
      expect(landmark).toBeInTheDocument()
      expect(landmark).toHaveAttribute(
        'aria-labelledby',
        ABOUT_SKILLS_HEADING_ID
      )
    })

    it('expone el título de subsección «Stack técnico» como h3 con id', () => {
      render(<AboutSkills />)
      expect(
        screen.getByRole('heading', { level: 3, name: /stack técnico/i })
      ).toBeInTheDocument()
      expect(
        document.getElementById(ABOUT_SKILLS_HEADING_ID)
      ).toHaveTextContent(/stack técnico/i)
    })

    it('renderiza un listitem nombrado por grupo de ABOUT_SKILLS', () => {
      render(<AboutSkills />)
      for (const group of ABOUT_SKILLS) {
        expect(
          screen.getByRole('listitem', { name: group.title })
        ).toBeInTheDocument()
      }
      expect(screen.getAllByRole('listitem')).toHaveLength(
        ABOUT_SKILLS.length + SKILLS_LEGEND_ITEMS.length
      )
    })

    it('cada tag de cada grupo aparece en el DOM', () => {
      render(<AboutSkills />)
      for (const group of ABOUT_SKILLS) {
        for (const tag of group.tags) {
          expect(screen.getByText(tag.label)).toBeInTheDocument()
        }
      }
    })

    it('muestra la leyenda de niveles (dominio, proficiente, familiar)', () => {
      render(<AboutSkills />)
      expect(
        screen.getByRole('list', { name: /niveles del stack técnico/i })
      ).toBeInTheDocument()
      expect(screen.getByText(/dominio \(uso diario\)/i)).toBeInTheDocument()
      expect(
        screen.getByText(/proficiente \(uso frecuente\)/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/familiar \(proyectos puntuales\)/i)
      ).toBeInTheDocument()
    })
  })
})
