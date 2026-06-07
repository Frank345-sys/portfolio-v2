/**
 * Tests para shared/components/Avatar/Avatar.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('muestra iniciales y aria-label cuando no hay imagen', () => {
    render(<Avatar initials="AB" name="Ada Beta" />)

    expect(
      screen.getByRole('img', { name: /avatar de ada beta/i })
    ).toBeInTheDocument()
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('renderiza imagen cuando hay src', () => {
    render(
      <Avatar initials="AB" name="Ada Beta" src="https://example.com/a.png" />
    )

    const photo = screen.getByRole('img', { name: /foto de ada beta/i })
    expect(photo).toBeInTheDocument()
    expect(photo).toHaveAttribute('src', 'https://example.com/a.png')
    expect(photo).toHaveAttribute('alt', 'Foto de Ada Beta')
    expect(photo).toHaveAttribute('width', '1')
    expect(photo).toHaveAttribute('height', '1')
  })
})
