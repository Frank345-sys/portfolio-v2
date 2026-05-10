import { screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { renderWithMotion } from '@/test/renderWithMotion'

import { CONTACT_SECTION_ANCHOR_ID } from './constants'
import {
  ContactSection,
  CONTACT_MAIN_COLUMN_HEADING_ID,
  CONTACT_SECTION_TITLE_ID,
} from './ContactSection'

const ioReserve = globalThis.IntersectionObserver

/**
 * {@link ContactSection}: integración ligera con Motion y mock de `IntersectionObserver` (p. ej. heading animado).
 *
 * **Cobertura (solo compositor)**
 * - Landmark de sección: `id` de ancla, `aria-labelledby` → `h2` de título
 * - Columna principal: `role="group"`, `h3` sr-only y nombre accesible coherente
 * - Presencia estructural: un `<p>` hijo directo del `group` (lead), `nav` de tarjetas y `aside` (sin repetir copy ni `href`; eso vive en subcomponentes)
 */
describe('ContactSection', () => {
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

  it('usa ancla compartida, encabezado de sección y aria-labelledby coherentes', () => {
    renderWithMotion(<ContactSection />)

    const section = document.getElementById(CONTACT_SECTION_ANCHOR_ID)
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('aria-labelledby', CONTACT_SECTION_TITLE_ID)

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /hablemos de tu próximo paso/i,
    })
    expect(heading).toHaveAttribute('id', CONTACT_SECTION_TITLE_ID)
  })

  it('agrupa columna principal (lead + nav) con heading sr-only', () => {
    renderWithMotion(<ContactSection />)

    const mainColumn = screen.getByRole('group', {
      name: /mensaje introductorio y enlaces para contactarme/i,
    })
    expect(mainColumn).toHaveAttribute(
      'aria-labelledby',
      CONTACT_MAIN_COLUMN_HEADING_ID
    )

    const mainHeading = within(mainColumn).getByRole('heading', { level: 3 })
    expect(mainHeading).toHaveAttribute('id', CONTACT_MAIN_COLUMN_HEADING_ID)
    // jsdom marca muchos `.sr-only` como “visibles” para toBeVisible(); el rect 1×1 de Tailwind sí es estable aquí
    const { width, height } = mainHeading.getBoundingClientRect()
    expect(width <= 1 && height <= 1).toBe(true)
    expect(mainHeading).toHaveTextContent(
      /mensaje introductorio y enlaces para contactarme/i
    )
  })

  it('monta lead (párrafo), navegación de tarjetas dentro de la columna y aside de perfil', () => {
    renderWithMotion(<ContactSection />)

    const mainColumn = screen.getByRole('group', {
      name: /mensaje introductorio y enlaces para contactarme/i,
    })
    expect(mainColumn.querySelectorAll(':scope > p')).toHaveLength(1)
    expect(
      within(mainColumn).getByRole('navigation', {
        name: /enlaces de contacto y perfiles en redes/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('complementary', {
        name: /resumen de perfil y disponibilidad/i,
      })
    ).toBeInTheDocument()
  })
})
