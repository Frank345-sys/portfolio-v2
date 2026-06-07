/**
 * Pieza de interfaz del portfolio (`ImageCarouselNavButton`).
 *
 * @fileoverview Implementación del archivo `ImageCarouselNavButton.tsx` dentro de `shared/components/ImageCarousel/subcomponents/ImageCarouselNavButton`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { BUTTON, Z } from '@/shared/constants/tokens'
import { ArrowNextIcon, ArrowPrevIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

import type { ImageCarouselNavDirection } from '../../types'
import type { ComponentPropsWithoutRef } from 'react'

const CAROUSEL_NAV_ICON = 'text-information-base size-6 md:size-7'

/** Controles flotantes: mismo nivel que `Z.raised` (no menús ni dropdowns). */
const CAROUSEL_NAV_BUTTON_BASE = cn(
  'absolute top-1/2 flex -translate-y-1/2 items-center justify-center focus-visible:ring-offset-0',
  Z.raised,
  BUTTON.special.icon.lighter.primary
)

interface ImageCarouselNavButtonProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'type'
> {
  /** Botón anterior o siguiente en el carrusel. */
  direction: ImageCarouselNavDirection
}

/**
 * Botón flotante de navegación del carrusel (anterior / siguiente).
 */
export function ImageCarouselNavButton({
  direction,
  className,
  ...rest
}: ImageCarouselNavButtonProps) {
  const isPrev = direction === 'prev'

  return (
    <button
      {...rest}
      type="button"
      className={cn(
        CAROUSEL_NAV_BUTTON_BASE,
        isPrev ? 'left-5' : 'right-5',
        className
      )}
    >
      {isPrev ? (
        <ArrowPrevIcon className={CAROUSEL_NAV_ICON} />
      ) : (
        <ArrowNextIcon className={CAROUSEL_NAV_ICON} />
      )}
    </button>
  )
}
