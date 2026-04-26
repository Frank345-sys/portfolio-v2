import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import {
  AboutHero,
  AboutBio,
  AboutValues,
  AboutSkills,
  AboutExperience,
  AboutAcademic,
  AboutCerts,
} from './subcomponents'

/**
 * Sección "Sobre mí" del portfolio: hero, bio, valores; luego flujo de trazabilidad
 * (formación académica → experiencia laboral → stack actual); al final, certificaciones.
 * Refactorizado en subcomponentes bajo `./subcomponents`; datos estáticos en `./constants`, tipos en `./types`.
 *
 * @example
 * ```tsx
 * <AboutSection />
 * ```
 */
export function AboutSection() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-section-heading"
      className={cn(LAYOUT.container.full, LAYOUT.section.default)}
    >
      {/* spacing.large → gap entre sub-bloques dentro de la sección */}
      <div
        className={cn(LAYOUT.container.narrow, LAYOUT.spacing.large, LAYOUT.px)}
      >
        {/* Hero */}
        <AboutHero />
        {/* Bio */}
        <AboutBio />
        {/* Values */}
        <AboutValues />
        {/* Formación académica */}
        <AboutAcademic />
        {/* Experiencia */}
        <AboutExperience />
        {/* Stack técnico */}
        <AboutSkills />
        {/* Certs */}
        <AboutCerts />
      </div>
    </section>
  )
}
