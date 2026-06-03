/**
 * Tests para `orderSkillTagsByVariant` — función de comparación para ordenar badges del stack.
 *
 * @fileoverview Valida el orden estable dominio → proficiente → familiar y el desempate
 * alfabético por `label` en locale español dentro de una misma variante.
 * @remarks Test unitario puro — sin DOM ni Testing Library. Usa `Array.toSorted` con la función
 * bajo prueba directamente, sin pasar por ningún componente React.
 */
import { describe, expect, it } from 'vitest'

import { orderSkillTagsByVariant } from './orderSkillTagsByVariant'
import { SKILL_TAG_VARIANT } from '../types'

/**
 * Casos cubiertos:
 * - Orden estable por variante de dominio (`dominio` → `proficiente` → `familiar`)
 * - Desempate alfabético por `label` en locale español dentro de una misma variante
 */
describe('orderSkillTagsByVariant', () => {
  it('ordena dominio antes que proficiente antes que familiar', () => {
    const tags = [
      { label: 'Figma', variant: SKILL_TAG_VARIANT.FAMILIAR },
      { label: 'React.js', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'Framer Motion', variant: SKILL_TAG_VARIANT.PROFICIENTE },
    ] as const

    const result = tags.toSorted(orderSkillTagsByVariant)
    expect(result.map((t) => t.variant)).toEqual([
      SKILL_TAG_VARIANT.DOMINIO,
      SKILL_TAG_VARIANT.PROFICIENTE,
      SKILL_TAG_VARIANT.FAMILIAR,
    ])
  })

  it('desempata por label alfabético en español', () => {
    const tags = [
      { label: 'TypeScript', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'CSS3', variant: SKILL_TAG_VARIANT.DOMINIO },
    ] as const

    const result = tags.toSorted(orderSkillTagsByVariant)
    expect(result.map((t) => t.label)).toEqual(['CSS3', 'TypeScript'])
  })
})
