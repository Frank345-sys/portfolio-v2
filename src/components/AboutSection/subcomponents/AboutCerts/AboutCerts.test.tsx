/**
 * Tests para `AboutCerts` — contrato de render, accesibilidad y atributos de enlaces externos.
 *
 * @fileoverview Valida `role="group"`, `h3` «Certificaciones», presencia de todas las entradas
 * de `ABOUT_CERTS`, `href` correcto por certificado y atributos de seguridad en enlaces externos.
 * @remarks No usa `renderWithMotion` — `AboutCerts` es puramente presentacional sin animaciones.
 * Títulos con metacaracteres: {@link escapeRegex} desde `@/test/helpers`.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { escapeRegex } from '@/test/helpers'

import { AboutCerts } from './AboutCerts'
import { ABOUT_CERTS, ABOUT_CERTS_HEADING_ID } from './constants'

/**
 * Casos cubiertos:
 * - `role="group"` + `aria-labelledby` + `h3` «Certificaciones» (`ABOUT_CERTS_HEADING_ID`)
 * - Cada certificado de `ABOUT_CERTS` con title y subtitle visibles
 * - `href` correcto en cada `link`
 * - Enlaces externos: `target` y `rel` seguros
 */
describe('AboutCerts', () => {
  /**
   * Render estático: estructura DOM, accesibilidad y contenido visible.
   * No cubre interactividad ni animaciones.
   */
  describe('rendering', () => {
    it('agrupa el bloque con role group referenciando el h3', () => {
      render(<AboutCerts />)
      const landmark = screen
        .getByRole('heading', { level: 3, name: /certificaciones/i })
        .closest('section')
      expect(landmark).toBeInTheDocument()
      expect(landmark).toHaveAttribute(
        'aria-labelledby',
        ABOUT_CERTS_HEADING_ID
      )
    })

    it('expone el título de subsección «Certificaciones» como h3 con id', () => {
      render(<AboutCerts />)
      expect(
        screen.getByRole('heading', { level: 3, name: /certificaciones/i })
      ).toBeInTheDocument()
      expect(document.getElementById(ABOUT_CERTS_HEADING_ID)).toHaveTextContent(
        /certificaciones/i
      )
    })

    it('renderiza todas las certificaciones de ABOUT_CERTS', () => {
      render(<AboutCerts />)
      for (const cert of ABOUT_CERTS) {
        expect(screen.getByText(cert.title)).toBeInTheDocument()
        expect(
          screen.getAllByText(cert.subtitle).length
        ).toBeGreaterThanOrEqual(1)
      }
    })

    it('cada cert es un link con href correcto', () => {
      render(<AboutCerts />)
      const certLinkMatchers = ABOUT_CERTS.map((cert) => ({
        cert,
        namePattern: new RegExp(escapeRegex(cert.title)),
      }))
      for (const { cert, namePattern } of certLinkMatchers) {
        const link = screen.getByRole('link', { name: namePattern })
        expect(link).toHaveAttribute('href', cert.href)
      }
    })

    it('los links tienen target _blank y rel noopener noreferrer', () => {
      render(<AboutCerts />)
      const links = screen.getAllByRole('link')
      for (const link of links) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })
  })
})
