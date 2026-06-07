/**
 * Tipos del dominio `ContactLinkCards`.
 *
 * Tipos de entradas de `ContactLinkCards`; los IDs se derivan de `./constants`.
 *
 * @fileoverview Define `ContactSocialLinkId`, `ContactEmailLinkId`, `ContactSocialLinkEntry`
 * y `ContactEmailLinkEntry` — todos extienden {@link LinkCardDatum} con `id` tipado.
 * @remarks `ContactSocialLinkId` y `ContactEmailLinkId` se infieren de
 * {@link CONTACT_SOCIAL_LINK_ID} y {@link CONTACT_EMAIL_LINK_ID}; al añadir una tarjeta,
 * actualizar el objeto en `./constants` y el mapa de íconos en `ContactLinkCards.tsx`.
 */
import type { LinkCardDatum } from '@/shared/components/primitives/LinkCard'

import type { CONTACT_EMAIL_LINK_ID, CONTACT_SOCIAL_LINK_ID } from './constants'

/** Identificadores de enlace social — derivado de {@link CONTACT_SOCIAL_LINK_ID}. */
export type ContactSocialLinkId =
  (typeof CONTACT_SOCIAL_LINK_ID)[keyof typeof CONTACT_SOCIAL_LINK_ID]

/** Identificadores de tarjeta de correo — derivado de {@link CONTACT_EMAIL_LINK_ID}. */
export type ContactEmailLinkId =
  (typeof CONTACT_EMAIL_LINK_ID)[keyof typeof CONTACT_EMAIL_LINK_ID]

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
