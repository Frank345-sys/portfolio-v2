/**
 * Tests para `Footer` — contrato de landmark, marca, atajos y copyright.
 *
 * @fileoverview Valida landmark `contentinfo` (único footer), `h2` de marca y atajos, logo con `href` de inicio,
 * tagline, navegación de atajos (contacto y volver al inicio) y año dinámico en copyright.
 * @remarks No usa `renderWithMotion` — `Footer` es puramente presentacional sin animaciones.
 * Integración única del pie: marca, atajos y copyright en un solo `<footer>` (sin tests por subbloque).
 */
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { escapeRegex, runAxeAudit } from '@/test/helpers'

import {
  FOOTER_BRAND,
  FOOTER_BRAND_LANDMARK_LABEL,
  FOOTER_QUICK_BACK_TO_TOP,
  FOOTER_QUICK_CONTACT,
  FOOTER_SECTION_HREF,
} from './constants'
import { Footer } from './Footer'

/** Nombre accesible del logo: `Ir al inicio: <display name>`. */
function siteLogoNamePattern(displayName: string): RegExp {
  return new RegExp(`^Ir al inicio: ${escapeRegex(displayName)}$`, 'i')
}

/**
 * Integración de {@link Footer}: landmark `contentinfo`, marca (`FooterBrand`), atajos (`FooterShortcuts`)
 * y línea inferior (`FooterBottom`).
 *
 * Sin tests unitarios en `FooterBrand`, `FooterShortcuts` ni `FooterBottom`.
 */
describe('Footer', () => {
  it('expone landmark, marca, tagline y enlaces (inicio, contacto y volver al inicio)', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(
      within(footer).getByRole('heading', {
        level: 2,
        name: FOOTER_BRAND_LANDMARK_LABEL,
      })
    ).toBeInTheDocument()
    expect(
      within(footer).getByRole('heading', {
        level: 2,
        name: /antes de irte/i,
      })
    ).toBeInTheDocument()

    expect(
      within(footer).getByRole('link', {
        name: siteLogoNamePattern(FOOTER_BRAND.name),
      })
    ).toHaveAttribute('href', FOOTER_SECTION_HREF.inicio)

    expect(footer).toHaveTextContent(FOOTER_BRAND.tagline)

    const shortcutsNav = within(footer).getByRole('navigation', {
      name: /antes de irte/i,
    })
    expect(shortcutsNav).toBeInTheDocument()

    const contact = within(footer).getByRole('link', {
      name: FOOTER_QUICK_CONTACT.label,
    })
    expect(contact).toHaveAttribute('href', FOOTER_QUICK_CONTACT.href)

    const backToTop = within(footer).getByRole('link', {
      name: FOOTER_QUICK_BACK_TO_TOP.label,
    })
    expect(backToTop).toHaveAttribute('href', FOOTER_QUICK_BACK_TO_TOP.href)
  })

  it('muestra el año en el aviso de copyright', () => {
    render(<Footer />)

    // El año se calcula en runtime para que el test no quede desactualizado cada enero.
    const year = String(new Date().getFullYear())
    expect(
      screen.getByText(
        (content) => content.includes('©') && content.includes(year),
        { exact: false }
      )
    ).toBeInTheDocument()
  })

  it('axe: pie de página sin violaciones conocidas', async () => {
    const { container } = render(<Footer />)
    expect(await runAxeAudit(container)).toHaveNoViolations()
  }, 15_000)
})
