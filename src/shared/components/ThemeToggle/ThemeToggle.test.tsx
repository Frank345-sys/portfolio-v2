import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, type Mock } from 'vitest'

import { useTheme } from '@/shared/components/ThemeToggle/hooks/useTheme'
import { renderWithMotion } from '@/test/renderWithMotion'

import { ThemeToggle } from './ThemeToggle'

vi.mock('@/shared/components/ThemeToggle/hooks/useTheme', () => ({
  useTheme: vi.fn(),
}))

const mockedUseTheme = useTheme as unknown as Mock

describe('ThemeToggle', () => {
  it("muestra el texto 'Modo oscuro' cuando isDark es true", () => {
    mockedUseTheme.mockReturnValue({
      isDark: true,
      setTheme: vi.fn(),
    })

    renderWithMotion(<ThemeToggle />)

    expect(screen.getByText(/modo oscuro/i)).toBeInTheDocument()
  })

  it("muestra el texto 'Modo claro' cuando isDark es false", () => {
    mockedUseTheme.mockReturnValue({
      isDark: false,
      setTheme: vi.fn(),
    })

    renderWithMotion(<ThemeToggle />)

    expect(screen.getByText(/modo claro/i)).toBeInTheDocument()
  })

  it('llama a setTheme con light cuando estaba en dark', async () => {
    const setTheme = vi.fn()
    mockedUseTheme.mockReturnValue({
      isDark: true,
      setTheme,
    })

    const user = userEvent.setup()
    renderWithMotion(<ThemeToggle />)

    await user.click(screen.getByRole('switch', { name: /modo/i }))

    expect(setTheme).toHaveBeenCalledWith('light')
  })

  it('llama a setTheme con dark cuando estaba en light', async () => {
    const setTheme = vi.fn()
    mockedUseTheme.mockReturnValue({
      isDark: false,
      setTheme,
    })

    const user = userEvent.setup()
    renderWithMotion(<ThemeToggle />)

    await user.click(screen.getByRole('switch', { name: /modo/i }))

    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('tiene role switch, aria-labelledby al texto visible y aria-checked accesible', () => {
    mockedUseTheme.mockReturnValue({
      isDark: true,
      setTheme: vi.fn(),
    })
    renderWithMotion(<ThemeToggle />)
    const switch_ = screen.getByRole('switch', { name: /modo/i })
    const labelledBy = switch_.getAttribute('aria-labelledby')
    expect(labelledBy).toBeTruthy()
    const labelEl = document.getElementById(labelledBy ?? '')
    expect(labelEl).not.toBeNull()
    expect(labelEl).toHaveTextContent(/modo oscuro/i)
    expect(switch_).toHaveAttribute('aria-checked', 'true')
  })
})
