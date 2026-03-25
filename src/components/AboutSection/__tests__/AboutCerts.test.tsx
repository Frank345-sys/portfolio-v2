import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AboutCerts } from '../subcomponents/AboutCerts'
import { ABOUT_CERTS } from '../constants'

describe('AboutCerts', () => {
  describe('rendering', () => {
    it('renderiza el label de sección certificaciones', () => {
      render(<AboutCerts />)
      expect(screen.getByText(/certificaciones/i)).toBeInTheDocument()
    })

    it('renderiza todas las certificaciones de ABOUT_CERTS', () => {
      render(<AboutCerts />)
      ABOUT_CERTS.forEach((cert) => {
        expect(screen.getByText(cert.name)).toBeInTheDocument()
        expect(screen.getAllByText(cert.issuer).length).toBeGreaterThanOrEqual(
          1
        )
      })
    })

    it('cada cert es un link con href correcto', () => {
      render(<AboutCerts />)
      ABOUT_CERTS.forEach((cert) => {
        const link = screen.getByRole('link', { name: new RegExp(cert.name) })
        expect(link).toHaveAttribute('href', cert.href)
      })
    })

    it('los links tienen target _blank y rel noopener noreferrer', () => {
      render(<AboutCerts />)
      const links = screen.getAllByRole('link')
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })
})
