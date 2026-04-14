import type { SVGProps } from 'react'
import { vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMotion } from '@/test/renderWithMotion'
import { MobileDrawer } from '../subcomponents/MobileDrawer'
import type { NavItem } from '../types'

vi.mock('@/shared/components/ThemeToggle', () => ({
  ThemeToggle: () => <span data-testid="theme-toggle">ThemeToggle</span>,
}))

vi.mock('@/shared/icons', () => ({
  CodeIcon: () => <svg data-testid="code-icon" />,
  CloseIcon: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="close-icon" {...props} />
  ),
}))

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
]

describe('MobileDrawer', () => {
  it('no renderiza nada cuando isOpen es false', () => {
    renderWithMotion(
      <MobileDrawer
        isOpen={false}
        onClose={vi.fn()}
        siteName="Mi Portfolio"
        navItems={NAV_ITEMS}
      />
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renderiza el drawer cuando isOpen es true', () => {
    renderWithMotion(
      <MobileDrawer
        isOpen
        onClose={vi.fn()}
        siteName="Mi Portfolio"
        navItems={NAV_ITEMS}
      />
    )
    expect(
      screen.getByRole('dialog', { name: /mi portfolio/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Mi Portfolio')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /ir al inicio: mi portfolio/i })
    ).toHaveAttribute('href', '#inicio')
    expect(screen.getByRole('link', { name: /^inicio$/i })).toHaveAttribute(
      'href',
      '#inicio'
    )
    expect(screen.getByRole('link', { name: /sobre mí/i })).toHaveAttribute(
      'href',
      '#sobre-mi'
    )
  })

  it('llama a onClose al pulsar Escape', () => {
    const handleClose = vi.fn()
    renderWithMotion(
      <MobileDrawer
        isOpen
        onClose={handleClose}
        siteName="Mi Portfolio"
        navItems={NAV_ITEMS}
      />
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('llama a onClose al hacer clic en el botón de cerrar', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    renderWithMotion(
      <MobileDrawer
        isOpen
        onClose={handleClose}
        siteName="Mi Portfolio"
        navItems={NAV_ITEMS}
      />
    )
    await user.click(screen.getByRole('button', { name: /cerrar menú/i }))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('llama a onClose al hacer clic en un enlace de navegación', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    renderWithMotion(
      <MobileDrawer
        isOpen
        onClose={handleClose}
        siteName="Mi Portfolio"
        navItems={NAV_ITEMS}
      />
    )
    await user.click(screen.getByRole('link', { name: /sobre mí/i }))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('llama a onClose al pulsar el logo (enlace al inicio)', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    renderWithMotion(
      <MobileDrawer
        isOpen
        onClose={handleClose}
        siteName="Mi Portfolio"
        navItems={NAV_ITEMS}
      />
    )
    await user.click(
      screen.getByRole('link', { name: /ir al inicio: mi portfolio/i })
    )
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('renderiza el ThemeToggle', () => {
    renderWithMotion(
      <MobileDrawer
        isOpen
        onClose={vi.fn()}
        siteName="Mi Portfolio"
        navItems={NAV_ITEMS}
      />
    )
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('marca aria-current cuando activeNavHref coincide con un ítem', () => {
    renderWithMotion(
      <MobileDrawer
        isOpen
        onClose={vi.fn()}
        siteName="Mi Portfolio"
        navItems={NAV_ITEMS}
        activeNavHref="#sobre-mi"
      />
    )
    expect(screen.getByRole('link', { name: /sobre mí/i })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('link', { name: /^inicio$/i })).not.toHaveAttribute(
      'aria-current'
    )
  })

  it('el icono de cerrar va con aria-hidden (decorativo junto al aria-label del botón)', () => {
    renderWithMotion(
      <MobileDrawer
        isOpen
        onClose={vi.fn()}
        siteName="Mi Portfolio"
        navItems={NAV_ITEMS}
      />
    )
    expect(screen.getByTestId('close-icon')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })
})
