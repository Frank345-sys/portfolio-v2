import { BackgroundBoxes } from '@/shared/components/BackgroundBoxes'
import {
  HERO_STACK_HIGHLIGHT,
  SITE_DISPLAY_NAME,
  SITE_PROFILE,
} from '@/shared/constants/siteProfile'
import { BUTTON, LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { DownloadIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

/** CV en `public/` — mantener sincronizado con el archivo desplegado. */
const CV_HREF = `${import.meta.env.BASE_URL}Francisco_Gonzalez_Frontend_Developer_2026.pdf`

const HERO_STATS = [
  { value: '2+', label: 'Años en frontend' },
  { value: '5+', label: 'Casos en portfolio' },
  { value: '+14', label: 'Herramientas y prácticas' },
] as const

/**
 * Sección hero principal del portfolio.
 * Muestra nombre, rol, descripción, CTA de CV y stats de impacto.
 * Envuelve el contenido en `BackgroundBoxes` (parallax de iconos).
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
        className={cn(
          LAYOUT.section.hero,
          'flex h-full w-full items-center justify-center'
        )}
        aria-labelledby="hero-heading"
      >
        <div className={cn(LAYOUT.container.narrow, LAYOUT.px)}>
          <div className="flex flex-col items-center justify-center gap-6 text-center sm:gap-8">
            {/* Título: nombre + rol del desarrollador */}
            <div className="flex flex-col gap-1 sm:gap-2">
              <h1 id="hero-heading" className={TYPOGRAPHY.title.hero}>
                {SITE_DISPLAY_NAME}
              </h1>
              <p
                className={cn(
                  TYPOGRAPHY.title.subsection,
                  'text-information-base'
                )}
              >
                {SITE_PROFILE.role}
              </p>
              <p
                className={cn(
                  TYPOGRAPHY.paragraph.small,
                  'text-text-subtle max-w-xl'
                )}
              >
                <span className="sr-only">Stack principal: </span>
                {HERO_STACK_HIGHLIGHT}
              </p>
            </div>

            {/* Descripción del rol */}
            <p className={cn(TYPOGRAPHY.paragraph.lead, LAYOUT.prose.lg)}>
              Desarrollo interfaces web rápidas, limpias y accesibles,
              optimizando rendimiento, integración con APIs y experiencia de
              usuario.
            </p>

            {/* CTA de descarga de CV */}
            <a
              href={CV_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={BUTTON.special.cta}
              aria-label={`Ver CV de ${SITE_DISPLAY_NAME} (PDF, se abre en una pestaña nueva)`}
            >
              Ver CV (PDF)
              <DownloadIcon aria-hidden="true" />
            </a>

            {/* Stats de impacto */}
            <ul
              className="flex list-none flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8"
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
