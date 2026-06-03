/**
 * Esqueleto de la zona hero: misma envoltura espacial que `BackgroundBoxes` + `HeroSection`
 * (`h-screen`, `max-h-[680px]`, capa de “cajas” detrás y columna centrada con `<header>`
 * tipo `HeroTitle`, lead, CTA y stats).
 *
 * Cajas decorativas cuadradas compactas detrás del blur; el bloque brillante interior
 * usa **el mismo número en % para ancho y alto** respecto a la caja (simetría porcentual, como íconos en `FloatingBox`).
 * Superficie **`shadow-elevation-lg`** + radios mixtos por ítem. ~14 ítems (= `FLOATING_BOX_COUNT`).
 *
 * No define `id` de ancla ni `aria-labelledby`: evita duplicar el landmark real cuando el skeleton
 * se muestra junto al hero cargado (p. ej. laboratorio de desarrollo).
 *
 * @module shared/components/SectionLazyFallback/subcomponents/HeroSectionSkeleton/HeroSectionSkeleton
 * @fileoverview Implementación de `HeroSectionSkeleton.tsx` en la carpeta homónima bajo `subcomponents/`.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */
import { LAYOUT, Z } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { ShimmerBar } from '../SkeletonPrimitives'
import { DECO_SURFACE_BASE, HERO_DECO_BOX_SLOTS } from './constants'

/**
 * Placeholder decorativo para el primer viewport (cajas + columna centrada).
 */
export function HeroSectionSkeleton() {
  return (
    <div
      className="relative h-screen max-h-[680px] w-full overflow-hidden"
      aria-hidden
    >
      <ul
        className={cn(
          LAYOUT.container.wide,
          'pointer-events-none absolute inset-0 list-none'
        )}
      >
        {HERO_DECO_BOX_SLOTS.map((slot) => (
          <li
            key={`${slot.left}-${slot.top}-${slot.width}`}
            className="absolute list-none"
            style={{
              left: slot.left,
              top: slot.top,
              width: slot.width,
              height: slot.height,
            }}
          >
            <div className={cn(DECO_SURFACE_BASE, slot.surface)}>
              <ShimmerBar
                style={{
                  width: `${slot.shimmerPct}%`,
                  height: `${slot.shimmerPct}%`,
                }}
                className={cn('shrink-0 opacity-[0.38]', slot.shimmerClass)}
              />
            </div>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          'relative flex h-full w-full flex-col items-center justify-center backdrop-blur-[1.5px]',
          Z.raised
        )}
        data-testid="hero-section-skeleton-layer"
      >
        <section className="flex h-full w-full items-center justify-center">
          <div className={cn(LAYOUT.container.narrow, LAYOUT.px)}>
            <div className="flex flex-col items-center justify-center gap-5 text-center lg:gap-7">
              <header className="flex flex-col items-center gap-2">
                <ShimmerBar className="mx-auto h-10 w-full max-w-xs sm:h-12 sm:max-w-sm md:h-14 md:max-w-md" />
                <ShimmerBar className="mx-auto h-6 w-[min(18rem,86vw)] sm:h-7" />
                <ShimmerBar className="mx-auto h-4 w-[min(22rem,90vw)]" />
              </header>

              <div
                className={cn(
                  LAYOUT.prose.lg,
                  'flex w-full max-w-none flex-col items-center gap-3'
                )}
              >
                <ShimmerBar className="mx-auto h-5 w-full max-w-3xl" />
                <ShimmerBar className="mx-auto h-5 w-[96%] max-w-2xl" />
                <ShimmerBar className="mx-auto h-5 w-[86%] max-w-xl" />
              </div>

              <ShimmerBar className="h-12 w-[min(12rem,68vw)] max-w-none rounded-2xl" />

              <ul className="flex list-none flex-wrap items-center justify-center gap-3 md:gap-5 lg:gap-7">
                {['stat-a', 'stat-b', 'stat-c'].map((key) => (
                  <li key={key} className="flex flex-col items-center gap-2">
                    <ShimmerBar className="h-8 w-12" />
                    <ShimmerBar className="h-3.5 w-28 max-w-36" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
