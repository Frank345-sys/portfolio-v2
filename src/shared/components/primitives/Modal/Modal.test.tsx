/**
 * Tests para shared/components/Modal/Modal.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { renderWithMotion } from '@/test/helpers'

import { Modal } from './Modal'

describe('Modal', () => {
  it('no renderiza diálogo cuando isOpen es false', () => {
    renderWithMotion(
      <Modal isOpen={false} onClose={vi.fn()} ariaLabelledBy="modal-title-id">
        <Modal.Header>
          <h2 id="modal-title-id">Título</h2>
        </Modal.Header>
      </Modal>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('con isOpen=true expone dialog con aria-labelledby, botón cerrar y Escape', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    renderWithMotion(
      <Modal isOpen onClose={onClose} ariaLabelledBy="m-title">
        <Modal.Header>
          <h2 id="m-title">Ejemplo</h2>
        </Modal.Header>
      </Modal>
    )

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'm-title')

    await user.click(screen.getByRole('button', { name: /cerrar diálogo/i }))
    expect(onClose).toHaveBeenCalledTimes(1)

    onClose.mockClear()
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('axe: sin violaciones conocidas cuando el diálogo está abierto', async () => {
    renderWithMotion(
      <Modal isOpen onClose={vi.fn()} ariaLabelledBy="axe-title">
        <Modal.Header>
          <h2 id="axe-title">Prueba axe</h2>
        </Modal.Header>
      </Modal>
    )

    await screen.findByRole('dialog')
    expect(await axe(document.body)).toHaveNoViolations()
  })

  it('une className personalizado en Header y Body', async () => {
    renderWithMotion(
      <Modal isOpen onClose={vi.fn()} ariaLabelledBy="h">
        <Modal.Header data-testid="mh" className="w-full min-w-0">
          <h2 id="h">T</h2>
        </Modal.Header>
        <Modal.Body data-testid="mb" className="min-h-0 flex-1">
          <p>Cuerpo</p>
        </Modal.Body>
      </Modal>
    )

    await screen.findByRole('dialog')
    const header = screen.getByTestId('mh')
    const body = screen.getByTestId('mb')
    expect(header).toHaveClass('min-w-0')
    expect(header).toHaveClass('w-full')
    expect(body).toHaveClass('min-h-0')
    expect(body).toHaveClass('flex-1')
  })
})
