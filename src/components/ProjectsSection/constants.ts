/**
 * Datos estáticos y ajustes de comportamiento de la sección **Proyectos**.
 *
 * Cada valor de `PROJECTS[].skills` debe existir como etiqueta en `ABOUT_SKILLS` (AboutSection),
 * para alinear el stack técnico con lo mostrado en tarjetas de proyecto.
 * Comprobación: test `aboutSkillsProjectsSync` (`stackSkillLabelSet` en `@/test/stackSkillLabelSet`).
 *
 * @module components/ProjectsSection/constants
 */
import { SKILL_LABEL } from '@/shared/constants/skills'
import type { Project } from './types'

/** Listado ordenado de proyectos mostrados en el portfolio. */
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-commerce Blife',
    subtitle: 'App Web',
    description:
      'Plataforma e-commerce de suplementos deportivos, donde desarrollé interfaces escalables y optimizadas, mejorando la experiencia de usuario y flujos de conversión.',
    bullets: [
      'Desarrollo de componentes reutilizables en Next.js + TypeScript.',
      'Maquetación pixel-perfect basada en diseños de Figma.',
      'Implementación de estilos con Panda CSS utilizando design tokens.',
      'Integración con APIs para productos, carrito y checkout.',
    ],
    skills: [
      SKILL_LABEL.NEXT,
      SKILL_LABEL.REACT,
      SKILL_LABEL.TYPESCRIPT,
      SKILL_LABEL.PANDA_CSS,
      SKILL_LABEL.FIGMA,
      SKILL_LABEL.GIT_GITHUB,
      SKILL_LABEL.GITFLOW,
    ],
    images: [
      '/images/projects/blife-ecommerce.png',
      '/images/projects/blife-ecommerce-cart.png',
      '/images/projects/blife-ecommerce-products.png',
      '/images/projects/blife-ecommerce-checkout.png',
    ],
    link: 'https://blife.mx/',
  },
  {
    id: 2,
    title: 'Blife App Landing',
    subtitle: 'Landing Page',
    description:
      'Landing page para la promoción de la app de Blife, diseñada para maximizar la conversión de usuarios mediante una experiencia visual atractiva y una estructura clara de contenido.',
    bullets: [
      'Implementación de diseño responsive y mobile-first.',
      'Fidelidad pixel-perfect a diseños de Figma.',
      'Optimización de performance para mejorar tiempos de carga y retención.',
      'Aplicación de buenas prácticas de UI/UX para guiar al usuario hacia la descarga de la app.',
    ],
    skills: [
      SKILL_LABEL.ASTRO,
      SKILL_LABEL.REACT,
      SKILL_LABEL.JAVASCRIPT_ES6_PLUS,
      SKILL_LABEL.TAILWIND,
      SKILL_LABEL.FIGMA,
      SKILL_LABEL.GIT_GITHUB,
      SKILL_LABEL.GITFLOW,
    ],
    images: ['/images/projects/blife-app-landing.png'],
    link: 'https://blife.app/',
  },
  {
    id: 3,
    title: 'Plataforma B2B Mayoreo',
    subtitle: 'App Web',
    description:
      'Plataforma B2B para gestión de clientes mayoristas, donde participé en la refactorización completa del frontend, mejorando la mantenibilidad, escalabilidad y rendimiento del sistema.',
    bullets: [
      'Refactorización del frontend eliminando ~40% de código legacy.',
      'Optimización de performance reduciendo tiempos de carga ~50% (3s → 1.4–1.6s).',
      'Mejora de arquitectura de componentes para mayor escalabilidad.',
      'Homologación de UI/UX con otros productos de la empresa.',
    ],
    skills: [
      SKILL_LABEL.NEXT,
      SKILL_LABEL.REACT,
      SKILL_LABEL.JAVASCRIPT_ES6_PLUS,
      SKILL_LABEL.TAILWIND,
      SKILL_LABEL.FIGMA,
      SKILL_LABEL.GIT_GITHUB,
      SKILL_LABEL.GITFLOW,
    ],
    images: [
      '/images/projects/blife-b2b-mayoreo.png',
      '/images/projects/blife-b2b-mayoreo-products.png',
      '/images/projects/blife-b2b-mayoreo-search.png',
    ],
    link: 'https://www.mayoreo.blife.mx/',
  },
  {
    id: 4,
    title: 'BERP (Sistema ERP Interno)',
    subtitle: 'App Web',
    description:
      'Sistema ERP interno utilizado para la gestión operativa de la empresa, donde participé en el desarrollo, mantenimiento y mejora de distintos módulos, contribuyendo a la estabilidad del sistema y a la productividad del equipo.',
    bullets: [
      'Resolución de bugs y mantenimiento continuo en distintos módulos del sistema.',
      'Desarrollo de módulos desde cero para optimizar procesos internos.',
      'Refactorización de funcionalidades existentes aplicando buenas prácticas.',
      'Mejoras en la mantenibilidad del código facilitando el desarrollo de nuevos módulos.',
    ],
    skills: [
      SKILL_LABEL.NEXT,
      SKILL_LABEL.REACT,
      SKILL_LABEL.JAVASCRIPT_ES6_PLUS,
      SKILL_LABEL.TAILWIND,
      SKILL_LABEL.FIGMA,
      SKILL_LABEL.GIT_GITHUB,
      SKILL_LABEL.GITFLOW,
    ],
    images: ['/images/projects/berp-erp.png'],
    link: 'https://erp.blife.mx/login',
  },
  {
    id: 5,
    title: 'Portfolio Web (Legacy)',
    subtitle: 'App Web',
    description:
      'Versión inicial de mi portafolio personal, donde desarrollé mis primeras interfaces web aplicando fundamentos de desarrollo frontend y responsive design. Este proyecto representa mi evolución hacia mejores prácticas y arquitecturas modernas.',
    bullets: [
      'Desarrollo de interfaces responsivas y componentes reutilizables utilizando React.js',
      'Implementación de animaciones para mejorar la experiencia visual.',
      'Estructuración de secciones como proyectos, habilidades y contacto.',
      'Implementación de arquitectura de componentes, diseño responsive y metodología BEM para una mejor organización y mantenibilidad del código.',
    ],
    skills: [
      SKILL_LABEL.REACT,
      SKILL_LABEL.JAVASCRIPT_ES6_PLUS,
      SKILL_LABEL.HTML5,
      SKILL_LABEL.CSS3,
      SKILL_LABEL.GIT_GITHUB,
    ],
    images: ['/images/projects/portfolio-legacy.png'],
    link: 'https://frank345-sys.github.io/portfolio_web/',
    githubLink: 'https://github.com/Frank345-sys/portfolio_web',
  },
]

// ── Scroll sync (viewport ≥ `lg`, `useProjectsScrollSync`) ───────────────

/** Espera antes de actualizar `activeIndex` tras cambiar el bloque más visible (transición en panel lateral). */
export const PROJECTS_SCROLL_ACTIVE_INDEX_TRANSITION_MS = 200

/** Umbrales del `IntersectionObserver` para muestrear `intersectionRatio` por bloque de proyecto. */
export const PROJECTS_SCROLL_INTERSECTION_THRESHOLDS = [
  0.25, 0.4, 0.55, 0.7, 0.85,
] as const
