/**
 * Tests para components/HeroSection/HeroSection.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithMotion } from '@/test/helpers'

import {
  HERO_LEAD,
  HERO_SECTION_ANCHOR_ID,
  HERO_SECTION_TITLE_ID,
  HERO_TITLE_NAME,
} from './constants'
import { HeroSection } from './HeroSection'

/**
 * Integración de {@link HeroSection} con `renderWithMotion` (`BackgroundBoxes` usa Motion).
 *
 * **Responsabilidad:** landmark `section` (ancla), `aria-labelledby` → `h1`, y que la columna
 * componga en orden lead, CTA de CV y lista de estadísticas.
 *
 * Contrato fino por subcomponente (CTA, título, stats): `HeroTitle.test.tsx`, `HeroCvCta.test.tsx`,
 * `HeroStats.test.tsx`. El lead se valida aquí, no en test unitario aparte.
 */
describe('HeroSection', () => {
  it('expone ancla, aria-labelledby y h1 enlazado al nombre del sitio', () => {
    renderWithMotion(<HeroSection />)

    const section = document.getElementById(HERO_SECTION_ANCHOR_ID)
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('aria-labelledby', HERO_SECTION_TITLE_ID)

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveAttribute('id', HERO_SECTION_TITLE_ID)
    expect(h1).toHaveTextContent(HERO_TITLE_NAME)

    const introHeader = section?.querySelector('header')
    expect(introHeader).toBeTruthy()
    expect(introHeader).toContainElement(h1)
  })

  it('compone lead, enlace al CV y lista de estadísticas en el mismo árbol', () => {
    renderWithMotion(<HeroSection />)

    expect(screen.getByText(HERO_LEAD)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /ver cv.*pdf/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('list', { name: /estadísticas de impacto/i })
    ).toBeInTheDocument()
  })
})
