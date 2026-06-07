/**
 * Tests para `AboutSection` — contrato de landmark y accesibilidad del compositor Sobre mí.
 *
 * @fileoverview Valida ancla de sección, nombre accesible del landmark vía `aria-labelledby`
 * y presencia de `h3` por cada subbloque. Integración ligera con Motion real.
 * @remarks Usa `renderWithMotion`; mockea `IntersectionObserver` porque `AboutHero` usa
 * animaciones triggeradas por scroll. Los contratos internos de cada subbloque
 * se cubren en `./subcomponents/**\/*.test.tsx`.
 */
import { screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { renderWithMotion, runAxeAudit } from '@/test/helpers'

import { AboutSection } from './AboutSection'
import {
  ABOUT_SECTION_ANCHOR_ID,
  ABOUT_SECTION_TITLE_ID,
  SITE_PROFILE,
} from './constants'

// Preserva el IntersectionObserver nativo para restaurarlo en afterEach
// y evitar contaminación entre tests.
const ioReserve = globalThis.IntersectionObserver

/**
 * Integración ligera del compositor **Sobre mí** con Motion y mock de `IntersectionObserver`
 * (misma idea que ContactSection — heading animado en el hero).
 *
 * **Cobertura**
 * - Landmark: `#${ABOUT_SECTION_ANCHOR_ID}`, `aria-labelledby` → `h2` (`ABOUT_SECTION_TITLE_ID`)
 * - Nombre accesible de la región coherente con el `h2` del hero ({@link SITE_PROFILE})
 * - Presencia de `h3` por subbloque (detalle en subcomponentes)
 *
 * @see `*.test.tsx` en `./subcomponents/**` para contratos por bloque.
 */
describe('AboutSection', () => {
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
    globalThis.IntersectionObserver = ioReserve
  })

  it('tiene la sección con id sobre-mi (ancla de la página)', () => {
    renderWithMotion(<AboutSection />)
    expect(
      screen.getByRole('region', {
        name(name) {
          return (
            name.includes(SITE_PROFILE.firstName) &&
            name.includes(SITE_PROFILE.lastName)
          )
        },
      })
    ).toHaveAttribute('id', ABOUT_SECTION_ANCHOR_ID)
  })

  it('expone nombre accesible del landmark mediante aria-labelledby → h2', () => {
    renderWithMotion(<AboutSection />)
    const region = screen.getByRole('region', {
      name(name) {
        return (
          name.includes(SITE_PROFILE.firstName) &&
          name.includes(SITE_PROFILE.lastName)
        )
      },
    })
    expect(region).toHaveAttribute('id', ABOUT_SECTION_ANCHOR_ID)
    expect(region).toHaveAttribute('aria-labelledby', ABOUT_SECTION_TITLE_ID)
    expect(document.getElementById(ABOUT_SECTION_TITLE_ID)).toBe(
      screen.getByRole('heading', { level: 2 })
    )
    const titulo = screen.getByRole('heading', { level: 2 })
    expect(titulo.textContent).toContain(SITE_PROFILE.firstName)
    expect(titulo.textContent).toContain(SITE_PROFILE.lastName)
  })

  it('monta cada subbloque con su encabezado de subsección (h3)', () => {
    renderWithMotion(<AboutSection />)
    expect(
      screen.getByRole('heading', { level: 3, name: /quién soy/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: /cómo trabajo/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: /^formación$/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: /experiencia/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: /stack técnico/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: /certificaciones/i })
    ).toBeInTheDocument()
  })

  it('axe: sección Sobre mí sin violaciones conocidas', async () => {
    const { container } = renderWithMotion(<AboutSection />)
    expect(await runAxeAudit(container)).toHaveNoViolations()
  }, 15_000)
})
