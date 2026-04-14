import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { useModalOverlayEffects } from '../useModalOverlayEffects'

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
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    document.body.style.overscrollBehavior = ''
  })

  it('no modifica el documento cuando isOpen es false', () => {
    render(<Harness isOpen={false} onClose={vi.fn()} />)
    expect(document.body.style.overflow).toBe('')
    expect(document.documentElement.style.overflow).toBe('')
  })

  it('bloquea scroll del body y html cuando isOpen es true', () => {
    render(<Harness isOpen onClose={vi.fn()} />)
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.documentElement.style.overflow).toBe('hidden')
    expect(document.body.style.overscrollBehavior).toBe('none')
  })

  it('restaura estilos al pasar isOpen de true a false', () => {
    document.body.style.overflow = 'scroll'
    const { rerender } = render(<Harness isOpen onClose={vi.fn()} />)
    expect(document.body.style.overflow).toBe('hidden')
    rerender(<Harness isOpen={false} onClose={vi.fn()} />)
    expect(document.body.style.overflow).toBe('scroll')
  })

  it('llama onClose al pulsar Escape con overlay abierto', () => {
    const onClose = vi.fn()
    render(<Harness isOpen onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
