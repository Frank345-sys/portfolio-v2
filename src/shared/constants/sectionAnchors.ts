/**
 * IDs de ancla de las secciones principales del documento.
 *
 * Deben coincidir con el atributo `id` del landmark de cada sección (`HeroSection`, `AboutSection`, …)
 * y con los `href` del Header (`DEFAULT_NAV_ITEMS` en `@/components/Header/constants/navigation`, desktop y `MobileDrawer`).
 *
 * Cuando `ErrorBoundaryFallback` sustituye el contenido bajo `<main>`, reutiliza `inicio` para que logo y nav sigan resolviendo `#inicio`.
 *
 * Otras piezas (footer, logo) que enlazan a inicio o contacto deben usar estas constantes o {@link sectionHref}.
 *
 * @module shared/constants/sectionAnchors
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.
 */

/** Valores de `id` en el DOM (fragmento sin `#`). */
export const SECTION_ANCHOR_ID = {
  inicio: 'inicio',
  sobreMi: 'sobre-mi',
  proyectos: 'proyectos',
  contacto: 'contacto',
} as const

/** Fragmento (`id`) de un `#…` válido definido en {@link SECTION_ANCHOR_ID}; solo uso interno a este módulo. */
type SectionAnchorId =
  (typeof SECTION_ANCHOR_ID)[keyof typeof SECTION_ANCHOR_ID]

/** Ancla interna (`#…`) alineada con las secciones del documento (Header, footer, etc.). */
export type SectionAnchorHref = `#${SectionAnchorId}`

/**
 * Construye un `href` de ancla interna (`#…`) a partir del `id` de sección.
 */
export function sectionHref(id: SectionAnchorId): SectionAnchorHref {
  return `#${id}`
}
