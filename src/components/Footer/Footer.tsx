/**
 * Compositor del pie de página del portfolio (`Footer`).
 *
 * @fileoverview Implementación del archivo `Footer.tsx` dentro de `components/Footer`; ver exports para la API pública.
 * @remarks Atajos vía `FOOTER_SECTION_HREF` en `./constants`; sin duplicar la nav completa del header.
 */
import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { FooterBottom } from './subcomponents/FooterBottom'
import { FooterBrand } from './subcomponents/FooterBrand'
import { FooterShortcuts } from './subcomponents/FooterShortcuts'

/**
 * @module components/Footer/Footer
 *
 * Landmark `<footer>` con marca, atajos y fila inferior.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 * @see {@link FooterBrand} para el bloque de marca y tagline
 * @see {@link FooterShortcuts} para los atajos de navegación
 * @see {@link FooterBottom} para la fila de copyright y tecnologías
 */
export function Footer() {
  return (
    <footer className="border-stroke-subtle bg-bg-white border-t">
      <div
        className={cn(
          LAYOUT.container.full,
          LAYOUT.px,
          'py-8 md:py-10 lg:py-12'
        )}
      >
        <div className="xs:flex-row flex flex-col justify-between gap-6">
          {/* Marca */}
          <FooterBrand />
          {/* Atajos */}
          <FooterShortcuts />
        </div>

        {/* Footer Bottom */}
        <FooterBottom />
      </div>
    </footer>
  )
}
