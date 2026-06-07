/**
 * Datos estáticos del bloque de formación académica (`AboutAcademic`).
 *
 * @fileoverview Define `ABOUT_ACADEMIC` (entradas del timeline), `ABOUT_ACADEMIC_HEADING_ID`
 * y `ABOUT_ACADEMIC_LEGEND_ITEMS` (alias de la leyenda compartida con experiencia).
 * @remarks Cambios en `period`, `chips` o `description` pueden romper tests que fijen
 * texto visible. `TIMELINE_CHIP` y `SKILL_LABEL` son la fuente de verdad de chips y etiquetas.
 */
import type { AboutTimelineEntry } from '@/components/AboutSection/types'
import {
  TIMELINE_CHIP,
  TIMELINE_MODALIDAD,
} from '@/shared/components/primitives/TimelineItem/constants'
import { SKILL_LABEL } from '@/shared/constants/skills/skillLabels'

import { ABOUT_TIMELINE_LEGEND_ITEMS } from '../../constants'

/**
 * Formación académica y cursada técnica. `TIMELINE_CHIP.learned(…)` = chip “Conocimientos nuevos”.
 * `period*` legible ↔ `periodStartDatetime`/`periodEndDatetime` (ISO en `<time datetime>` de `TimelineItem`).
 * Render en `AboutAcademic.tsx` dentro de `<ol aria-label="Entradas de formación">`.
 */
export const ABOUT_ACADEMIC: AboutTimelineEntry[] = [
  {
    period: 'Ago 2016 — Ene 2022',
    periodStartDatetime: '2016-08-01',
    periodEndDatetime: '2022-01-31',
    heading: 'Ingeniería en Sistemas Computacionales',
    company: 'Instituto Tecnológico Superior de Xalapa (ITSX)',
    modalidad: TIMELINE_MODALIDAD.PRESENCIAL,
    description:
      'Formación en desarrollo de software, estructuras de datos, bases de datos y con especialidad en ingeniería de software.',
    chips: [
      TIMELINE_CHIP.learned(SKILL_LABEL.CPP),
      TIMELINE_CHIP.learned(SKILL_LABEL.JAVA),
      TIMELINE_CHIP.learned(SKILL_LABEL.SQL),
      TIMELINE_CHIP.learned(SKILL_LABEL.MYSQL),
      TIMELINE_CHIP.learned(SKILL_LABEL.ALGORITMOS),
      TIMELINE_CHIP.learned(SKILL_LABEL.ESTRUCTURAS_DATOS),
      TIMELINE_CHIP.learned(SKILL_LABEL.REDES),
      TIMELINE_CHIP.learned(SKILL_LABEL.POO),
    ],
  },
  {
    period: 'Dic 2022 — Abr 2024',
    periodStartDatetime: '2022-12-01',
    periodEndDatetime: '2024-04-30',
    heading: 'Desarrollador Web',
    company: 'TripleTen Latam',
    modalidad: TIMELINE_MODALIDAD.REMOTO,
    description:
      'Programa de Desarrollo Web, es un curso de diez meses que abarca HTML, CSS, JS, React.js, Node.js, MongoDB y otros aspectos clave para la creación de sitios web front-end y back-end que implica proyectos basados en desafíos del mundo real.',
    chips: [
      TIMELINE_CHIP.learned(SKILL_LABEL.HTML5),
      TIMELINE_CHIP.learned(SKILL_LABEL.CSS3),
      TIMELINE_CHIP.learned(SKILL_LABEL.JAVASCRIPT_ES6_PLUS),
      TIMELINE_CHIP.learned(SKILL_LABEL.REACT),
      TIMELINE_CHIP.learned(SKILL_LABEL.NODE),
      TIMELINE_CHIP.learned(SKILL_LABEL.MONGODB),
      TIMELINE_CHIP.learned(SKILL_LABEL.EXPRESS),
      TIMELINE_CHIP.learned(SKILL_LABEL.GIT_GITHUB),
      TIMELINE_CHIP.learned(SKILL_LABEL.FIGMA),
    ],
  },
]

/** Encabezado `h3` de formación (`AboutAcademic`). */
export const ABOUT_ACADEMIC_HEADING_ID = 'about-academic-heading' as const

/** Leyenda de chips del timeline (formación académica) — alias de {@link ABOUT_TIMELINE_LEGEND_ITEMS}
 * compartida con `AboutExperience`.
 */
export const ABOUT_ACADEMIC_LEGEND_ITEMS = ABOUT_TIMELINE_LEGEND_ITEMS
