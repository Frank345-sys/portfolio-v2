/**
 * Identidad pública del titular en el portfolio: nombre, rol, iniciales y textos
 * de SEO reutilizados en `index.html` (vía `transformIndexHtml` en Vite).
 *
 * @module shared/constants/siteProfile
 */
export const SITE_PROFILE = {
  firstName: 'Frank',
  lastName: 'González',
  role: 'Frontend engineer',
  /** Iniciales del avatar; alinear con `firstName` y `lastName`. */
  initials: 'FG',
} as const

/**
 * Nombre en pantalla (h1, about, pie, `aria-label`, metadatos).
 * Derivado de {@link SITE_PROFILE} para no duplicar cadenas.
 */
export const SITE_DISPLAY_NAME =
  `${SITE_PROFILE.firstName} ${SITE_PROFILE.lastName}` as const

/**
 * Línea de propuesta: hero, pie y biografía (Quién soy). La segunda parte
 * del tagline del hero (stack y enfoque) vive en `ABOUT_HERO` en
 * `AboutSection/constants`.
 */
export const SITE_TAGLINE =
  'Interfaces de producto en React/TypeScript: performance medible, patrones reutilizables y UI fiel a diseño.' as const

/**
 * Línea breve bajo el rol en el hero: visible para *keyword scan* (reclutamiento).
 * Coherente con el título de página y con el stack en About.
 */
export const HERO_STACK_HIGHLIGHT = 'React · TypeScript · Next.js' as const

/** Sufijo alineado con el título de `index.html` y OG/Twitter. */
const PAGE_TITLE_STACK = 'React & TypeScript' as const

/**
 * Título de documento, Open Graph y Twitter.
 */
export const SITE_PAGE_TITLE =
  `${SITE_DISPLAY_NAME} — ${SITE_PROFILE.role} | ${PAGE_TITLE_STACK}` as const

/**
 * Meta `description` principal (larga).
 */
export const SITE_META_DESCRIPTION =
  `Portfolio de ${SITE_DISPLAY_NAME}, ${SITE_PROFILE.role}: e-commerce, B2B y ERP en React/TypeScript, con foco en rendimiento, a11y y fidelidad a Figma.` as const

/**
 * Meta `description` para OG y Twitter (más breve, sin cierre con “Diseño…”).
 */
export const SITE_META_DESCRIPTION_SHORT =
  `Portfolio de ${SITE_DISPLAY_NAME}, ${SITE_PROFILE.role} — e-commerce, B2B y producto con React/TypeScript.` as const

/**
 * `description` en JSON-LD `Person` (frase con rol).
 */
export const SITE_JSONLD_DESCRIPTION =
  `${SITE_PROFILE.role} — React, TypeScript, interfaces accesibles y de alto rendimiento` as const
