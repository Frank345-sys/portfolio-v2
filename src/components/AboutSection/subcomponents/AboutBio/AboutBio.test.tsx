/**
 * Tests para `AboutBio` — contrato de render y accesibilidad del bloque biográfico.
 *
 * @fileoverview Valida `role="group"`, `h3` «Quién soy», un `<p>` por entrada de `ABOUT_BIO`,
 * fragmentos de copy visibles, ausencia de `<img>` y énfasis `<strong>` vía `parseEmphasis`.
 * @remarks No usa `renderWithMotion` — `AboutBio` es puramente presentacional sin animaciones.
 * Fragmentos de copy testeados directamente desde el JSX (no desde `ABOUT_BIO`) para
 * detectar regresiones en el texto visible al usuario.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { AboutBio } from './AboutBio'
import { ABOUT_BIO, ABOUT_BIO_HEADING_ID } from './constants'

/**
 * Casos cubiertos:
 * - `role="group"` + `aria-labelledby` y `h3` «Quién soy» (`ABOUT_BIO_HEADING_ID`)
 * - Un `<p>` por entrada de `ABOUT_BIO` con fragmentos clave visibles
 * - Sin `<img>` (solo texto)
 * - `**strong**` vía `parseEmphasis` (nombre en `<strong>`)
 */
describe('AboutBio', () => {
  /**
   * Render estático: estructura DOM, accesibilidad y contenido visible.
   * No cubre interactividad ni animaciones.
   */
  describe('rendering', () => {
    it('agrupa el bloque con role group referenciando el h3', () => {
      const { container } = render(<AboutBio />)
      const landmark = container.querySelector(
        `section[aria-labelledby="${ABOUT_BIO_HEADING_ID}"]`
      )
      expect(landmark).toBeInTheDocument()
    })

    it('expone el título de subsección «Quién soy» como h3 con id', () => {
      render(<AboutBio />)
      expect(
        screen.getByRole('heading', { level: 3, name: /quién soy/i })
      ).toBeInTheDocument()
      expect(document.getElementById(ABOUT_BIO_HEADING_ID)).toHaveTextContent(
        /quién soy/i
      )
    })

    it('renderiza un párrafo por cada entrada de ABOUT_BIO', () => {
      const { container } = render(<AboutBio />)
      const paragraphs = container.querySelectorAll('p')
      expect(paragraphs.length).toBe(ABOUT_BIO.length)
    })

    it('muestra fragmentos representativos del copy', () => {
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
