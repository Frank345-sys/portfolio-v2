import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

describe('MobileDrawer', () => {
  it('no renderiza nada cuando isOpen es false', () => {
    render(
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
    render(
      <MobileDrawer
        isOpen
        onClose={vi.fn()}
        siteName="Mi Portfolio"
        navItems={NAV_ITEMS}
      />
    )
    expect(
      screen.getByRole('dialog', { name: /menú de navegación/i })
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
    expect(screen.getByRole('link', { name: /proyectos/i })).toHaveAttribute(
      'href',
      '#proyectos'
    )
  })

  it('llama a onClose al hacer clic en el botón de cerrar', async () => {
    const user = userEvent.setup()
    const handleClose = vi.fn()
    render(
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
    render(
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
    render(
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
