/**
 * Pieza de interfaz del portfolio (`AboutHero`).
 *
 * @fileoverview Implementación del archivo `AboutHero.tsx` dentro de `components/AboutSection/subcomponents/AboutHero`; ver exports para la API pública.
 * @remarks El `h2` ({@link ABOUT_HERO_SECTION_TITLE_ID}) etiqueta el landmark del compositor vía `aria-labelledby`.
 */
import { AnimatedSectionHeading } from '@/shared/components/primitives/AnimatedSectionHeading'
import { Avatar } from '@/shared/components/primitives/Avatar'
import { TYPOGRAPHY, BADGE, LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import { parseEmphasis } from '@/shared/utils/parseEmphasis'

import { ABOUT_HERO, ABOUT_HERO_SECTION_TITLE_ID } from './constants'

/**
 * @module components/AboutSection/subcomponents/AboutHero/AboutHero
 *
 * `<header>` con encabezado animado, badges, avatar y tagline (`**énfasis**` vía {@link parseEmphasis}).
 *
 * @example
 * ```tsx
 * <AboutHero />
 * ```
 * @see {@link ABOUT_HERO} para los datos del hero
 * @see {@link ABOUT_HERO_SECTION_TITLE_ID} para el `id` del `h2` etiquetador del landmark
 * @see {@link AnimatedSectionHeading} para el encabezado con animación de entrada
 */
export function AboutHero() {
  const {
    firstName,
    lastName,
    badge,
    location,
    tagline,
    avatarInitials,
    avatarPhotoSrc,
  } = ABOUT_HERO

  // Nombre completo usado como label accesible del Avatar
  const fullName = `${firstName} ${lastName}`

  return (
    <header className={LAYOUT.spacing.default}>
      <div className="flex items-center justify-between">
        <div className={LAYOUT.spacing.compact}>
          <AnimatedSectionHeading
            overline="Sobre mí"
            title={firstName}
            titleHighlight={lastName}
            titleId={ABOUT_HERO_SECTION_TITLE_ID}
          />
          <div className={BADGE.group.horizontal}>
            <span
              className={cn(BADGE.variant.light.primary, BADGE.size.responsive)}
            >
              {badge}
            </span>
            <span
              className={cn(BADGE.variant.light.neutral, BADGE.size.responsive)}
            >
              <span aria-hidden="true">📍</span>
              {location}
            </span>
          </div>
        </div>

        <Avatar
          initials={avatarInitials}
          name={fullName}
          src={avatarPhotoSrc}
          className="mr-4 hidden sm:block"
        />
      </div>

      <p className={cn(TYPOGRAPHY.paragraph.primary, LAYOUT.prose.lg)}>
        {parseEmphasis(tagline, TYPOGRAPHY.special.emphasis)}
      </p>
    </header>
  )
}
