import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { useReducedMotionMock, lastReactLenisProps } = vi.hoisted(() => {
  const lastReactLenisProps: {
    root: boolean | 'asChild' | undefined
    options: Record<string, unknown> | undefined
  } = {
    root: undefined,
    options: undefined,
  }
  return {
    useReducedMotionMock: vi.fn<() => boolean | null>(() => false),
    lastReactLenisProps,
  }
})

vi.mock('motion/react', () => ({
  useReducedMotion: () => useReducedMotionMock(),
}))

vi.mock('lenis/react', () => ({
  ReactLenis: ({
    children,
    root,
    options,
  }: {
    children: React.ReactNode
    root?: boolean | 'asChild'
    options?: Record<string, unknown>
  }) => {
    lastReactLenisProps.root = root
    lastReactLenisProps.options = options
    return <div data-testid="react-lenis">{children}</div>
  },
}))

import { SmoothScrollRoot } from '../SmoothScrollRoot'

describe('SmoothScrollRoot', () => {
  beforeEach(() => {
    useReducedMotionMock.mockReturnValue(false)
    lastReactLenisProps.root = undefined
    lastReactLenisProps.options = undefined
  })

  it('con prefers-reduced-motion no monta Lenis', () => {
    useReducedMotionMock.mockReturnValue(true)
    render(
      <SmoothScrollRoot>
        <span>contenido</span>
      </SmoothScrollRoot>
    )
    expect(screen.queryByTestId('react-lenis')).not.toBeInTheDocument()
    expect(screen.getByText('contenido')).toBeInTheDocument()
  })

  it('sin reduced motion envuelve con ReactLenis', () => {
    useReducedMotionMock.mockReturnValue(false)
    render(
      <SmoothScrollRoot>
        <span>contenido</span>
      </SmoothScrollRoot>
    )
    expect(screen.getByTestId('react-lenis')).toBeInTheDocument()
    expect(screen.getByText('contenido')).toBeInTheDocument()
  })

  it('pasa root y las opciones esperadas a ReactLenis', () => {
    useReducedMotionMock.mockReturnValue(false)
    render(
      <SmoothScrollRoot>
        <span>contenido</span>
      </SmoothScrollRoot>
    )
    expect(lastReactLenisProps.root).toBe(true)
    expect(lastReactLenisProps.options).toEqual({
      autoRaf: true,
      anchors: true,
      stopInertiaOnNavigate: true,
    })
  })

  it('cuando useReducedMotion es null aún monta Lenis', () => {
    useReducedMotionMock.mockReturnValue(null)
    render(
      <SmoothScrollRoot>
        <span>contenido</span>
      </SmoothScrollRoot>
    )
    expect(screen.getByTestId('react-lenis')).toBeInTheDocument()
  })
})
