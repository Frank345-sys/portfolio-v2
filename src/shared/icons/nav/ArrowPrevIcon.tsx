/**
 * Ícono SVG `ArrowPrevIcon` para marcas, stack o acciones en la interfaz.
 *
 * @fileoverview Componente de presentación sin estado; delega color en `currentColor` y tamaño en `className`.
 * @remarks Expone las props nativas de `SVGSVGElement`; ver el comentario del símbolo exportado para el uso semántico.
 */

import { type SVGProps } from 'react'

import { cn } from '@/shared/utils/cn'

/** Icono de flecha izquierda (anterior). Props nativas de `<svg>`. */
export function ArrowPrevIcon({
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
      className={cn('h-5 w-5', className)}
      {...props}
    >
      <path
        d="M16.18 3.27C15.79 2.88 15.16 2.88 14.77 3.27L8.12 9.91C6.95 11.08 6.95 12.98 8.12 14.16L14.69 20.73C15.08 21.12 15.71 21.12 16.1 20.73C16.5 20.34 16.5 19.71 16.1 19.32L9.53 12.74C9.14 12.35 9.14 11.72 9.53 11.33L16.18 4.68C16.57 4.29 16.57 3.66 16.18 3.27Z"
        fill="currentColor"
      />
    </svg>
  )
}
