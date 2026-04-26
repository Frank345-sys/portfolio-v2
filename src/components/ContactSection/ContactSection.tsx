import { AnimatedSectionHeading } from '@/shared/components/AnimatedSectionHeading'
import { LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { CONTACT_EMAIL_HREF } from './constants'
import { ContactLinkCards, ProfileAside } from './subcomponents'

/**
 * Sección de contacto: copy, `nav` de enlaces y `aside` con disponibilidad y metadatos.
 *
 * @example
 * ```tsx
 * <ContactSection />
 * ```
 */
export function ContactSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-section-heading"
      className={cn(LAYOUT.container.full, LAYOUT.section.default)}
    >
      <div
        className={cn(LAYOUT.container.narrow, LAYOUT.spacing.large, LAYOUT.px)}
      >
        <AnimatedSectionHeading
          overline="Contacto"
          title="Hablemos de tu"
          titleHighlight="próximo paso"
          titleId="contact-section-heading"
        />

        <div className="grid min-h-0 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_400px] xl:gap-8">
          <div
            className={cn(
              'flex h-full min-h-0 flex-col',
              LAYOUT.spacing.default
            )}
          >
            <p className={cn(TYPOGRAPHY.paragraph.lead, LAYOUT.prose.lg)}>
              ¿Colaboración en producto, revisión o rol React/TypeScript? Mira
              el código y proyectos en GitHub o escríbeme por LinkedIn, WhatsApp
              {CONTACT_EMAIL_HREF ? ' o correo' : ''}.
            </p>

            <ContactLinkCards />
          </div>

          <ProfileAside />
        </div>
      </div>
    </section>
  )
}
