/**
 * Esqueleto de la sección “Contacto”: encabezado, lead, filas tipo `LinkCard` y panel lateral
 * con superficie `subtle` como `ProfileAside`.
 *
 *
 *
 * @see `ContactSection` en `src/components/ContactSection/ContactSection.tsx`.
 * @module shared/components/SectionLazyFallback/subcomponents/ContactSectionSkeleton
 * @fileoverview Implementación de `ContactSectionSkeleton.tsx` en `SectionLazyFallback/subcomponents`.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */
import { CARD, LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import {
  SectionTitleSkeleton,
  ShimmerBar,
  SkeletonLegendSkeleton,
  SkeletonLinkCardRow,
} from './SkeletonPrimitives'

/**
 * Placeholder visual mientras carga el chunk lazy de `ContactSection`.
 */
export function ContactSectionSkeleton() {
  return (
    <div
      className={cn(LAYOUT.container.narrow, LAYOUT.spacing.large, LAYOUT.px)}
    >
      <SectionTitleSkeleton />
      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_400px] xl:gap-8">
        <div className={cn('flex h-full flex-col', LAYOUT.spacing.default)}>
          <div className={cn('space-y-3', LAYOUT.prose.lg)}>
            <ShimmerBar className="h-5 w-full" />
            <ShimmerBar className="h-5 w-full" />
            <ShimmerBar className="h-5 w-4/5" />
          </div>
          <div className={LAYOUT.grid.cols1}>
            <SkeletonLinkCardRow />
            <SkeletonLinkCardRow />
            <SkeletonLinkCardRow />
          </div>
        </div>
        <div
          className={cn(
            CARD.surface.weak,
            'flex min-h-56 flex-col gap-4 p-5 sm:p-6',
            LAYOUT.spacing.default
          )}
        >
          <SkeletonLegendSkeleton />
          <div className="space-y-3">
            <ShimmerBar className="h-10 w-full rounded-xl" />
            <ShimmerBar className="h-10 w-full rounded-xl" />
            <ShimmerBar className="h-10 w-full rounded-xl" />
          </div>
          <ShimmerBar className="mt-auto h-16 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
