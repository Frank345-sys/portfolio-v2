import { vi } from 'vitest'
import { act, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMotion } from '@/test/renderWithMotion'
import { Header } from '../Header'

vi.mock('@/shared/components/ThemeToggle', () => ({
  ThemeToggle: () => <span data-testid="theme-toggle">ThemeToggle</span>,
}))

vi.mock('@/shared/icons', () => ({
  CodeIcon: () => <svg data-testid="code-icon" />,
  CloseIcon: () => <svg data-testid="close-icon" />,
}))

describe('Header', () => {
  it('sale Mi Portfolio si no pasas siteName', () => {
    renderWithMotion(<Header />)
    expect(screen.getByText('Mi Portfolio')).toBeInTheDocument()
  })

  it('sale el siteName que le pases', () => {
    renderWithMotion(<Header siteName="Mi Sitio" />)
    expect(screen.getByText('Mi Sitio')).toBeInTheDocument()
  })

  it('los links por defecto apuntan bien (inicio y sobre mí)', () => {
    renderWithMotion(<Header />)
    expect(screen.getByRole('link', { name: /inicio/i })).toHaveAttribute(
      'href',
      '#inicio'
    )
    expect(screen.getByRole('link', { name: /sobre mí/i })).toHaveAttribute(
      'href',
      '#sobre-mi'
    )
  })

  it('si pasas navItems custom, esos links se ven', () => {
    const navItems = [
      { href: '#blog', label: 'Blog' },
      { href: '#faq', label: 'FAQ' },
    ]
    renderWithMotion(<Header navItems={navItems} />)
    expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute(
      'href',
      '#blog'
    )
    expect(screen.getByRole('link', { name: /faq/i })).toHaveAttribute(
      'href',
      '#faq'
    )
  })

  it('por defecto trae el ThemeToggle', () => {
    renderWithMotion(<Header />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('puedes poner otra cosa en rightSlot', () => {
    renderWithMotion(
      <Header rightSlot={<button type="button">Login</button>} />
    )
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('el header tiene rol banner y se puede encontrar por aria-label', () => {
    renderWithMotion(<Header />)
    expect(
      screen.getByRole('banner', { name: /cabecera/i })
    ).toBeInTheDocument()
  })

  it('className extra llega al <header>', () => {
    const { container } = renderWithMotion(<Header className="custom-class" />)
    expect(container.querySelector('header')).toHaveClass('custom-class')
  })

  it('arriba del todo: fondo transparente; al hacer scroll: sombra', () => {
    const { container } = renderWithMotion(<Header />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('bg-transparent')
    expect(header).not.toHaveClass('shadow-elevation-md')

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 80, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(header).toHaveClass('shadow-elevation-md')
    expect(header).not.toHaveClass('bg-transparent')
  })

  it('abrir menú muestra el drawer', async () => {
    const user = userEvent.setup()
    renderWithMotion(<Header siteName="Sitio Test" />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /abrir menú/i }))

    const dialog = screen.getByRole('dialog', {
      name: /sitio test/i,
    })
    expect(dialog).toBeInTheDocument()
    expect(within(dialog).getByText('Sitio Test')).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: /navegación mobile/i })
    ).toBeInTheDocument()
  })

  it('el botón hamburguesa cambia aria-expanded al abrir y cerrar', async () => {
    const user = userEvent.setup()
    renderWithMotion(<Header />)

    const abrir = screen.getByRole('button', { name: /abrir menú/i })
    expect(abrir).toHaveAttribute('aria-expanded', 'false')

    await user.click(abrir)
    const cerrar = screen.getByRole('button', {
      name: /cerrar menú/i,
      expanded: true,
    })
    expect(cerrar).toHaveAttribute('aria-expanded', 'true')

    await user.click(cerrar)
    expect(screen.getByRole('button', { name: /abrir menú/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('cerrar desde el panel del drawer lo quita del DOM', async () => {
    const user = userEvent.setup()
    renderWithMotion(<Header />)

    await user.click(screen.getByRole('button', { name: /abrir menú/i }))
    const dialog = screen.getByRole('dialog')
    await user.click(
      within(dialog).getByRole('button', { name: /cerrar menú/i })
    )
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('en mobile el drawer usa los navItems que le pasaste', async () => {
    const user = userEvent.setup()
    const navItems = [
      { href: '#a', label: 'Sección A' },
      { href: '#b', label: 'Sección B' },
    ]
    renderWithMotion(<Header navItems={navItems} />)

    await user.click(screen.getByRole('button', { name: /abrir menú/i }))

    const navMobile = screen.getByRole('navigation', {
      name: /navegación mobile/i,
    })
    expect(
      within(navMobile).getByRole('link', { name: /sección a/i })
    ).toHaveAttribute('href', '#a')
    expect(
      within(navMobile).getByRole('link', { name: /sección b/i })
    ).toHaveAttribute('href', '#b')
  })
})
