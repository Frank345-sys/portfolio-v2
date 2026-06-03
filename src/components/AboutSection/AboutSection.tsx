/**
 * Compositor de la sección "Sobre mí" del portfolio (`AboutSection`).
 *
 * @fileoverview Implementación del archivo `AboutSection.tsx` dentro de `components/AboutSection`; ver exports para la API pública.
 * @remarks Orden narrativo: hero → bio → valores → trazabilidad (académico → experiencia → stack) → certificaciones.
 * Datos en `./constants`; tipos en `./types`.
 */
import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { ABOUT_SECTION_ANCHOR_ID, ABOUT_SECTION_TITLE_ID } from './constants'
import { AboutAcademic } from './subcomponents/AboutAcademic/AboutAcademic'
import { AboutBio } from './subcomponents/AboutBio/AboutBio'
import { AboutCerts } from './subcomponents/AboutCerts/AboutCerts'
import { AboutExperience } from './subcomponents/AboutExperience/AboutExperience'
import { AboutHero } from './subcomponents/AboutHero/AboutHero'
import { AboutSkills } from './subcomponents/AboutSkills/AboutSkills'
import { AboutValues } from './subcomponents/AboutValues/AboutValues'

/**
 * @module components/AboutSection/AboutSection
 *
 * Landmark `<section id="sobre-mi">` con subbloques bajo `./subcomponents`.
 *
 * @example
 * ```tsx
 * <AboutSection />
 * ```
 * @see {@link ABOUT_SECTION_ANCHOR_ID} para el id del landmark
 * @see {@link ABOUT_SECTION_TITLE_ID} para el id del h2 etiquetador
 */
export function AboutSection() {
  return (
    <section
      id={ABOUT_SECTION_ANCHOR_ID}
      aria-labelledby={ABOUT_SECTION_TITLE_ID}
      className={cn(LAYOUT.container.full, LAYOUT.section.default)}
    >
      <div
        className={cn(LAYOUT.container.narrow, LAYOUT.spacing.large, LAYOUT.px)}
      >
        {/* Intro */}
        <AboutHero />
        {/* Quién soy */}
        <AboutBio />
        {/* Cómo trabajo */}
        <AboutValues />
        {/* Formación */}
        <AboutAcademic />
        {/* Experiencia */}
        <AboutExperience />
        {/* Stack técnico */}
        <AboutSkills />
        {/* Certificaciones */}
        <AboutCerts />
      </div>
    </section>
  )
}
