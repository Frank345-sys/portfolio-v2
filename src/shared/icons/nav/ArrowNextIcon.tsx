/**
 * Ícono SVG `ArrowNextIcon` para marcas, stack o acciones en la interfaz.
 *
 * @fileoverview Componente de presentación sin estado; delega color en `currentColor` y tamaño en `className`.
 * @remarks Expone las props nativas de `SVGSVGElement`; ver el comentario del símbolo exportado para el uso semántico.
 */

import { type SVGProps } from 'react'

import { cn } from '@/shared/utils/cn'

/** Icono de flecha derecha (siguiente). Props nativas de `<svg>`. */
export function ArrowNextIcon({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={ariaHidden}
      className={cn('size-5', className)}
      {...props}
    >
      <path
        d="M7.82 20.73C8.21 21.12 8.84 21.12 9.23 20.73L15.88 14.09C17.05 12.92 17.05 11.02 15.88 9.84L9.31 3.27C8.92 2.88 8.29 2.88 7.9 3.27C7.5 3.66 7.5 4.29 7.9 4.68L14.47 11.26C14.86 11.65 14.86 12.28 14.47 12.67L7.82 19.32C7.43 19.71 7.43 20.34 7.82 20.73Z"
        fill="currentColor"
      />
    </svg>
  )
}
