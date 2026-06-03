/**
 * Tests para components/HeroSection/subcomponents/HeroCvCta/HeroCvCta.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HeroCvCta } from './HeroCvCta'
import { HERO_CV_HREF, HERO_TITLE_NAME } from '../../constants'

/**
 * Contrato unitario de {@link HeroCvCta}: enlace al PDF ({@link HERO_CV_HREF}), nueva pestaña con
 * `rel` seguro, `aria-label` con {@link HERO_TITLE_NAME} y copy visible del CTA.
 *
 * **Cobertura:** `href`, `target`, `rel`, `aria-label`, texto visible.
 *
 * **No cubre:** `BUTTON.special.cta` ni el ícono (`aria-hidden`).
 *
 * Integración del bloque hero: `HeroSection.test.tsx` (directorio `HeroSection`).
 */
describe('HeroCvCta', () => {
  it('expone el CTA como enlace seguro al PDF con nombre accesible y copy visible', () => {
    render(<HeroCvCta />)

    const link = screen.getByRole('link', { name: /ver cv.*pdf/i })
    expect(link).toHaveAttribute('href', HERO_CV_HREF)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute(
      'aria-label',
      `Ver CV de ${HERO_TITLE_NAME} (PDF, se abre en una pestaña nueva)`
    )
    expect(link).toHaveTextContent('Ver CV (PDF)')
  })
})
