/**
 * Pieza de interfaz del portfolio (`AboutBio`).
 *
 * @fileoverview Implementación del archivo `AboutBio.tsx` dentro de `components/AboutSection/subcomponents/AboutBio`; ver exports para la API pública.
 * @remarks `<section>` con `aria-labelledby` al `h3` dentro del landmark de About.
 */
import { SectionSubtitle } from '@/shared/components/primitives/SectionSubtitle'
import { TYPOGRAPHY, LAYOUT } from '@/shared/constants/tokens'
import { parseEmphasis } from '@/shared/utils/parseEmphasis'

import { ABOUT_BIO, ABOUT_BIO_HEADING_ID } from './constants'

/**
 * @module components/AboutSection/subcomponents/AboutBio/AboutBio
 *
 * Bloque «Quién soy»: párrafos desde `ABOUT_BIO` con `**énfasis**` vía {@link parseEmphasis}.
 *
 * @example
 * ```tsx
 * <AboutBio />
 * ```
 * @see {@link parseEmphasis} para el helper de énfasis inline
 * @see {@link ABOUT_BIO} para el contenido de los párrafos
 */
export function AboutBio() {
  return (
    <section
      aria-labelledby={ABOUT_BIO_HEADING_ID}
      className={LAYOUT.spacing.default}
    >
      <div className={LAYOUT.spacing.compact}>
        <SectionSubtitle id={ABOUT_BIO_HEADING_ID}>Quién soy</SectionSubtitle>
        {ABOUT_BIO.map(({ id, text }) => (
          <p key={id} className={TYPOGRAPHY.paragraph.secondary}>
            {parseEmphasis(text, TYPOGRAPHY.special.emphasis)}
          </p>
        ))}
      </div>
    </section>
  )
}
