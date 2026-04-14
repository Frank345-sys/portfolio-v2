/**
 * Mapa canónico de etiquetas de stack (as const).
 * Reutilizar en About, Projects, etc.
 */
export const SKILL_LABEL = {
  JAVASCRIPT_ES6_PLUS: 'JavaScript ES6+',
  TYPESCRIPT: 'TypeScript',
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

/** Literal union de todas las etiquetas de stack definidas en `SKILL_LABEL`. */
export type SkillLabel = (typeof SKILL_LABEL)[keyof typeof SKILL_LABEL]
