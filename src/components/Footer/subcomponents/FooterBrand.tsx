/**
 * Pieza de interfaz del portfolio (`FooterBrand`).
 *
 * @fileoverview Implementación del archivo `FooterBrand.tsx` dentro de `components/Footer/subcomponents/FooterBrand`; ver exports para la API pública.
 * @remarks `h2.sr-only` agrupa el bloque dentro del único `<footer>` del compositor.
 */
import { SiteLogo } from '@/shared/components/primitives/SiteLogo'
import { LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { FOOTER_BRAND, FOOTER_BRAND_LANDMARK_LABEL } from '../constants'

/** `id` del `h2` sr-only del bloque marca (`FooterBrand`). */
const FOOTER_BRAND_LANDMARK_HEADING_ID = 'footer-brand-heading' as const

/**
 * @module components/Footer/subcomponents/FooterBrand/FooterBrand
 *
 * Logo al inicio, rol y tagline desde {@link FOOTER_BRAND}.
 *
 * @example
 * ```tsx
 * <FooterBrand />
 * ```
 * @see {@link SiteLogo} para el componente de logo enlazado
 * @see {@link FOOTER_BRAND} para los datos de marca y tagline
 * @see {@link FOOTER_BRAND_LANDMARK_HEADING_ID} para el id del h2 agrupador
 */
export function FooterBrand() {
  return (
    <section
      aria-labelledby={FOOTER_BRAND_LANDMARK_HEADING_ID}
      className="space-y-2"
    >
      {/* h2 sr-only: agrupa el bloque para lectores de pantalla sin landmark visual */}
      <h2 id={FOOTER_BRAND_LANDMARK_HEADING_ID} className="sr-only">
        {FOOTER_BRAND_LANDMARK_LABEL}
      </h2>
      <SiteLogo />
      <p className={cn(TYPOGRAPHY.paragraph.small, 'font-medium')}>
        {FOOTER_BRAND.role}
      </p>
      <p
        className={cn(
          TYPOGRAPHY.paragraph.muted,
          LAYOUT.prose.xs,
          'leading-snug'
        )}
      >
        {FOOTER_BRAND.tagline}
      </p>
    </section>
  )
}
