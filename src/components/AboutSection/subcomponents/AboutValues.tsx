import { cn } from '@/shared/utils/cn'
import { TYPOGRAPHY, LAYOUT, CARD } from '@/shared/constants/tokens'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { ABOUT_VALUES } from '../constants'
import type { ValueItem } from '../types'

/**
 * Card de valor personal/profesional dentro de la AboutSection.
 * Recibe un item de `ABOUT_VALUES` y renderiza nombre, código corto y detalle.
 */
function ValueCard({ name, desc, detail }: ValueItem) {
  return (
    <div
      className={cn(
        'flex flex-col items-center space-y-1 p-5 text-center md:items-start md:text-left',
        CARD.surface.weak
      )}
    >
      <p className={TYPOGRAPHY.title.small}>{name}</p>
      <p
        className={cn(
          TYPOGRAPHY.title.xsmall,
          'text-information-base font-mono'
        )}
      >
        {desc}
      </p>
      <p className={TYPOGRAPHY.paragraph.secondary}>{detail}</p>
    </div>
  )
}

/**
 * Bloque de valores de trabajo dentro de la AboutSection.
 * Renderiza un título de sección y un grid de `ValueCard` a partir de `ABOUT_VALUES`.
 */
export function AboutValues() {
  return (
    <div className={LAYOUT.spacing.compact}>
      <SectionLabel as="h3">Cómo trabajo</SectionLabel>
      <div className={LAYOUT.grid.cols3}>
        {ABOUT_VALUES.map((item) => (
          <ValueCard key={item.name} {...item} />
        ))}
      </div>
    </div>
  )
}
