/**
 * Pieza de interfaz del portfolio (`AboutSkills`).
 *
 * @fileoverview Implementación del archivo `AboutSkills.tsx` dentro de `components/AboutSection/subcomponents/AboutSkills`; ver exports para la API pública.
 * @remarks Badges ordenados con {@link orderSkillTagsByVariant}; leyenda en `SKILLS_LEGEND_ITEMS`.
 */
import { useId } from 'react'

import { Legend } from '@/shared/components/primitives/Legend'
import { SectionSubtitle } from '@/shared/components/primitives/SectionSubtitle'
import { LAYOUT, CARD, TYPOGRAPHY, BADGE } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import {
  ABOUT_SKILLS,
  ABOUT_SKILLS_HEADING_ID,
  SKILLS_LEGEND_ITEMS,
} from './constants'
import {
  SKILL_TAG_VARIANT,
  type SkillGroup as SkillGroupType,
  type SkillTagVariant,
} from './types'
import { orderSkillTagsByVariant } from './utils/orderSkillTagsByVariant'

/**
 * Mapeo `SkillTagVariant` → clases `BADGE.variant.light.*` para cada chip del grupo.
 * Mantener coherente con los puntos de `SKILLS_LEGEND_ITEMS` en `./constants.ts`.
 */
const SKILL_TAG_BADGE_CLASS: Record<SkillTagVariant, string> = {
  [SKILL_TAG_VARIANT.DOMINIO]: BADGE.variant.light.primary,
  [SKILL_TAG_VARIANT.PROFICIENTE]: BADGE.variant.light.feature,
  [SKILL_TAG_VARIANT.FAMILIAR]: BADGE.variant.light.neutral,
}

/**
 * Grupo de skills (`SkillGroup`): título + fila de badges ordenados por variante.
 * `<li>` dentro de la rejilla con `aria-labelledby` al `h4` del título.
 *
 * @example
 * ```tsx
 * <SkillGroup title="Frontend" tags={[{ label: 'React', variant: 'dominio' }]} />
 * ```
 */
function SkillGroup({ title, tags }: SkillGroupType) {
  // ID estable generado por useId para el aria-labelledby del <li>
  const titleId = useId()
  // Tags ordenados: dominio → proficiente → familiar (ver orderSkillTagsByVariant)
  const orderedTags = tags.toSorted(orderSkillTagsByVariant)

  return (
    <li className={CARD.surface.weak} aria-labelledby={titleId}>
      <div className={CARD.layout.header}>
        <h4 id={titleId} className={TYPOGRAPHY.title.small}>
          {title}
        </h4>
      </div>
      {orderedTags.length > 0 && (
        <div className={BADGE.group.horizontal}>
          {orderedTags.map(({ label, variant }) => (
            <span
              key={`${label}__${variant}`}
              className={SKILL_TAG_BADGE_CLASS[variant]}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </li>
  )
}

/**
 * @module components/AboutSection/subcomponents/AboutSkills/AboutSkills
 *
 * Stack técnico actual: leyenda de niveles y rejilla de grupos con badges.
 *
 * @example
 * ```tsx
 * <AboutSkills />
 * ```
 * @see {@link ABOUT_SKILLS} para los datos de grupos y tags
 * @see {@link SKILL_TAG_BADGE_CLASS} para el mapeo variante → estilo visual
 * @see {@link orderSkillTagsByVariant} para el orden de badges dentro de cada grupo
 */
export function AboutSkills() {
  return (
    <section
      aria-labelledby={ABOUT_SKILLS_HEADING_ID}
      className={LAYOUT.spacing.default}
    >
      <SectionSubtitle id={ABOUT_SKILLS_HEADING_ID}>
        Stack técnico
      </SectionSubtitle>
      <div className={LAYOUT.spacing.compact}>
        <Legend
          items={SKILLS_LEGEND_ITEMS}
          aria-label="Niveles del stack técnico"
        />
        <ul className={cn(LAYOUT.grid.cols2, 'list-none auto-rows-fr')}>
          {ABOUT_SKILLS.map((group) => (
            <SkillGroup key={group.title} {...group} />
          ))}
        </ul>
      </div>
    </section>
  )
}
