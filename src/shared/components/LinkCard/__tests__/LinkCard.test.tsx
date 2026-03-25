import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LinkCard } from '../LinkCard'
import { JsIcon } from '@/shared/icons'

describe('LinkCard', () => {
  it('renderiza enlace con título e ícono', () => {
    render(
      <LinkCard
        href="https://example.com/cert"
        title="Mi certificado"
        icon={<span data-testid="icon">📜</span>}
      />
    )

    const link = screen.getByRole('link', {
      name: /mi certificado \(abre en nueva pestaña\)/i,
    })
    expect(link).toHaveAttribute('href', 'https://example.com/cert')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText('Mi certificado')).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renderiza subtítulo cuando se pasa', () => {
    render(
      <LinkCard
        href="/docs"
        title="Documentación"
        subtitle="Equipo interno"
        icon="📘"
        external={false}
      />
    )

    expect(screen.getByText('Documentación')).toBeInTheDocument()
    expect(screen.getByText('Equipo interno')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /documentación/i })
    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
  })

  it('acepta un componente SVG como ícono', () => {
    render(
      <LinkCard
        href="https://example.com/js"
        title="JavaScript"
        icon={<JsIcon aria-hidden />}
      />
    )

    const link = screen.getByRole('link')
    expect(link.querySelector('svg')).toBeInTheDocument()
  })

  it('respeta aria-label explícito', () => {
    render(
      <LinkCard
        href="https://a.test"
        title="Título visible"
        icon="⭐"
        ariaLabel="Enlace personalizado"
      />
    )

    expect(
      screen.getByRole('link', { name: /enlace personalizado/i })
    ).toBeInTheDocument()
  })
})
