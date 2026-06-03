/**
 * Helpers para derivar `src` / `srcSet` / `sizes` de capturas PNG en `public/images/projects/`
 * (variantes WebP en producción vía build).
 *
 * @module components/ProjectsSection/utils/getProjectImageAttributes
 * @fileoverview Implementación del archivo `getProjectImageAttributes.ts` dentro de `components/ProjectsSection/utils`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { BREAKPOINT_MIN_PX } from '@/shared/constants/breakpoints'

import type { ProjectImageAttributes } from '../types'

const PROJECT_IMAGE_SIZES_CARD =
  `(max-width: ${BREAKPOINT_MIN_PX.lg - 1}px) 100vw, (max-width: ${BREAKPOINT_MIN_PX.xl - 1}px) 35vw, min(40vw, 34rem)` as const

/**
 * Lightbox: panel `max-w-[min(1080px,calc(100vw-2rem))]` — el carrusel del modal usa todo el ancho útil.
 */
const PROJECT_IMAGE_SIZES_LIGHTBOX =
  '(min-width: 640px) min(100vw - 2rem, 67.5rem), 100vw' as const

/** Variante de `sizes` / layout: tarjeta en lista vs. modal a pantalla ancha. */
type ProjectImageVariant = 'card' | 'lightbox'

/**
 * Convierte la ruta de un PNG de capturas (`.../images/projects/foo.png`, query opcional)
 * a `src` / `srcSet` responsive WebP (`-600.webp`, `-1200.webp`) como en el build de producción.
 * Si la ruta no coincide con el patrón, devuelve `null`.
 */
export function projectPngPathToWebpAttributes(
  src: string,
  sizes: string
): ProjectImageAttributes | null {
  const match = src.match(/^(.*\/images\/projects\/[^/]+)\.png(\?.*)?$/i)
  if (!match) return null

  const base = match[1]
  const search = match[2] ?? ''
  return {
    src: `${base}-1200.webp${search}`,
    srcSet: `${base}-600.webp${search} 600w, ${base}-1200.webp${search} 1200w`,
    sizes,
  }
}

/**
 * Atributos de imagen para capturas bajo `public/images/projects/*.png`.
 * En producción el build añade `-600.webp` y `-1200.webp` (plugin en `vite.config.ts`).
 * En desarrollo se sigue sirviendo el `.png` original.
 *
 * @param src - Ruta del PNG bajo `public/images/projects/`.
 * @param options - Opcional: `variant` `card` (preview en lista) o `lightbox` (modal ampliado); por defecto `card`.
 */
export function getProjectImageAttributes(
  src: string,
  options?: { variant?: ProjectImageVariant }
): ProjectImageAttributes {
  const variant: ProjectImageVariant = options?.variant ?? 'card'
  const sizeDesc =
    variant === 'lightbox'
      ? PROJECT_IMAGE_SIZES_LIGHTBOX
      : PROJECT_IMAGE_SIZES_CARD

  const withSizes: ProjectImageAttributes = {
    src,
    sizes: sizeDesc,
  }
  if (!import.meta.env.PROD) {
    return withSizes
  }

  return projectPngPathToWebpAttributes(src, sizeDesc) ?? withSizes
}
