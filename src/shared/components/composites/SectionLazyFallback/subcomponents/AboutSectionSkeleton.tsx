/**
 * Esqueleto de la sección “Sobre mí”: hero en `<header>` (título, badges, avatar, tagline), bio, valores en grid,
 * bloques tipo timeline (formación y experiencia; chips tipo `TimelineItem`), stack técnico (leyenda + grupos/chips)
 * y certificaciones en grid (filas tipo `LinkCard`, mismo patrón que contacto).
 *
 *
 *
 * @see {@link AboutSection} — misma jerarquía de contenedores (`narrow`, `spacing.large`, `px`).
 * @module shared/components/SectionLazyFallback/subcomponents/AboutSectionSkeleton
 * @fileoverview Implementación de `AboutSectionSkeleton.tsx` en `SectionLazyFallback/subcomponents`.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */
import { BADGE, CARD, LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import {
  CardSkeleton,
  SectionTitleSkeleton,
  ShimmerBar,
  SkeletonBadgeChipRow,
  SkeletonLegendSkeleton,
  SkeletonLinkCardRow,
} from './SkeletonPrimitives'

/**
 * Replica `AboutHero`: `<header>` con fila superior (heading + badges + avatar) y bloque tipo tagline (`LAYOUT.prose.lg`).
 */
function AboutHeroSkeleton() {
  return (
    <header className={LAYOUT.spacing.default} aria-hidden>
      <div className="flex items-center justify-between">
        <div className={cn(LAYOUT.spacing.compact, 'w-full')}>
          <SectionTitleSkeleton />
          <div className={BADGE.group.horizontal}>
            <ShimmerBar className="h-8 w-28 rounded-full" />
            <ShimmerBar className="h-8 w-36 rounded-full" />
          </div>
        </div>

        <ShimmerBar className="hidden size-32 shrink-0 rounded-full sm:block md:size-36 lg:size-40" />
      </div>

      <div className={cn(LAYOUT.prose.lg, 'space-y-3')}>
        <ShimmerBar className="h-4 w-full" />
        <ShimmerBar className="h-4 w-[96%]" />
        <ShimmerBar className="h-4 w-[92%]" />
        <ShimmerBar className="h-4 w-[76%]" />
      </div>
    </header>
  )
}

function AboutBioSkeleton() {
  return (
    <div className={LAYOUT.spacing.default} aria-hidden>
      <ShimmerBar className="h-7 w-44 max-w-full" />
      <div className="space-y-3">
        <ShimmerBar className="h-4 w-full" />
        <ShimmerBar className="h-4 w-[96%]" />
        <ShimmerBar className="h-4 w-[92%]" />
        <ShimmerBar className="h-4 w-[76%]" />
        <ShimmerBar className="h-4 w-[96%]" />
        <ShimmerBar className="h-4 w-[92%]" />
        <ShimmerBar className="h-4 w-[76%]" />
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
      <SkeletonLegendSkeleton />

      <div className="grid gap-6 md:grid-cols-[auto_1fr]">
        <ShimmerBar className="mt-2 hidden h-4 w-18 rounded-lg md:block" />
        <div className="border-information-base/40 flex flex-col gap-3 border-l-2 py-2 pl-4 md:pl-6">
          <ShimmerBar className="h-16 w-full rounded-lg" />
          <SkeletonBadgeChipRow count={4} />
        </div>
      </div>
    </div>
  )
}

/** Imita un grupo del stack técnico: título + fila de chips (badges). */
function AboutSkillGroupSkeleton() {
  return (
    <div
      className={cn(
        CARD.surface.weak,
        'border-stroke-soft flex flex-col gap-3'
      )}
      aria-hidden
    >
      <ShimmerBar className="h-5 w-2/5 max-w-44" />
      <SkeletonBadgeChipRow count={5} />
    </div>
  )
}

function AboutSkillsSkeleton() {
  return (
    <div className={LAYOUT.spacing.default} aria-hidden>
      <ShimmerBar className="h-7 w-52 max-w-full" />
      <div className={LAYOUT.spacing.compact}>
        <SkeletonLegendSkeleton />
        <div className={cn(LAYOUT.grid.cols2)}>
          <AboutSkillGroupSkeleton />
          <AboutSkillGroupSkeleton />
          <AboutSkillGroupSkeleton />
          <AboutSkillGroupSkeleton />
          <AboutSkillGroupSkeleton />
        </div>
      </div>
    </div>
  )
}

function AboutCertsSkeleton() {
  return (
    <div className={LAYOUT.spacing.default} aria-hidden>
      <ShimmerBar className="h-7 w-52 max-w-full" />
      <div className={LAYOUT.grid.cols2}>
        <SkeletonLinkCardRow />
        <SkeletonLinkCardRow />
        <SkeletonLinkCardRow />
        <SkeletonLinkCardRow />
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
      <AboutSkillsSkeleton />
      <AboutCertsSkeleton />
    </div>
  )
}
