import { AnimatedSectionHeading } from '@/shared/components/AnimatedSectionHeading'
import { Avatar } from '@/shared/components/Avatar'
import { TYPOGRAPHY, BADGE, LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import { parseEmphasis } from '@/shared/utils/parseEmphasis'

import { ABOUT_HERO } from '../constants'

/**
 * Bloque superior de About: encabezado de sección con highlight del apellido, badges
 * de rol/ubicación, avatar opcional y tagline con `parseEmphasis`.
 *
 * El `titleId` del encabezado coincide con `aria-labelledby` del `<section>` en
 * `AboutSection`.
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

  const fullName = `${firstName} ${lastName}`
  const avatarSrc = avatarPhotoSrc ?? ''

  return (
    <div className={LAYOUT.spacing.default}>
      <div className="flex items-center justify-between">
        <div className={LAYOUT.spacing.compact}>
          <AnimatedSectionHeading
            overline="Sobre mí"
            title={firstName}
            titleHighlight={lastName}
            titleId="about-section-heading"
          />
          <div className={BADGE.group.horizontal}>
            <span className={cn(BADGE.size.md, BADGE.variant.primary)}>
              {badge}
            </span>
            <span className={cn(BADGE.size.md, BADGE.variant.neutral)}>
              {location}
            </span>
          </div>
        </div>

        <Avatar
          initials={avatarInitials}
          name={fullName}
          src={avatarSrc}
          className="mr-4 hidden sm:block"
        />
      </div>

      <p className={cn(TYPOGRAPHY.paragraph.primary, LAYOUT.prose.lg)}>
        {parseEmphasis(tagline, TYPOGRAPHY.special.emphasis)}
      </p>
    </div>
  )
}
