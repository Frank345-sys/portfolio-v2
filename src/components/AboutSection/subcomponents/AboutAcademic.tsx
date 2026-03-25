import { SectionLabel } from '@/shared/components/SectionLabel'
import { Legend } from '@/shared/components/Legend'
import { TimelineItem } from '@/shared/components/TimelineItem'
import { ABOUT_ACADEMIC } from '../constants'
import { LAYOUT } from '@/shared/constants/tokens'

const ACADEMIC_LEGEND_ITEMS = [
  {
    id: 'conocimientos',
    label: 'Conocimientos adquiridos en la formación',
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
    <div className={LAYOUT.spacing.compact}>
      <SectionLabel as="h3">Formación académica</SectionLabel>
      <Legend
        items={[...ACADEMIC_LEGEND_ITEMS]}
        ariaLabel="Chips de formación académica"
      />
      <ol aria-label="Formación académica">
        {ABOUT_ACADEMIC.map((item) => (
          <TimelineItem
            key={`${item.role}-${item.company}`}
            {...item}
            accent="feature"
          />
        ))}
      </ol>
    </div>
  )
}
