/**
 * Esqueleto del pie de página: borde superior, fondo claro y dos columnas (marca / acciones)
 * alineadas con `Footer`.
 *
 *
 *
 * @see `Footer` en `src/components/Footer/` (`Footer.tsx` + `subcomponents/`).
 * @module shared/components/SectionLazyFallback/subcomponents/FooterSectionSkeleton
 * @fileoverview Implementación de `FooterSectionSkeleton.tsx` en `SectionLazyFallback/subcomponents`.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */
import { LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { ShimmerBar } from './SkeletonPrimitives'

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
        <div className="max-w-md space-y-6">
          <ShimmerBar className="h-7 w-48" />
          <div className="space-y-3">
            <ShimmerBar className="h-4 w-full" />
            <ShimmerBar className="h-4 w-4/5" />
          </div>
        </div>
        <div className="flex h-fit flex-wrap items-center gap-4">
          <ShimmerBar className="h-10 w-28 rounded-md" />
          <ShimmerBar className="size-11 shrink-0 rounded-full" />
        </div>
      </div>
    </div>
  )
}
