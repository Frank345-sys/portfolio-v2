/**
 * Compositor de la sección hero del portfolio (`HeroSection`).
 *
 * @fileoverview Implementación del archivo `HeroSection.tsx` dentro de `components/HeroSection`; ver exports para la API pública.
 * @remarks `BackgroundBoxes` (Motion); `h1` etiquetador en `HeroTitle`.
 */

import { BackgroundBoxes } from '@/shared/components/composites/BackgroundBoxes'
import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { HERO_SECTION_ANCHOR_ID, HERO_SECTION_TITLE_ID } from './constants'
import { HeroCvCta } from './subcomponents/HeroCvCta/HeroCvCta'
import { HeroLead } from './subcomponents/HeroLead'
import { HeroStats } from './subcomponents/HeroStats/HeroStats'
import { HeroTitle } from './subcomponents/HeroTitle/HeroTitle'

/**
 * @module components/HeroSection/HeroSection
 *
 * Sección hero envuelta en **`BackgroundBoxes`** (Motion).
 *
 * **Landmark**
 * - **`<section id={HERO_SECTION_ANCHOR_ID}>`** — ancla de inicio de página.
 * - **`aria-labelledby={HERO_SECTION_TITLE_ID}`** — el nombre accesible de la sección es el **`h1`**
 *   con ese `id`, definido dentro de **`HeroTitle`** (este archivo no declara el `h1`).
 *
 * **Contenido interior** (columna centrada, en orden): **`HeroTitle`**, **`HeroLead`**, **`HeroCvCta`**, **`HeroStats`**.
 * El **`<header>`** semántico (introducción con `h1`, rol y stack) lo aporta **solo** `HeroTitle`; aquí no hay un
 * `<header>` adicional envolviendo toda la sección, para no duplicar el patrón “cabecera de página” fuera del bloque de título.
 *
 * @see `./constants.ts` ({@link HERO_SECTION_ANCHOR_ID}, {@link HERO_SECTION_TITLE_ID})
 * @example
 * ```tsx
 * <HeroSection />
 * ```
 */
export function HeroSection() {
  return (
    <BackgroundBoxes className="max-h-[680px]">
      <section
        id={HERO_SECTION_ANCHOR_ID}
        className="flex h-full w-full items-center justify-center"
        aria-labelledby={HERO_SECTION_TITLE_ID}
      >
        <div className={cn(LAYOUT.container.narrow, LAYOUT.px)}>
          <div className="flex flex-col items-center justify-center gap-6 text-center lg:gap-8">
            {/* Hero Title */}
            <HeroTitle />
            {/* Hero Lead */}
            <HeroLead />
            {/* Hero Cv Cta */}
            <HeroCvCta />
            {/* Hero Stats */}
            <HeroStats />
          </div>
        </div>
      </section>
    </BackgroundBoxes>
  )
}
