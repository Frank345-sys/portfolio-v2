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

const PUBLIC_BASE_URL = import.meta.env.BASE_URL

function withBaseUrl(path: string): string {
  return `${PUBLIC_BASE_URL}${path.replace(/^\/+/, '')}`
}

/** Listado ordenado de proyectos mostrados en el portfolio. */
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-commerce Blife',
    subtitle: 'App Web',
    description:
      'El catálogo y el checkout debían escalar sin fragmentar la UI ni disparar el coste de mantenimiento. Organicé la tienda en componentes reutilizables (Next.js, TypeScript) y tokens con Panda CSS; integré catálogo, carrito y checkout con la API. Base compartida para iterar en conversión y consistencia de marca.',
    bullets: [
      'Problema: crecer catálogo y flujo de compra sin multiplicar deuda de estilos.',
      'Solución: sistema de UI tipado, design tokens y maquetación alineada a Figma.',
      'Impacto: menos retrabajo visual entre páginas y flujos más coherentes para el equipo.',
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
      withBaseUrl('images/projects/blife-ecommerce.png'),
      withBaseUrl('images/projects/blife-ecommerce-cart.png'),
      withBaseUrl('images/projects/blife-ecommerce-products.png'),
      withBaseUrl('images/projects/blife-ecommerce-checkout.png'),
    ],
    link: 'https://blife.mx/',
  },
  {
    id: 2,
    title: 'Blife App Landing',
    subtitle: 'Landing Page',
    description:
      'La app necesitaba descargas cualificadas: la landing tenía que cargar bien en móvil y llevar a un CTA claro. Implementé Astro con React donde aporta interactividad, Tailwind y enfoque mobile-first; prioridad a performance y jerarquía de contenido hacia la descarga.',
    bullets: [
      'Problema: convertir visitas en descargas sin sacrificar el primer render en redes móviles.',
      'Solución: menos JS en el cliente con Astro; UI fiel a Figma y responsive.',
      'Impacto: recorrido explícito hacia el CTA y criterios de performance para retención.',
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
    images: [withBaseUrl('images/projects/blife-app-landing.png')],
    link: 'https://blife.app/',
  },
  {
    id: 3,
    title: 'Plataforma B2B Mayoreo',
    subtitle: 'App Web',
    description:
      'El frontend B2B arrastraba deuda, tiempos de carga altos y UX desalineada con otros productos. Participé en una refactorización orientada a mantenibilidad: menos superficie de código, componentes más predecibles y carga mucho más rápida, alineando patrones de UI con el resto de la compañía.',
    bullets: [
      'Problema: legacy difícil de extender y percepción de lentitud en uso real.',
      'Solución: arquitectura de componentes con Next.js/React/Tailwind; limpieza sistemática de deuda.',
      'Impacto: ~40% menos código de frontend; carga ≈50% más rápida (≈3s → ≈1,4–1,6s) en el refactor clave.',
      'Resultado: UI homogénea con el ecosistema de producto; menos riesgo en cada entrega.',
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
      withBaseUrl('images/projects/blife-b2b-mayoreo.png'),
      withBaseUrl('images/projects/blife-b2b-mayoreo-products.png'),
      withBaseUrl('images/projects/blife-b2b-mayoreo-search.png'),
    ],
    link: 'https://www.mayoreo.blife.mx/',
  },
  {
    id: 4,
    title: 'BERP (Sistema ERP Interno)',
    subtitle: 'App Web',
    description:
      'El ERP soporta operación diaria: fallos o ambigüedad cuestan tiempo al negocio. Trabajé en módulos críticos combinando mantenimiento, nuevas piezas de UI y refactors puntuales para bajar riesgo y facilitar extensiones. Entorno interno; detalle bajo NDA en entrevista.',
    bullets: [
      'Problema: software interno donde errores afectan productividad de equipos completos.',
      'Solución: ciclos de estabilidad, flujos nuevos donde desbloquean procesos, código más mantenible.',
      'Impacto: base más segura para sumar módulos sin paralizar operación.',
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
    images: [withBaseUrl('images/projects/berp-erp.png')],
  },
  {
    id: 5,
    title: 'Portfolio v1 (histórico)',
    subtitle: 'App Web',
    description:
      'Primera versión pública de mi sitio: práctica con React, layout responsive, animaciones y estructura por secciones. Base de aprendizaje; el portfolio actual reemplaza este enfoque con un stack y estándar al día.',
    bullets: [
      'Contexto: presencia en línea y ejercicio de componentes, routing y BEM.',
      'Enfoque: secciones de proyectos, skills y contacto; animaciones ligeras.',
      'Cierre: referencia de evolución, no de producto en misma categoría que el trabajo en Blife.',
    ],
    skills: [
      SKILL_LABEL.REACT,
      SKILL_LABEL.JAVASCRIPT_ES6_PLUS,
      SKILL_LABEL.HTML5,
      SKILL_LABEL.CSS3,
      SKILL_LABEL.GIT_GITHUB,
    ],
    images: [withBaseUrl('images/projects/portfolio-legacy.png')],
    link: 'https://frank345-sys.github.io/portfolio_web/',
    githubLink: 'https://github.com/Frank345-sys/portfolio_web',
  },
]

// ── Scroll sync (viewport ≥ `lg`, `useProjectsScrollSync`) ───────────────

/** Espera antes de actualizar `activeIndex` tras cambiar el bloque más visible (transición en panel lateral). */
export const PROJECTS_SCROLL_ACTIVE_INDEX_TRANSITION_MS = 150

/** Umbrales del `IntersectionObserver` para muestrear `intersectionRatio` por bloque de proyecto. */
export const PROJECTS_SCROLL_INTERSECTION_THRESHOLDS = [
  0.25, 0.4, 0.55, 0.7, 0.85,
] as const
