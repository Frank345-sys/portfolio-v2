/**
 * Pieza de interfaz del portfolio (`HeroCvCta`).
 *
 * @fileoverview Implementación del archivo `HeroCvCta.tsx` dentro de `components/HeroSection/subcomponents/HeroCvCta`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { BUTTON } from '@/shared/constants/tokens'
import { DownloadIcon } from '@/shared/icons'

import { HERO_CV_HREF, HERO_TITLE_NAME } from '../../constants'

/**
 * @module components/HeroSection/subcomponents/HeroCvCta/HeroCvCta
 *
 * CTA del CV en PDF (nueva pestaña); en **`HeroSection`**, entre **`HeroLead`** y **`HeroStats`**.
 */
export function HeroCvCta() {
  return (
    <a
      href={HERO_CV_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={BUTTON.special.cta}
    >
      Ver CV (PDF)
      <span className="sr-only">{` de ${HERO_TITLE_NAME}, se abre en una pestaña nueva`}</span>
      <DownloadIcon aria-hidden="true" />
    </a>
  )
}
