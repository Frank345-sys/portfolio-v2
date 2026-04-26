import { BadgeRow } from '@/shared/components/BadgeRow'
import { Legend } from '@/shared/components/Legend'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { LAYOUT, BADGE, CARD, TYPOGRAPHY } from '@/shared/constants/tokens'

import { ABOUT_SKILLS } from '../constants'
import { compareSkillTagsByVariant } from '../utils'

import type { SkillGroup as SkillGroupType, SkillTagVariant } from '../types'

const SKILL_VARIANT_MAP: Record<SkillTagVariant, string> = {
  dominio: BADGE.variant.primary,
  proficiente: BADGE.variant.feature,
  familiar: BADGE.variant.neutral,
}

const SKILLS_LEGEND_ITEMS = [
  {
    id: 'dominio',
    label: 'Dominio (uso diario)',
    dotClassName: 'bg-information-base',
  },
  {
    id: 'proficiente',
    label: 'Proficiente (uso frecuente)',
    dotClassName: 'bg-feature-base',
  },
  {
    id: 'familiar',
    label: 'Familiar (proyectos puntuales)',
    dotClassName: 'bg-bg-subtle',
  },
] as const

/**
 * Card de grupo de skills.
 * Muestra el título del grupo y una fila de badges con nivel semántico
 * (`dominio`, `proficiente`, `familiar`) mapeados a variantes de `BADGE`.
 */
function SkillGroup({ title, tags }: SkillGroupType) {
  const orderedTags = [...tags].sort(compareSkillTagsByVariant)
  return (
    <div className={CARD.surface.weak}>
      <div className={CARD.layout.header}>
        <h4 className={TYPOGRAPHY.title.small}>{title}</h4>
      </div>
      <BadgeRow
        items={orderedTags.map(({ label, variant }) => ({
          label,
          variantClassName: SKILL_VARIANT_MAP[variant],
        }))}
      />
    </div>
  )
}

/**
 * Bloque de stack técnico dentro de la AboutSection.
 * Incluye una etiqueta de sección, una leyenda explicando los niveles
 * y un grid de `SkillGroup` construidos a partir de `ABOUT_SKILLS`.
 * Dentro de cada grupo, los badges se ordenan Dominio → Proficiente → Familiar (`compareSkillTagsByVariant`).
 */
export function AboutSkills() {
  return (
    <div className={LAYOUT.spacing.default}>
      <SectionLabel as="h3">Stack técnico</SectionLabel>
      <div className={LAYOUT.spacing.compact}>
        <Legend
          items={[...SKILLS_LEGEND_ITEMS]}
          ariaLabel="Niveles del stack técnico"
        />
        <div className={LAYOUT.grid.cols2}>
          {ABOUT_SKILLS.map((group) => (
            <SkillGroup key={group.title} {...group} />
          ))}
        </div>
      </div>
    </div>
  )
}
