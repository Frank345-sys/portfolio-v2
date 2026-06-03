/**
 * Datos estáticos del bloque de stack técnico (`AboutSkills`).
 *
 * @fileoverview Define `SKILLS_LEGEND_ITEMS` (leyenda de niveles), `ABOUT_SKILLS` (grupos de skills
 * con variantes dominio/proficiente/familiar) y `ABOUT_SKILLS_HEADING_ID`.
 * @remarks Las `SkillLabel` en `ABOUT_SKILLS` deben existir también en chips de timeline
 * (`ABOUT_ACADEMIC`/`ABOUT_EXPERIENCE`) y alinearse con el relato de proyectos cuando aplique.
 * Cambios en `label` o `id` de la leyenda requieren actualizar `SKILL_TAG_BADGE_CLASS` en `AboutSkills.tsx`.
 */
import type { AboutLegendItem } from '@/components/AboutSection/types'
import { SKILL_LABEL } from '@/shared/constants/skills/skillLabels'

import { SKILL_TAG_VARIANT, type SkillGroup } from './types'

/**
 * Leyenda del stack (orden = dominio → proficiente → familiar).
 * Alinear puntos con `SKILL_TAG_BADGE_CLASS` en `AboutSkills.tsx`.
 */
export const SKILLS_LEGEND_ITEMS = [
  {
    id: 'dominio',
    label: 'Dominio (uso diario)',
    dotClassName:
      'box-border border border-information-base bg-information-lighter',
  },
  {
    id: 'proficiente',
    label: 'Proficiente (uso frecuente)',
    dotClassName: 'box-border border border-feature-base bg-feature-lighter',
  },
  {
    id: 'familiar',
    label: 'Familiar (proyectos puntuales)',
    dotClassName: 'box-border border border-stroke-subtle bg-bg-soft',
  },
] satisfies readonly AboutLegendItem[]

/**
 * Stack técnico **actual** (`SkillTagVariant`: dominio / proficiente / familiar) — cierre del relato
 * del timeline. Las `SkillLabel` deben existir también en chips (`ABOUT_ACADEMIC`/`ABOUT_EXPERIENCE`) o
 * proyectos cuando corresponda al relato.
 * Cada entrada se renderiza como `<article>` en `AboutSkills.tsx`.
 * Orden dentro de cada grupo al render: Dominio → Proficiente → Familiar (`orderSkillTagsByVariant` en `./utils/orderSkillTagsByVariant.ts`).
 */
export const ABOUT_SKILLS: SkillGroup[] = [
  {
    title: 'Lenguajes',
    tags: [
      {
        label: SKILL_LABEL.JAVASCRIPT_ES6_PLUS,
        variant: SKILL_TAG_VARIANT.DOMINIO,
      },
      { label: SKILL_LABEL.TYPESCRIPT, variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: SKILL_LABEL.HTML5, variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: SKILL_LABEL.CSS3, variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: SKILL_LABEL.CPP, variant: SKILL_TAG_VARIANT.FAMILIAR },
      { label: SKILL_LABEL.JAVA, variant: SKILL_TAG_VARIANT.FAMILIAR },
    ],
  },
  {
    title: 'Frameworks & Libs',
    tags: [
      { label: SKILL_LABEL.REACT, variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: SKILL_LABEL.NEXT, variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: SKILL_LABEL.TAILWIND, variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: SKILL_LABEL.PANDA_CSS, variant: SKILL_TAG_VARIANT.FAMILIAR },
      {
        label: SKILL_LABEL.FRAMER_MOTION,
        variant: SKILL_TAG_VARIANT.PROFICIENTE,
      },
      { label: SKILL_LABEL.ASTRO, variant: SKILL_TAG_VARIANT.FAMILIAR },
      { label: SKILL_LABEL.BOOTSTRAP, variant: SKILL_TAG_VARIANT.FAMILIAR },
      { label: SKILL_LABEL.NODE, variant: SKILL_TAG_VARIANT.FAMILIAR },
      { label: SKILL_LABEL.EXPRESS, variant: SKILL_TAG_VARIANT.FAMILIAR },
      { label: SKILL_LABEL.MONGODB, variant: SKILL_TAG_VARIANT.FAMILIAR },
    ],
  },
  {
    title: 'Fundamentos y bases de datos',
    tags: [
      { label: SKILL_LABEL.POO, variant: SKILL_TAG_VARIANT.PROFICIENTE },
      { label: SKILL_LABEL.SQL, variant: SKILL_TAG_VARIANT.FAMILIAR },
      { label: SKILL_LABEL.MYSQL, variant: SKILL_TAG_VARIANT.FAMILIAR },
      {
        label: SKILL_LABEL.ALGORITMOS,
        variant: SKILL_TAG_VARIANT.FAMILIAR,
      },
      {
        label: SKILL_LABEL.ESTRUCTURAS_DATOS,
        variant: SKILL_TAG_VARIANT.FAMILIAR,
      },
      { label: SKILL_LABEL.REDES, variant: SKILL_TAG_VARIANT.FAMILIAR },
    ],
  },
  {
    title: 'Herramientas',
    tags: [
      { label: SKILL_LABEL.GIT_GITHUB, variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: SKILL_LABEL.VS_CODE, variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: SKILL_LABEL.FIGMA, variant: SKILL_TAG_VARIANT.PROFICIENTE },
      { label: SKILL_LABEL.CURSOR, variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: SKILL_LABEL.GITFLOW, variant: SKILL_TAG_VARIANT.PROFICIENTE },
      {
        label: SKILL_LABEL.RESTFUL_APIS,
        variant: SKILL_TAG_VARIANT.PROFICIENTE,
      },
    ],
  },
  {
    title: 'Prácticas',
    tags: [
      {
        label: SKILL_LABEL.RESPONSIVE_DESIGN,
        variant: SKILL_TAG_VARIANT.DOMINIO,
      },
      { label: SKILL_LABEL.MOBILE_FIRST, variant: SKILL_TAG_VARIANT.DOMINIO },
      {
        label: SKILL_LABEL.CODE_REVIEW,
        variant: SKILL_TAG_VARIANT.PROFICIENTE,
      },
      {
        label: SKILL_LABEL.REFACTORING,
        variant: SKILL_TAG_VARIANT.PROFICIENTE,
      },
      { label: SKILL_LABEL.UI_UX, variant: SKILL_TAG_VARIANT.PROFICIENTE },
    ],
  },
]

/** Encabezado `h3` del stack técnico (`AboutSkills`). */
export const ABOUT_SKILLS_HEADING_ID = 'about-skills-heading' as const
