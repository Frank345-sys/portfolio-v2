import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AboutBio } from '../subcomponents/AboutBio'
import { ABOUT_HERO } from '../constants'

describe('AboutBio', () => {
  describe('rendering', () => {
    it('renderiza los labels de sección sobre mí y quién soy', () => {
      render(<AboutBio />)
      expect(screen.getByText(/sobre mí/i)).toBeInTheDocument()
      expect(screen.getByText(/quién soy/i)).toBeInTheDocument()
    })

    it('renderiza todos los párrafos de ABOUT_BIO', () => {
      render(<AboutBio />)
      // Verificar que el contenido distintivo de cada párrafo está en el DOM
      expect(
        screen.getByText(/Francisco Omar Habib González Utrera/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Disfruto mejorar flujos de usuario/)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/He trabajado colaborativamente con equipos de/i)
      ).toBeInTheDocument()
    })

    it('renderiza el bloque de hero con nombre, badge y ubicación', () => {
      render(<AboutBio />)
      expect(
        screen.getByRole('heading', { name: /Frank González/i })
      ).toBeInTheDocument()
      expect(screen.getAllByText(/Frontend Developer/i).length).toBeGreaterThan(
        0
      )
      expect(screen.getByText(/Puebla, México/i)).toBeInTheDocument()
    })

    it('el avatar muestra las iniciales configuradas en ABOUT_HERO', () => {
      render(<AboutBio />)
      const avatar = screen.getByRole('img', {
        name: /avatar de frank gonzález/i,
      })
      expect(avatar).toBeInTheDocument()
      expect(screen.getByText(ABOUT_HERO.avatarInitials)).toBeInTheDocument()
    })

    /**
     * Anillo decorativo del Avatar (utilidad global en index.css), no expuesto por rol.
     */
    it('renderiza el ring decorativo animado del avatar', () => {
      const { container } = render(<AboutBio />)
      expect(
        container.querySelector('.u-avatar-feature-ring')
      ).toBeInTheDocument()
    })

    it('sin foto en ABOUT_HERO no monta ningún <img> en el bloque', () => {
      const { container } = render(<AboutBio />)
      expect(container.querySelector('img')).toBeNull()
    })

    it('el tagline incluye strong para términos entre ** ** en ABOUT_HERO', () => {
      render(<AboutBio />)
      expect(screen.getByText('TypeScript').tagName).toBe('STRONG')
      expect(screen.getByText('Next.js').tagName).toBe('STRONG')
      const reactStrong = screen
        .getAllByText('React.js')
        .filter((el) => el.tagName === 'STRONG')
      expect(reactStrong.length).toBeGreaterThanOrEqual(1)
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
