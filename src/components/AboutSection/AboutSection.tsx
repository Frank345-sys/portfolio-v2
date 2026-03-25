import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import {
  AboutBio,
  AboutValues,
  AboutSkills,
  AboutExperience,
  AboutAcademic,
  AboutCerts,
} from './subcomponents'

/**
 * Sección "Sobre mí" del portfolio: hero, bio, valores, skills, experiencia, formación académica y certificaciones.
 * Refactorizado en subcomponentes bajo `./subcomponents`; datos estáticos en `./constants`, tipos en `./types`.
 *
 * @example
 * ```tsx
 * <AboutSection />
 * ```
 */
export function AboutSection() {
  // bg-bg-white en <section> → cubre borde a borde del viewport
  // LAYOUT.section.default → padding vertical de la sección completa
  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-section-heading"
      className={cn('bg-bg-white w-full', LAYOUT.section.default)}
    >
      {/* container.full → max-w-7xl + padding horizontal responsive */}
      <div className={cn(LAYOUT.container.full, LAYOUT.px)}>
        {/* spacing.large → gap entre sub-bloques dentro de la sección */}
        <div className={cn(LAYOUT.spacing.large, LAYOUT.container.narrow)}>
          {/* Bio */}
          <AboutBio />
          {/* Values */}
          <AboutValues />
          {/* Skills */}
          <AboutSkills />
          {/* Experience */}
          <AboutExperience />
          {/* Academic */}
          <AboutAcademic />
          {/* Certs */}
          <AboutCerts />
        </div>
      </div>
    </section>
  )
}
