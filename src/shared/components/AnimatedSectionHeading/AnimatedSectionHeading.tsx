import { m } from 'motion/react'
import { TYPOGRAPHY } from '@/shared/constants/tokens'
import { SectionLabel } from '@/shared/components/SectionLabel'

const MOTION_TITLE = {
  h1: m.h1,
  h2: m.h2,
  h3: m.h3,
} as const

type AnimatedSectionHeadingLevel = keyof typeof MOTION_TITLE

interface AnimatedSectionHeadingProps {
  /** Texto pequeño encima del título (categoría, rótulo). */
  overline: React.ReactNode
  /** Título principal de la sección. */
  title: React.ReactNode
  /**
   * Fragmento con estilo de acento (p. ej. apellido), renderizado tras un espacio.
   * Evita repetir el `<span>` en cada uso.
   */
  titleHighlight?: string
  /** Nivel semántico del heading. Por defecto `h2` si ya existe `h1` en la página. */
  titleAs?: AnimatedSectionHeadingLevel
  /** `id` del heading (p. ej. para `aria-labelledby` de la sección). */
  titleId?: string
  /** Clases del contenedor (p. ej. max-width, márgenes). */
  className?: string
}

/**
 * Encabezado de sección: overline, título (motion `h1`/`h2`/`h3`) y regla inferior,
 * animados al entrar en viewport.
 *
 * @example
 * ```tsx
 * <AnimatedSectionHeading
 *   overline="Mis"
 *   title="Proyectos"
 *   titleId="projects-section-heading"
 * />
 * ```
 */
export function AnimatedSectionHeading({
  overline,
  title,
  titleHighlight,
  titleAs = 'h2',
  titleId,
  className,
}: AnimatedSectionHeadingProps) {
  const MotionTitle = MOTION_TITLE[titleAs]
  const hasHighlight = Boolean(titleHighlight?.length)
  const titleContent = hasHighlight ? (
    <>
      {title} <span className="text-information-base">{titleHighlight}</span>
    </>
  ) : (
    title
  )

  return (
    <div className={className}>
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel variant="rule">{overline}</SectionLabel>
      </m.div>
      <MotionTitle
        id={titleId}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={TYPOGRAPHY.title.section}
      >
        {titleContent}
      </MotionTitle>
      <m.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="bg-information-base mt-2.5 h-0.5 w-16 origin-left"
        aria-hidden
      />
    </div>
  )
}
