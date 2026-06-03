/**
 * Pieza de interfaz del portfolio (`AnimatedSectionHeading`).
 *
 * @fileoverview Implementación del archivo `AnimatedSectionHeading.tsx` dentro de `shared/components/primitives/AnimatedSectionHeading`.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { m } from 'motion/react'

import { TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

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
  /** `id` del heading para `aria-labelledby` en el `<section>` padre. */
  titleId?: string
  /** Clases del contenedor (p. ej. max-width, márgenes). */
  className?: string
}

/**
 * @module shared/components/primitives/AnimatedSectionHeading/AnimatedSectionHeading
 *
 * Encabezado de sección animado: overline, título principal
 * con highlight opcional, y regla inferior decorativa.
 * Siempre renderiza el título como `<h2>` — semántica fija, no configurable.
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
  titleId,
  className,
}: AnimatedSectionHeadingProps) {
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
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={cn(TYPOGRAPHY.title.xsmall, 'font-bold tracking-widest')}
      >
        {overline}
      </m.p>

      <m.h2
        id={titleId}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={TYPOGRAPHY.title.section}
      >
        {titleContent}
      </m.h2>

      <m.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="bg-information-base mt-4 h-0.5 w-16 origin-left"
        aria-hidden
      />
    </div>
  )
}
