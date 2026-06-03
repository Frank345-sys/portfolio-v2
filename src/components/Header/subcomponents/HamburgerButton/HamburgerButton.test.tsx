/**
 * Tests para `HamburgerButton` — a11y, aria y disparo de callback.
 *
 * @fileoverview Valida `aria-label` dinámico, `aria-expanded`, `aria-controls` alineado con
 * `HEADER_MOBILE_DRAWER_PANEL_ID`, `className` adicional y barras `aria-hidden`; usa
 * `renderWithMotion` porque las barras internas son `motion.span`.
 * @remarks No mockea `IntersectionObserver` ni cubre estado global del drawer —
 * esos contratos viven en `Header.test.tsx` y `MobileDrawer.test.tsx`.
 */

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithMotion } from '@/test/helpers'

import { HEADER_MOBILE_DRAWER_PANEL_ID } from './constants'
import { HamburgerButton } from './HamburgerButton'

/**
 * {@link HamburgerButton} — unidad (`renderWithMotion`): a11y, `aria-expanded`, `aria-controls`,
 * clic y `className`.
 *
 * **No requiere** mock de `IntersectionObserver` — no participa del scroll-spy; el id del panel
 * se alinea con {@link HEADER_MOBILE_DRAWER_PANEL_ID} en `../../constants`.
 *
 * **No cubre:** estado global del drawer ni `AnimatePresence`; eso está en `Header.test.tsx`
 * y `MobileDrawer.test.tsx`.
 */
describe('HamburgerButton', () => {
  describe('accesibilidad y props', () => {
    it('renderiza con aria-label de abrir cuando isOpen es false', () => {
      renderWithMotion(<HamburgerButton isOpen={false} onClick={vi.fn()} />)
      expect(
        screen.getByRole('button', { name: /abrir menú/i })
      ).toBeInTheDocument()
    })

    it('renderiza con aria-label de cerrar cuando isOpen es true', () => {
      renderWithMotion(<HamburgerButton isOpen onClick={vi.fn()} />)
      expect(
        screen.getByRole('button', { name: /cerrar menú/i })
      ).toBeInTheDocument()
    })

    it('tiene aria-expanded false cuando isOpen es false', () => {
      renderWithMotion(<HamburgerButton isOpen={false} onClick={vi.fn()} />)
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'false'
      )
    })

    it('tiene aria-expanded true cuando isOpen es true', () => {
      renderWithMotion(<HamburgerButton isOpen onClick={vi.fn()} />)
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'true'
      )
    })

    it('tiene aria-controls alineado con el id del panel del drawer', () => {
      renderWithMotion(<HamburgerButton isOpen={false} onClick={vi.fn()} />)
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-controls',
        HEADER_MOBILE_DRAWER_PANEL_ID
      )
    })

    it('acepta className adicional', () => {
      renderWithMotion(
        <HamburgerButton
          isOpen={false}
          onClick={vi.fn()}
          className="test-class"
        />
      )
      expect(screen.getByRole('button')).toHaveClass('test-class')
    })

    it('oculta las barras decorativas del lector de pantalla', () => {
      renderWithMotion(<HamburgerButton isOpen={false} onClick={vi.fn()} />)
      const decorative = screen
        .getByRole('button')
        .querySelectorAll('span[aria-hidden="true"]')
      expect(decorative.length).toBe(3)
    })
  })

  describe('interacción', () => {
    it('llama a onClick al hacer click', async () => {
      const user = userEvent.setup()
      const onMenuButtonClick = vi.fn()
      renderWithMotion(
        <HamburgerButton isOpen={false} onClick={onMenuButtonClick} />
      )
      await user.click(screen.getByRole('button'))
      expect(onMenuButtonClick).toHaveBeenCalledTimes(1)
    })
  })
})
