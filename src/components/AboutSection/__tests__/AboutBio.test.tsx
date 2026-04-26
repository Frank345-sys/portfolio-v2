import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { AboutBio } from '../subcomponents/AboutBio'

describe('AboutBio', () => {
  describe('rendering', () => {
    it('renderiza el label de subsección Quién soy como h3', () => {
      render(<AboutBio />)
      expect(
        screen.getByRole('heading', { level: 3, name: /quién soy/i })
      ).toBeInTheDocument()
    })

    it('renderiza todos los párrafos de ABOUT_BIO', () => {
      render(<AboutBio />)
      expect(
        screen.getByText(/Diseño e implemento interfaces de producto/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Francisco Omar Habib González Utrera/)
      ).toBeInTheDocument()
      expect(screen.getByText(/~40% menos/)).toBeInTheDocument()
      expect(screen.getByText(/Figma/)).toBeInTheDocument()
    })

    it('no monta ningún <img> (solo párrafos de bio)', () => {
      const { container } = render(<AboutBio />)
      expect(container.querySelector('img')).toBeNull()
    })

    it('los párrafos de ABOUT_BIO aplican énfasis en fragmentos ** **', () => {
      render(<AboutBio />)
      expect(
        screen
          .getByText('Francisco Omar Habib González Utrera')
          .closest('strong')
      ).toBeInTheDocument()
    })
  })
})
