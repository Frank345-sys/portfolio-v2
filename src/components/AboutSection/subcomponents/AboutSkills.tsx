import { cn } from '@/shared/utils/cn'
import { LAYOUT, BADGE, CARD, TYPOGRAPHY } from '@/shared/constants/tokens'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { Legend } from '@/shared/components/Legend'
import { BadgeRow } from '@/shared/components/BadgeRow'
import { ABOUT_SKILLS } from '../constants'
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
  return (
    <div className={CARD.surface.weak}>
      <p className={cn(TYPOGRAPHY.title.small, 'mb-2.5')}>{title}</p>
      <BadgeRow
        items={tags.map(({ label, variant }) => ({
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
 */
export function AboutSkills() {
  return (
    <div className={LAYOUT.spacing.compact}>
      <SectionLabel as="h3">Stack técnico</SectionLabel>
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
  )
}
