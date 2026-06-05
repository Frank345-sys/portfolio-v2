/**
 * Tests para `AboutHero` — contrato de render, accesibilidad y fallback de avatar.
 *
 * @fileoverview Valida `<header>`, overline, `h2` accesible, badge, ubicación, tagline con `<strong>`,
 * avatar con `alt` correcto, iniciales ocultas, anillo decorativo y fallback cuando la foto falla.
 * @remarks Usa `renderWithMotion` — `AboutHero` tiene animaciones de Motion triggeradas por
 * `IntersectionObserver`, que se mockea en `beforeEach`. El fallback de foto se testea con
 * `vi.mock('./constants')` para inyectar una URL inválida sin tocar el módulo real.
 */
import { screen, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'

import { renderWithMotion } from '@/test/helpers'

import { AboutHero } from './AboutHero'
import {
  ABOUT_HERO,
  ABOUT_HERO_SECTION_TITLE_ID,
  SITE_PROFILE,
} from './constants'

import type * as AboutConstantsModule from './constants'

// Preserva el IntersectionObserver nativo para restaurarlo en afterEach
// y evitar contaminación entre tests.
const IOReserve = globalThis.IntersectionObserver

/**
 * Sustituye `IntersectionObserver` por un stub no-op para el entorno jsdom,
 * que no implementa la API de observación de intersección.
 */
const setupIntersectionObserver = () => {
  globalThis.IntersectionObserver = class {
    disconnect() {}
    observe() {}
    takeRecords() {
      return []
    }
    unobserve() {}
  } as unknown as typeof IntersectionObserver
}

/**
 * Casos cubiertos:
 * - Stub de `IntersectionObserver` para entorno de test (observer del hero)
 * - `<header>` introductorio
 * - Overline «Sobre mí» y `h2` accesible con nombre compuesto desde `ABOUT_HERO`
 * - Badge rol, ubicación y términos del tagline resaltados con `<strong>`
 * - Avatar: `alt` de foto coherente, iniciales en `span[hidden]` mientras hay foto
 * - Anillo decorativo del avatar (selector de implementación estable)
 * - Fallback: si falla la carga de foto, ocultar imagen principal y exponer avatar por iniciales
 */
describe('AboutHero', () => {
  beforeEach(setupIntersectionObserver)
  afterEach(() => {
    globalThis.IntersectionObserver = IOReserve
  })

  /**
   * Render estático: estructura DOM, accesibilidad y contenido visible.
   * No cubre interactividad ni animaciones.
   */
  describe('rendering', () => {
    it('renderiza el bloque introductorio en un header', () => {
      renderWithMotion(<AboutHero />)
      expect(
        screen
          .getByRole('heading', {
            name: new RegExp(
              `^${ABOUT_HERO.firstName}\\s+${ABOUT_HERO.lastName}$`,
              'i'
            ),
          })
          .closest('header')
      ).toBeInTheDocument()
    })

    it('muestra la overline Sobre mí y el título con el nombre', () => {
      renderWithMotion(<AboutHero />)
      expect(screen.getByText(/sobre mí/i)).toBeInTheDocument()
      const heading = screen.getByRole('heading', {
        name: new RegExp(
          `^${ABOUT_HERO.firstName}\\s+${ABOUT_HERO.lastName}$`,
          'i'
        ),
      })
      expect(heading).toBeInTheDocument()
      expect(heading.id).toBe(ABOUT_HERO_SECTION_TITLE_ID)
    })

    it('renderiza badge, ubicación y tagline con términos resaltados', () => {
      renderWithMotion(<AboutHero />)
      expect(
        screen.getAllByText(SITE_PROFILE.role, { exact: true }).length
      ).toBeGreaterThan(0)
      expect(screen.getByText(/Puebla, México/i)).toBeInTheDocument()
      expect(screen.getByText('TypeScript').tagName).toBe('STRONG')
      expect(screen.getByText('Next.js').tagName).toBe('STRONG')
      const reactStrong = screen
        .getAllByText('React')
        .filter((el) => el.tagName === 'STRONG')
      expect(reactStrong.length).toBeGreaterThanOrEqual(1)
    })

    it('el avatar usa alt en la foto y mantiene iniciales ocultas en el DOM', () => {
      renderWithMotion(<AboutHero />)
      const avatarImg = screen.getByRole('img', {
        name: /foto de frank gonzález/i,
      })
      expect(avatarImg).toHaveAttribute(
        'alt',
        `Foto de ${ABOUT_HERO.firstName} ${ABOUT_HERO.lastName}`
      )
      const initialsSpan =
        avatarImg.parentElement?.querySelector('span[hidden]')
      expect(initialsSpan).toHaveTextContent(ABOUT_HERO.avatarInitials)
    })

    it('renderiza el anillo decorativo animado del avatar', () => {
      renderWithMotion(<AboutHero />)
      const avatarImg = screen.getByRole('img', {
        name: /foto de frank gonzález/i,
      })
      const avatarRoot = avatarImg.parentElement?.parentElement
      expect(
        avatarRoot?.getElementsByClassName('u-avatar-feature-ring').length
      ).toBeGreaterThan(0)
    })
  })

  /**
   * Comportamiento de degradación cuando `avatarPhotoSrc` devuelve error de carga:
   * oculta el `<img>` principal y expone las iniciales como avatar alternativo.
   */
  describe('fallback de foto de avatar', () => {
    beforeEach(() => {
      vi.mock('./constants', async (importOriginal) => {
        const actual: typeof AboutConstantsModule = await importOriginal()
        return {
          ...actual,
          ABOUT_HERO: {
            ...actual.ABOUT_HERO,
            avatarPhotoSrc: 'https://invalid.example.test/avatar-404.png',
          },
        }
      })
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('si la imagen falla, oculta el img y deja visibles las iniciales', () => {
      renderWithMotion(<AboutHero />)
      const photo = screen.getByRole('img', { name: /foto de frank gonzález/i })
      // userEvent no simula fallo de carga en <img>
      fireEvent.error(photo)

      expect(
        screen.queryByRole('img', { name: /foto de frank gonzález/i })
      ).toBeNull()
      expect(
        screen.getByRole('img', { name: /avatar de frank gonzález/i })
      ).toBeInTheDocument()
      const initials = screen.getByText('FG')
      expect(initials).not.toHaveAttribute('hidden')
    })
  })
})
