import { vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMotion } from '@/test/renderWithMotion'
import { HamburgerButton } from '../subcomponents/HamburgerButton'

describe('HamburgerButton', () => {
  it('renderiza con aria-label de abrir cuando isOpen es false', () => {
    renderWithMotion(<HamburgerButton isOpen={false} onClick={vi.fn()} />)
    expect(
      screen.getByRole('button', { name: /abrir menú/i })
    ).toBeInTheDocument()
  })

  it('renderiza con aria-label de cerrar cuando isOpen es true', () => {
    renderWithMotion(<HamburgerButton isOpen={true} onClick={vi.fn()} />)
    expect(
      screen.getByRole('button', { name: /cerrar menú/i })
    ).toBeInTheDocument()
  })

  it('llama a onClick al hacer click', async () => {
    const handleClick = vi.fn()
    renderWithMotion(<HamburgerButton isOpen={false} onClick={handleClick} />)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('tiene aria-expanded false cuando isOpen es false', () => {
    renderWithMotion(<HamburgerButton isOpen={false} onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('tiene aria-expanded true cuando isOpen es true', () => {
    renderWithMotion(<HamburgerButton isOpen={true} onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('tiene aria-controls apuntando a mobile-menu', () => {
    renderWithMotion(<HamburgerButton isOpen={false} onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-controls',
      'mobile-menu'
    )
  })

  it('acepta className adicional', () => {
    renderWithMotion(
      <HamburgerButton
        isOpen={false}
        onClick={vi.fn()}
        className="test-class"
      />
    )
    expect(screen.getByRole('button')).toHaveClass('test-class')
  })
})
