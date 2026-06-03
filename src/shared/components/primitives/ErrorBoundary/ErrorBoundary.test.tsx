/**
 * Tests para shared/components/ErrorBoundary/ErrorBoundary.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

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
  const [userResolved, setUserResolved] = useState(false)
  const bad = initialBad && !userResolved
  return (
    <>
      <button type="button" onClick={() => setUserResolved(true)}>
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
      screen.getByText(/no pudimos cargar el contenido/i)
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^corregir$/i }))
    await user.click(
      screen.getByRole('button', { name: /reintentar conexión/i })
    )

    expect(screen.getByText('Listo')).toBeInTheDocument()
    spy.mockRestore()
  })
})
