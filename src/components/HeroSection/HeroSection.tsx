import { BUTTON, LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import { BackgroundBoxes } from '@/shared/components/BackgroundBoxes'
import DownloadIcon from '@/shared/icons/DownloadIcon'

const HERO_STATS = [
  { value: '+2 años', label: 'Experiencia laboral' },
  { value: '+5', label: 'Proyectos realizados' },
  { value: '+14', label: 'Tecnologías dominadas' },
] as const

/**
 * Sección hero principal del portfolio.
 * Muestra nombre, rol, descripción, CTA de CV y stats de impacto.
 *
 * @example
 * ```tsx
 * <HeroSection />
 * ```
 */
export function HeroSection() {
  return (
    <BackgroundBoxes>
      <section
        className={cn(LAYOUT.section.hero, 'w-full')}
        aria-labelledby="hero-heading"
      >
        <div className={cn(LAYOUT.container.narrow, LAYOUT.hero.centered)}>
          <div className={cn(LAYOUT.hero.stack, 'items-center')}>
            {/* Título: nombre + rol */}
            <div className="flex flex-col gap-1 sm:gap-2">
              <h1 id="hero-heading" className={TYPOGRAPHY.title.hero}>
                Frank González
              </h1>
              <p
                className={cn(
                  TYPOGRAPHY.title.subsection,
                  'text-information-base'
                )}
              >
                Frontend Developer
              </p>
            </div>

            {/* Descripción */}
            <p className={cn(TYPOGRAPHY.paragraph.lead, 'max-w-2xl')}>
              Especializado en construir interfaces modernas y accesibles con
              React, TypeScript y las mejores herramientas del ecosistema web.
            </p>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(BUTTON.special.cta, BUTTON.size.responsive)}
              aria-label="Abrir CV de Frank González en nueva pestaña"
            >
              Descargar CV
              <DownloadIcon aria-hidden="true" />
            </a>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:flex-nowrap md:gap-8">
              {HERO_STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className={TYPOGRAPHY.special.stat}>{value}</span>
                  <span
                    className={cn(TYPOGRAPHY.label.overline, 'text-center')}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </BackgroundBoxes>
  )
}
