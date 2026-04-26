import { screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, it, expect } from 'vitest'

import { SITE_PROFILE } from '@/shared/constants/siteProfile'
import { renderWithMotion } from '@/test/renderWithMotion'

import { ABOUT_HERO } from '../constants'
import { AboutHero } from '../subcomponents/AboutHero'

const IOReserve = globalThis.IntersectionObserver

describe('AboutHero', () => {
  beforeEach(() => {
    globalThis.IntersectionObserver = class {
      disconnect() {}
      observe() {}
      takeRecords() {
        return []
      }
      unobserve() {}
    } as unknown as typeof IntersectionObserver
  })

  afterEach(() => {
    globalThis.IntersectionObserver = IOReserve
  })

  describe('rendering', () => {
    it('muestra la overline Sobre mí y el título con el nombre', () => {
      renderWithMotion(<AboutHero />)
      expect(screen.getByText(/sobre mí/i)).toBeInTheDocument()
      expect(
        screen.getByRole('heading', {
          name: new RegExp(
            `^${ABOUT_HERO.firstName}\\s+${ABOUT_HERO.lastName}$`,
            'i'
          ),
        })
      ).toBeInTheDocument()
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

    it('el avatar expone rol img, etiqueta accesible e iniciales', () => {
      renderWithMotion(<AboutHero />)
      const avatar = screen.getByRole('img', {
        name: /avatar de frank gonzález/i,
      })
      expect(avatar).toBeInTheDocument()
      expect(screen.getByText(ABOUT_HERO.avatarInitials)).toBeInTheDocument()
    })

    it('renderiza el anillo decorativo animado del avatar', () => {
      const { container } = renderWithMotion(<AboutHero />)
      expect(
        container.querySelector('.u-avatar-feature-ring')
      ).toBeInTheDocument()
    })
  })
})
