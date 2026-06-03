/**
 * Tipos del dominio `AboutCerts`.
 *
 * @fileoverview Define `AboutCertId` (unión de claves estables) y `AboutCertEntry`
 * (extiende {@link LinkCardDatum} con `id` tipado). Los iconos SVG se resuelven
 * en `AboutCerts.tsx` vía `CERT_ICON_BY_ID`, no en el tipo.
 * @remarks Mantener `AboutCertId` sincronizado con {@link CERT_ID} en `./constants` —
 * si se añade un certificado, ambos deben actualizarse.
 */
import type { LinkCardDatum } from '@/shared/components/primitives/LinkCard'

/**
 * Unión de identificadores de certificado.
 * Debe mantenerse sincronizada con las claves de {@link CERT_ID} en `./constants`
 * y con {@link CERT_ICON_BY_ID} en `AboutCerts.tsx`.
 */
export type AboutCertId =
  | 'ia-agents'
  | 'seo-ia-google'
  | 'ia-desarrollo'
  | 'git-github'
  | 'js-fundamentos'
  | 'html-css-frontend'

export interface AboutCertEntry extends LinkCardDatum {
  /** Clave estable del certificado — referencia {@link CERT_ID} y {@link CERT_ICON_BY_ID}. */
  id: AboutCertId
}
