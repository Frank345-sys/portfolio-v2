/**
 * Tests para components/HeroSection/subcomponents/HeroStats/HeroStats.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HERO_STATS } from './constants'
import { HeroStats } from './HeroStats'

/**
 * Contrato unitario de {@link HeroStats}: lista con `aria-label` fijo; datos en {@link HERO_STATS}.
 *
 * **Cobertura:** landmark de lista por nombre accesible; cada `label` y `value` dentro del `<ul>`.
 *
 * **No cubre:** gaps responsive ni tokens de tipografía por celda.
 *
 * Integración del bloque hero: `HeroSection.test.tsx` (directorio `HeroSection`).
 */
describe('HeroStats', () => {
  it('expone cada estadística bajo una lista nominalizada', () => {
    render(<HeroStats />)

    const list = screen.getByRole('list', {
      name: /estadísticas de impacto/i,
    })
    expect(list).toBeInTheDocument()

    for (const { value, label } of HERO_STATS) {
      expect(within(list).getByText(label)).toBeInTheDocument()
      expect(within(list).getByText(value)).toBeInTheDocument()
    }
  })
})
