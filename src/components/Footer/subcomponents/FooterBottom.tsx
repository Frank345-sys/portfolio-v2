/**
 * Pieza de interfaz del portfolio (`FooterBottom`).
 *
 * @fileoverview Implementación del archivo `FooterBottom.tsx` dentro de `components/Footer/subcomponents/FooterBottom`; ver exports para la API pública.
 * @remarks Año de copyright calculado en render; divisor decorativo con `aria-hidden`.
 */
import { LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { FOOTER_BRAND } from '../constants'

/**
 * Tecnologías citadas en la línea “Portafolio construido con …” (`FooterBottom`).
 */
const FOOTER_BUILT_WITH = 'React, TypeScript y Vite' as const

/**
 * @module components/Footer/subcomponents/FooterBottom/FooterBottom
 *
 * Copyright dinámico y leyenda «Construido con …» dentro de {@link Footer}.
 *
 * @example
 * ```tsx
 * <FooterBottom />
 * ```
 * @see {@link FOOTER_BRAND} para el nombre en el copyright
 */
export function FooterBottom() {
  // Año calculado en render para mantenerse actualizado sin rebuild
  const year = new Date().getFullYear()

  return (
    <div className={LAYOUT.spacing.compact}>
      {/* Divisor decorativo — aria-hidden para no anunciarlo a lectores de pantalla */}
      <div
        className={cn(LAYOUT.divider.horizontal, 'mt-8 opacity-80 md:mt-10')}
        aria-hidden
      />
      <div className="flex flex-col gap-2 text-center md:flex-row md:items-center md:justify-between md:text-start">
        <p className={TYPOGRAPHY.paragraph.muted}>
          © {year} {FOOTER_BRAND.name}. Todos los derechos reservados.
        </p>
        <p className={TYPOGRAPHY.special.caption}>
          Portafolio construido con {FOOTER_BUILT_WITH}.
        </p>
      </div>
    </div>
  )
}
