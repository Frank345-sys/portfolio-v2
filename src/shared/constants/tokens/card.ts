/**
 * Constantes compartidas del proyecto (`shared/constants/tokens/card.ts`).
 *
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.
 */

import { cn } from '@/shared/utils/cn'

import { ANIMATION } from './animation'

// ─────────────────────────────────────────────────────────────────────────────
// Fragmentos internos (no exportar)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clases estructurales compartidas por todas las superficies e interactivas.
 * Define borde, radio y sombra base.
 *
 * @internal
 */
const BASE = 'rounded-lg border border-stroke-soft shadow-elevation-xs'

/**
 * Escala de padding interno por densidad.
 *
 * @internal
 */
const PAD = {
  /** @use Contextos densos o de apoyo — compact, subtle, weak, white. */
  sm: 'p-4',
  /** @use Contenido rico con varios bloques internos — default y elevated. */
  md: 'p-4 sm:p-6',
  /** @use Máximo respiro — overlays y modales. */
  lg: 'p-6 sm:p-8',
} as const

/**
 * Tokens de card: superficies estáticas, interactivas, overlays y layout interno.
 *
 * Regla principal — elegir categoría por comportamiento:
 * - Contenedor de información → `CARD.surface.*`
 * - Elemento clickeable       → `CARD.interactive.*` (solo en `<a>` o `<button>`)
 * - Panel flotante o modal    → `CARD.overlay.*`
 * - Estructura interna        → `CARD.layout.*`
 *
 * Dark mode automático — los tokens semánticos se adaptan solos con la clase `.dark`.
 *
 * **Orden en este archivo:** imports → `BASE` / `PAD` internos → {@link CARD}.
 *
 * @example
 * ```tsx
 * <div className={CARD.surface.weak}>
 *   <div className={CARD.layout.header}>
 *     <p className={TYPOGRAPHY.title.small}>Título</p>
 *   </div>
 *   <div className={CARD.layout.body}>...</div>
 *   <div className={CARD.layout.footer}>...</div>
 * </div>
 * ```
 */
export const CARD = {
  // ── Superficies estáticas ──────────────────────────────────────────────────
  // Para contenedores de información que no se clickean.
  // Aplicar en <div>, <section>, <article> — nunca en <button> o <a>.
  surface: {
    /**
     * @use Contenido principal, secciones destacadas — fondo blanco.
     * @nocombine CARD.interactive.* (mutuamente excluyentes por semántica)
     */
    default: cn(BASE, 'bg-bg-white', PAD.sm),

    /**
     * @use SkillGroup, ValueCard, contenedores de información sobre fondos neutros.
     * @nocombine CARD.interactive.* (mutuamente excluyentes por semántica)
     */
    weak: cn(BASE, 'bg-bg-weak', PAD.sm),

    /**
     * @use Formularios, listados, widgets aislados sobre fondos tenues.
     * @nocombine CARD.interactive.* (mutuamente excluyentes por semántica)
     */
    white: cn(BASE, 'bg-bg-white', PAD.sm),
  },

  // ── Superficies interactivas ───────────────────────────────────────────────
  // SOLO para elementos clickeables: <a>, <button>, [role="button"].
  // Incluyen cursor, hover y transición — no tienen sentido en <div>.
  //
  // Los valores hover:shadow-* se escriben literales para mantener
  // variantes explícitas de hover sin depender de composición externa.
  interactive: {
    /**
     * @use Cards navegables sobre fondo blanco — padding generoso para contenido rico.
     *      Usar en `<a>` o `<button>`.
     * @nocombine CARD.surface.* (mutuamente excluyentes por semántica)
     */
    default: cn(
      BASE,
      'bg-bg-white',
      PAD.md,
      'cursor-pointer',
      ANIMATION.transition.default,
      'hover:border-stroke-subtle hover:shadow-elevation-xs'
    ),

    /**
     * @use Tarjetas de selección, opciones de lista, skill cards.
     *      Usar en `<button>` — resalta con borde information al hover.
     * @nocombine CARD.surface.* (mutuamente excluyentes por semántica)
     */
    weak: cn(
      BASE,
      'bg-bg-weak',
      PAD.sm,
      'cursor-pointer',
      ANIMATION.transition.default,
      'hover:border-information-base hover:bg-bg-soft'
    ),

    /**
     * @use Cards de producto, items navegables sobre fondos tenues.
     *      Usar en `<a>` — eleva la sombra al hover.
     * @nocombine CARD.surface.* (mutuamente excluyentes por semántica)
     */
    white: cn(
      BASE,
      'bg-bg-white',
      PAD.sm,
      'cursor-pointer',
      ANIMATION.transition.default,
      'hover:border-stroke-subtle hover:shadow-elevation-sm'
    ),
  },

  // ── Overlays ───────────────────────────────────────────────────────────────
  overlay: {
    /**
     * @use Drawers, tooltips con cuerpo, bandejas laterales — flotantes de nivel medio.
     * @warning Usar solo dentro de un portal o contexto con z-index gestionado (`Z.drawer`).
     */
    panel: cn(
      'border-stroke-subtle bg-bg-white shadow-elevation-xl rounded-lg border',
      PAD.sm
    ),

    /**
     * @use Modales pequeños, popovers, previews flotantes — mayor elevación que panel.
     * @warning Usar solo dentro de un portal o contexto con z-index gestionado (`Z.backdrop`).
     */
    modal: cn('bg-bg-weak shadow-elevation-lg rounded-lg', PAD.md),
  },

  // ── Estructura interna ─────────────────────────────────────────────────────
  // Partes reutilizables del interior de cualquier card.
  // Usar dentro de cualquier variante de CARD.surface.* o CARD.interactive.*
  layout: {
    /**
     * @use Fila superior de la card — título a la izquierda, acción opcional a la derecha.
     * @combine Cualquier variante de CARD.surface.* o CARD.interactive.* como contenedor.
     */
    header: 'flex items-center justify-between mb-3',

    /**
     * @use Contenedor del contenido principal — stack vertical con gap uniforme.
     * @combine Cualquier variante de CARD.surface.* o CARD.interactive.* como contenedor.
     */
    body: 'flex flex-col gap-2',

    /**
     * @use Fila inferior de la card — acciones o metadata al fondo.
     * @combine Cualquier variante de CARD.surface.* o CARD.interactive.* como contenedor.
     */
    footer: 'flex items-center justify-between mt-3',
  },
} as const
