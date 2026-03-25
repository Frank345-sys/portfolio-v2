import { vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMotion } from '@/test/renderWithMotion'
import { MobileDrawer } from '../subcomponents/MobileDrawer'
import type { NavItem } from '../types'

vi.mock('@/shared/components/ThemeToggle', () => ({
  ThemeToggle: () => <span data-testid="theme-toggle">ThemeToggle</span>,
}))

vi.mock('@/shared/icons', () => ({
  CodeIcon: () => <svg data-testid="code-icon" />,
  CloseIcon: () => <svg data-testid="close-icon" />,
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
    expect(screen.getByRole('link', { name: /inicio/i })).toHaveAttribute(
      'href',
      '#inicio'
    )
    expect(screen.getByRole('link', { name: /sobre mí/i })).toHaveAttribute(
      'href',
      '#sobre-mi'
    )
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
})
