import type {
  ValueItem,
  SkillGroup,
  ExpItem,
  AcademicItem,
  CertItem,
} from './types'
import { SKILL_TAG_VARIANT } from './types'
import { TIMELINE_CHIP_VARIANT } from '@/shared/constants/enums'
import { SKILL_LABEL } from '@/shared/constants/skills'

/** Datos del hero (nombre, badge, ubicación, tagline, avatar) — consumidos en `AboutHero`. */
export interface AboutHeroData {
  firstName: string
  lastName: string
  badge: string
  location: string
  tagline: string
  avatarInitials: string
  /** URL opcional de foto; si falla la carga, el avatar muestra solo iniciales. */
  avatarPhotoSrc?: string
}

export const ABOUT_HERO: AboutHeroData = {
  firstName: 'Frank',
  lastName: 'González',
  badge: 'Frontend Developer',
  location: '📍Puebla, México',
  tagline:
    'Construyo interfaces que no solo se ven bien — se sienten bien. Especializado en **React.js**, **TypeScript** y **Next.js**, con enfoque en componentes escalables, performance y UI/UX de calidad.',
  avatarInitials: 'FG',
}

/** Un párrafo de la bio (quién soy) con clave estable para listas React. */
export interface AboutBioParagraph {
  id: string
  text: string
}

/**
 * Párrafos de presentación personal (quién soy).
 * Consumidos en `AboutBio`. Usar **texto** para resaltar en blanco.
 */
export const ABOUT_BIO: readonly AboutBioParagraph[] = [
  {
    id: 'about-bio-intro',
    text: 'Soy **Francisco Omar Habib González Utrera**, Ingeniero en Sistemas Computacionales, con más de 1 año de experiencia como **Frontend Developer** desarrollando landing pages, soluciones e-commerce y plataformas web de alto impacto.',
  },
  {
    id: 'about-bio-specialization',
    text: 'Me especializo en **React.js**, **optimización de performance** y **diseño de componentes escalables**. Disfruto mejorar flujos de usuario, refactorizar código legado y elevar la calidad del producto.',
  },
  {
    id: 'about-bio-collaboration',
    text: 'He trabajado colaborativamente con equipos de **Back-End**, tengo fidelidad a los diseños en **Figma** y una obsesión por los detalles que marcan la diferencia entre una UI funcional y una UI memorable.',
  },
]

/** Valores / cómo trabajo (3 tarjetas) */
export const ABOUT_VALUES: ValueItem[] = [
  {
    name: 'Componentes escalables',
    desc: 'Reutilizables y mantenibles',
    detail: 'Diseño sistemas de componentes pensados para crecer sin romper.',
  },
  {
    name: 'Performance',
    desc: 'Experiencia rápida y fluida',
    detail: 'Optimizo tiempos de carga y elimino renders innecesarios.',
  },
  {
    name: 'Fidelidad al diseño',
    desc: 'De Figma a código con precisión',
    detail:
      'El pixel importa. Traduzco diseños a código con atención al detalle.',
  },
]

/**
 * Grupos de skills (stack técnico) — dominio / proficiente / familiar.
 * Las etiquetas deben coincidir con chips `academic` / `learned` en timelines (`ABOUT_ACADEMIC`, `ABOUT_EXPERIENCE`)
 * y con `skills` de cada entrada en `PROJECTS` (ProjectsSection).
 * Los tests de sincronía usan `stackSkillLabelSet` (`@/shared/utils/stackSkillLabelSet`).
 * El orden visual por grupo es Dominio → Proficiente → Familiar (`compareSkillTagsByVariant` en `./utils`).
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

/** Experiencia laboral — chips con variante semántica (azul/violeta/verde) */
export const ABOUT_EXPERIENCE: ExpItem[] = [
  {
    period: 'Sep 2024 — Feb 2026',
    heading: 'Frontend Developer',
    company: 'B Life Suplementos Fitness · Puebla, MX',
    description:
      'Desarrollo en e-commerce, plataforma B2B, ERP interno y landing pages. Creación de componentes reutilizables con React, refactorización de código legacy, optimización de performance y mejora de UI/UX colaborando con equipos de Back-End.',
    chips: [
      { label: 'E-commerce', variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY },
      { label: 'B2B Platform', variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY },
      { label: 'ERP interno', variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY },
      { label: 'Landing Pages', variant: TIMELINE_CHIP_VARIANT.TECHNOLOGY },
      {
        label: '−40% código legacy',
        variant: TIMELINE_CHIP_VARIANT.IMPACT_METRIC,
      },
      {
        label: '−50% tiempo de carga',
        variant: TIMELINE_CHIP_VARIANT.IMPACT_METRIC,
      },
      { label: '−30% bugs', variant: TIMELINE_CHIP_VARIANT.IMPACT_METRIC },
      { label: SKILL_LABEL.ASTRO, variant: TIMELINE_CHIP_VARIANT.LEARNED },
      { label: SKILL_LABEL.REACT, variant: TIMELINE_CHIP_VARIANT.LEARNED },
      {
        label: SKILL_LABEL.FRAMER_MOTION,
        variant: TIMELINE_CHIP_VARIANT.LEARNED,
      },
      { label: SKILL_LABEL.TYPESCRIPT, variant: TIMELINE_CHIP_VARIANT.LEARNED },
      { label: SKILL_LABEL.UI_UX, variant: TIMELINE_CHIP_VARIANT.LEARNED },
      { label: SKILL_LABEL.TAILWIND, variant: TIMELINE_CHIP_VARIANT.LEARNED },
      { label: SKILL_LABEL.PANDA_CSS, variant: TIMELINE_CHIP_VARIANT.LEARNED },
    ],
  },
]

