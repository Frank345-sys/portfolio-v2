/**
 * Pieza de interfaz del portfolio (`HeroTitle`).
 *
 * @fileoverview Implementación del archivo `HeroTitle.tsx` dentro de `components/HeroSection/subcomponents/HeroTitle`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import {
  HERO_SECTION_TITLE_ID,
  HERO_TITLE_NAME,
  HERO_TITLE_ROLE,
  HERO_TITLE_STACK,
} from '../../constants'

/**
 * @module components/HeroSection/subcomponents/HeroTitle/HeroTitle
 *
 * Introducción del hero: raíz **`<header>`** con **`h1`** (nombre visible, `HERO_SECTION_TITLE_ID`), rol y línea de stack.
 *
 * Se monta como **primer bloque** dentro del `<section id="inicio">` de **`HeroSection`**; en la misma columna,
 * debajo, van lead, CTA y estadísticas (`../HeroSection.tsx`).
 */
export function HeroTitle() {
  return (
    <header className="flex flex-col gap-1 lg:gap-2">
      <h1 id={HERO_SECTION_TITLE_ID} className={TYPOGRAPHY.title.hero}>
        {HERO_TITLE_NAME}
      </h1>
      <p className={cn(TYPOGRAPHY.title.subsection, 'text-information-base')}>
        {HERO_TITLE_ROLE}
      </p>
      <p className={cn(TYPOGRAPHY.paragraph.small, 'text-text-subtle')}>
        <span className="sr-only">Stack principal: </span>
        {HERO_TITLE_STACK}
      </p>
    </header>
  )
}
