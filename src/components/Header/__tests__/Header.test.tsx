import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '../Header'

vi.mock('@/shared/components/ThemeToggle', () => ({
  ThemeToggle: () => <span data-testid="theme-toggle">ThemeToggle</span>,
}))

vi.mock('@/shared/icons', () => ({
  CodeIcon: () => <svg data-testid="code-icon" />,
}))

describe('Header', () => {
  it('renderiza el nombre del sitio por defecto', () => {
    render(<Header />)
    expect(screen.getByText('Mi Portfolio')).toBeInTheDocument()
  })

  it('renderiza el siteName personalizado', () => {
    render(<Header siteName="Mi Sitio" />)
    expect(screen.getByText('Mi Sitio')).toBeInTheDocument()
  })

  it('renderiza los enlaces de navegación por defecto', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /sobre mí/i })).toHaveAttribute(
      'href',
      '#sobre-mi'
    )
    expect(screen.getByRole('link', { name: /proyectos/i })).toHaveAttribute(
      'href',
      '#proyectos'
    )
    expect(screen.getByRole('link', { name: /contacto/i })).toHaveAttribute(
      'href',
      '#contacto'
    )
  })

  it('renderiza navItems personalizados', () => {
    const navItems = [
      { href: '#blog', label: 'Blog' },
      { href: '#faq', label: 'FAQ' },
    ]
    render(<Header navItems={navItems} />)
    expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute(
      'href',
      '#blog'
    )
    expect(screen.getByRole('link', { name: /faq/i })).toHaveAttribute(
      'href',
      '#faq'
    )
  })

  it('renderiza el rightSlot por defecto (ThemeToggle)', () => {
    render(<Header />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('renderiza un rightSlot personalizado', () => {
    render(<Header rightSlot={<button type="button">Login</button>} />)
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('tiene aria-label en la cabecera', () => {
    render(<Header />)
    expect(
      screen.getByRole('banner', { name: /cabecera/i })
    ).toBeInTheDocument()
  })

  it('aplica className adicional al header', () => {
    const { container } = render(<Header className="custom-class" />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('custom-class')
  })

  it('el enlace de proyectos tiene href correcto', async () => {
    render(<Header />)
    const link = screen.getByRole('link', { name: /proyectos/i })
    expect(link).toHaveAttribute('href', '#proyectos')
    await userEvent.click(link)
    expect(link).toBeInTheDocument()
  })
})
