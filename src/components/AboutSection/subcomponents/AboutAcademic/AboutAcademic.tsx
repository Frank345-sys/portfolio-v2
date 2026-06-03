/**
 * Pieza de interfaz del portfolio (`AboutAcademic`).
 *
 * @fileoverview Implementación del archivo `AboutAcademic.tsx` dentro de `components/AboutSection/subcomponents/AboutAcademic`; ver exports para la API pública.
 * @remarks Leyenda homologada con `AboutExperience` vía `ABOUT_ACADEMIC_LEGEND_ITEMS`.
 */
import { Legend } from '@/shared/components/primitives/Legend'
import { SectionSubtitle } from '@/shared/components/primitives/SectionSubtitle'
import { TimelineItem } from '@/shared/components/primitives/TimelineItem'
import { LAYOUT } from '@/shared/constants/tokens'

import {
  ABOUT_ACADEMIC,
  ABOUT_ACADEMIC_HEADING_ID,
  ABOUT_ACADEMIC_LEGEND_ITEMS,
} from './constants'

/**
 * @module components/AboutSection/subcomponents/AboutAcademic/AboutAcademic
 *
 * Formación académica: leyenda de chips y lista de {@link TimelineItem} (`AboutTimelineEntry`).
 *
 * @example
 * ```tsx
 * <AboutAcademic />
 * ```
 * @see {@link ABOUT_ACADEMIC} para los datos del timeline
 * @see {@link ABOUT_ACADEMIC_LEGEND_ITEMS} para la leyenda de chips
 */
export function AboutAcademic() {
  return (
    <section
      aria-labelledby={ABOUT_ACADEMIC_HEADING_ID}
      className={LAYOUT.spacing.default}
    >
      <SectionSubtitle id={ABOUT_ACADEMIC_HEADING_ID}>
        Formación
      </SectionSubtitle>
      <div className={LAYOUT.spacing.compact}>
        <Legend
          items={ABOUT_ACADEMIC_LEGEND_ITEMS}
          aria-label="Significado de los chips del timeline"
        />
        <ol aria-label="Entradas de formación">
          {ABOUT_ACADEMIC.map((item) => (
            <TimelineItem key={`${item.heading}-${item.company}`} {...item} />
          ))}
        </ol>
      </div>
    </section>
  )
}
