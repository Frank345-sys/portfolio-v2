/**
 * Tests para components/Header/subcomponents/MobileDrawer/MobileDrawer.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { escapeRegex, renderWithMotion, runAxeAudit } from '@/test/helpers'

import {
  DEFAULT_NAV_ITEMS,
  HEADER_DRAWER_NAV_ARIA_LABEL,
  HEADER_MOBILE_DRAWER_PANEL_ID,
  SECTION_ANCHOR_ID,
  SITE_DISPLAY_NAME,
  sectionHref,
} from './constants'
import { MobileDrawer } from './MobileDrawer'

import type { SVGProps } from 'react'

vi.mock('@/shared/components/primitives/ThemeToggle', () => ({
  ThemeToggle: () => <span data-testid="theme-toggle">ThemeToggle</span>,
}))

vi.mock('@/shared/icons', () => ({
  CodeIcon: () => <svg data-testid="code-icon" />,
  CloseIcon: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="close-icon" {...props} />
  ),
}))

/** Primeros dos ítems de {@link DEFAULT_NAV_ITEMS}. */
const NAV_ITEMS = DEFAULT_NAV_ITEMS.slice(0, 2)

function siteLogoNamePattern(fullName: string): RegExp {
  return new RegExp(`^Ir al inicio: ${escapeRegex(fullName)}$`, 'i')
}

/**
 * {@link MobileDrawer} — unidad con mocks de tema e iconos: montaje condicional,
 * rutas de cierre (`onClose`), marca activa con `activeNavHref` y detalles a11y del panel.
 *
 * **Datos compartidos:** `DEFAULT_NAV_ITEMS`, anclas y {@link SITE_DISPLAY_NAME} desde `./constants` → `navigation.ts`
 * (mismo contrato que `Header.test.tsx`).
 *
 * **No cubre:** que el `Header` abra/cierre el drawer (estado compartido); eso está en
 * `Header.test.tsx`. **Scroll-spy global:** `useNavScrollSpy.test.tsx` / `useHeader.test.tsx`.
 */
