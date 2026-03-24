import { ANIMATION } from './animation'

const BASE = {
  title: 'text-text-strong leading-tight tracking-tight',
  paragraph: 'leading-relaxed',
  label: 'font-medium',
  link: ANIMATION.transition.colors,
} as const

const SIZE = {
  '4xl+': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  '3xl+': 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  'xl+': 'text-xl md:text-2xl lg:text-3xl',
  'base+': 'text-base sm:text-lg md:text-xl',
  'sm+': 'text-sm sm:text-base lg:text-lg',
  'xs+': 'text-xs sm:text-sm',
  xl: 'text-xl sm:text-2xl',
  base: 'text-base sm:text-lg',
  sm: 'text-sm sm:text-base',
  xs: 'text-xs sm:text-sm',
} as const

/**
 * Tokens de tipografía: títulos, párrafos, labels, links y variantes especiales.
 *
 * Links:
 * - Texto inline con estilo de enlace (párrafos, nav) → `TYPOGRAPHY.link.*`
 * - Link autónomo con ícono (`inline-flex`, `gap`)    → `BUTTON.special.link`
 *
 * Labels:
 * - Dentro de formularios  → `INPUT.label.*`
 * - Uso general en UI      → `TYPOGRAPHY.label.*`
 *
 * @example
 * ```tsx
 * <h1 className={TYPOGRAPHY.title.hero}>Título</h1>
 * <p className={TYPOGRAPHY.paragraph.primary}>Texto</p>
 * <a href="/about" className={TYPOGRAPHY.link.nav}>About</a>
 * ```
 */
export const TYPOGRAPHY = {
  title: {
    /** @use H1 — título principal de la página, máximo impacto. */
    hero: `${SIZE['4xl+']} font-bold ${BASE.title}`,

    /** @use H2 — título de sección. */
    section: `${SIZE['3xl+']} font-bold ${BASE.title}`,

    /** @use H3 — subtítulo de sección. */
    subsection: `${SIZE['xl+']} font-semibold ${BASE.title}`,

    /** @use H4–H5 — título pequeño dentro de un bloque de contenido. */
    small: `${SIZE['base+']} font-semibold ${BASE.title}`,

    /**
     * @use Título de card o panel — cabecera de componente.
     * @nocombine CARD.layout.title (son semánticamente equivalentes — usar uno u otro)
     */
    xsmall: `${SIZE['sm+']} font-medium ${BASE.title}`,

    /** @use Overline, etiqueta de sección, label sobre un título. */
    xxsmall: `${SIZE['xs+']} font-medium ${BASE.title}`,
  },

  paragraph: {
    /** @use Texto intro o lead — inmediatamente debajo del hero. */
    lead: `text-lg sm:text-xl md:text-2xl text-text-strong font-normal ${BASE.paragraph}`,

    /** @use Texto grande destacado — citas, bloques de intro en secciones. */
    large: `${SIZE.xl} text-text-strong ${BASE.paragraph}`,

    /** @use Texto principal del cuerpo — la mayoría del contenido de la página. */
    primary: `${SIZE.base} ${BASE.paragraph}`,

    /** @use Texto secundario — descripciones, metadatos, contenido de apoyo. */
    secondary: `${SIZE.sm} ${BASE.paragraph}`,

    /** @use Texto muted — notas al pie, aclaraciones, contenido de muy bajo énfasis. */
    muted: `${SIZE.sm} text-text-soft ${BASE.paragraph}`,

    /** @use Texto muy pequeño — timestamps, versiones, metadata auxiliar. */
    small: `${SIZE.xs} text-text-soft ${BASE.paragraph}`,
  },

  // Labels genéricos de UI. Para labels de formulario usar INPUT.label.*
  label: {
    /** @use Label de UI general — etiquetas, categorías, metadatos fuera de formularios. */
    default: `text-sm ${BASE.label}`,

    /** @use Label grande — cuando el contexto necesita más prominencia que default. */
    large: `text-base ${BASE.label}`,

    /** @use Label pequeño — etiquetas dentro de componentes compactos. */
    small: `text-xs ${BASE.label}`,

    /** @use Overline — categoría en mayúsculas sobre un título, etiqueta de sección. */
    overline: 'text-xs font-semibold uppercase tracking-widest text-text-soft',
  },

  // Links inline. Para links autónomos con ícono usar BUTTON.special.link
  link: {
    /**
     * @use Link dentro de párrafos o texto corrido — con underline visible.
     * @nocombine BUTTON.special.link (son para contextos distintos)
     */
    default: `text-information-base hover:text-information-dark underline underline-offset-2 ${BASE.link}`,

    /**
     * @use Link inline sin underline — cuando el contexto ya indica que es clickeable.
     * @nocombine BUTTON.special.link (son para contextos distintos)
     */
    plain: `text-information-base hover:text-information-dark ${BASE.link}`,

    /**
     * @use Links de navbar o sidebar — texto sutil que se oscurece al hover.
     * @nocombine BUTTON.special.link (son para contextos distintos)
     */
    nav: `hover:text-text-strong font-medium ${BASE.link}`,

    /**
     * @use Links del footer — tamaño reducido, color muy sutil.
     * @nocombine BUTTON.special.link (son para contextos distintos)
     */
    footer: `text-text-soft hover:text-text-subtle text-sm ${BASE.link}`,
  },

  special: {
    /** @use Palabras clave dentro de párrafos — resaltado inline sin color. */
    emphasis: 'text-text-strong font-medium',

    /** @use `<figcaption>` o `<caption>` — descripción de imágenes, gráficos y tablas. */
    caption: `${SIZE.xs} text-text-soft italic`,

    /** @use Código inline dentro de texto — variables, nombres de función, comandos cortos. */
    code: 'text-sm font-mono bg-bg-soft text-text-strong px-1.5 py-0.5 rounded',

    /** @use `<blockquote>` — citas textuales dentro de artículos o posts. */
    quote: 'text-lg sm:text-xl md:text-2xl italic',

    /** @use Número destacado o stat — métricas, counters, KPIs. */
    stat: 'text-xl sm:text-2xl md:text-3xl font-bold text-text-strong tabular-nums leading-tight',
  },
} as const

export type TypographyCategory = keyof typeof TYPOGRAPHY
export type TypographyVariant<C extends TypographyCategory> =
  keyof (typeof TYPOGRAPHY)[C]

export type TitleVariant = TypographyVariant<'title'>
export type ParagraphVariant = TypographyVariant<'paragraph'>
export type LabelVariant = TypographyVariant<'label'>
export type LinkVariant = TypographyVariant<'link'>
export type SpecialVariant = TypographyVariant<'special'>
