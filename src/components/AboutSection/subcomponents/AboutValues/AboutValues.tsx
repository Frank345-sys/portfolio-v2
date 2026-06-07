/**
 * Pieza de interfaz del portfolio (`AboutValues`).
 *
 * @fileoverview Implementación del archivo `AboutValues.tsx` dentro de `components/AboutSection/subcomponents/AboutValues`; ver exports para la API pública.
 * @remarks `ValueCard` usa `useId` para `aria-labelledby`; rejilla (`LAYOUT.grid.cols3`) de `<article>` por valor.
 */
import { useId } from 'react'

import { SectionSubtitle } from '@/shared/components/primitives/SectionSubtitle'
import { TYPOGRAPHY, LAYOUT, CARD } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { ABOUT_VALUES, ABOUT_VALUES_HEADING_ID } from './constants'

import type { AboutValue } from './types'

/**
 * Tarjeta de un valor (datos desde `ABOUT_VALUES`).
 * `<article>` con `aria-labelledby` al `h4` del nombre.
 *
 * @example
 * ```tsx
 * <ValueCard name="Claridad" desc="Código legible" detail="Cada decisión tiene su por qué." />
 * ```
 */
function ValueCard({ name, desc, detail }: AboutValue) {
  // ID estable generado por useId para el aria-labelledby del <article>
  const titleId = useId()

  return (
    <article className={CARD.surface.weak} aria-labelledby={titleId}>
      <div className={CARD.layout.header}>
        <div className="space-y-1 text-center md:text-left">
          <h4 id={titleId} className={TYPOGRAPHY.title.small}>
            {name}
          </h4>
          <p className={cn(TYPOGRAPHY.title.xsmall, 'text-information-base')}>
            {desc}
          </p>
        </div>
      </div>
      <p className={TYPOGRAPHY.paragraph.secondary}>{detail}</p>
    </article>
  )
}

/**
 * @module components/AboutSection/subcomponents/AboutValues/AboutValues
 *
 * Bloque «Cómo trabajo»: rejilla de tarjetas desde `ABOUT_VALUES`.
 *
 * @example
 * ```tsx
 * <AboutValues />
 * ```
 * @see {@link ABOUT_VALUES} para los datos de cada tarjeta
 * @see {@link ValueCard} para el componente de tarjeta individual
 */
export function AboutValues() {
  return (
    <section
      aria-labelledby={ABOUT_VALUES_HEADING_ID}
      className={LAYOUT.spacing.default}
    >
      <SectionSubtitle id={ABOUT_VALUES_HEADING_ID}>
        Cómo trabajo
      </SectionSubtitle>
      <div className={cn(LAYOUT.grid.cols3, 'auto-rows-fr')}>
        {ABOUT_VALUES.map((item) => (
          <ValueCard key={item.name} {...item} />
        ))}
      </div>
    </section>
  )
}
