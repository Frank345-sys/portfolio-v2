import type {
  ValueItem,
  SkillGroup,
  ExpItem,
  AcademicItem,
  CertItem,
} from './types'
import { SKILL_TAG_VARIANT } from './types'
import { TIMELINE_CHIP_VARIANT } from '@/shared/constants/enums'

/** Hero + bio: nombre, badge, ubicación, tagline y avatar usados en `AboutBio`. */
export interface AboutHero {
  firstName: string
  lastName: string
  badge: string
  location: string
  tagline: string
  avatarInitials: string
  /** URL opcional de foto; si falla la carga, el avatar muestra solo iniciales. */
  avatarPhotoSrc?: string
}

export const ABOUT_HERO: AboutHero = {
  firstName: 'Frank',
  lastName: 'González',
  badge: 'Frontend Developer',
  location: '📍Puebla, México',
  tagline:
    'Construyo interfaces que no solo se ven bien — se sienten bien. Especializado en **React.js**, **TypeScript** y **Next.js**, con enfoque en componentes escalables, performance y UI/UX de calidad.',
  avatarInitials: 'FG',
}

/**
 * Párrafos de presentación personal (quién soy).
 * Consumidos bajo el bloque hero dentro de `AboutBio`. Usar **texto** para resaltar en blanco.
 */
export const ABOUT_BIO: string[] = [
  'Soy **Francisco Omar Habib González Utrera**, Ingeniero en Sistemas Computacionales, con más de 1 año de experiencia como **Frontend Developer** desarrollando landing pages, soluciones e-commerce y plataformas web de alto impacto.',
  'Me especializo en **React.js**, **optimización de performance** y **diseño de componentes escalables**. Disfruto mejorar flujos de usuario, refactorizar código legado y elevar la calidad del producto.',
  'He trabajado colaborativamente con equipos de **Back-End**, tengo fidelidad a los diseños en **Figma** y una obsesión por los detalles que marcan la diferencia entre una UI funcional y una UI memorable.',
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
    detail:
      'Optimizo tiempos de carga y elimino renders innecesarios para lograr interfaces más ágiles.',
  },
  {
    name: 'Fidelidad al diseño',
    desc: 'De Figma a código con precisión',
    detail:
      'El pixel importa. Traduzco diseños a código con atención al detalle.',
  },
]

/** Grupos de skills (stack técnico) — dominio / proficiente / familiar */
export const ABOUT_SKILLS: SkillGroup[] = [
  {
    title: 'Lenguajes',
    tags: [
      { label: 'JavaScript ES6+', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'TypeScript', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'HTML5', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'CSS3', variant: SKILL_TAG_VARIANT.DOMINIO },
    ],
  },
  {
    title: 'Frameworks & Libs',
    tags: [
      { label: 'React.js', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'Next.js', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'Tailwind CSS', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'Astro.js', variant: SKILL_TAG_VARIANT.PROFICIENTE },
      { label: 'Framer Motion', variant: SKILL_TAG_VARIANT.PROFICIENTE },
      { label: 'Bootstrap', variant: SKILL_TAG_VARIANT.FAMILIAR },
    ],
  },
  {
    title: 'Herramientas',
    tags: [
      { label: 'Git / GitHub', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'VS Code', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'Figma', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'Cursor', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'GitFlow', variant: SKILL_TAG_VARIANT.PROFICIENTE },
      { label: 'RESTful APIs', variant: SKILL_TAG_VARIANT.PROFICIENTE },
    ],
  },
  {
    title: 'Prácticas',
    tags: [
      { label: 'Responsive Design', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'Mobile-first', variant: SKILL_TAG_VARIANT.DOMINIO },
      { label: 'Code Review', variant: SKILL_TAG_VARIANT.PROFICIENTE },
      { label: 'Refactoring', variant: SKILL_TAG_VARIANT.PROFICIENTE },
      { label: 'UI/UX', variant: SKILL_TAG_VARIANT.PROFICIENTE },
    ],
  },
]

/** Experiencia laboral — chips con variante semántica (azul/violeta/verde) */
export const ABOUT_EXPERIENCE: ExpItem[] = [
  {
    period: 'Sep 2024 — Feb 2026',
    role: 'Frontend Developer',
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
      { label: 'Astro', variant: TIMELINE_CHIP_VARIANT.LEARNED },
      { label: 'React.js', variant: TIMELINE_CHIP_VARIANT.LEARNED },
      { label: 'Framer Motion', variant: TIMELINE_CHIP_VARIANT.LEARNED },
      { label: 'TypeScript', variant: TIMELINE_CHIP_VARIANT.LEARNED },
      { label: 'UI/UX', variant: TIMELINE_CHIP_VARIANT.LEARNED },
      { label: 'Tailwind', variant: TIMELINE_CHIP_VARIANT.LEARNED },
    ],
  },
]

/** Formación académica — chips en violeta (academic), mismo tono para todos */
export const ABOUT_ACADEMIC: AcademicItem[] = [
  {
    period: 'Ago 2016 — Ene 2022',
    role: 'Ingeniería en Sistemas Computacionales',
    company: 'Instituto Tecnológico Superior de Xalapa (ITSX)',
    description:
      'Formación en desarrollo de software, estructuras de datos, bases de datos y con especialidad en ingeniería de software.',
    chips: [
      { label: 'C', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'C++', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'Java', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'SQL', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'MySQL', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'Algoritmos', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      {
        label: 'Estructuras de datos',
        variant: TIMELINE_CHIP_VARIANT.ACADEMIC,
      },
      { label: 'Redes', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'POO', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
    ],
  },
  {
    period: 'Dic 2022 — Abr 2024',
    role: 'Desarrollador Web',
    company: 'TripleTen Latam',
    description:
      'Programa de Desarrollo Web, es un curso de diez meses que abarca HTML, CSS, JS, React.js, Node.js, MongoDB y otros aspectos clave para la creación de sitios web front-end y back-end que implica proyectos basados en desafíos del mundo real.',
    chips: [
      { label: 'HTML5', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'CSS3', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'JS', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'React.js', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'Node.js', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'MongoDB', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'Express.js', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'Git', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'GitHub', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
      { label: 'Figma', variant: TIMELINE_CHIP_VARIANT.ACADEMIC },
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
