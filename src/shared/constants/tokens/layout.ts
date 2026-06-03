/**
 * Constantes compartidas del proyecto (`shared/constants/tokens/layout.ts`).
 *
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.
 */

import { cn } from '@/shared/utils/cn'

// ─────────────────────────────────────────────────────────────────────────────
// Fragmentos internos (no exportar)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clases base compartidas por todos los containers.
 *
 * @internal
 */
const base = 'w-full mx-auto'

/**
 * Padding horizontal estándar — compartido como constante interna y exportado
 * en `LAYOUT.px` para uso externo via `cn()`.
 *
 * @internal
 */
const px = 'px-6 sm:px-8 md:px-10 lg:px-12'

/**
 * Tokens de layout: contenedores, secciones, spacing, grids, prose, overlay y divider.
 *
 * **Orden en este archivo:** constantes internas (`base`, `px`) → {@link LAYOUT}
 * (bloques: `px` → `container` → `section` → `spacing` → `grid` → `prose` → `overlay` → `divider`).
 *
 * Padding horizontal:
 * Los containers NO incluyen `px` por defecto — añadir `LAYOUT.px` con `cn()`
 * cuando el contenedor necesita margen lateral. Todos los containers comparten
 * el mismo valor de `px` para garantizar alineación entre secciones.
 *
 * @example
 * ```tsx
 * <section className={LAYOUT.section.default}>
 *   <div className={cn(LAYOUT.container.full, LAYOUT.px)}>...</div>
 * </section>
 * ```
 */
export const LAYOUT = {
  // ── Padding horizontal ────────────────────────────────────────────────────
  /**
   * @use Padding horizontal estándar — combinar con cualquier container via `cn()`.
   * @combine LAYOUT.container.* siempre via `cn()` — los containers no lo incluyen por defecto.
   * @warning Todos los containers de una misma sección deben usar el mismo `px`
   *          para mantener la alineación visual entre ellos.
   */
  px,

  // ── Contenedores ──────────────────────────────────────────────────────────
  container: {
    /**
     * @use Hero sections, features, grids de máximo ancho (`max-w-[1400px]`).
     * @combine LAYOUT.px via `cn()` cuando necesita margen lateral.
     */
    wide: cn(base, 'max-w-[1400px]'),

    /**
     * @use Contenedor principal de página — la mayoría de las secciones (`max-w-7xl`).
     * @combine LAYOUT.px via `cn()` cuando necesita margen lateral.
     */
    full: cn(base, 'max-w-7xl'),

    /**
     * @use Timelines, textos largos, contenido lineal donde prima la legibilidad (`max-w-5xl`).
     * @combine LAYOUT.px via `cn()` cuando necesita margen lateral.
     */
    narrow: cn(base, 'max-w-5xl'),

    /**
     * @use Formularios, CTAs aislados, contenido centrado estrecho (`max-w-2xl`).
     * @combine LAYOUT.px via `cn()` cuando necesita margen lateral.
     */
    tight: cn(base, 'max-w-2xl'),
  },

  // ── Secciones (eje vertical) ──────────────────────────────────────────────
  section: {
    /** @use Sección estándar con padding generoso — la mayoría de las secciones de página. */
    default: 'py-20 md:py-22 lg:py-24',
  },

  // ── Espaciado entre hijos ─────────────────────────────────────────────────
  spacing: {
    /** @use Separación entre sub-bloques dentro de una misma sección. */
    large: 'space-y-8 sm:space-y-12 md:space-y-16',

    /** @use Separación estándar entre elementos relacionados. */
    default: 'space-y-6 sm:space-y-8',

    /** @use Separación compacta entre elementos muy relacionados dentro de un bloque. */
    compact: 'space-y-4 sm:space-y-6',

    /** @use Separación mínima — listas, items de formulario, grupos de chips. */
    small: 'space-y-2 sm:space-y-4',
  },

  // ── Grids responsivos ─────────────────────────────────────────────────────
  grid: {
    /**
     * @use Hero sections, formularios centrados, contenido de lectura larga.
     * @remarks Útil como base explícita cuando se necesita un grid de una columna
     *          con gap consistente, en lugar de un simple `flex-col`.
     */
    cols1: 'grid grid-cols-1 gap-4',

    /**
     * @use Testimonios, pricing, comparativas de dos columnas.
     * @warning El gap aumenta a `gap-5` en md — intencional para evitar que
     *          cards con contenido denso queden demasiado juntas.
     */
    cols2: 'grid grid-cols-1 md:grid-cols-2 gap-4',

    /** @use Features, cards de servicio, grids de tres columnas. */
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',

    /** @use Logos, iconos, grids de cuatro columnas. */
    cols4: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
  },

  // ── Ancho de lectura (max-width en texto) ─────────────────────────────────
  /**
   * Limita el ancho de bloques de texto inline — sin `mx-auto`.
   * Usar sobre elementos de texto (`<p>`, `<div>`) dentro de un contenedor
   * ya centrado. A diferencia de `container.*`, estos tokens NO centran
   * el elemento — solo restringen su ancho máximo.
   *
   * @example
   * ```tsx
   * <p className={cn(TYPOGRAPHY.paragraph.primary, LAYOUT.prose.lg)}>
   *   Descripción larga...
   * </p>
   * ```
   */
  prose: {
    /** @use Párrafos cortos, subtítulos compactos (`max-w-md`). */
    xs: 'max-w-md',

    /** @use Párrafos cortos, subtítulos compactos (`max-w-xl`). */
    sm: 'max-w-xl',

    /** @use Texto principal de sección, bios, descripciones (`max-w-2xl`). */
    md: 'max-w-2xl',

    /** @use Bloques de texto anchos, taglines, cabeceras de sección (`max-w-3xl`). */
    lg: 'max-w-3xl',

    /** @use Textos muy anchos, contenido casi a pantalla completa (`max-w-4xl`). */
    xl: 'max-w-4xl',
  },

  // ── Capas pantalla completa (no cards) ───────────────────────────────────
  /**
   * Capas de pantalla completa que no son “cards” — velos detrás de modales/drawers.
   * @combine `Z.backdrop` en el contenedor fijo del overlay.
   */
  overlay: {
    /**
     * @use Velo semitransparente con blur detrás de modales, drawers o lightbox.
     */
    scrim: 'bg-bg-white/40 fixed inset-0 backdrop-blur-sm',
  },

  // ── Divisores ─────────────────────────────────────────────────────────────
  divider: {
    /** @use Separación horizontal entre bloques de contenido. */
    horizontal: 'w-full h-px bg-stroke-subtle',

    /** @use Separación vertical — dentro de navbars, toolbars, grupos de iconos. */
    vertical: 'h-full w-px bg-stroke-subtle',
  },
} as const