describe('MobileDrawer', () => {
  describe('montaje y contenido accesible', () => {
    it('no renderiza nada cuando isOpen es false', () => {
      renderWithMotion(
        <MobileDrawer isOpen={false} onClose={vi.fn()} navItems={NAV_ITEMS} />
      )
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('el diálogo tiene nombre accesible "Menú de navegación" y muestra displayName en el logo', () => {
      renderWithMotion(
        <MobileDrawer
          isOpen
          onClose={vi.fn()}
          navItems={NAV_ITEMS}
          displayName="Marca Visible"
        />
      )
      expect(
        screen.getByRole('dialog', { name: /menú de navegación/i })
      ).toBeInTheDocument()
      expect(screen.getByText('Marca Visible')).toBeInTheDocument()
      expect(
        screen.getByRole('link', {
          name: siteLogoNamePattern('Marca Visible'),
        })
      ).toHaveAttribute('href', sectionHref(SECTION_ANCHOR_ID.inicio))
      expect(
        screen.getByRole('navigation', { name: HEADER_DRAWER_NAV_ARIA_LABEL })
      ).toBeInTheDocument()
    })

    it('renderiza el drawer cuando isOpen es true (SITE_DISPLAY_NAME por defecto)', () => {
      renderWithMotion(
        <MobileDrawer isOpen onClose={vi.fn()} navItems={NAV_ITEMS} />
      )
      expect(
        screen.getByRole('dialog', { name: /menú de navegación/i })
      ).toBeInTheDocument()
      expect(screen.getByText(SITE_DISPLAY_NAME)).toBeInTheDocument()
      expect(
        screen.getByRole('link', {
          name: siteLogoNamePattern(SITE_DISPLAY_NAME),
        })
      ).toHaveAttribute('href', sectionHref(SECTION_ANCHOR_ID.inicio))
      const navDrawer = screen.getByRole('navigation', {
        name: HEADER_DRAWER_NAV_ARIA_LABEL,
      })
      expect(navDrawer).toBeInTheDocument()
      expect(
        within(navDrawer).getByRole('link', { name: /^inicio$/i })
      ).toHaveAttribute('href', sectionHref(SECTION_ANCHOR_ID.inicio))
      expect(
        within(navDrawer).getByRole('link', { name: /sobre mí/i })
      ).toHaveAttribute('href', sectionHref(SECTION_ANCHOR_ID.sobreMi))
    })

    it('renderiza el ThemeToggle en el footer del panel', () => {
      renderWithMotion(
        <MobileDrawer isOpen onClose={vi.fn()} navItems={NAV_ITEMS} />
      )
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    })

    it('el icono de cerrar va con aria-hidden (decorativo junto al aria-label del botón)', () => {
      renderWithMotion(
        <MobileDrawer isOpen onClose={vi.fn()} navItems={NAV_ITEMS} />
      )
      expect(screen.getByTestId('close-icon')).toHaveAttribute(
        'aria-hidden',
        'true'
      )
    })

    it('axe: sin violaciones conocidas con el drawer abierto', async () => {
      renderWithMotion(
        <MobileDrawer isOpen onClose={vi.fn()} navItems={NAV_ITEMS} />
      )
      await screen.findByRole('dialog')
      expect(await runAxeAudit(document.body)).toHaveNoViolations()
    }, 15_000)
  })

  describe('cierre (onClose)', () => {
    it('llama a onClose al pulsar Escape', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      renderWithMotion(
        <MobileDrawer isOpen onClose={handleClose} navItems={NAV_ITEMS} />
      )
      await user.keyboard('{Escape}')
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('llama a onClose al hacer clic en el backdrop (overlay)', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      renderWithMotion(
        <MobileDrawer isOpen onClose={handleClose} navItems={NAV_ITEMS} />
      )
      const panel = document.getElementById(HEADER_MOBILE_DRAWER_PANEL_ID)
      expect(panel).toBeTruthy()
      const overlay = panel!.parentElement
      expect(overlay).toBeInstanceOf(HTMLElement)
      await user.click(overlay!)
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('llama a onClose al hacer clic en el botón de cerrar', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      renderWithMotion(
        <MobileDrawer isOpen onClose={handleClose} navItems={NAV_ITEMS} />
      )
      await user.click(screen.getByRole('button', { name: /cerrar menú/i }))
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('llama a onClose al hacer clic en un enlace de navegación', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      renderWithMotion(
        <MobileDrawer isOpen onClose={handleClose} navItems={NAV_ITEMS} />
      )
      const navDrawer = screen.getByRole('navigation', {
        name: HEADER_DRAWER_NAV_ARIA_LABEL,
      })
      await user.click(
        within(navDrawer).getByRole('link', { name: /sobre mí/i })
      )
      expect(handleClose).toHaveBeenCalledTimes(1)
    })

    it('llama a onClose al pulsar el logo (enlace al inicio)', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()
      renderWithMotion(
        <MobileDrawer isOpen onClose={handleClose} navItems={NAV_ITEMS} />
      )
      await user.click(
        screen.getByRole('link', {
          name: new RegExp(
            `Ir al inicio: ${escapeRegex(SITE_DISPLAY_NAME)}`,
            'i'
          ),
        })
      )
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('estado activo y spy', () => {
    it('marca aria-current cuando activeNavHref coincide con un ítem', () => {
      renderWithMotion(
        <MobileDrawer
          isOpen
          onClose={vi.fn()}
          navItems={NAV_ITEMS}
          activeNavHref={sectionHref(SECTION_ANCHOR_ID.sobreMi)}
        />
      )
      const navDrawer = screen.getByRole('navigation', {
        name: HEADER_DRAWER_NAV_ARIA_LABEL,
      })
      expect(
        within(navDrawer).getByRole('link', { name: /sobre mí/i })
      ).toHaveAttribute('aria-current', 'page')
      expect(
        within(navDrawer).getByRole('link', { name: /^inicio$/i })
      ).not.toHaveAttribute('aria-current')
    })
  })
})
