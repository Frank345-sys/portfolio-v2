import { cn } from '@/shared/utils/cn'
import { TYPOGRAPHY, BADGE, LAYOUT } from '@/shared/constants/tokens'
import { SectionLabel } from '@/shared/components/SectionLabel'
import { Avatar } from '@/shared/components/Avatar'
import { parseEmphasis } from '@/shared/utils/parseEmphasis'
import { ABOUT_BIO, ABOUT_HERO } from '../constants'

/**
 * Bloque principal de bio dentro de la AboutSection.
 * Incluye etiqueta de sección, nombre + badges de rol/ubicación, avatar y párrafos
 * con énfasis tipográfico extraído de `ABOUT_BIO` y `ABOUT_HERO`.
 */
export function AboutBio() {
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
  const avatarSrc = avatarPhotoSrc || ''

  return (
    <div className={LAYOUT.spacing.compact}>
      <div className={LAYOUT.flex.between}>
        <div>
          <SectionLabel variant="rule">Sobre mí</SectionLabel>
          <h2
            id="about-section-heading"
            className={cn(TYPOGRAPHY.title.section, 'mb-2')}
          >
            {firstName}{' '}
            <span className="text-information-base">{lastName}</span>
          </h2>
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
          className="mr-2 hidden sm:block"
        />
      </div>

      <p className={cn(TYPOGRAPHY.paragraph.primary, 'max-w-xl md:max-w-2xl')}>
        {parseEmphasis(tagline, TYPOGRAPHY.special.emphasis)}
      </p>

      <SectionLabel as="h3">Quién soy</SectionLabel>

      {ABOUT_BIO.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className={TYPOGRAPHY.paragraph.secondary}
        >
          {parseEmphasis(paragraph, TYPOGRAPHY.special.emphasis)}
        </p>
      ))}
    </div>
  )
}
