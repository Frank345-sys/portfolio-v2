/**
 * Constantes del esqueleto del hero (cajas decorativas y superficie común).
 *
 * @module shared/components/SectionLazyFallback/subcomponents/HeroSectionSkeleton/constants
 * @fileoverview Slots de cajas decorativas para `HeroSectionSkeleton.tsx` en esta carpeta.
 * @remarks Los cambios de layout suelen requerir revisión visual del skeleton en `SectionLazyFallback`.
 */

/**
 * Cajas detrás del blur: contenedores cuadrados compactos (~20% más pequeños);
 * `shimmerPct` = mismo % en ancho y alto.
 */
export const HERO_DECO_BOX_SLOTS = [
  {
    left: '7%',
    top: '14%',
    width: 'min(68px, 17vmin)',
    height: 'min(68px, 17vmin)',
    surface: 'rounded-2xl rounded-br-lg md:rounded-3xl md:rounded-tl-xl',
    shimmerPct: 44,
    shimmerClass: 'rounded-md',
  },
  {
    left: '78%',
    top: '18%',
    width: 'min(62px, 15vmin)',
    height: 'min(62px, 15vmin)',
    surface: 'rounded-xl rounded-tl-md md:rounded-2xl',
    shimmerPct: 46,
    shimmerClass: 'rounded',
  },
  {
    left: '4%',
    top: '30%',
    width: 'min(56px, 14vmin)',
    height: 'min(56px, 14vmin)',
    surface: 'rounded-2xl rounded-tr-md',
    shimmerPct: 46,
    shimmerClass: 'rounded-md',
  },
  {
    left: '84%',
    top: '26%',
    width: 'min(73px, 18vmin)',
    height: 'min(73px, 18vmin)',
    surface: 'rounded-xl md:rounded-2xl rounded-bl-lg',
    shimmerPct: 38,
    shimmerClass: 'rounded-md',
  },
  {
    left: '10%',
    top: '43%',
    width: 'min(65px, 16vmin)',
    height: 'min(65px, 16vmin)',
    surface: 'rounded-lg md:rounded-xl rounded-br-2xl',
    shimmerPct: 48,
    shimmerClass: 'rounded-sm',
  },
  {
    left: '72%',
    top: '41%',
    width: 'min(62px, 15vmin)',
    height: 'min(62px, 15vmin)',
    surface: 'rounded-2xl rounded-tl-lg',
    shimmerPct: 42,
    shimmerClass: 'rounded-md',
  },
  {
    left: '16%',
    top: '54%',
    width: 'min(70px, 17vmin)',
    height: 'min(70px, 17vmin)',
    surface: 'md:rounded-3xl rounded-xl rounded-r-lg',
    shimmerPct: 36,
    shimmerClass: 'rounded-md',
  },
  {
    left: '80%',
    top: '52%',
    width: 'min(57px, 14vmin)',
    height: 'min(57px, 14vmin)',
    surface: 'rounded-xl rounded-bl-md md:rounded-2xl',
    shimmerPct: 46,
    shimmerClass: 'rounded',
  },
  {
    left: '6%',
    top: '66%',
    width: 'min(54px, 13vmin)',
    height: 'min(54px, 13vmin)',
    surface: 'rounded-2xl rounded-tl-md rounded-br-xl',
    shimmerPct: 44,
    shimmerClass: 'rounded-md',
  },
  {
    left: '86%',
    top: '63%',
    width: 'min(76px, 18vmin)',
    height: 'min(76px, 18vmin)',
    surface: 'rounded-lg md:rounded-2xl rounded-r-2xl',
    shimmerPct: 34,
    shimmerClass: 'rounded-md',
  },
  {
    left: '12%',
    top: '76%',
    width: 'min(70px, 17vmin)',
    height: 'min(70px, 17vmin)',
    surface: 'rounded-xl md:rounded-2xl rounded-tl-lg',
    shimmerPct: 48,
    shimmerClass: 'rounded-sm',
  },
  {
    left: '74%',
    top: '74%',
    width: 'min(62px, 15vmin)',
    height: 'min(62px, 15vmin)',
    surface: 'rounded-2xl rounded-tr-lg md:rounded-3xl rounded-bl-md',
    shimmerPct: 46,
    shimmerClass: 'rounded-md',
  },
  {
    left: '3%',
    top: '86%',
    width: 'min(65px, 16vmin)',
    height: 'min(65px, 16vmin)',
    surface: 'rounded-xl rounded-br-2xl md:rounded-2xl',
    shimmerPct: 40,
    shimmerClass: 'rounded-md',
  },
  {
    left: '88%',
    top: '88%',
    width: 'min(74px, 18vmin)',
    height: 'min(74px, 18vmin)',
    surface: 'rounded-lg md:rounded-2xl rounded-tl-2xl',
    shimmerPct: 48,
    shimmerClass: 'rounded',
  },
] as const

/** Clases base de la superficie de cada caja decorativa (combinar con `surface` del slot). */
export const DECO_SURFACE_BASE =
  'bg-bg-weak shadow-elevation-lg flex size-full select-none items-center justify-center'
