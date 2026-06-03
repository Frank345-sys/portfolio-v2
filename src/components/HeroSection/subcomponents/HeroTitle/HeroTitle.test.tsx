/**
 * Tests para components/HeroSection/subcomponents/HeroTitle/HeroTitle.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HeroTitle } from './HeroTitle'
import {
  HERO_SECTION_TITLE_ID,
  HERO_TITLE_NAME,
  HERO_TITLE_ROLE,
  HERO_TITLE_STACK,
} from '../../constants'

/**
 * Contrato unitario de {@link HeroTitle}: `<header>` con `h1` (`HERO_SECTION_TITLE_ID`), rol y stack
 * alineados a `HERO_TITLE_*` en `../../constants.ts`.
 *
 * **Cobertura:** `h1` con `id`; nombre visible; rol; stack visible (prefijo “Stack principal:” en `sr-only`).
 *
 * **No cubre:** `<section id>` ni `aria-labelledby` del padre.
 *
 * Integración del bloque hero: `HeroSection.test.tsx` (directorio `HeroSection`).
 */
describe('HeroTitle', () => {
  it('presenta nombre, rol y stack con `h1` etiquetando la sección', () => {
    render(<HeroTitle />)

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveAttribute('id', HERO_SECTION_TITLE_ID)
    expect(h1).toHaveTextContent(HERO_TITLE_NAME)
    expect(screen.getByText(HERO_TITLE_ROLE)).toBeInTheDocument()
    expect(screen.getByText(HERO_TITLE_STACK)).toBeInTheDocument()
  })
})
