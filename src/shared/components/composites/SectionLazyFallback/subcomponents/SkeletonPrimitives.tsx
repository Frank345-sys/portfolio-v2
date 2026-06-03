/**
 * Piezas de UI reutilizables para esqueletos de sección: barras pulsantes, título tipo
 * `AnimatedSectionHeading`, chips tipo badge/tags (`SkeletonBadgeChip`/`SkeletonBadgeChipRow`),
 * leyendas tipo `Legend` (`SkeletonLegendSkeleton`), filas tipo enlaces (`SkeletonLinkCardRow`)
 * y tarjetas genéricas (`CardSkeleton`).
 *
 * @module shared/components/SectionLazyFallback/subcomponents/SkeletonPrimitives
 * @fileoverview Primitivos compartidos (`ShimmerBar`, títulos, chips, tarjetas) en `SectionLazyFallback/subcomponents`.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */
import {
  BADGE,
  CARD,
  LAYOUT,
  TYPOGRAPHY,
  ANIMATION,
} from '@/shared/constants/tokens'
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

/**
 * Pill de carga tipo badge/tag: misma geometría en stack técnico (`AboutSectionSkeleton`),
 * sidebar de proyectos (`ProjectsSectionSkeleton`), etc.
 */
function SkeletonBadgeChip({ className, ...rest }: ComponentProps<'div'>) {
  return (
    <ShimmerBar
      className={cn('h-6 w-16 shrink-0 rounded-full', className)}
      {...rest}
    />
  )
}

interface SkeletonBadgeChipRowProps extends Omit<
  ComponentProps<'div'>,
  'children'
> {
  /** Cuántos chips pintar en fila (`BADGE.group.horizontal`). */
  count: number
}

/**
 * Fila de {@link SkeletonBadgeChip} con el mismo espaciado que grupos de badges reales.
 */
export function SkeletonBadgeChipRow({
  count,
  className,
  ...rest
}: SkeletonBadgeChipRowProps) {
  return (
    <div
      className={cn(BADGE.group.horizontal, className)}
      aria-hidden
      {...rest}
    >
      {Array.from({ length: count }, (_, slotIndex) => (
        <SkeletonBadgeChip key={`skeleton-badge-chip-${count}-${slotIndex}`} />
      ))}
    </div>
  )
}

/**
 * Ítems tipo `Legend`: punto + etiqueta shim, con agrupación y gaps como en producción.
 */
export function SkeletonLegendSkeleton({
  className,
  ...rest
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn('grid w-full max-w-xl grid-cols-3 gap-2', className)}
      aria-hidden
      {...rest}
    >
      <div className="flex w-full items-center gap-2">
        <ShimmerBar className="size-3 shrink-0 rounded-full" />
        <ShimmerBar className="h-4 w-full" />
      </div>
      <div className="flex w-full items-center gap-2">
        <ShimmerBar className="size-3 shrink-0 rounded-full" />
        <ShimmerBar className="h-4 w-full" />
      </div>
      <div className="flex w-full items-center gap-2">
        <ShimmerBar className="size-3 shrink-0 rounded-full" />
        <ShimmerBar className="h-4 w-full" />
      </div>
    </div>
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
        <ShimmerBar className="h-10 max-w-md sm:h-12 md:h-14" />
        <ShimmerBar className="h-8 max-w-xs sm:h-10" />
      </div>
    </div>
  )
}

/**
 * Fila de carga alineada a `LinkCard`: icono cuadrado, líneas de título/subtítulo y sufijo lateral.
 *
 * Contacto (`ContactSectionSkeleton`), certificaciones (`AboutSectionSkeleton`), etc.
 */
export function SkeletonLinkCardRow(props: ComponentProps<'div'>) {
  const { className, ...rest } = props
  return (
    <div
      className={cn(
        'border-stroke-soft bg-bg-weak shadow-elevation-xs flex items-center justify-between rounded-lg border p-4',
        className
      )}
      aria-hidden
      {...rest}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div className="bg-information-light flex size-10 shrink-0 items-center justify-center rounded-lg">
          <ShimmerBar className="bg-information-base/30 size-5 rounded" />
        </div>
        <div className="space-y-2">
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
