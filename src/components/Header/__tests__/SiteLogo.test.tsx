import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SiteLogo } from '../subcomponents/SiteLogo'

vi.mock('@/shared/icons', () => ({
  CodeIcon: () => <svg data-testid="code-icon" />,
}))

describe('SiteLogo', () => {
  it('enlaza a inicio con etiqueta accesible', () => {
    render(<SiteLogo siteName="Mi Sitio" />)
    const link = screen.getByRole('link', { name: /ir al inicio: mi sitio/i })
    expect(link).toHaveAttribute('href', '#inicio')
  })

  it('opcionalmente asigna id al span del nombre', () => {
    render(<SiteLogo siteName="X" siteNameSpanId="dialog-title" />)
    expect(document.getElementById('dialog-title')).toHaveTextContent('X')
  })

  it('invoca onNavigate al pulsar el enlace', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<SiteLogo siteName="P" onNavigate={onNavigate} />)
    await user.click(screen.getByRole('link', { name: /ir al inicio/i }))
    expect(onNavigate).toHaveBeenCalledTimes(1)
  })
})
