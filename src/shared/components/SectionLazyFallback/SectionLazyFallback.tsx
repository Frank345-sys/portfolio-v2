/**
 * Suspense fallback con esqueletos alineados a cada sección lazy del portfolio.
 *
 * @module shared/components/SectionLazyFallback/SectionLazyFallback
 */
import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import {
  AboutSectionSkeleton,
  ContactSectionSkeleton,
  FooterSectionSkeleton,
  ProjectsSectionSkeleton,
} from './subcomponents'

/**
 * Variante de layout: debe coincidir con la sección que se importa con `React.lazy`.
 */
type SectionLazyFallbackVariant = 'about' | 'projects' | 'contact' | 'footer'

interface SectionLazyFallbackProps {
  /**
   * Nombre accesible del estado de carga (p. ej. “Cargando sección Proyectos”).
   * Se expone como `aria-label` del `role="status"`.
   */
  ariaLabel: string
  /** Qué bloque visual mostrar mientras resuelve el chunk. */
  variant: SectionLazyFallbackVariant
}

/**
 * Contenedor `role="status"` para usar como `fallback` de `React.Suspense` alrededor de secciones `lazy()`.
 *
 * @remarks
 * La variante `footer` no aplica `LAYOUT.section.default` ni `min-h` del `<main>`,
 * porque el pie tiene ritmo vertical propio.
 */
export function SectionLazyFallback({
  ariaLabel,
  variant,
}: SectionLazyFallbackProps) {
  if (variant === 'footer') {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-live="polite"
        aria-label={ariaLabel}
      >
        <FooterSectionSkeleton />
      </div>
    )
  }

  return (
    <div
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
    </div>
  )
}
