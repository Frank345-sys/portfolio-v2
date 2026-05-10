import {
  SITE_GITHUB_PAGES_PORTFOLIO_WEB_HREF,
  SITE_GITHUB_REPO_PORTFOLIO_WEB_HREF,
} from '@/shared/constants/siteProfile'
import { SKILL_LABEL } from '@/shared/constants/skills'
import { withSiteBaseUrl } from '@/shared/utils/withSiteBaseUrl'

import type { Project } from '../types'

/** Datos de dominio para la sección Proyectos. */
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-commerce Blife',
    subtitle: 'App Web',
    description:
      'El catálogo y el checkout debían escalar sin fragmentar la UI ni disparar el mantenimiento. Organicé la tienda en componentes reutilizables (Next.js, TypeScript) y estilicé con Panda CSS; integré catálogo, carrito y checkout con la API. Base compartida para iterar en conversión y consistencia.',
    bullets: [
      '**Problema:** Crecer catálogo y flujo de compra sin multiplicar deuda de estilos.',
      '**Solución:** Sistema de UI tipado, design tokens y maquetación alineada a Figma.',
      '**Impacto:** Menos retrabajo visual entre catálogo, carrito y checkout; criterio único de estilos.',
      '**Resultado:** La tienda puede sumar módulos y campañas sin reescribir la base de componentes en cada entrega.',
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
      withSiteBaseUrl('images/projects/blife-ecommerce.png'),
      withSiteBaseUrl('images/projects/blife-ecommerce-cart.png'),
      withSiteBaseUrl('images/projects/blife-ecommerce-products.png'),
      withSiteBaseUrl('images/projects/blife-ecommerce-checkout.png'),
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
      '**Problema:** Convertir visitas en descargas sin sacrificar el primer render en redes móviles.',
      '**Solución:** Menos JS en el cliente con Astro; UI fiel a Figma y responsive.',
      '**Impacto:** Jerarquía de contenido clara hacia el CTA; prioridad a performance y a la primera impresión.',
      '**Resultado:** Landing lista para afinar copy y experimentos, sin rehacer la estructura.',
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
    images: [withSiteBaseUrl('images/projects/blife-app-landing.png')],
    link: 'https://blife.app/',
  },
  {
    id: 3,
    title: 'Plataforma B2B Mayoreo',
    subtitle: 'App Web',
    description:
      'El frontend B2B arrastraba deuda, tiempos de carga altos y UX desalineada con otros productos. Participé en una refactorización orientada a mantenibilidad: menos superficie de código, componentes más predecibles y carga mucho más rápida, alineando patrones de UI con el resto de la compañía.',
    bullets: [
      '**Problema:** Legacy difícil de extender y percepción de lentitud en uso real.',
      '**Solución:** Arquitectura de componentes con Next.js/React/Tailwind; limpieza sistemática de deuda.',
      '**Impacto:** ~40% menos código de frontend; carga ≈50% más rápida (≈3s → ≈1,4–1,6s) en el refactor clave.',
      '**Resultado:** UI homogénea con el ecosistema de producto; menos riesgo en cada entrega.',
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
      withSiteBaseUrl('images/projects/blife-b2b-mayoreo.png'),
      withSiteBaseUrl('images/projects/blife-b2b-mayoreo-products.png'),
      withSiteBaseUrl('images/projects/blife-b2b-mayoreo-search.png'),
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
      '**Problema:** Software interno donde errores afectan productividad de equipos completos.',
      '**Solución:** Ciclos de estabilidad, flujos nuevos donde desbloquean procesos, código más mantenible.',
      '**Impacto:** Menos fricción en módulos tocados; el front se entiende y extiende con menos riesgo.',
      '**Resultado:** El ERP puede crecer en pantallas y flujos sin paralizar la operación diaria.',
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
    images: [withSiteBaseUrl('images/projects/berp-erp.png')],
  },
  {
    id: 5,
    title: 'Portfolio v1 (histórico)',
    subtitle: 'App Web',
    description:
      'Primera versión pública de mi sitio: práctica con React, layout responsive, animaciones y estructura por secciones. Base de aprendizaje; el portfolio actual reemplaza este enfoque con un stack y estándar al día.',
    bullets: [
      '**Problema:** Faltaba un sitio propio y un sandbox para practicar estructura, layout y despliegue.',
      '**Solución:** React, secciones (proyectos, skills, contacto), BEM y animaciones ligeras; hosting estático.',
      '**Impacto:** Consolidé componentes, routing y criterios responsive sin depender de un back propio.',
      '**Resultado:** Base de aprendizaje sustituida por este portfolio; deja trazable la evolución de stack y estándares.',
    ],
    skills: [
      SKILL_LABEL.REACT,
      SKILL_LABEL.JAVASCRIPT_ES6_PLUS,
      SKILL_LABEL.HTML5,
      SKILL_LABEL.CSS3,
      SKILL_LABEL.GIT_GITHUB,
    ],
    images: [withSiteBaseUrl('images/projects/portfolio-legacy.png')],
    link: SITE_GITHUB_PAGES_PORTFOLIO_WEB_HREF,
    githubLink: SITE_GITHUB_REPO_PORTFOLIO_WEB_HREF,
  },
]
