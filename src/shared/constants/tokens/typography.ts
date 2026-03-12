import { ANIMATION } from './animation'

/**
 * Tokens de tipografía para títulos, párrafos, labels, links y variantes especiales.
 * Usar en lugar de clases Tailwind sueltas para mantener consistencia.
 *
 * @example
 * ```tsx
 * <h1 className={TYPOGRAPHY.title.hero}>Título</h1>
 * <p className={TYPOGRAPHY.paragraph.primary}>Texto</p>
 * ```
 */
export const TYPOGRAPHY = {
  title: {
    /** Hero principal - máximo impacto */
    hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-strong leading-tight tracking-tight',

    /** Título de sección */
    section:
      'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-strong leading-tight tracking-tight',

    /** Subtítulo de sección */
    subsection:
      'text-xl sm:text-2xl md:text-3xl font-semibold text-strong leading-tight tracking-tight',

    /** Título de card/componente */
    card: 'text-lg sm:text-xl md:text-2xl font-semibold text-strong leading-tight',

    /** Título pequeño */
    small:
      'text-base sm:text-lg md:text-xl font-semibold text-strong leading-tight',
  },

  heading: {
    /** H1 */
    h1: 'text-4xl sm:text-5xl md:text-6xl font-bold text-strong leading-tight tracking-tight',

    /** H2 */
    h2: 'text-3xl sm:text-4xl md:text-5xl font-bold text-strong leading-tight tracking-tight',

    /** H3 */
    h3: 'text-2xl sm:text-3xl md:text-4xl font-semibold text-strong leading-tight tracking-tight',

    /** H4 */
    h4: 'text-xl sm:text-2xl md:text-3xl font-semibold text-strong leading-tight tracking-tight',

    /** H5 */
    h5: 'text-lg sm:text-xl md:text-2xl font-semibold text-strong leading-tight',

    /** H6 */
    h6: 'text-base sm:text-lg md:text-xl font-medium text-strong leading-tight',
  },

  paragraph: {
    /** Texto principal */
    primary: 'text-base sm:text-lg text-subtle',

    /** Texto secundario */
    secondary: 'text-sm sm:text-base text-subtle',

    /** Lead/intro debajo del hero */
    lead: 'text-lg sm:text-xl md:text-2xl text-subtle font-normal',

    /** Texto grande destacado */
    large: 'text-xl sm:text-2xl text-subtle',

    /** Texto muted/apoyo */
    muted: 'text-sm sm:text-base text-soft',

    /** Texto muy pequeño */
    small: 'text-xs sm:text-sm text-soft',
  },

  label: {
    /** Labels estándar */
    default: 'text-sm font-medium text-strong',

    /** Labels grandes */
    large: 'text-base font-medium text-strong',

    /** Labels pequeños */
    small: 'text-xs font-medium text-subtle',

    /** Overline/eyebrow */
    overline:
      'text-xs sm:text-sm font-semibold text-subtle uppercase tracking-widest',

    /** Badge/pill text */
    badge: 'text-xs font-semibold uppercase tracking-wide',
  },

  link: {
    /** Link estándar */
    default: `text-information-base hover:text-information-dark underline underline-offset-2 ${ANIMATION.transition.colors}`,

    /** Link sin underline */
    plain: `text-information-base hover:text-information-dark ${ANIMATION.transition.colors}`,

    /** Link en navegación */
    nav: `text-subtle hover:text-strong ${ANIMATION.transition.colors} font-medium`,

    /** Link en footer */
    footer: `text-soft hover:text-subtle ${ANIMATION.transition.colors} text-sm`,
  },

  special: {
    /** Caption/descripción pequeña */
    caption: 'text-xs sm:text-sm text-soft italic',

    /** Código inline */
    code: 'text-sm font-mono bg-soft text-strong px-1.5 py-0.5 rounded',

    /** Quote */
    quote: 'text-lg sm:text-xl md:text-2xl text-subtle italic',

    /** Número destacado/stat */
    stat: 'text-xl sm:text-2xl md:text-3xl font-bold text-strong tabular-nums leading-tight',

    /** Precio */
    price:
      'text-3xl sm:text-4xl md:text-5xl font-bold text-strong tabular-nums leading-tight',
  },

  base: {
    h1: 'text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight',
    h2: 'text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight',
    h3: 'text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight',
    h4: 'text-xl sm:text-2xl md:text-3xl font-semibold leading-tight tracking-tight',
    h5: 'text-lg sm:text-xl md:text-2xl font-semibold leading-tight',
    h6: 'text-base sm:text-lg md:text-xl font-medium leading-tight',
    p: 'text-base sm:text-lg',
    lead: 'text-lg sm:text-xl md:text-2xl',
    small: 'text-sm sm:text-base',
    xs: 'text-xs sm:text-sm',
  },
} as const

/** Claves del objeto TYPOGRAPHY.title */
export type TitleVariant = keyof typeof TYPOGRAPHY.title
/** Claves del objeto TYPOGRAPHY.heading */
export type HeadingVariant = keyof typeof TYPOGRAPHY.heading
/** Claves del objeto TYPOGRAPHY.paragraph */
export type ParagraphVariant = keyof typeof TYPOGRAPHY.paragraph
/** Claves del objeto TYPOGRAPHY.label */
export type LabelVariant = keyof typeof TYPOGRAPHY.label
/** Claves del objeto TYPOGRAPHY.link */
export type LinkVariant = keyof typeof TYPOGRAPHY.link
/** Claves del objeto TYPOGRAPHY.special */
export type SpecialVariant = keyof typeof TYPOGRAPHY.special
/** Claves del objeto TYPOGRAPHY.base */
export type BaseVariant = keyof typeof TYPOGRAPHY.base
