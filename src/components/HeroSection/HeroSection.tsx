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
 * Envuelve el contenido en `BackgroundBoxes` (parallax de iconos).
 *
 * @returns {JSX.Element} Bloque hero principal con título, CTA y métricas.
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
        id="inicio"
        className={cn(LAYOUT.section.hero, 'h-full w-full md:h-auto md:w-auto')}
        aria-labelledby="hero-heading"
      >
        <div className={cn(LAYOUT.container.narrow, LAYOUT.px)}>
          <div
            className={cn(
              LAYOUT.flex.center,
              'flex-col gap-6 text-center sm:gap-8'
            )}
          >
            {/* Título: nombre + rol del desarrollador */}
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

            {/* Descripción del rol */}
            <p className={cn(TYPOGRAPHY.paragraph.lead, 'max-w-2xl')}>
              Especializado en construir interfaces modernas y accesibles con
              React, TypeScript y las mejores herramientas del ecosistema web.
            </p>

            {/* CTA de descarga de CV */}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={BUTTON.special.cta}
              aria-label="Abrir CV de Frank González en nueva pestaña"
            >
              Descargar CV
              <DownloadIcon aria-hidden="true" />
            </a>

            {/* Stats de impacto */}
            <ul
              className={cn(
                LAYOUT.flex.center,
                'list-none flex-wrap gap-4 sm:gap-6 md:gap-8'
              )}
              aria-label="Estadísticas de impacto"
            >
              {HERO_STATS.map(({ value, label }) => (
                <li key={label} className={'flex flex-col items-center gap-1'}>
                  <span className={TYPOGRAPHY.special.stat}>{value}</span>
                  <span
                    className={cn(
                      TYPOGRAPHY.label.default,
                      'text-text-strong text-center'
                    )}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </BackgroundBoxes>
  )
}
