import type { ImgHTMLAttributes } from 'react'

type ProjectImagePick = Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'sizes'
>

/**
 * Convierte la ruta de un PNG de capturas (`…/images/projects/foo.png`, query opcional)
 * a `src` / `srcSet` responsive WebP (`-600.webp`, `-1200.webp`) como en el build de producción.
 * Si la ruta no coincide con el patrón, devuelve `null`.
 */
export function projectPngPathToWebpAttributes(
  src: string,
  sizes: string
): ProjectImagePick | null {
  const m = src.match(/^(.*\/images\/projects\/[^/]+)\.png(\?.*)?$/i)
  if (!m) return null

  const base = m[1]
  const search = m[2] ?? ''
  return {
    src: `${base}-1200.webp${search}`,
    srcSet: `${base}-600.webp${search} 600w, ${base}-1200.webp${search} 1200w`,
    sizes,
  }
}
