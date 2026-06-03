/**
 * Compositor de la sección "Contacto" del portfolio (`ContactSection`).
 *
 * @fileoverview Implementación del archivo `ContactSection.tsx` dentro de `components/ContactSection`; ver exports para la API pública.
 * @remarks Exporta `CONTACT_SECTION_TITLE_ID` y `CONTACT_MAIN_COLUMN_HEADING_ID` acoplados al JSX del compositor.
 */
import { AnimatedSectionHeading } from '@/shared/components/primitives/AnimatedSectionHeading'
import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { CONTACT_SECTION_ANCHOR_ID } from './constants'
import { ContactLead } from './subcomponents/ContactLead/ContactLead'
import { ContactLinkCards } from './subcomponents/ContactLinkCards/ContactLinkCards'
import { ProfileAside } from './subcomponents/ProfileAside/ProfileAside'

/** `id` del `h2` principal (`AnimatedSectionHeading`), referenciado por el `<section>`. */
export const CONTACT_SECTION_TITLE_ID = 'contact-section-heading' as const

/**
 * Encabezado **solo lectores de pantalla** que agrupa el lead y la `nav` de tarjetas
 * (`<section aria-labelledby>` en la columna principal).
 */
export const CONTACT_MAIN_COLUMN_HEADING_ID =
  'contact-main-column-heading' as const

/**
 * @module components/ContactSection/ContactSection
 *
 * Landmark de contacto: heading animado, columna principal (`ContactLead`, `ContactLinkCards`) y `ProfileAside`.
 *
 * @example
 * ```tsx
 * <ContactSection />
 * ```
 * @see {@link CONTACT_SECTION_ANCHOR_ID} para el `id` del landmark
 * @see `./constants` para datos de contacto y redes
 */
export function ContactSection() {
  return (
    <section
      id={CONTACT_SECTION_ANCHOR_ID}
      aria-labelledby={CONTACT_SECTION_TITLE_ID}
      className={cn(LAYOUT.container.full, LAYOUT.section.default)}
    >
      <div
        className={cn(LAYOUT.container.narrow, LAYOUT.spacing.large, LAYOUT.px)}
      >
        <AnimatedSectionHeading
          overline="Contacto"
          title="Hablemos de tu"
          titleHighlight="próximo paso"
          titleId={CONTACT_SECTION_TITLE_ID}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px] xl:gap-8">
          <section
            aria-labelledby={CONTACT_MAIN_COLUMN_HEADING_ID}
            className={cn(LAYOUT.spacing.default, 'flex flex-col')}
          >
            <h3 id={CONTACT_MAIN_COLUMN_HEADING_ID} className="sr-only">
              Mensaje introductorio y enlaces para contactarme
            </h3>
            {/* Contact Lead */}
            <ContactLead />
            {/* Contact Link Cards */}
            <ContactLinkCards />
          </section>
          {/* Profile Aside */}
          <ProfileAside />
        </div>
      </div>
    </section>
  )
}
