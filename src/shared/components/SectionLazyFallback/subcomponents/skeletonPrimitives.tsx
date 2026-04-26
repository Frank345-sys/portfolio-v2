/**
 * Piezas de UI reutilizables para esqueletos de sección: barras pulsantes, título tipo
 * `AnimatedSectionHeading` y tarjetas genéricas.
 *
 * @module shared/components/SectionLazyFallback/subcomponents/skeletonPrimitives
 */
import { CARD, LAYOUT, TYPOGRAPHY, ANIMATION } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import type { ComponentProps } from 'react'

/**
 * Barra rectangular con pulso y tinte `information`, combinable con `className` para tamaños.
 */
export function ShimmerBar({ className, ...rest }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-information-base/20 dark:bg-information-base/25 rounded-md',
        ANIMATION.pulse.continuous,
        className
      )}
      {...rest}
    />
  )
}

function OverlineSkeleton() {
  return (
    <div
      className={cn(
        TYPOGRAPHY.title.subsection,
        'text-text-subtle flex items-center gap-2 font-bold tracking-widest'
      )}
      aria-hidden
    >
      <span className="text-text-subtle font-bold">{'//'}</span>
      <ShimmerBar className="h-5 w-28 sm:h-6 sm:w-36" />
      <span className={cn(LAYOUT.divider.horizontal, 'min-w-8 flex-1')} />
    </div>
  )
}

/**
 * Imita la jerarquía visual de {@link AnimatedSectionHeading}: overline estilo `//` + dos líneas de título.
 */
export function SectionTitleSkeleton() {
  return (
    <div className="space-y-4">
      <OverlineSkeleton />
      <div className="space-y-3" aria-hidden>
        <ShimmerBar className="h-9 max-w-md sm:h-10 md:h-12" />
        <ShimmerBar className="h-9 max-w-xs sm:h-10 md:max-w-sm" />
      </div>
    </div>
  )
}

/**
 * Superficie tipo `CARD.surface.weak` con tres franjas de carga.
 *
 * @param className - Clases Tailwind extra en el contenedor (p. ej. `sm:col-span-2` en grids).
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        CARD.surface.weak,
        'border-stroke-soft flex flex-col gap-3',
        className
      )}
      aria-hidden
    >
      <ShimmerBar className="h-5 w-2/5 max-w-40" />
      <ShimmerBar className="h-3 w-full max-w-none" />
      <ShimmerBar className="h-3 w-4/5" />
    </div>
  )
}
