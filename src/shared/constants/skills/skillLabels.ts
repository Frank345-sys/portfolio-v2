/**
 * Mapa canónico de etiquetas de stack (as const).
 * Reutilizar en About, Projects, etc.
 *
 * @module shared/constants/skills/skillLabels
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Import directo: `import { SKILL_LABEL } from '@/shared/constants/skills/skillLabels'`.
 */
export const SKILL_LABEL = {
  JAVASCRIPT_ES6_PLUS: 'JavaScript ES6+',
  TYPESCRIPT: 'TypeScript',
  /** Build tool del repo; útil para JSON-LD y metadatos. */
  VITE: 'Vite',
  HTML5: 'HTML5',
  CSS3: 'CSS3',
  REACT: 'React.js',
  NEXT: 'Next.js',
  TAILWIND: 'Tailwind CSS',
  ASTRO: 'Astro.js',
  FRAMER_MOTION: 'Framer Motion',
  BOOTSTRAP: 'Bootstrap',
  GIT_GITHUB: 'Git / GitHub',
  VS_CODE: 'VS Code',
  FIGMA: 'Figma',
  CURSOR: 'Cursor',
  GITFLOW: 'GitFlow',
  RESTFUL_APIS: 'RESTful APIs',
  APOLLO_CLIENT: 'Apollo Client',
  TURBOREPO: 'Turborepo',
  CI_CD: 'CI/CD',
  SCRUM: 'SCRUM',
  FRONTEND_ARCHITECTURE: 'Arquitectura Front-end',
  RESPONSIVE_DESIGN: 'Responsive Design',
  MOBILE_FIRST: 'Mobile-first',
  CODE_REVIEW: 'Code Review',
  REFACTORING: 'Refactoring',
  UI_UX: 'UI/UX',
  NODE: 'Node.js',
  NOSQL: 'NoSQL',
  GIT: 'Git',
  REACT_NATIVE: 'React Native',
  FIREBASE: 'Firebase',
  POSTGRESQL: 'PostgreSQL',
  MONGODB: 'MongoDB',
  EXPRESS: 'Express.js',
  PANDA_CSS: 'Panda CSS',
  /** Formación universitaria (ITSX) y referencias en timeline. */
  CPP: 'C++',
  JAVA: 'Java',
  SQL: 'SQL',
  MYSQL: 'MySQL',
  ALGORITMOS: 'Algoritmos',
  ESTRUCTURAS_DATOS: 'Estructuras de datos',
  REDES: 'Redes',
  POO: 'POO',
} as const

/**
 * Sólo valores literales de `SKILL_LABEL` (canónicos, una fuente de verdad).
 * Usar al tipar `label` en stack / proyectos; no sustituir por `string` suelto.
 */
export type SkillLabel = (typeof SKILL_LABEL)[keyof typeof SKILL_LABEL]
