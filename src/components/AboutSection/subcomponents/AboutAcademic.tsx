import { Legend } from '@/shared/components/Legend'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { TimelineItem } from '@/shared/components/TimelineItem'
import { LAYOUT } from '@/shared/constants/tokens'

import { ABOUT_ACADEMIC } from '../constants'

const ACADEMIC_LEGEND_ITEMS = [
  {
    id: 'conocimientos-formacion',
    label: 'Adquiridos en formación',
    dotClassName: 'bg-feature-base',
  },
] as const

/**
 * Bloque de formación académica dentro de la AboutSection.
 * Renderiza un título de sección, una leyenda accesible para los chips y
 * una lista de elementos en timeline a partir de `ABOUT_ACADEMIC`.
 */
export function AboutAcademic() {
  return (
    <div className={LAYOUT.spacing.default}>
      <SectionLabel as="h3">Formación académica</SectionLabel>
      <div className={LAYOUT.spacing.compact}>
        <Legend
          items={[...ACADEMIC_LEGEND_ITEMS]}
          ariaLabel="Significado de los chips de formación académica"
        />
        <ol aria-label="Formación académica">
          {ABOUT_ACADEMIC.map((item) => (
            <TimelineItem
              key={`${item.heading}-${item.company}`}
              {...item}
              accent="feature"
            />
          ))}
        </ol>
      </div>
    </div>
  )
}
