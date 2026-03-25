import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AboutAcademic } from '../subcomponents/AboutAcademic'
import { ABOUT_ACADEMIC } from '../constants'

describe('AboutAcademic', () => {
  describe('rendering', () => {
    it('renderiza el label de sección formación académica', () => {
      render(<AboutAcademic />)
      expect(screen.getByText(/formación académica/i)).toBeInTheDocument()
    })

    it('renderiza todos los items de ABOUT_ACADEMIC', () => {
      render(<AboutAcademic />)
      ABOUT_ACADEMIC.forEach((item) => {
        expect(screen.getByText(item.role)).toBeInTheDocument()
        expect(screen.getByText(item.company)).toBeInTheDocument()
        expect(screen.getAllByText(item.period).length).toBeGreaterThan(0)
      })
    })

    it('los chips del primer item (con chips) se renderizan', () => {
      render(<AboutAcademic />)
      const itemWithChips = ABOUT_ACADEMIC.find((e) => e.chips?.length)
      if (!itemWithChips?.chips) return
      itemWithChips.chips.forEach((chip) => {
        expect(screen.getByText(chip.label)).toBeInTheDocument()
      })
    })

    it('muestra la leyenda de formación (sin jerarquía)', () => {
      render(<AboutAcademic />)
      expect(
        screen.getByText(/conocimientos adquiridos en la formación/i)
      ).toBeInTheDocument()
    })

    it('renderiza el timeline académico como lista ordenada accesible', () => {
      render(<AboutAcademic />)
      expect(
        screen.getByRole('list', { name: /^formación académica$/i })
      ).toBeInTheDocument()
      expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(
        ABOUT_ACADEMIC.length
      )
    })
  })
})
