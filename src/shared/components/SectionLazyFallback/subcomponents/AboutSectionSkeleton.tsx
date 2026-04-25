/**
 * Esqueleto de la sección “Sobre mí”: hero (título + badges + avatar), bio, valores en grid
 * y bloques tipo timeline.
 *
 * @see {@link AboutSection} — misma jerarquía de contenedores (`narrow`, `spacing.large`, `px`).
 *
 * @module shared/components/SectionLazyFallback/subcomponents/AboutSectionSkeleton
 */
import { BADGE, LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import {
  CardSkeleton,
  SectionTitleSkeleton,
  ShimmerBar,
} from './skeletonPrimitives'

function AboutHeroSkeleton() {
  return (
    <div className={LAYOUT.spacing.default} aria-hidden>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className={LAYOUT.spacing.compact}>
          <SectionTitleSkeleton />
          <div className={cn(BADGE.group.horizontal)}>
            <ShimmerBar className="h-8 w-28 rounded-full" />
            <ShimmerBar className="h-8 w-36 rounded-full" />
          </div>
        </div>
        <ShimmerBar className="mr-4 hidden h-32 w-32 shrink-0 rounded-full sm:block md:h-36 md:w-36 lg:h-40 lg:w-40" />
      </div>
      <div className={cn('space-y-3', LAYOUT.prose.lg)}>
        <ShimmerBar className="h-4 w-full" />
        <ShimmerBar className="h-4 w-[92%]" />
        <ShimmerBar className="h-4 w-[70%] max-w-xl" />
      </div>
    </div>
  )
}

function AboutBioSkeleton() {
  return (
    <div className={LAYOUT.spacing.default} aria-hidden>
      <ShimmerBar className="h-6 w-40 max-w-full" />
      <div className={LAYOUT.spacing.compact}>
        <ShimmerBar className="h-4 w-full max-w-2xl" />
        <ShimmerBar className="h-4 w-full max-w-2xl" />
        <ShimmerBar className="h-4 w-3/4 max-w-xl" />
      </div>
    </div>
  )
}

function AboutValuesSkeleton() {
  return (
    <div className={LAYOUT.spacing.default} aria-hidden>
      <ShimmerBar className="h-7 w-44 max-w-full" />
      <div className={LAYOUT.grid.cols3}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}

function AboutTimelineSkeleton() {
  return (
    <div className={LAYOUT.spacing.default} aria-hidden>
      <ShimmerBar className="h-7 w-56 max-w-full" />
      <div className="border-information-base/40 flex flex-col gap-3 border-l-2 pl-4 md:pl-6">
        <ShimmerBar className="h-16 w-full max-w-2xl rounded-lg" />
        <ShimmerBar className="h-16 w-full max-w-2xl rounded-lg" />
      </div>
    </div>
  )
}

/**
 * Placeholder visual mientras carga el chunk lazy de `AboutSection`.
 */
export function AboutSectionSkeleton() {
  return (
    <div
      className={cn(LAYOUT.container.narrow, LAYOUT.spacing.large, LAYOUT.px)}
    >
      <AboutHeroSkeleton />
      <AboutBioSkeleton />
      <AboutValuesSkeleton />
      <AboutTimelineSkeleton />
      <AboutTimelineSkeleton />
    </div>
  )
}