/** Formación académica — chips en violeta (academic), mismo tono para todos */
export const ABOUT_ACADEMIC: AcademicItem[] = [
  {
    period: 'Ago 2016 — Ene 2022',
    heading: 'Ingeniería en Sistemas Computacionales',
    company: 'Instituto Tecnológico Superior de Xalapa (ITSX)',
    description:
      'Formación en desarrollo de software, estructuras de datos, bases de datos y con especialidad en ingeniería de software.',
    chips: [
      { label: SKILL_LABEL.CPP, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: SKILL_LABEL.JAVA, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: SKILL_LABEL.SQL, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: SKILL_LABEL.MYSQL, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      {
        label: SKILL_LABEL.ALGORITMOS,
        variant: TIMELINE_CHIP_VARIANT.ACADEMIC,
      },
      {
        label: SKILL_LABEL.ESTRUCTURAS_DATOS,
        variant: TIMELINE_CHIP_VARIANT.ACADEMIC,
      },
      { label: SKILL_LABEL.REDES, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: SKILL_LABEL.POO, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
    ],
  },
  {
    period: 'Dic 2022 — Abr 2024',
    heading: 'Desarrollador Web',
    company: 'TripleTen Latam',
    description:
      'Programa de Desarrollo Web, es un curso de diez meses que abarca HTML, CSS, JS, React.js, Node.js, MongoDB y otros aspectos clave para la creación de sitios web front-end y back-end que implica proyectos basados en desafíos del mundo real.',
    chips: [
      { label: SKILL_LABEL.HTML5, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: SKILL_LABEL.CSS3, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      {
        label: SKILL_LABEL.JAVASCRIPT_ES6_PLUS,
        variant: TIMELINE_CHIP_VARIANT.ACADEMIC,
      },
      { label: SKILL_LABEL.REACT, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: SKILL_LABEL.NODE, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: SKILL_LABEL.MONGODB, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: SKILL_LABEL.EXPRESS, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      {
        label: SKILL_LABEL.GIT_GITHUB,
        variant: TIMELINE_CHIP_VARIANT.ACADEMIC,
      },
      { label: SKILL_LABEL.FIGMA, variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
    ],
  },
]

/** Certificaciones con links */
export const ABOUT_CERTS: CertItem[] = [
  {
    icon: '🤖',
    name: 'Certificado de inicialización al desarrollo con IA',
    issuer: 'Big School · Marzo 2026',
    href: 'https://certificados.thebigschool.com/wp-content/uploads/certs/MDEV2/Certificado-Francisco-Omar-Habib-Gonzalez-Utrera-ttfathmh.pdf',
  },
  {
    icon: '⚙️',
    name: 'Git y GitHub: Control de versiones en Proyectos Web',
    issuer: 'Crehana · Julio 2024',
    href: 'https://s3.amazonaws.com/public-lessons.crehana.com/images/certificate/participation-pdf/f3224198/3d9d7622.pdf',
  },
  {
    icon: '📋',
    name: 'Fundamentos de Javascript',
    issuer: 'Crehana · Noviembre 2022',
    href: 'https://s3.amazonaws.com/public-lessons.crehana.com/images/certificate/participation-pdf/09ef2e51/d7cfd6c5.pdf',
  },
  {
    icon: '💻',
    name: 'Introducción al Desarrollo Web Front End: HTML y CSS',
    issuer: 'Crehana · Noviembre 2022',
    href: 'https://www.crehana.com/diplomas/890575cf/',
  },
]
