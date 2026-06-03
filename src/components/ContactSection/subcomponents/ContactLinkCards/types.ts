/**
 * Tipos del dominio `ContactLinkCards`.
 *
 * Tipos de entradas de `ContactLinkCards` y claves `CONTACT_*_LINK_ID` en `./constants`.
 *
 * @fileoverview Define `ContactSocialLinkId`, `ContactEmailLinkId`, `ContactSocialLinkEntry`
 * y `ContactEmailLinkEntry` — todos extienden {@link LinkCardDatum} con `id` tipado.
 * @remarks Mantener `ContactSocialLinkId` sincronizado con {@link CONTACT_SOCIAL_LINK_ID}
 * y `ContactEmailLinkId` con {@link CONTACT_EMAIL_LINK_ID} en `./constants`.
 */
import type { LinkCardDatum } from '@/shared/components/primitives/LinkCard'

/**
 * Identificadores de enlace social (alineados con `CONTACT_SOCIAL_LINK_ID` en `./constants`).
 */
export type ContactSocialLinkId =
  | 'github'
  | 'linkedin'
  | 'whatsapp'
  | 'telegram'

/**
 * Identificadores de tarjeta de correo (`CONTACT_EMAIL_LINK_ID` en `./constants`).
 * Ampliar la unión al añadir más entradas en `PRIMARY_EMAIL_LINKS`.
 */
export type ContactEmailLinkId = 'mail'

/**
 * Datos que alimentan `LinkCard` en esta sección (= {@link LinkCardDatum}).
 */
type ContactLinkCardEntryBase = LinkCardDatum

/**
 * Entrada de red enlazada (`PRIMARY_SOCIAL_LINKS` en `./constants`).
 * Los íconos SVG se resuelven en `ContactLinkCards.tsx` vía `SOCIAL_ICON_BY_ID`.
 */
export interface ContactSocialLinkEntry extends ContactLinkCardEntryBase {
  /** Clave estable de red — referencia {@link CONTACT_SOCIAL_LINK_ID} y {@link SOCIAL_ICON_BY_ID}. */
  id: ContactSocialLinkId
}

/**
 * Entrada de correo (`PRIMARY_EMAIL_LINKS` en `./constants`).
 * Renderizada con `external={false}` en `ContactLinkCards.tsx` — no abre nueva pestaña.
 */
export interface ContactEmailLinkEntry extends ContactLinkCardEntryBase {
  /** Clave estable de correo — referencia {@link CONTACT_EMAIL_LINK_ID} y {@link EMAIL_ICON_BY_ID}. */
  id: ContactEmailLinkId
}
