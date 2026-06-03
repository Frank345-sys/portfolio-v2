/**
 * Pruebas de `useModalOverlayEffects` — Escape, registro de `keydown` y pausa/reanudación de Lenis mockeada.
 *
 * @fileoverview Mock de `lenis/react` (`useLenis`) y harness nulo que solo monta el hook con `isOpen` / `onClose`.
 * @remarks Espía `document.addEventListener` / `removeEventListener` y las llamadas `stop` / `start` de Lenis.
 */

import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'

import { useModalOverlayEffects } from '../useModalOverlayEffects'

const { useLenisMock } = vi.hoisted(() => ({
  useLenisMock: vi.fn(),
}))

vi.mock('lenis/react', () => ({
  useLenis: () => useLenisMock(),
}))

function Harness({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  useModalOverlayEffects({ isOpen, onClose })
  return null
}

describe('useModalOverlayEffects', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    useLenisMock.mockReset()
  })

  it('con isOpen=false no registra listener ni controla lenis', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const lenis = { stop: vi.fn(), start: vi.fn() }
    useLenisMock.mockReturnValue(lenis)

    render(<Harness isOpen={false} onClose={vi.fn()} />)

    expect(addSpy.mock.calls.some((call) => call[0] === 'keydown')).toBeFalsy()
    expect(lenis.stop).not.toHaveBeenCalled()
    expect(lenis.start).not.toHaveBeenCalled()
  })

  it('con isOpen=true registra keydown y pausa lenis', () => {
    const addSpy = vi.spyOn(document, 'addEventListener')
    const lenis = { stop: vi.fn(), start: vi.fn() }
    useLenisMock.mockReturnValue(lenis)

    render(<Harness isOpen onClose={vi.fn()} />)

    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    expect(lenis.stop).toHaveBeenCalledTimes(1)
    expect(lenis.start).not.toHaveBeenCalled()
  })

  it('al cerrar (true -> false) limpia listener y reanuda lenis', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const lenis = { stop: vi.fn(), start: vi.fn() }
    useLenisMock.mockReturnValue(lenis)

    const { rerender } = render(<Harness isOpen onClose={vi.fn()} />)

    rerender(<Harness isOpen={false} onClose={vi.fn()} />)

    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    expect(lenis.start).toHaveBeenCalledTimes(1)
  })

  it('llama onClose al pulsar Escape con overlay abierto', () => {
    useLenisMock.mockReturnValue(undefined)
    const onClose = vi.fn()
    render(<Harness isOpen onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('no llama onClose con teclas distintas a Escape', () => {
    useLenisMock.mockReturnValue(undefined)
    const onClose = vi.fn()
    render(<Harness isOpen onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Enter' })
    expect(onClose).not.toHaveBeenCalled()
  })
})
