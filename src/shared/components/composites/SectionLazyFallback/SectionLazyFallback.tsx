/**
 * Suspense fallback con esqueletos alineados a cada sección lazy del portfolio.
 *
 * @module shared/components/SectionLazyFallback/SectionLazyFallback
 * @fileoverview Implementación del archivo `SectionLazyFallback.tsx` dentro de `shared/components/SectionLazyFallback`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */
import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { AboutSectionSkeleton } from './subcomponents/AboutSectionSkeleton'
import { ContactSectionSkeleton } from './subcomponents/ContactSectionSkeleton'
import { FooterSectionSkeleton } from './subcomponents/FooterSectionSkeleton'
import { HeroSectionSkeleton } from './subcomponents/HeroSectionSkeleton/HeroSectionSkeleton'
import { ProjectsSectionSkeleton } from './subcomponents/ProjectsSectionSkeleton'

/**
 * Variante de layout: debe coincidir con la sección que se importa con `React.lazy`.
 */
type SectionLazyFallbackVariant =
  | 'hero'
  | 'about'
  | 'projects'
  | 'contact'
  | 'footer'

interface SectionLazyFallbackProps {
  /**
   * Nombre accesible del estado de carga (p. ej. “Cargando sección Proyectos”).
   * Se expone como `aria-label` del landmark `<section role="status">`.
   */
  ariaLabel: string
  /** Qué bloque visual mostrar mientras resuelve el chunk. */
  variant: SectionLazyFallbackVariant
}

/**
 * Contenedor `<section role="status">` para usar como `fallback` de `React.Suspense` alrededor de secciones `lazy()`.
 *
 * @remarks
 * Las variantes `hero` y `footer` no aplican `LAYOUT.section.default` ni `min-h` del shell de página:
 * ocupan layouts propios (viewport del hero vs. pie).
 */
export function SectionLazyFallback({
  ariaLabel,
  variant,
}: SectionLazyFallbackProps) {
  if (variant === 'hero') {
    return (
      <section
        role="status"
        aria-busy="true"
        aria-live="polite"
        aria-label={ariaLabel}
      >
        <HeroSectionSkeleton />
      </section>
    )
  }

  if (variant === 'footer') {
    return (
      <section
        role="status"
        aria-busy="true"
        aria-live="polite"
        aria-label={ariaLabel}
      >
        <FooterSectionSkeleton />
      </section>
    )
  }

  return (
    <section
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label={ariaLabel}
      className={cn(
        LAYOUT.container.full,
        LAYOUT.section.default,
        'min-h-[min(70vh,42rem)] md:min-h-[min(72vh,48rem)]'
      )}
    >
      {variant === 'about' ? <AboutSectionSkeleton /> : null}
      {variant === 'projects' ? <ProjectsSectionSkeleton /> : null}
      {variant === 'contact' ? <ContactSectionSkeleton /> : null}
    </section>
  )
}
