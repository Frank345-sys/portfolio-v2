import { ANIMATION } from './animation'

const BASE = 'rounded-lg border border-stroke-soft' as const
const PAD = { sm: 'p-4', md: 'p-6 sm:p-8' } as const

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
     * @use Contenido principal, secciones destacadas — fondo blanco sin sombra.
     *      Padding generoso (p-6 sm:p-8) para contenido rico con varios bloques internos.
     * @nocombine CARD.interactive.* (son mutuamente excluyentes por semántica)
     */
    default: `${BASE} bg-bg-white ${PAD.md}`,

    /**
     * @use Paneles que deben destacar sobre el fondo de la página — añade sombra md.
     * @nocombine CARD.interactive.* (son mutuamente excluyentes por semántica)
     */
    elevated: `${BASE} bg-bg-white shadow-elevation-md ${PAD.md}`,

    /**
     * @use Listas densas, sidebars y widgets compactos — padding reducido (p-4)
     *      respecto a `default` para contextos con espacio limitado.
     * @nocombine CARD.interactive.* (son mutuamente excluyentes por semántica)
     */
    compact: `${BASE} bg-bg-white ${PAD.sm}`,

    /**
     * @use Áreas de apoyo, contexto adicional, secciones secundarias.
     * @nocombine CARD.interactive.* (son mutuamente excluyentes por semántica)
     */
    subtle: `${BASE} bg-bg-soft ${PAD.sm}`,

    /**
     * @use SkillGroup, ValueCard, contenedores de información sobre fondos neutros.
     * @nocombine CARD.interactive.* (son mutuamente excluyentes por semántica)
     */
    weak: `${BASE} bg-bg-weak ${PAD.sm} shadow-elevation-xs`,

    /**
     * @use Formularios, listados, widgets aislados sobre fondos tenues.
     * @nocombine CARD.interactive.* (son mutuamente excluyentes por semántica)
     */
    white: `${BASE} bg-bg-white ${PAD.sm} shadow-elevation-xs`,
  },

  // ── Superficies interactivas ───────────────────────────────────────────────
  // SOLO para elementos clickeables: <a>, <button>, [role="button"].
  // Incluyen cursor, hover y transición — no tienen sentido en <div>.
  interactive: {
    /**
     * @use Cards navegables sobre fondo blanco — padding generoso para contenido rico.
     *      Usar en `<a>` o `<button>`.
     * @nocombine CARD.surface.* (son mutuamente excluyentes por semántica)
     * @note hover:shadow-elevation-xs escrito literal para mantener una variante explícita de hover.
     */
    default: `${BASE} bg-bg-white ${PAD.md} cursor-pointer ${ANIMATION.transition.default} hover:border-stroke-subtle hover:shadow-elevation-xs`,

    /**
     * @use Tarjetas de selección, opciones de lista, skill cards.
     *      Usar en `<button>` — resalta con borde information al hover.
     * @nocombine CARD.surface.* (son mutuamente excluyentes por semántica)
     */
    weak: `${BASE} bg-bg-weak ${PAD.sm} shadow-elevation-xs cursor-pointer ${ANIMATION.transition.default} hover:border-information-base hover:bg-bg-soft`,

    /**
     * @use Cards de producto, items navegables sobre fondos tenues.
     *      Usar en `<a>` — eleva la sombra al hover.
     * @nocombine CARD.surface.* (son mutuamente excluyentes por semántica)
     * @note hover:shadow-elevation-xs escrito literal para mantener una variante explícita de hover.
     */
    white: `${BASE} bg-bg-white ${PAD.sm} shadow-elevation-xs cursor-pointer ${ANIMATION.transition.default} hover:border-stroke-subtle hover:shadow-elevation-sm`,
  },

  overlay: {
    /**
     * @use Drawers, tooltips con cuerpo, bandejas laterales — flotantes de nivel medio.
     * @warning Usar solo dentro de un portal o contexto con z-index gestionado (Z.drawer).
     */
    panel: 'rounded-lg border border-stroke-medium bg-bg-medium p-4',

    /**
     * @use Modales pequeños, popovers, previews flotantes — mayor elevación que panel.
     * @warning Usar solo dentro de un portal o contexto con z-index gestionado (Z.modal).
     */
    modal: `rounded-lg border border-stroke-medium bg-bg-surface ${PAD.md} shadow-elevation-lg`,
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

export type CardCategory = keyof typeof CARD
export type CardVariant<C extends CardCategory> = keyof (typeof CARD)[C]

export type CardSurfaceKey = CardVariant<'surface'>
export type CardInteractiveKey = CardVariant<'interactive'>
export type CardOverlayKey = CardVariant<'overlay'>
export type CardLayoutKey = CardVariant<'layout'>
