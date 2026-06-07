/**
 * Pieza de interfaz del portfolio (`FooterShortcuts`).
 *
 * @fileoverview Implementación del archivo `FooterShortcuts.tsx` dentro de `components/Footer/subcomponents/FooterShortcuts`; ver exports para la API pública.
 * @remarks El CTA «Volver al inicio» queda fuera del `nav` a propósito.
 */
import { BUTTON, TYPOGRAPHY } from '@/shared/constants/tokens'
import { ArrowUpIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

import { FOOTER_QUICK_BACK_TO_TOP, FOOTER_QUICK_CONTACT } from '../constants'

/** `id` del `h2` visible “Antes de irte” en atajos (`FooterShortcuts`). */
const FOOTER_QUICK_NAV_HEADING_ID = 'footer-quick-cta' as const

/**
 * @module components/Footer/subcomponents/FooterShortcuts/FooterShortcuts
 *
 * `nav` «Antes de irte» y CTA de retorno al inicio fuera del `nav`.
 *
 * @example
 * ```tsx
 * <FooterShortcuts />
 * ```
 * @see {@link FOOTER_QUICK_CONTACT} para el enlace de contacto
 * @see {@link FOOTER_QUICK_BACK_TO_TOP} para el CTA de retorno
 * @see {@link FOOTER_QUICK_NAV_HEADING_ID} para el id del `h2` de la `nav`
 */
export function FooterShortcuts() {
  return (
    <nav
      className="xs:items-end flex shrink-0 flex-col gap-2"
      aria-labelledby={FOOTER_QUICK_NAV_HEADING_ID}
    >
      {/* Título de la navegación rápida */}
      <h2
        id={FOOTER_QUICK_NAV_HEADING_ID}
        className={TYPOGRAPHY.label.overline}
      >
        Antes de irte
      </h2>

      {/* Enlace de contacto */}
      <a href={FOOTER_QUICK_CONTACT.href} className={TYPOGRAPHY.link.footer}>
        {FOOTER_QUICK_CONTACT.label}
      </a>

      {/* Botón de retorno al inicio */}
      <a
        href={FOOTER_QUICK_BACK_TO_TOP.href}
        className={cn(
          BUTTON.variant.outline.neutral,
          BUTTON.size.responsive,
          'normal-case'
        )}
      >
        <ArrowUpIcon aria-hidden />
        {FOOTER_QUICK_BACK_TO_TOP.label}
      </a>
    </nav>
  )
}
