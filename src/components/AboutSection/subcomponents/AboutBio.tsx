import { SectionLabel } from '@/shared/components/SectionLabel'
import { TYPOGRAPHY, LAYOUT } from '@/shared/constants/tokens'
import { parseEmphasis } from '@/shared/utils/parseEmphasis'

import { ABOUT_BIO } from '../constants'

/**
 * Subsección **Quién soy**: párrafos desde `ABOUT_BIO`, con resaltados `**palabra**`
 * vía `parseEmphasis`.
 */
export function AboutBio() {
  return (
    <div className={LAYOUT.spacing.default}>
      <div className={LAYOUT.spacing.compact}>
        <SectionLabel as="h3">Quién soy</SectionLabel>
        {ABOUT_BIO.map(({ id, text }) => (
          <p key={id} className={TYPOGRAPHY.paragraph.secondary}>
            {parseEmphasis(text, TYPOGRAPHY.special.emphasis)}
          </p>
        ))}
      </div>
    </div>
  )
}
