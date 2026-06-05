/**
 * Identidad pública del titular en el portfolio: nombre, rol, iniciales, contacto,
 * enlaces sociales y textos de SEO reutilizados en `index.html` (vía `transformIndexHtml` en Vite).
 *
 * @module shared/constants/siteProfile
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.
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

/** Sufijo alineado con el título de `index.html` y OG/Twitter (≤60 caracteres en conjunto). */
const PAGE_TITLE_STACK = 'React & TypeScript' as const

/**
 * Título de documento, Open Graph y Twitter (~50 caracteres; validado en `siteProfile.seo.test.ts`).
 */
export const SITE_PAGE_TITLE =
  `${SITE_DISPLAY_NAME} · ${PAGE_TITLE_STACK}` as const

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

/**
 * Correo público de contacto. Cadena vacía (o solo espacios) oculta la tarjeta
 * `mailto` en Contact; derivaciones en {@link SITE_CONTACT_EMAIL_TRIMMED} y
 * {@link SITE_CONTACT_EMAIL_HREF}.
 */
export const SITE_CONTACT_EMAIL = 'francgonzalez456@gmail.com' as const

const siteContactEmailTrimmed = SITE_CONTACT_EMAIL.trim()

/**
 * Mismo correo sin espacios; cadena vacía si el valor solo tiene espacios.
 * Fuente única para `mailto`, `security.txt` (build Vite) y la sección contacto.
 */
export const SITE_CONTACT_EMAIL_TRIMMED = siteContactEmailTrimmed

/**
 * `mailto:…` listo para `href`, o `''` si no hay correo.
 */
export const SITE_CONTACT_EMAIL_HREF = siteContactEmailTrimmed
  ? `mailto:${siteContactEmailTrimmed}`
  : ''

/**
 * Perfiles y mensajería (misma fuente que tarjetas de contacto y `sameAs` en JSON-LD vía Vite).
 * Claves alineadas con `CONTACT_PROFILE` en `ContactSection/constants.ts` (reexportación).
 */
export const SITE_SOCIAL_HREFS = {
  githubHref: 'https://github.com/Frank345-sys',
  linkedinHref: 'https://www.linkedin.com/in/francisco-omar-h-glez-utrera/',
  /** Enlace wa.me con mensaje prellenado para abrir chat en WhatsApp Web o la app. */
  whatsAppHref:
    'https://wa.me/522283111621?text=Hola,%20vi%20tu%20perfil%20y%20me%20gustaría%20contactarte.',
  /** Perfil público `t.me/…` (usuario sin `@`). */
  telegramHref: 'https://t.me/FrankOmar456',
} as const

/**
 * Slug del repo público del portfolio v1 (histórico), bajo la cuenta de `githubHref`.
 */
const SITE_GITHUB_REPO_SLUG_PORTFOLIO_WEB = 'portfolio_web' as const

/**
 * URL al repo del portfolio legacy en GitHub (código). Derivado de `SITE_SOCIAL_HREFS.githubHref`.
 */
export const SITE_GITHUB_REPO_PORTFOLIO_WEB_HREF =
  `${SITE_SOCIAL_HREFS.githubHref}/${SITE_GITHUB_REPO_SLUG_PORTFOLIO_WEB}` as const

/**
 * Sitio publicado en GitHub Pages del portfolio v1 (`{usuario}.github.io/{slug}/`).
 * Usuario tomado de `githubHref` en minúsculas (convención de Pages).
 */
export const SITE_GITHUB_PAGES_PORTFOLIO_WEB_HREF =
  `https://${SITE_SOCIAL_HREFS.githubHref.replace(/^https:\/\/github\.com\//u, '').toLowerCase()}.github.io/${SITE_GITHUB_REPO_SLUG_PORTFOLIO_WEB}/` as const
