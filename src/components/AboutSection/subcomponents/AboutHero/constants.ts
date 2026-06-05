/**
 * Datos estáticos del hero introductorio (`AboutHero`).
 *
 * @fileoverview Define `ABOUT_HERO` (identidad, badges, tagline y avatar), re-exporta `SITE_PROFILE`
 * y expone `ABOUT_HERO_SECTION_TITLE_ID` como alias de `ABOUT_SECTION_TITLE_ID`.
 * @remarks Cambios en `tagline`, `avatarPhotoSrc` o campos de nombre pueden romper tests
 * que fijen texto visible o atributos `alt` del avatar. Tipos en `./types`.
 */
import { withSiteBaseUrl } from '@/shared/utils/withSiteBaseUrl'

import {
  ABOUT_SECTION_TITLE_ID,
  SITE_PROFILE,
  SITE_TAGLINE,
} from '../../constants'

import type { AboutHeroData } from './types'

/**
 * Identidad global del sitio reexportada aquí para que los subbloques About (p. ej. hero) consuman el
 * mismo contrato desde este módulo de sección.
 */
export { SITE_PROFILE }

/**
 * Presentación inicial del hero About: nombre, badges, tagline con énfasis `**…**` y avatar.
 * Datos de identidad delegados a {@link SITE_PROFILE}; tagline compuesto con {@link SITE_TAGLINE}.
 * El `satisfies` garantiza el contrato {@link AboutHeroData} sin perder el tipo literal.
 */
export const ABOUT_HERO = {
  firstName: SITE_PROFILE.firstName,
  lastName: SITE_PROFILE.lastName,
  badge: SITE_PROFILE.role,
  location: 'Puebla, México',
  tagline: `${SITE_TAGLINE} Stack principal: **React**, **TypeScript** y **Next.js** en e-commerce, B2B y herramientas internas.`,
  avatarInitials: SITE_PROFILE.initials,
  avatarPhotoSrc: withSiteBaseUrl('images/profile/frank-gonzalez.jpg'),
} as const satisfies AboutHeroData

/** `id` del `h2` principal de la sección About — alias directo de {@link ABOUT_SECTION_TITLE_ID}.
 * Referenciado por `aria-labelledby` en el `<section>` compositor y por {@link AboutHero} como `titleId`.
 */
export const ABOUT_HERO_SECTION_TITLE_ID = ABOUT_SECTION_TITLE_ID
