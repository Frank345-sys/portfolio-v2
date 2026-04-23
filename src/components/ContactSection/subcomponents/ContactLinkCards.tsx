import type { ComponentType, SVGProps } from 'react'
import { LinkCard } from '@/shared/components/LinkCard'
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  WhatsappIcon,
} from '@/shared/icons'
import { LAYOUT } from '@/shared/constants/tokens'
import {
  CONTACT_EMAIL_HREF,
  CONTACT_EMAIL_TRIMMED,
  CONTACT_PROFILE,
} from '../constants'

const CONTACT_LINK_ICON_CLASS = 'text-text-strong group-hover:text-text-white'

type SocialIcon = ComponentType<SVGProps<SVGSVGElement>>

const PRIMARY_SOCIAL_LINKS: ReadonlyArray<{
  id: string
  href: string
  title: string
  subtitle: string
  Icon: SocialIcon
}> = [
  {
    id: 'github',
    href: CONTACT_PROFILE.githubHref,
    title: 'GitHub',
    subtitle: 'Proyectos públicos',
    Icon: GithubIcon,
  },
  {
    id: 'linkedin',
    href: CONTACT_PROFILE.linkedinHref,
    title: 'LinkedIn',
    subtitle: 'Trayectoria profesional',
    Icon: LinkedinIcon,
  },
  {
    id: 'whatsapp',
    href: CONTACT_PROFILE.whatsAppHref,
    title: 'WhatsApp',
    subtitle: 'Contacto directo',
    Icon: WhatsappIcon,
  },
] as const

/**
 * Listado de tarjetas de enlace: redes y correo opcional.
 * Envolviendo en un `nav` con etiqueta clara para lectores de pantalla.
 */
export function ContactLinkCards() {
  return (
    <nav
      aria-label="Enlaces de contacto y perfiles en redes"
      className={LAYOUT.grid.cols1}
    >
      {PRIMARY_SOCIAL_LINKS.map(({ id, href, title, subtitle, Icon }) => (
        <LinkCard
          key={id}
          href={href}
          title={title}
          subtitle={subtitle}
          icon={<Icon className={CONTACT_LINK_ICON_CLASS} aria-hidden />}
        />
      ))}
      {CONTACT_EMAIL_HREF ? (
        <LinkCard
          href={CONTACT_EMAIL_HREF}
          title="Correo"
          subtitle="Correo electrónico"
          icon={<MailIcon className={CONTACT_LINK_ICON_CLASS} aria-hidden />}
          external={false}
          ariaLabel={`Enviar correo a ${CONTACT_EMAIL_TRIMMED}`}
        />
      ) : null}
    </nav>
  )
}
