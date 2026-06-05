/**
 * Pruebas de `useFocusTrap` — captura de Tab, ciclo entre focables y restauración del foco al salir.
 *
 * @fileoverview Vitest + `userEvent` sobre harnesses con uno o dos botones bajo la ref devuelta por el hook.
 * @remarks Verifica listeners en `document` (captura) y limpieza al pasar `isActive` a false o al desmontar con trap activo.
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'

import { useFocusTrap } from '../useFocusTrap'

import type { RefObject } from 'react'

function TrapHarness({ isActive }: { isActive: boolean }) {
  const ref = useFocusTrap(isActive)
  return (
    <div ref={ref as RefObject<HTMLDivElement>}>
      <button type="button">First</button>
      <button type="button">Second</button>
    </div>
  )
}

function EmptyTrapHarness({ isActive }: { isActive: boolean }) {
  const ref = useFocusTrap(isActive)
  return <div ref={ref as RefObject<HTMLDivElement>} data-testid="empty-trap" />
}

function RestoreFocusHarness({ active }: { active: boolean }) {
  const ref = useFocusTrap(active)
  return (
    <>
      <button type="button" data-testid="outside-focus">
        Outside
      </button>
      <div ref={ref as RefObject<HTMLDivElement>}>
        <button type="button">Inside</button>
      </div>
    </>
  )
}

type ListenerCall = [string, ...unknown[]]

describe('useFocusTrap', () => {
  let addSpy: ReturnType<typeof vi.spyOn>
  let removeSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    addSpy = vi.spyOn(document, 'addEventListener')
    removeSpy = vi.spyOn(document, 'removeEventListener')
  })

  afterEach(() => {
    addSpy.mockRestore()
    removeSpy.mockRestore()
    document.body.innerHTML = ''
  })

  it('con isActive=false no registra listener keydown en document', () => {
    render(<TrapHarness isActive={false} />)

    const keydownAdds = addSpy.mock.calls.filter(
      (call: ListenerCall) => call[0] === 'keydown'
    )
    expect(keydownAdds).toHaveLength(0)
  })

  it('con isActive=true enfoca el primer elemento focuseable al activarse', () => {
    const { rerender } = render(<TrapHarness isActive={false} />)
    rerender(<TrapHarness isActive={true} />)

    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'First' })
    )
  })

  it('Tab en el último elemento focuseable vuelve al primero', async () => {
    const user = userEvent.setup()
    render(<TrapHarness isActive />)

    const first = screen.getByRole('button', { name: 'First' })
    const last = screen.getByRole('button', { name: 'Second' })
    last.focus()
    expect(document.activeElement).toBe(last)

    await user.tab()

    expect(document.activeElement).toBe(first)
  })

  it('Shift+Tab en el primer elemento focuseable va al último', async () => {
    const user = userEvent.setup()
    render(<TrapHarness isActive />)

    const first = screen.getByRole('button', { name: 'First' })
    const last = screen.getByRole('button', { name: 'Second' })
    first.focus()

    await user.tab({ shift: true })

    expect(document.activeElement).toBe(last)
  })

  it('al pasar isActive a false elimina el listener keydown', () => {
    const { rerender } = render(<TrapHarness isActive />)

    const keydownAddsBefore = addSpy.mock.calls.filter(
      (call: ListenerCall) => call[0] === 'keydown'
    )
    expect(keydownAddsBefore.length).toBeGreaterThan(0)

    rerender(<TrapHarness isActive={false} />)

    const removed = removeSpy.mock.calls.filter(
      (call: ListenerCall) => call[0] === 'keydown'
    )
    expect(removed.length).toBeGreaterThan(0)
  })

  it('al desmontar con trap activo elimina el listener keydown', () => {
    const { unmount } = render(<TrapHarness isActive />)

    unmount()

    const removed = removeSpy.mock.calls.filter(
      (call: ListenerCall) => call[0] === 'keydown'
    )
    expect(removed.length).toBeGreaterThan(0)
  })

  it('contenedor sin elementos focuseables no lanza al pulsar Tab', async () => {
    const user = userEvent.setup()
    render(<EmptyTrapHarness isActive />)

    await expect(user.tab()).resolves.not.toThrow()
  })

  it('al desactivar restaura el foco al elemento que lo tenía antes', () => {
    const { rerender } = render(<RestoreFocusHarness active={false} />)

    const outside = screen.getByTestId('outside-focus')
    outside.focus()
    expect(document.activeElement).toBe(outside)

    rerender(<RestoreFocusHarness active />)
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: /inside/i })
    )

    rerender(<RestoreFocusHarness active={false} />)
    expect(document.activeElement).toBe(outside)
  })
})
