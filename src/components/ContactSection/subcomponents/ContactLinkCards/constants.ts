/**
 * Datos estáticos del bloque de tarjetas de contacto (`ContactLinkCards`).
 *
 * Enlaces públicos y correo (`mailto`). Origen de `href`: contrato de sección
 * (`../../constants`). Sin componentes de ícono: se combinan en `ContactLinkCards.tsx`.
 *
 * @fileoverview Define IDs de tarjetas (`CONTACT_SOCIAL_LINK_ID`, `CONTACT_EMAIL_LINK_ID`),
 * listas ordenadas (`PRIMARY_SOCIAL_LINKS`, `PRIMARY_EMAIL_LINKS`) y re-exporta `CONTACT_EMAIL_HREF`.
 * @remarks Cambios en `title`, `subtitle` o `href` pueden romper tests que fijen texto visible
 * o atributos de enlace. Tipos en `./types`; iconos SVG en `ContactLinkCards.tsx`.
 */
import { CONTACT_EMAIL_HREF, CONTACT_PROFILE } from '../../constants'

import type {
  ContactEmailLinkEntry,
  ContactEmailLinkId,
  ContactSocialLinkEntry,
  ContactSocialLinkId,
} from './types'

/**
 * Claves estables para mapear íconos de redes en `ContactLinkCards.tsx`.
 */
export const CONTACT_SOCIAL_LINK_ID = {
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
} as const satisfies Record<string, ContactSocialLinkId>

/**
 * Claves estables para tarjetas de correo (escalable a varios `mailto:`).
 */
export const CONTACT_EMAIL_LINK_ID = {
  MAIL: 'mail',
} as const satisfies Record<string, ContactEmailLinkId>

/**
 * Entradas de correo en orden de visualización.
 * Array vacío en render si `CONTACT_EMAIL_HREF` es `''` — el componente filtra por `href` truthy.
 * El `satisfies` valida el contrato {@link ContactEmailLinkEntry} sin perder el tipo inferido.
 */
export const PRIMARY_EMAIL_LINKS = [
  {
    id: CONTACT_EMAIL_LINK_ID.MAIL,
    href: CONTACT_EMAIL_HREF,
    title: 'Correo',
    subtitle: 'Correo electrónico',
  },
] satisfies readonly ContactEmailLinkEntry[]

/**
 * Redes en orden de visualización: GitHub → LinkedIn → WhatsApp → Telegram.
 * Cada ítem se renderiza como {@link LinkCard} (enlace externo) en `ContactLinkCards.tsx`.
 * El `satisfies` garantiza el contrato {@link ContactSocialLinkEntry} con tipo literal `as const`.
 */
export const PRIMARY_SOCIAL_LINKS = [
  {
    id: CONTACT_SOCIAL_LINK_ID.GITHUB,
    href: CONTACT_PROFILE.githubHref,
    title: 'GitHub',
    subtitle: 'Proyectos públicos',
  },
  {
    id: CONTACT_SOCIAL_LINK_ID.LINKEDIN,
    href: CONTACT_PROFILE.linkedinHref,
    title: 'LinkedIn',
    subtitle: 'Perfil profesional',
  },
  {
    id: CONTACT_SOCIAL_LINK_ID.WHATSAPP,
    href: CONTACT_PROFILE.whatsAppHref,
    title: 'WhatsApp',
    subtitle: 'Contacto directo',
  },
  {
    id: CONTACT_SOCIAL_LINK_ID.TELEGRAM,
    href: CONTACT_PROFILE.telegramHref,
    title: 'Telegram',
    subtitle: 'Mensajes y grupos',
  },
] as const satisfies readonly ContactSocialLinkEntry[]

/** Reexport: mismas referencias que `../../constants`; tests importan solo desde `./constants`. */
export { CONTACT_EMAIL_HREF }
