import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { DEFAULT_NAV_ITEMS } from '../constants'
import { useNavUnderlinePosition } from '../hooks/useNavUnderlinePosition'

function Harness({ activeHref }: { activeHref: string | null }) {
  const { rowRef, registerLink, underline } = useNavUnderlinePosition(
    activeHref,
    DEFAULT_NAV_ITEMS
  )
  return (
    <div>
      <span data-testid="underline-visible">
        {underline.visible ? 'yes' : 'no'}
      </span>
      <span data-testid="underline-left">{underline.left}</span>
      <span data-testid="underline-width">{underline.width}</span>
      <div ref={rowRef} className="flex" style={{ width: 300 }}>
        {DEFAULT_NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            ref={registerLink(item.href)}
            href={item.href}
            style={{ width: 100, flexShrink: 0 }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  constructor(callback: ResizeObserverCallback) {
    void callback
  }
}

describe('useNavUnderlinePosition', () => {
  beforeEach(() => {
    globalThis.ResizeObserver =
      ResizeObserverMock as unknown as typeof ResizeObserver
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sin sección activa, el subrayado no es visible', async () => {
    render(<Harness activeHref={null} />)

    await waitFor(() => {
      expect(screen.getByTestId('underline-visible')).toHaveTextContent('no')
    })
  })

  it('con sección activa existente, marca visible tras medición', async () => {
    render(<Harness activeHref="#inicio" />)

    await waitFor(() => {
      expect(screen.getByTestId('underline-visible')).toHaveTextContent('yes')
    })
    expect(screen.getByTestId('underline-left')).toHaveTextContent(/\d+/)
    expect(screen.getByTestId('underline-width')).toHaveTextContent(/\d+/)
  })
})
