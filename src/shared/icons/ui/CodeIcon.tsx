/**
 * Ícono SVG `CodeIcon` para marcas, stack o acciones en la interfaz.
 *
 * @fileoverview Componente de presentación sin estado; delega color en `currentColor` y tamaño en `className`.
 * @remarks Expone las props nativas de `SVGSVGElement`; ver el comentario del símbolo exportado para el uso semántico.
 */

import { type SVGProps } from 'react'

import { cn } from '@/shared/utils/cn'
/** Icono de código. Props nativas de `<svg>`. */
export function CodeIcon({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 502.664 502.664"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={cn('size-5', className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M153.821,358.226L0,274.337v-46.463l153.821-83.414v54.574L46.636,250.523l107.185,53.431
        C153.821,303.954,153.821,358.226,153.821,358.226z"
      />
      <path
        fill="currentColor"
        d="M180.094,387.584L282.103,115.08h32.227L212.084,387.584H180.094z"
      />
      <path
        fill="currentColor"
        d="M348.843,358.226v-54.272l107.164-52.999l-107.164-52.59v-53.927l153.821,83.522v46.183
        L348.843,358.226z"
      />
    </svg>
  )
}
