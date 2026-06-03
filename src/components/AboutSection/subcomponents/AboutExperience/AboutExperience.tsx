/**
 * Pieza de interfaz del portfolio (`AboutExperience`).
 *
 * @fileoverview Implementación del archivo `AboutExperience.tsx` dentro de `components/AboutSection/subcomponents/AboutExperience`; ver exports para la API pública.
 * @remarks Leyenda homologada con `AboutAcademic` vía `ABOUT_EXPERIENCE_LEGEND_ITEMS`.
 */
import { Legend } from '@/shared/components/primitives/Legend'
import { SectionSubtitle } from '@/shared/components/primitives/SectionSubtitle'
import { TimelineItem } from '@/shared/components/primitives/TimelineItem'
import { LAYOUT } from '@/shared/constants/tokens'

import {
  ABOUT_EXPERIENCE,
  ABOUT_EXPERIENCE_HEADING_ID,
  ABOUT_EXPERIENCE_LEGEND_ITEMS,
} from './constants'

/**
 * @module components/AboutSection/subcomponents/AboutExperience/AboutExperience
 *
 * Experiencia laboral: leyenda de chips y lista de {@link TimelineItem} (`AboutTimelineEntry`).
 *
 * @example
 * ```tsx
 * <AboutExperience />
 * ```
 * @see {@link ABOUT_EXPERIENCE} para los datos del timeline
 * @see {@link ABOUT_EXPERIENCE_LEGEND_ITEMS} para la leyenda de chips
 */
export function AboutExperience() {
  return (
    <section
      aria-labelledby={ABOUT_EXPERIENCE_HEADING_ID}
      className={LAYOUT.spacing.default}
    >
      <SectionSubtitle id={ABOUT_EXPERIENCE_HEADING_ID}>
        Experiencia
      </SectionSubtitle>
      <div className={LAYOUT.spacing.compact}>
        <Legend
          items={ABOUT_EXPERIENCE_LEGEND_ITEMS}
          aria-label="Significado de los chips del timeline"
        />
        <ol aria-label="Experiencia profesional">
          {ABOUT_EXPERIENCE.map((item) => (
            <TimelineItem key={`${item.heading}-${item.company}`} {...item} />
          ))}
        </ol>
      </div>
    </section>
  )
}
