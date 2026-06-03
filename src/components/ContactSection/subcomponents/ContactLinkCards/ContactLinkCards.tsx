/**
 * Pieza de interfaz del portfolio (`ContactLinkCards`).
 *
 * @fileoverview Implementación del archivo `ContactLinkCards.tsx` dentro de `components/ContactSection/subcomponents/ContactLinkCards`; ver exports para la API pública.
 * @remarks Redes externas con `target="_blank"`; correo `mailto` sin nueva pestaña.
 */
import { LinkCard } from '@/shared/components/primitives/LinkCard'
import { LAYOUT, ANIMATION } from '@/shared/constants/tokens'
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  TelegramIcon,
  WhatsappIcon,
} from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

import {
  CONTACT_EMAIL_LINK_ID,
  CONTACT_SOCIAL_LINK_ID,
  PRIMARY_EMAIL_LINKS,
  PRIMARY_SOCIAL_LINKS,
} from './constants'

import type { ContactEmailLinkId, ContactSocialLinkId } from './types'
import type { ComponentType, SVGProps } from 'react'

/** Alias para componentes SVG con props nativas de `SVGSVGElement`. */
type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>

/** Clases Tailwind para iconos de tarjetas de contacto: color base + hover al pasar el cursor. */
const CONTACT_LINK_ICON_CLASS = cn(
  ANIMATION.transition.colors,
  'text-text-strong group-hover:text-text-white'
)

/** Mapa estático `ContactSocialLinkId` → componente SVG para redes sociales. */
const SOCIAL_ICON_BY_ID: Record<ContactSocialLinkId, SvgIcon> = {
  [CONTACT_SOCIAL_LINK_ID.GITHUB]: GithubIcon,
  [CONTACT_SOCIAL_LINK_ID.LINKEDIN]: LinkedinIcon,
  [CONTACT_SOCIAL_LINK_ID.WHATSAPP]: WhatsappIcon,
  [CONTACT_SOCIAL_LINK_ID.TELEGRAM]: TelegramIcon,
}

/** Mapa estático `ContactEmailLinkId` → componente SVG para tarjetas de correo. */
const EMAIL_ICON_BY_ID: Record<ContactEmailLinkId, SvgIcon> = {
  [CONTACT_EMAIL_LINK_ID.MAIL]: MailIcon,
}

/**
 * @module components/ContactSection/subcomponents/ContactLinkCards/ContactLinkCards
 *
 * `<nav>` con tarjetas de redes y correo; iconos en {@link SOCIAL_ICON_BY_ID} y {@link EMAIL_ICON_BY_ID}.
 *
 * @example
 * ```tsx
 * <ContactLinkCards />
 * ```
 * @see {@link PRIMARY_SOCIAL_LINKS} para las entradas de redes
 * @see {@link PRIMARY_EMAIL_LINKS} para las entradas de correo
 * @see {@link LinkCard} para el componente de tarjeta enlazable
 */
export function ContactLinkCards() {
  return (
    <nav aria-label="Enlaces de contacto y perfiles en redes">
      <ul
        className={cn(
          LAYOUT.grid.cols1,
          'list-none sm:grid-cols-2 lg:grid-cols-1'
        )}
      >
        {PRIMARY_SOCIAL_LINKS.map(({ id, href, title, subtitle }) => {
          const Icon = SOCIAL_ICON_BY_ID[id]
          return (
            <li key={id}>
              <LinkCard
                href={href}
                target="_blank"
                title={title}
                subtitle={subtitle}
                icon={<Icon className={CONTACT_LINK_ICON_CLASS} aria-hidden />}
              />
            </li>
          )
        })}
        {PRIMARY_EMAIL_LINKS.map(({ id, href, title, subtitle }) => {
          const Icon = EMAIL_ICON_BY_ID[id]
          return (
            <li key={id}>
              <LinkCard
                href={href}
                title={title}
                subtitle={subtitle}
                icon={<Icon className={CONTACT_LINK_ICON_CLASS} aria-hidden />}
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
