/**
 * Pruebas de `useNavUnderlinePosition` — visibilidad y métricas (`left`, `width`) del subrayado desktop.
 *
 * @fileoverview Harness con fila de enlaces fija; espera medición tras `ResizeObserver` y `requestAnimationFrame`.
 * @remarks Alterna `activeHref` para cubrir subrayado oculto vs visible; mock global de `ResizeObserver`.
 */

import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ResizeObserverMock } from '@/test/helpers'

import { DEFAULT_NAV_ITEMS } from '../../constants/navigation'
import { useNavUnderlinePosition } from '../useNavUnderlinePosition'

/**
 * Harness que monta `useNavUnderlinePosition` con una fila fija de 300px
 * y expone `left`, `width` y `visible` del subrayado en `data-testid`.
 */
function Harness({
  activeHref,
  isNavRowVisible = true,
}: {
  activeHref: string | null
  isNavRowVisible?: boolean
}) {
  const { rowRef, registerLink, underline } = useNavUnderlinePosition(
    activeHref,
    DEFAULT_NAV_ITEMS,
    isNavRowVisible
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

/**
 * {@link useNavUnderlinePosition} — medición (`left`, `width`, `visible`) del subrayado en la fila
 * de enlaces ({@link DEFAULT_NAV_ITEMS}); `ResizeObserver` mockeado.
 *
 * **Subrayado + IO vía hook orquestador:** `useHeader.test.tsx`.
 * **Reglas del href activo (spy):** `useNavScrollSpy.test.tsx`.
 * **Props Motion sobre el DOM real del `Header`:** `Header.test.tsx` (solo `aria-current`).
 */
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

  it('con la fila oculta, no intenta medir el subrayado', async () => {
    render(<Harness activeHref="#inicio" isNavRowVisible={false} />)

    await waitFor(() => {
      expect(screen.getByTestId('underline-visible')).toHaveTextContent('no')
    })
  })
})
