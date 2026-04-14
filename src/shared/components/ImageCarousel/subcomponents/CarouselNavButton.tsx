import { BUTTON, Z } from '@/shared/constants/tokens'
import { ArrowNextIcon, ArrowPrevIcon } from '@/shared/icons'
import type { ImageCarouselNavDirection } from '../types'
import { cn } from '@/shared/utils/cn'

const CAROUSEL_NAV_ICON =
  'text-information-base h-6 w-6 shrink-0 md:h-7 md:w-7' as const

/** Controles flotantes: mismo nivel que `Z.raised` (no menús ni dropdowns). */
const CAROUSEL_NAV_BUTTON_BASE = cn(
  BUTTON.special.icon,
  Z.raised,
  'hover:bg-information-light active:bg-information-light/40 absolute top-1/2 flex -translate-y-1/2 items-center justify-center focus-visible:ring-offset-0'
)

export interface CarouselNavButtonProps {
  /** Botón anterior o siguiente en el carrusel. */
  direction: ImageCarouselNavDirection
  /** Se dispara al activar el botón (clic); puede combinarse con teclado vía `onArrowNavigate`. */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Flechas ← / → siguen el patrón APG de carrusel (misma acción desde ambos botones). */
  onArrowNavigate: (target: ImageCarouselNavDirection) => void
  /** `aria-label` accesible del botón. */
  ariaLabel: string
}

/**
 * Botón flotante de navegación del carrusel (anterior / siguiente).
 */
export function CarouselNavButton({
  direction,
  onClick,
  onArrowNavigate,
  ariaLabel,
}: CarouselNavButtonProps) {
  const isPrev = direction === 'prev'

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onArrowNavigate('prev')
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      onArrowNavigate('next')
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(CAROUSEL_NAV_BUTTON_BASE, isPrev ? 'left-5' : 'right-5')}
      aria-label={ariaLabel}
    >
      {isPrev ? (
        <ArrowPrevIcon className={CAROUSEL_NAV_ICON} />
      ) : (
        <ArrowNextIcon className={CAROUSEL_NAV_ICON} />
      )}
    </button>
  )
}
