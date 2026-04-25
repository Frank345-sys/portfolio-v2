/**
 * Esqueleto de la sección “Contacto”: encabezado, lead, filas tipo `LinkCard` y panel lateral
 * con superficie `subtle` como `ProfileAside`.
 *
 * @see `ContactSection` en `src/components/ContactSection/ContactSection.tsx`.
 *
 * @module shared/components/SectionLazyFallback/subcomponents/ContactSectionSkeleton
 */
import { CARD, LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import { SectionTitleSkeleton, ShimmerBar } from './skeletonPrimitives'

function ContactLinkRowSkeleton() {
  return (
    <div
      className="border-stroke-soft bg-bg-weak shadow-elevation-xs flex items-center justify-between rounded-lg border p-4"
      aria-hidden
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div className="bg-information-light flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
          <ShimmerBar className="bg-information-base/30 h-5 w-5 rounded" />
        </div>
        <div className="space-y-1.5">
          <ShimmerBar className="h-4 w-24" />
          <ShimmerBar className="h-3 w-36 max-w-[85%]" />
        </div>
      </div>
      <span className="text-text-subtle text-sm opacity-60" aria-hidden>
        ···
      </span>
    </div>
  )
}

/**
 * Placeholder visual mientras carga el chunk lazy de `ContactSection`.
 */
export function ContactSectionSkeleton() {
  return (
    <div
      className={cn(LAYOUT.container.narrow, LAYOUT.spacing.large, LAYOUT.px)}
    >
      <SectionTitleSkeleton />
      <div className="grid min-h-0 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_400px] xl:gap-8">
        <div
          className={cn('flex h-full min-h-0 flex-col', LAYOUT.spacing.default)}
        >
          <div className={cn('space-y-3', LAYOUT.prose.lg)}>
            <ShimmerBar className="h-5 w-full" />
            <ShimmerBar className="h-5 w-full" />
            <ShimmerBar className="h-5 w-4/5" />
          </div>
          <div className={LAYOUT.grid.cols1}>
            <ContactLinkRowSkeleton />
            <ContactLinkRowSkeleton />
            <ContactLinkRowSkeleton />
          </div>
        </div>
        <div
          className={cn(
            CARD.surface.subtle,
            'border-stroke-soft flex min-h-56 flex-col gap-4 border p-5 sm:p-6',
            LAYOUT.spacing.default
          )}
        >
          <ShimmerBar className="h-4 w-36" />
          <div className="space-y-2">
            <ShimmerBar className="h-10 w-full rounded-xl" />
            <ShimmerBar className="h-10 w-full rounded-xl" />
          </div>
          <ShimmerBar className="mt-auto h-16 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
