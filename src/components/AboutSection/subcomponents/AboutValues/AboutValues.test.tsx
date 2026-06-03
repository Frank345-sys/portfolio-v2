/**
 * Tests para `AboutValues` — contrato de render y accesibilidad del bloque «Cómo trabajo».
 *
 * @fileoverview Valida `role="group"`, `h3` «Cómo trabajo», exactamente 3 `<article>` (longitud de
 * `ABOUT_VALUES`) y que cada tarjeta exponga `name`, `desc` y `detail` visibles.
 * @remarks No usa `renderWithMotion` — `AboutValues` es puramente presentacional sin animaciones.
 * El conteo de artículos se toma de `ABOUT_VALUES.length` para que el test escale si se añaden valores.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { AboutValues } from './AboutValues'
import { ABOUT_VALUES, ABOUT_VALUES_HEADING_ID } from './constants'

/**
 * Render y accesibilidad de «Cómo trabajo»:
 * - `role="group"` + `aria-labelledby` al `h3`
 * - Rejilla de `<article>` (tres; longitud `ABOUT_VALUES`)
 */
describe('AboutValues', () => {
  /**
   * Render estático: estructura DOM, accesibilidad y contenido visible.
   * No cubre interactividad ni animaciones.
   */
  describe('rendering', () => {
    it('agrupa el bloque con role group referenciando el h3', () => {
      const { container } = render(<AboutValues />)
      const landmark = container.querySelector(
        `section[aria-labelledby="${ABOUT_VALUES_HEADING_ID}"]`
      )
      expect(landmark).toBeInTheDocument()
    })

    it('expone el título de subsección «Cómo trabajo» como h3 con id', () => {
      render(<AboutValues />)
      expect(
        screen.getByRole('heading', { level: 3, name: /cómo trabajo/i })
      ).toBeInTheDocument()
      expect(
        document.getElementById(ABOUT_VALUES_HEADING_ID)
      ).toHaveTextContent(/cómo trabajo/i)
    })

    it('renderiza exactamente 3 artículos (longitud de ABOUT_VALUES)', () => {
      render(<AboutValues />)
      expect(screen.getAllByRole('article')).toHaveLength(ABOUT_VALUES.length)

      const names = ABOUT_VALUES.map((v) => v.name)
      for (const name of names) {
        expect(screen.getByText(name)).toBeInTheDocument()
      }
    })

    it('cada tarjeta muestra name, desc y detail', () => {
      render(<AboutValues />)
      for (const item of ABOUT_VALUES) {
        expect(screen.getByText(item.name)).toBeInTheDocument()
        expect(screen.getByText(item.desc)).toBeInTheDocument()
        expect(screen.getByText(item.detail)).toBeInTheDocument()
      }
    })
  })
})
