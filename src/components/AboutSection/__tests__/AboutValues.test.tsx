import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AboutValues } from '../subcomponents/AboutValues'
import { ABOUT_VALUES } from '../constants'

describe('AboutValues', () => {
  describe('rendering', () => {
    it('renderiza el label de sección cómo trabajo', () => {
      render(<AboutValues />)
      expect(screen.getByText(/cómo trabajo/i)).toBeInTheDocument()
    })

    it('renderiza exactamente 3 tarjetas (longitud de ABOUT_VALUES)', () => {
      render(<AboutValues />)
      const names = ABOUT_VALUES.map((v) => v.name)
      names.forEach((name) =>
        expect(screen.getByText(name)).toBeInTheDocument()
      )
      expect(ABOUT_VALUES.length).toBe(3)
    })

    it('cada tarjeta muestra su name y desc', () => {
      render(<AboutValues />)
      ABOUT_VALUES.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument()
        expect(screen.getByText(item.desc)).toBeInTheDocument()
      })
    })
  })
})
