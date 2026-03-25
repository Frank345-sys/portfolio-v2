import { SectionLabel } from '@/shared/components/SectionLabel'
import { Legend } from '@/shared/components/Legend'
import { TimelineItem } from '@/shared/components/TimelineItem'
import { ABOUT_EXPERIENCE } from '../constants'
import { LAYOUT } from '@/shared/constants/tokens'

const EXPERIENCE_LEGEND_ITEMS = [
  {
    id: 'tech',
    label: 'Área/tecnología',
    dotClassName: 'bg-bg-subtle',
  },
  {
    id: 'impact',
    label: 'Impacto positivo',
    dotClassName: 'bg-success-base',
  },
  {
    id: 'learned',
    label: 'Conocimientos/tecnologías adquiridas',
    dotClassName: 'bg-information-base',
  },
] as const

/**
 * Bloque de experiencia profesional dentro de la AboutSection.
 * Muestra una leyenda para los tipos de chips y una lista de `TimelineItem`
 * alimentados desde `ABOUT_EXPERIENCE`.
 */
export function AboutExperience() {
  return (
    <div className={LAYOUT.spacing.compact}>
      <SectionLabel as="h3">Experiencia</SectionLabel>
      <Legend
        items={[...EXPERIENCE_LEGEND_ITEMS]}
        ariaLabel="Significado de los chips de experiencia"
      />
      <ol aria-label="Experiencia profesional">
        {ABOUT_EXPERIENCE.map((item) => (
          <TimelineItem
            key={`${item.role}-${item.company}`}
            {...item}
            accent="information"
          />
        ))}
      </ol>
    </div>
  )
}
