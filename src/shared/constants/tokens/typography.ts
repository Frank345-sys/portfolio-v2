/**
 * Constantes compartidas del proyecto (`shared/constants/tokens/typography.ts`).
 *
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.
 */

import { cn } from '@/shared/utils/cn'

import { ANIMATION } from './animation'

// ─────────────────────────────────────────────────────────────────────────────
// Bases y escalas (interno)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clases base por categoría tipográfica.
 * Se usan como primer argumento en `cn()` dentro de cada token.
 *
 * @internal
 */
const BASE = {
  title: 'text-text-strong leading-tight tracking-tight',
  paragraph: 'leading-relaxed',
  label: 'font-medium',
  link: ANIMATION.transition.colors,
} as const

/**
 * Escala de tamaños responsivos.
 * Clave con `+` indica progresión fluida entre breakpoints.
 *
 * @internal
 */
const SIZE = {
  '4xl+': 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  '3xl+': 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  'xl+': 'text-xl sm:text-2xl md:text-3xl',
  'lg+': 'text-lg sm:text-xl md:text-2xl',
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
 * - Cada variante de link es autocontenida (incluye tamaño).
 *
 * Labels:
 * - Dentro de formularios  → `INPUT.label.*`
 * - Uso general en UI      → `TYPOGRAPHY.label.*`
 *
 * **Orden en este archivo:** imports → `BASE` / `SIZE` internos → {@link TYPOGRAPHY} → {@link PRIMARY_NAV_LINK}.
 *
 * @example
 * ```tsx
 * <h1 className={TYPOGRAPHY.title.hero}>Título</h1>
 * <p className={TYPOGRAPHY.paragraph.primary}>Texto</p>
 * <a href="/about" className={TYPOGRAPHY.link.nav}>About</a>
 * ```
 */
export const TYPOGRAPHY = {
  // ── Títulos ───────────────────────────────────────────────────────────────
  title: {
    /** @use H1 — título principal de la página, máximo impacto. */
    hero: cn(BASE.title, SIZE['4xl+'], 'font-bold'),

    /** @use H2 — título de sección. */
    section: cn(BASE.title, SIZE['3xl+'], 'font-bold'),

    /** @use H3 — subtítulo de sección. */
    subsection: cn(BASE.title, SIZE['xl+'], 'font-semibold'),

    /** @use H4–H5 — título pequeño dentro de un bloque de contenido. */
    small: cn(BASE.title, SIZE['base+'], 'font-semibold'),

    /**
     * @use Título de card o panel — cabecera de componente.
     * @nocombine CARD.layout.title (son semánticamente equivalentes — usar uno u otro)
     */
    xsmall: cn(BASE.title, SIZE['sm+'], 'font-medium'),

    /** @use Overline, etiqueta de sección, label sobre un título. */
    xxsmall: cn(BASE.title, SIZE['xs+'], 'font-medium'),
  },

  // ── Párrafos ──────────────────────────────────────────────────────────────
  paragraph: {
    /** @use Texto intro o lead — inmediatamente debajo del hero. */
    lead: cn(BASE.paragraph, SIZE['lg+'], 'text-text-strong font-normal'),

    /** @use Texto grande destacado — citas, bloques de intro en secciones. */
    large: cn(BASE.paragraph, SIZE.xl, 'text-text-strong'),

    /** @use Texto principal del cuerpo — la mayoría del contenido de la página. */
    primary: cn(BASE.paragraph, SIZE.base),

    /** @use Texto secundario — descripciones, metadatos, contenido de apoyo. */
    secondary: cn(BASE.paragraph, SIZE.sm),

    /** @use Texto muy pequeño — timestamps, versiones, metadata auxiliar. */
    small: cn(BASE.paragraph, SIZE.xs),

    /** @use Texto muted — notas al pie, aclaraciones, contenido de muy bajo énfasis. */
    muted: cn(BASE.paragraph, SIZE.sm, 'text-text-subtle'),
  },

  // ── Labels (UI general; formularios → INPUT.label.*) ─────────────────────
  label: {
    /** @use Label de UI general — etiquetas, categorías, metadatos fuera de formularios. */
    default: cn(BASE.label, 'text-base'),

    /** @use Label grande — cuando el contexto necesita más prominencia que default. */
    large: cn(BASE.label, 'text-lg'),

    /** @use Label pequeño — etiquetas dentro de componentes compactos. */
    small: cn(BASE.label, 'text-sm'),

    /** @use Overline — categoría en mayúsculas sobre un título, etiqueta de sección. */
    overline:
      'text-xs font-semibold uppercase tracking-widest text-text-subtle',
  },

  // ── Links inline ──────────────────────────────────────────────────────────
  // Cada variante incluye su tamaño; son autocontenidas y no requieren
  // combinarse con paragraph.* externamente.
  link: {
    /**
     * @use Link dentro de párrafos o texto corrido — con underline visible.
     */
    default: cn(
      BASE.link,
      SIZE.sm,
      'text-information-base hover:text-information-dark',
      'underline underline-offset-2'
    ),

    /**
     * @use Link inline sin underline — cuando el contexto ya indica que es clickeable.
     */
    plain: cn(
      BASE.link,
      SIZE.sm,
      'text-information-base hover:text-information-dark'
    ),

    /**
     * @use Links de navbar o sidebar — texto sutil que se oscurece al hover.
     */
    nav: cn(BASE.link, SIZE.sm, 'hover:text-text-strong font-medium'),

    /**
     * @use Links del footer — tamaño reducido, color muy sutil.
     */
    footer: cn(BASE.link, SIZE.xs, 'text-text-subtle hover:text-text-strong'),
  },

  // ── Uso especial (énfasis, código, citas, stats) ──────────────────────────
  special: {
    /**
     * @use Palabras clave dentro de párrafos — resaltado inline sin color.
     * @remarks Modificador puro (sin token de tamaño); hereda el tamaño del texto circundante.
     */
    emphasis: 'text-text-strong font-medium',

    /** @use `<figcaption>` o `<caption>` — descripción de imágenes, gráficos y tablas. */
    caption: cn(SIZE.xs, 'text-text-subtle italic'),

    /** @use Código inline dentro de texto — variables, nombres de función, comandos cortos. */
    code: cn(
      SIZE.xs,
      'bg-bg-soft text-text-strong rounded px-1.5 py-0.5 font-mono'
    ),

    /** @use `<blockquote>` — citas textuales dentro de artículos o posts. */
    quote: cn(SIZE['lg+'], 'italic'),

    /** @use Número destacado o stat — métricas, counters, KPIs. */
    stat: cn(
      SIZE['xl+'],
      'text-text-strong leading-tight font-bold tabular-nums'
    ),
  },
} as const
