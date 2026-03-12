import { vi, type Mock } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ThemeToggle } from '../ThemeToggle'
import { useTheme } from '@/shared/components/ThemeToggle/hooks/useTheme'

vi.mock('@/shared/components/ThemeToggle/hooks/useTheme', () => ({
  useTheme: vi.fn(),
}))

const mockedUseTheme = useTheme as unknown as Mock

describe('ThemeToggle', () => {
  it("muestra el texto 'Dark mode' cuando isDark es true", () => {
    mockedUseTheme.mockReturnValue({
      isDark: true,
      setTheme: vi.fn(),
    })

    render(<ThemeToggle />)

    expect(screen.getByText(/dark mode/i)).toBeInTheDocument()
  })

  it("muestra el texto 'Light mode' cuando isDark es false", () => {
    mockedUseTheme.mockReturnValue({
      isDark: false,
      setTheme: vi.fn(),
    })

    render(<ThemeToggle />)

    expect(screen.getByText(/light mode/i)).toBeInTheDocument()
  })

  it('llama a setTheme con light cuando estaba en dark', async () => {
    const setTheme = vi.fn()
    mockedUseTheme.mockReturnValue({
      isDark: true,
      setTheme,
    })

    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('switch'))

    expect(setTheme).toHaveBeenCalledWith('light')
  })

  it('llama a setTheme con dark cuando estaba en light', async () => {
    const setTheme = vi.fn()
    mockedUseTheme.mockReturnValue({
      isDark: false,
      setTheme,
    })

    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole('switch'))

    expect(setTheme).toHaveBeenCalledWith('dark')
  })

  it('tiene role switch y aria-checked accesible', () => {
    mockedUseTheme.mockReturnValue({
      isDark: true,
      setTheme: vi.fn(),
    })
    render(<ThemeToggle />)
    const switch_ = screen.getByRole('switch', { name: /alternar tema/i })
    expect(switch_).toHaveAttribute('aria-checked', 'true')
  })
})
