/**
 * Esqueleto del pie de página: borde superior, fondo claro y dos columnas (marca / acciones)
 * alineadas con `Footer`.
 *
 * @see `Footer` en `src/components/Footer/Footer.tsx`.
 *
 * @module shared/components/SectionLazyFallback/subcomponents/FooterSectionSkeleton
 */
import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { ShimmerBar } from './skeletonPrimitives'

/**
 * Placeholder visual mientras carga el chunk lazy de `Footer`.
 */
export function FooterSectionSkeleton() {
  return (
    <div
      className={cn(
        'border-stroke-soft bg-bg-white border-t py-8 backdrop-blur-sm md:py-10 lg:py-12',
        LAYOUT.container.full,
        LAYOUT.px
      )}
      aria-hidden
    >
      <div className="xs:flex-row flex flex-col justify-between gap-6">
        <div className="max-w-md space-y-2">
          <ShimmerBar className="h-7 w-48" />
          <ShimmerBar className="h-4 w-full" />
          <ShimmerBar className="h-4 w-4/5" />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ShimmerBar className="h-10 w-28 rounded-md" />
          <ShimmerBar className="h-11 w-11 shrink-0 rounded-full" />
        </div>
      </div>
    </div>
  )
}
