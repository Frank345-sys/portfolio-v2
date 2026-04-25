import type { ImgHTMLAttributes } from 'react'
import { projectPngPathToWebpAttributes } from './projectImageWebp'

/**
 * Card en `ProjectsSection`: columna `flex-1` junto a panel 50% / 45% + `gap-10` + rail.
 * Aprox. `35vw` en lg, `min(40vw, 34rem)` en ≥xl con tope de `max-w-7xl` (no ~581px fijos).
 */
const PROJECT_IMAGE_SIZES_CARD =
  '(max-width: 1023px) 100vw, (max-width: 1279px) 35vw, min(40vw, 34rem)' as const

/**
 * Lightbox: panel `max-w-[min(1080px,calc(100vw-2rem))]` — el carrusel usa todo el ancho útil.
 */
const PROJECT_IMAGE_SIZES_LIGHTBOX =
  '(min-width: 640px) min(100vw - 2rem, 67.5rem), 100vw' as const

type ProjectImageVariant = 'card' | 'lightbox'

type ProjectImagePick = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'sizes'
>

/**
 * Atributos de imagen para capturas bajo `public/images/projects/*.png`.
 * En producción el build añade `-600.webp` y `-1200.webp` (plugin en `vite.config.ts`).
 * En desarrollo se sigue sirviendo el `.png` original.
 */
export function getProjectImageAttributes(
  src: string,
  options?: { variant?: ProjectImageVariant }
): ProjectImagePick {
  const variant: ProjectImageVariant = options?.variant ?? 'card'
  const sizeDesc =
    variant === 'lightbox'
      ? PROJECT_IMAGE_SIZES_LIGHTBOX
      : PROJECT_IMAGE_SIZES_CARD

  const withSizes: ProjectImagePick = {
    src,
    sizes: sizeDesc,
  }
  if (!import.meta.env.PROD) {
    return withSizes
  }

  return projectPngPathToWebpAttributes(src, sizeDesc) ?? withSizes
}
