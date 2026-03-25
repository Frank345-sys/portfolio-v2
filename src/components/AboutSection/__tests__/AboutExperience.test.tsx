import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AboutExperience } from '../subcomponents/AboutExperience'
import { ABOUT_EXPERIENCE } from '../constants'

describe('AboutExperience', () => {
  describe('rendering', () => {
    it('renderiza el label de sección experiencia', () => {
      render(<AboutExperience />)
      expect(screen.getByText(/experiencia/i)).toBeInTheDocument()
    })

    it('renderiza todos los items de ABOUT_EXPERIENCE', () => {
      render(<AboutExperience />)
      ABOUT_EXPERIENCE.forEach((item) => {
        expect(screen.getByText(item.role)).toBeInTheDocument()
        expect(screen.getByText(item.company)).toBeInTheDocument()
        expect(screen.getAllByText(item.period).length).toBeGreaterThan(0)
      })
    })

    it('los chips del primer item (con chips) se renderizan', () => {
      render(<AboutExperience />)
      const itemWithChips = ABOUT_EXPERIENCE.find((e) => e.chips?.length)
      if (!itemWithChips?.chips) return
      itemWithChips.chips.forEach((chip) => {
        expect(screen.getByText(chip.label)).toBeInTheDocument()
      })
    })

    it('muestra la leyenda de chips (área, métrica de código, impacto)', () => {
      render(<AboutExperience />)
      expect(
        screen.getByRole('list', {
          name: /significado de los chips de experiencia/i,
        })
      ).toBeInTheDocument()
      expect(screen.getByText(/área\/tecnología/i)).toBeInTheDocument()
      expect(screen.getByText(/impacto positivo/i)).toBeInTheDocument()
      expect(
        screen.getByText(/conocimientos\/tecnologías adquiridas/i)
      ).toBeInTheDocument()
    })

    it('renderiza el timeline como lista ordenada accesible', () => {
      render(<AboutExperience />)
      expect(
        screen.getByRole('list', { name: /experiencia profesional/i })
      ).toBeInTheDocument()
      expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(
        ABOUT_EXPERIENCE.length
      )
    })
  })
})
