/**
 * @fileoverview Párrafo lead del hero: texto de presentación secundario bajo {@link HeroTitle}.
 *
 * @remarks
 * Renderiza el copy definido en {@link HERO_LEAD} (`../constants.ts`). Componente puramente
 * presentacional: sin estado, efectos ni props. Se monta solo desde {@link HeroSection}, debajo del
 * `<header>` del título en la misma columna.
 *
 * @example
 * ```tsx
 * // Uso interno — no instanciar fuera de HeroSection
 * <HeroLead />
 * ```
 */

import { LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { HERO_LEAD } from '../constants'

/**
 * @module components/HeroSection/subcomponents/HeroLead/HeroLead
 *
 * Párrafo lead del hero, **debajo del `<header>`** que define **`HeroTitle`** en la columna del hero.
 */
export function HeroLead() {
  return (
    <p className={cn(TYPOGRAPHY.paragraph.lead, LAYOUT.prose.lg)}>
      {HERO_LEAD}
    </p>
  )
}
