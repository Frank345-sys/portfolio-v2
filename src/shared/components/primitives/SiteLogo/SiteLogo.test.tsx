/**
 * Tests para shared/components/SiteLogo/SiteLogo.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import {
  SECTION_ANCHOR_ID,
  sectionHref,
} from '@/shared/constants/sectionAnchors'
import { SITE_DISPLAY_NAME } from '@/shared/constants/siteProfile/siteProfile'

import { SiteLogo } from './SiteLogo'

vi.mock('@/shared/icons', () => ({
  CodeIcon: () => <svg data-testid="code-icon" />,
}))

/**
 * {@link SiteLogo}: enlace al inicio, ícono mockeado, props opcionales.
 */
describe('SiteLogo', () => {
  it('enlaza a inicio con etiqueta accesible', () => {
    render(<SiteLogo displayName="Mi Sitio" />)
    const link = screen.getByRole('link', { name: /ir al inicio: mi sitio/i })
    expect(link).toHaveAttribute('href', sectionHref(SECTION_ANCHOR_ID.inicio))
  })

  it('usa SITE_DISPLAY_NAME si no pasas displayName', () => {
    render(<SiteLogo />)
    expect(screen.getByText(SITE_DISPLAY_NAME)).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: new RegExp(
          `Ir al inicio: ${SITE_DISPLAY_NAME.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')}`,
          'i'
        ),
      })
    ).toBeInTheDocument()
  })

  it('opcionalmente asigna id al span del nombre', () => {
    render(<SiteLogo displayName="X" nameSpanId="dialog-title" />)
    expect(document.getElementById('dialog-title')).toHaveTextContent('X')
  })

  it('invoca onNavigate al pulsar el enlace', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<SiteLogo displayName="P" onNavigate={onNavigate} />)
    await user.click(screen.getByRole('link', { name: /ir al inicio/i }))
    expect(onNavigate).toHaveBeenCalledTimes(1)
  })
})
