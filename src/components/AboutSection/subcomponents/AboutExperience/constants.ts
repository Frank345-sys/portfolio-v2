/**
 * Datos estáticos del bloque de experiencia laboral (`AboutExperience`).
 *
 * @fileoverview Define `ABOUT_EXPERIENCE` (entradas del timeline), `ABOUT_EXPERIENCE_HEADING_ID`
 * y `ABOUT_EXPERIENCE_LEGEND_ITEMS` (alias de la leyenda compartida con formación).
 * @remarks Cambios en `period`, `chips` o `description` pueden romper tests que fijen
 * texto visible. `TIMELINE_CHIP` y `SKILL_LABEL` son la fuente de verdad de chips y etiquetas.
 * Las métricas de impacto (`−40% código legacy`, etc.) están testeadas indirectamente — verificar
 * `AboutExperience.test.tsx` al modificarlas.
 */
import type { AboutTimelineEntry } from '@/components/AboutSection/types'
import {
  TIMELINE_CHIP,
  TIMELINE_MODALIDAD,
} from '@/shared/components/primitives/TimelineItem/constants'
import { SITE_PROFILE } from '@/shared/constants/siteProfile/siteProfile'
import { SKILL_LABEL } from '@/shared/constants/skills/skillLabels'

import { ABOUT_TIMELINE_LEGEND_ITEMS } from '../../constants'

/**
 * Experiencia laboral (varias filas permitidas). `learned` / `applied` según cómo narres cada rol.
 * `period*` legible ↔ `periodStartDatetime`/`periodEndDatetime` (ISO en `<time datetime>` de `TimelineItem`).
 * Render en `AboutExperience.tsx` dentro de `<ol aria-label="Experiencia profesional">`.
 */
export const ABOUT_EXPERIENCE: AboutTimelineEntry[] = [
  {
    period: 'Sep 2024 — Feb 2026',
    periodStartDatetime: '2024-09-01',
    periodEndDatetime: '2026-02-28',
    heading: SITE_PROFILE.role,
    company: 'B Life Suplementos Fitness · Puebla, MX',
    modalidad: TIMELINE_MODALIDAD.PRESENCIAL,
    description:
      'E-commerce, B2B, ERP y landings: componentes reutilizables, refactor de legacy, performance y alineación de UI/UX con coordinación a back-end.',
    chips: [
      TIMELINE_CHIP.technology('E-commerce'),
      TIMELINE_CHIP.technology('B2B Platform'),
      TIMELINE_CHIP.technology('ERP interno'),
      TIMELINE_CHIP.technology('Landing Pages'),
      TIMELINE_CHIP.impactMetric('−40% código legacy'),
      TIMELINE_CHIP.impactMetric('−50% tiempo de carga'),
      TIMELINE_CHIP.impactMetric('−30% bugs'),
      TIMELINE_CHIP.applied(SKILL_LABEL.HTML5),
      TIMELINE_CHIP.applied(SKILL_LABEL.CSS3),
      TIMELINE_CHIP.applied(SKILL_LABEL.JAVASCRIPT_ES6_PLUS),
      TIMELINE_CHIP.applied(SKILL_LABEL.REACT),
      TIMELINE_CHIP.applied(SKILL_LABEL.GIT_GITHUB),
      TIMELINE_CHIP.applied(SKILL_LABEL.FIGMA),
      TIMELINE_CHIP.learned(SKILL_LABEL.NEXT),
      TIMELINE_CHIP.learned(SKILL_LABEL.ASTRO),
      TIMELINE_CHIP.learned(SKILL_LABEL.FRAMER_MOTION),
      TIMELINE_CHIP.learned(SKILL_LABEL.TYPESCRIPT),
      TIMELINE_CHIP.learned(SKILL_LABEL.UI_UX),
      TIMELINE_CHIP.learned(SKILL_LABEL.TAILWIND),
      TIMELINE_CHIP.learned(SKILL_LABEL.PANDA_CSS),
    ],
  },
  {
    period: 'Jun 2026 — Actualidad',
    periodStartDatetime: '2026-06-01',
    heading: SITE_PROFILE.role,
    company: 'DIDACTECA · Puebla, MX',
    modalidad: TIMELINE_MODALIDAD.HIBRIDO,
    description:
      'Desarrollo Front-end de un sistema de gestión de inventario y almacén para Editorial DIDACTECA. Participación en la construcción de interfaces responsivas, componentes reutilizables e integración de APIs, trabajando bajo metodologías ágiles (SCRUM) para optimizar procesos internos y mejorar la experiencia de usuario.',
    chips: [
      TIMELINE_CHIP.technology('ERP interno'),
      TIMELINE_CHIP.applied(SKILL_LABEL.HTML5),
      TIMELINE_CHIP.applied(SKILL_LABEL.CSS3),
      TIMELINE_CHIP.applied(SKILL_LABEL.JAVASCRIPT_ES6_PLUS),
      TIMELINE_CHIP.applied(SKILL_LABEL.REACT),
      TIMELINE_CHIP.applied(SKILL_LABEL.NEXT),
      TIMELINE_CHIP.applied(SKILL_LABEL.GIT_GITHUB),
      TIMELINE_CHIP.applied(SKILL_LABEL.FIGMA),
      TIMELINE_CHIP.applied(SKILL_LABEL.FRAMER_MOTION),
      TIMELINE_CHIP.applied(SKILL_LABEL.TYPESCRIPT),
      TIMELINE_CHIP.applied(SKILL_LABEL.UI_UX),
      TIMELINE_CHIP.applied(SKILL_LABEL.TAILWIND),
      TIMELINE_CHIP.learned(SKILL_LABEL.SCRUM),
      TIMELINE_CHIP.learned(SKILL_LABEL.TURBOREPO),
      TIMELINE_CHIP.learned(SKILL_LABEL.APOLLO_CLIENT),
      TIMELINE_CHIP.learned(SKILL_LABEL.CI_CD),
      TIMELINE_CHIP.learned(SKILL_LABEL.FRONTEND_ARCHITECTURE),
    ],
  },
]

/** Encabezado `h3` de experiencia laboral (`AboutExperience`). */
export const ABOUT_EXPERIENCE_HEADING_ID = 'about-experience-heading' as const

/** Leyenda de chips del timeline (experiencia laboral) — alias de {@link ABOUT_TIMELINE_LEGEND_ITEMS}
 * compartida con `AboutAcademic`.
 */
export const ABOUT_EXPERIENCE_LEGEND_ITEMS = ABOUT_TIMELINE_LEGEND_ITEMS
