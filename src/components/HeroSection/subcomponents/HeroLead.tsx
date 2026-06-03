/**
 * Pieza de interfaz del portfolio (`HeroLead`).
 *
 * @fileoverview Implementación del archivo `HeroLead.tsx` dentro de `components/HeroSection/subcomponents/HeroLead`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { HERO_LEAD } from '../constants'

/**
 * @module components/HeroSection/subcomponents/HeroLead/HeroLead
 *
 * Párrafo lead del hero, **debajo del `<header>`** que define **`HeroTitle`** en la columna del hero;
 * {@link HERO_LEAD} vive en `../../constants.ts`.
 */
export function HeroLead() {
  return (
    <p className={cn(TYPOGRAPHY.paragraph.lead, LAYOUT.prose.lg)}>
      {HERO_LEAD}
    </p>
  )
}
