/**
 * Esqueleto de la sección “Proyectos”: encabezado ancho completo, panel lateral sticky,
 * lista de previews y rail de puntos en `lg`.
 *
 *
 *
 * @see `ProjectsSection` en `src/components/ProjectsSection/ProjectsSection.tsx`.
 * @module shared/components/SectionLazyFallback/subcomponents/ProjectsSectionSkeleton
 * @fileoverview Implementación de `ProjectsSectionSkeleton.tsx` en `SectionLazyFallback/subcomponents`.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */
import { ANIMATION, LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import {
  SectionTitleSkeleton,
  ShimmerBar,
  SkeletonBadgeChipRow,
} from './SkeletonPrimitives'

function ProjectsRailSkeleton() {
  return (
    <div
      className="sticky top-5/12 -ml-4 hidden h-fit shrink-0 flex-col gap-3 lg:flex"
      aria-hidden
    >
      <div
        className={cn(
          'bg-information-base h-8 w-1.5 rounded-full',
          ANIMATION.transition.default
        )}
      />
      <div className="bg-bg-subtle h-4 w-1.5 rounded-full" />
      <div className="bg-bg-subtle h-4 w-1.5 rounded-full" />
      <div className="bg-bg-subtle h-4 w-1.5 rounded-full" />
    </div>
  )
}

/**
 * Placeholder visual mientras carga el chunk lazy de `ProjectsSection`.
 */
export function ProjectsSectionSkeleton() {
  return (
    <div className={cn(LAYOUT.spacing.large, LAYOUT.px)} aria-hidden>
      <SectionTitleSkeleton />
      <div className="relative flex w-full flex-col gap-10 lg:flex-row lg:gap-10">
        <div className="border-stroke-soft bg-bg-weak/50 sticky top-24 hidden h-fit min-h-48 w-full shrink-0 flex-col gap-4 space-y-6 rounded-lg border p-5 lg:block lg:w-[50%] xl:w-[45%]">
          <div className="space-y-2">
            <ShimmerBar className="h-6 w-3/5" />
            <ShimmerBar className="h-6 w-2/5" />
          </div>
          <div className="space-y-3">
            <ShimmerBar className="h-3 w-full" />
            <ShimmerBar className="h-3 w-[90%]" />
            <ShimmerBar className="h-3 w-full" />
            <ShimmerBar className="h-3 w-[90%]" />
          </div>
          <SkeletonBadgeChipRow count={3} className="mt-4" />
          <div className="mt-6 flex flex-wrap gap-2">
            <ShimmerBar className="h-10 w-36 rounded-md" />
            <ShimmerBar className="h-10 w-36 rounded-md" />
          </div>
        </div>

        <div className={cn(LAYOUT.spacing.large, 'flex-1 xl:space-y-18')}>
          <div className={LAYOUT.spacing.default}>
            <div className="border-stroke-soft bg-bg-weak/40 mb-4 space-y-3 rounded-lg border p-4 lg:hidden">
              <ShimmerBar className="h-5 w-1/2" />
              <ShimmerBar className="h-3 w-full" />
            </div>
            <div className="shadow-elevation-xl border-stroke-soft overflow-hidden rounded-lg border">
              <div
                className={cn(
                  'bg-bg-subtle aspect-video w-full',
                  ANIMATION.pulse.continuous
                )}
              />
              <div className="space-y-2 bg-linear-to-t from-black/40 to-transparent p-5">
                <ShimmerBar className="bg-information-base/25 h-4 w-48" />
                <ShimmerBar className="bg-information-base/30 h-6 w-2/3 max-w-sm" />
              </div>
            </div>
          </div>
          <div className={LAYOUT.spacing.default}>
            <div className="shadow-elevation-xl border-stroke-soft overflow-hidden rounded-lg border">
              <div
                className={cn(
                  'bg-bg-subtle aspect-video w-full',
                  ANIMATION.pulse.continuous
                )}
              />
              <div className="space-y-2 bg-linear-to-t from-black/40 to-transparent p-5">
                <ShimmerBar className="bg-information-base/25 h-4 w-48" />
                <ShimmerBar className="bg-information-base/30 h-6 w-2/3 max-w-sm" />
              </div>
            </div>
          </div>
        </div>

        <ProjectsRailSkeleton />
      </div>
    </div>
  )
}
