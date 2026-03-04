/**
 * Tokens de layout: contenedores, secciones, grids, flex, cards, hero, CTA, header, footer, divider.
 * Usar para espaciado, disposición y estructura de la página.
 *
 * @example
 * ```tsx
 * <section className={LAYOUT.section.default}>
 *   <div className={LAYOUT.container.full}>...</div>
 * </section>
 * ```
 */
export const LAYOUT = {
  container: {
    /** Contenedor principal de la landing - ancho completo */
    full: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',

    /** Contenedor extra ancho (para hero, features) */
    wide: 'w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8',

    /** Contenedor estrecho (about, blog, textos largos) */
    narrow: 'w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',

    /** Contenedor muy estrecho (formularios, CTA) */
    tight: 'w-full max-w-2xl mx-auto px-4 sm:px-6',

    /** Sin padding (para fullwidth backgrounds) */
    noPadding: 'w-full max-w-7xl mx-auto',

    /** Ancho máximo para cabeceras de sección (p. ej. título + descripción) */
    headerNarrow: 'max-w-3xl',
  },

  section: {
    /** Sección estándar con padding vertical */
    default: 'py-16 sm:py-20 md:py-24 lg:py-32',

    /** Sección compacta */
    compact: 'py-12 sm:py-16 md:py-20',

    /** Sección pequeña */
    small: 'py-8 sm:py-12 md:py-16',

    /** Hero section */
    hero: 'py-20 sm:py-24 md:py-32 lg:py-40',

    /** Footer section */
    footer: 'py-12 sm:py-16 md:py-20',
  },

  spacing: {
    /** Gap entre secciones */
    section: 'space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32',

    /** Gap estándar entre elementos */
    default: 'space-y-6 sm:space-y-8',

    /** Gap compacto */
    compact: 'space-y-4 sm:space-y-6',

    /** Gap pequeño */
    small: 'space-y-2 sm:space-y-3',

    /** Gap grande */
    large: 'space-y-8 sm:space-y-12 md:space-y-16',
  },

  grid: {
    /** Features / cards 3 columnas */
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8',

    /** Grid 4 columnas (logos, iconos) */
    cols4: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8',

    /** Grid 2 columnas (testimonios, pricing) */
    cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12',

    /** Hero split / about */
    split:
      'grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center',

    /** Auto-fit responsive grid */
    autoFit: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8',

    /** Masonry-like (different heights) */
    masonry:
      'columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8',
  },

  flex: {
    /** Header / navbar */
    between: 'flex items-center justify-between',

    /** Centrar todo */
    center: 'flex items-center justify-center',

    /** CTAs / buttons horizontal */
    row: 'flex flex-wrap items-center gap-3 sm:gap-4',

    /** Stack vertical con gap */
    stack: 'flex flex-col gap-4 sm:gap-6',

    /** Stack compacto */
    stackCompact: 'flex flex-col gap-2 sm:gap-3',

    /** Stack grande */
    stackLarge: 'flex flex-col gap-6 sm:gap-8 md:gap-12',

    /** Alinear al inicio */
    start: 'flex items-start gap-4',

    /** Wrap responsive */
    wrap: 'flex flex-wrap gap-4 sm:gap-6',

    /** Toggle/control en línea (label del ThemeToggle, etc.) */
    inlineToggle: 'inline-flex cursor-pointer items-center gap-3 select-none',
  },

  card: {
    /** Card estándar */
    default: 'bg-white rounded-lg border border-stroke-soft p-6 sm:p-8',

    /** Card con sombra */
    elevated:
      'bg-white rounded-lg border border-stroke-soft shadow-lg p-6 sm:p-8',

    /** Card interactiva */
    interactive:
      'bg-white rounded-lg border border-stroke-soft p-6 sm:p-8 hover:border-stroke-subtle transition-all hover:shadow-md',

    /** Card compacta */
    compact: 'bg-white rounded-lg border border-stroke-soft p-4 sm:p-6',

    /** Card con fondo subtle */
    subtle: 'bg-weak rounded-lg border border-stroke-soft p-6 sm:p-8',
  },

  hero: {
    /** Hero centrado */
    centered: 'text-center max-w-4xl mx-auto',

    /** Hero con contenido a la izquierda */
    left: 'max-w-2xl',

    /** Stack de hero (título + descripción + CTAs) */
    stack: 'flex flex-col gap-6 sm:gap-8',

    /** CTAs del hero */
    ctas: 'flex flex-wrap items-center gap-3 sm:gap-4 justify-center lg:justify-start',
  },

  cta: {
    /** Section de CTA centrada */
    section: 'text-center max-w-3xl mx-auto py-16 sm:py-20 md:py-24',

    /** CTA con background */
    banner: 'bg-weak rounded-2xl p-8 sm:p-12 md:p-16 text-center',

    /** Stack de CTA */
    stack: 'flex flex-col gap-4 sm:gap-6 items-center',
  },

  header: {
    /** Header sticky */
    sticky:
      'sticky top-0 z-50 bg-white border-b border-stroke-soft backdrop-blur-sm bg-white/80',

    /** Header con padding */
    wrapper: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4',

    /** Nav links */
    nav: 'hidden md:flex items-center gap-6 lg:gap-8',

    /** Mobile menu */
    mobileNav: 'flex md:hidden flex-col gap-4 p-4',
  },

  footer: {
    /** Footer wrapper */
    wrapper: 'bg-weak border-t border-stroke-soft',

    /** Footer grid (columnas) */
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12',

    /** Bottom bar (copyright, legal) */
    bottom: 'border-t border-stroke-soft pt-8 mt-8 text-center sm:text-left',
  },

  divider: {
    /** Divider horizontal */
    horizontal: 'w-full h-px bg-stroke-soft',

    /** Divider con margen vertical */
    section: 'w-full h-px bg-stroke-soft my-12 sm:my-16 md:my-20',
  },
} as const

/** Claves del objeto LAYOUT.container */
export type ContainerKey = keyof typeof LAYOUT.container
/** Claves del objeto LAYOUT.section */
export type SectionKey = keyof typeof LAYOUT.section
/** Claves del objeto LAYOUT.spacing */
export type SpacingKey = keyof typeof LAYOUT.spacing
/** Claves del objeto LAYOUT.grid */
export type GridKey = keyof typeof LAYOUT.grid
/** Claves del objeto LAYOUT.flex */
export type FlexKey = keyof typeof LAYOUT.flex
/** Claves del objeto LAYOUT.card */
export type CardKey = keyof typeof LAYOUT.card
/** Claves del objeto LAYOUT.hero */
export type HeroKey = keyof typeof LAYOUT.hero
/** Claves del objeto LAYOUT.cta */
export type CtaKey = keyof typeof LAYOUT.cta
/** Claves del objeto LAYOUT.header */
export type HeaderKey = keyof typeof LAYOUT.header
/** Claves del objeto LAYOUT.footer */
export type FooterKey = keyof typeof LAYOUT.footer
/** Claves del objeto LAYOUT.divider */
export type DividerKey = keyof typeof LAYOUT.divider
