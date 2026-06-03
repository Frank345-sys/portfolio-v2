/**
 * Datos estáticos, copy y claves del submódulo «AboutSection»:
 * ancla de sección, `id` del `h2`, leyenda de timeline y re-exports de perfil.
 *
 * @fileoverview Centraliza valores importados por componentes colindantes; evita cadenas mágicas en el JSX.
 * @remarks Los cambios de texto o `href` suelen requerir actualizar tests que fijen el contrato de la sección.
 * @see {@link SECTION_ANCHOR_ID} para el origen del ancla de sección
 * @see {@link AboutLegendItem} para el contrato de tipo de la leyenda
 */
import { SECTION_ANCHOR_ID } from '@/shared/constants/sectionAnchors'

import type { AboutLegendItem } from './types'

/**
 * Leyenda de chips del timeline (experiencia y formación), alineada con `CHIP_BADGE_CLASS` en
 * `@/shared/components/primitives/TimelineItem/TimelineItem.tsx`.
 *
 * Los `id` y su orden deben coincidir con {@link TIMELINE_LEGEND_ORDER_IDS} en
 * `@/shared/components/primitives/TimelineItem/constants.ts` (orden de chips al render).
 *
 * Lectura habitual: área → impacto → nuevo (`learned`) → aplicado en el rol (`applied`).
 */
export const ABOUT_TIMELINE_LEGEND_ITEMS = [
  {
    id: 'tech',
    label: 'Área o tecnología',
    dotClassName: 'box-border border border-stroke-subtle bg-bg-soft',
  },
  {
    id: 'impact',
    label: 'Impacto positivo',
    dotClassName: 'box-border border border-success-base bg-success-lighter',
  },
  {
    id: 'learned',
    label: 'Conocimientos nuevos',
    dotClassName: 'box-border border border-feature-base bg-feature-lighter',
  },
  {
    id: 'applied',
    label: 'Tecnologías aplicadas',
    dotClassName:
      'box-border border border-information-base bg-information-lighter',
  },
] satisfies readonly AboutLegendItem[]

/** Fragmento (`id`) del landmark de la sección sobre mí — mismo valor que {@link SECTION_ANCHOR_ID.sobreMi}
 * (`@/shared/constants/sectionAnchors`).
 */
export const ABOUT_SECTION_ANCHOR_ID = SECTION_ANCHOR_ID.sobreMi

/** `id` del `h2` principal de la sección (hero About), referenciado por el `<section>`. */
export const ABOUT_SECTION_TITLE_ID = 'about-section-heading' as const

/**
 * Identidad global del sitio reexportada aquí para que los subbloques About (p. ej. hero) consuman el
 * mismo contrato desde este módulo de sección.
 */
export { SITE_PROFILE, SITE_TAGLINE } from '@/shared/constants/siteProfile'
