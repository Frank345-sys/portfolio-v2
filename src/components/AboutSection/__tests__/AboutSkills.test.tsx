import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { ABOUT_SKILLS } from '../constants'
import { AboutSkills } from '../subcomponents/AboutSkills'

describe('AboutSkills', () => {
  describe('rendering', () => {
    it('renderiza el label de sección stack técnico', () => {
      render(<AboutSkills />)
      expect(screen.getByText(/stack técnico/i)).toBeInTheDocument()
    })

    it('renderiza todos los grupos de ABOUT_SKILLS', () => {
      render(<AboutSkills />)
      for (const group of ABOUT_SKILLS) {
        expect(screen.getByText(group.title)).toBeInTheDocument()
      }
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
