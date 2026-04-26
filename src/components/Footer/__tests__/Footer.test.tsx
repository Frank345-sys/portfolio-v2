import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SITE_DISPLAY_NAME, SITE_TAGLINE } from '@/shared/constants/siteProfile'

import { FOOTER_BRAND_LANDMARK_LABEL, FOOTER_QUICK_CONTACT } from '../constants'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('expone el landmark, marca, tagline y enlace al inicio', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo', { name: /pie de página/i })
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
        name: new RegExp(
          `^Ir al inicio: ${SITE_DISPLAY_NAME.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')}$`,
          'i'
        ),
      })
    ).toHaveAttribute('href', '#inicio')
    expect(footer).toHaveTextContent(SITE_TAGLINE)
    const backToTop = within(footer).getByRole('link', {
      name: /volver al inicio de la página/i,
    })
    expect(backToTop).toHaveAttribute('href', '#inicio')
    const contact = within(footer).getByRole('link', {
      name: FOOTER_QUICK_CONTACT.label,
    })
    expect(contact).toHaveAttribute('href', FOOTER_QUICK_CONTACT.href)
  })

  it('muestra el año en el aviso de copyright', () => {
    render(<Footer />)

    const year = String(new Date().getFullYear())
    expect(
      screen.getByText(
        (content) => content.includes('©') && content.includes(year),
        { exact: false }
      )
    ).toBeInTheDocument()
  })
})
