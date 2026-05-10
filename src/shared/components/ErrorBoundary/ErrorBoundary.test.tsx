import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from './ErrorBoundary'

function ThrowWhen({ bad }: { bad: boolean }) {
  if (bad) throw new Error('boom')
  return <span>Listo</span>
}

function Harness({ initialBad }: { initialBad: boolean }) {
  const [bad, setBad] = useState(initialBad)
  return (
    <>
      <button type="button" onClick={() => setBad(false)}>
        corregir
      </button>
      <ErrorBoundary>
        <ThrowWhen bad={bad} />
      </ErrorBoundary>
    </>
  )
}

describe('ErrorBoundary', () => {
  it('renderiza hijos cuando no hay error', () => {
    render(
      <ErrorBoundary>
        <span>contenido</span>
      </ErrorBoundary>
    )
    expect(screen.getByText('contenido')).toBeInTheDocument()
  })

  it('muestra alert y Reintentar; restaura el bloque si el hijo ya no falla', async () => {
    const user = userEvent.setup()
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<Harness initialBad />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(
      screen.getByText(/no pudimos mostrar este bloque/i)
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^corregir$/i }))
    await user.click(screen.getByRole('button', { name: /^reintentar$/i }))

    expect(screen.getByText('Listo')).toBeInTheDocument()
    spy.mockRestore()
  })
})
