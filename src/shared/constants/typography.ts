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
      'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-strong leading-tight',

    /** Subtítulo de sección */
    subsection: 'text-xl sm:text-2xl md:text-3xl font-semibold text-strong',

    /** Título de card/componente */
    card: 'text-lg sm:text-xl md:text-2xl font-semibold text-strong',

    /** Título pequeño */
    small: 'text-base sm:text-lg md:text-xl font-semibold text-strong',
  },

  heading: {
    /** H1 */
    h1: 'text-4xl sm:text-5xl md:text-6xl font-bold text-strong',

    /** H2 */
    h2: 'text-3xl sm:text-4xl md:text-5xl font-bold text-strong',

    /** H3 */
    h3: 'text-2xl sm:text-3xl md:text-4xl font-semibold text-strong',

    /** H4 */
    h4: 'text-xl sm:text-2xl md:text-3xl font-semibold text-strong',

    /** H5 */
    h5: 'text-lg sm:text-xl md:text-2xl font-semibold text-strong',

    /** H6 */
    h6: 'text-base sm:text-lg md:text-xl font-medium text-strong',
  },

  paragraph: {
    /** Texto principal - lectura cómoda */
    primary: 'text-base sm:text-lg text-subtle leading-relaxed',

    /** Texto secundario */
    secondary: 'text-sm sm:text-base text-subtle leading-relaxed',

    /** Lead/intro debajo del hero */
    lead: 'text-lg sm:text-xl md:text-2xl text-subtle leading-relaxed font-normal',

    /** Texto grande destacado */
    large: 'text-xl sm:text-2xl text-subtle leading-relaxed',

    /** Texto muted/apoyo */
    muted: 'text-sm sm:text-base text-soft leading-relaxed',

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

    /** Overline/eyebrow (texto sobre títulos) */
    overline:
      'text-xs sm:text-sm font-semibold text-subtle uppercase tracking-wider',

    /** Badge/pill text */
    badge: 'text-xs font-semibold uppercase tracking-wide',
  },

  link: {
    /** Link estándar */
    default:
      'text-information-base hover:text-information-dark underline underline-offset-2 transition-colors',

    /** Link sin underline */
    plain:
      'text-information-base hover:text-information-dark transition-colors',

    /** Link en navegación */
    nav: 'text-subtle hover:text-strong transition-colors font-medium',

    /** Link en footer */
    footer: 'text-soft hover:text-subtle transition-colors text-sm',
  },

  special: {
    /** Caption/descripción pequeña */
    caption: 'text-xs sm:text-sm text-soft italic',

    /** Código inline */
    code: 'text-sm font-mono bg-soft text-strong px-1.5 py-0.5 rounded',

    /** Quote */
    quote: 'text-lg sm:text-xl md:text-2xl text-subtle italic leading-relaxed',

    /** Número destacado/stat */
    stat: 'text-4xl sm:text-5xl md:text-6xl font-bold text-strong tabular-nums',

    /** Precio */
    price:
      'text-3xl sm:text-4xl md:text-5xl font-bold text-strong tabular-nums',
  },

  /**
   * Clases base sin color (para composición con CVA)
   */
  base: {
    h1: 'text-4xl sm:text-5xl md:text-6xl font-bold leading-tight',
    h2: 'text-3xl sm:text-4xl md:text-5xl font-bold leading-tight',
    h3: 'text-2xl sm:text-3xl md:text-4xl font-semibold',
    h4: 'text-xl sm:text-2xl md:text-3xl font-semibold',
    h5: 'text-lg sm:text-xl md:text-2xl font-semibold',
    h6: 'text-base sm:text-lg md:text-xl font-medium',
    p: 'text-base sm:text-lg leading-relaxed',
    lead: 'text-lg sm:text-xl md:text-2xl leading-relaxed',
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
