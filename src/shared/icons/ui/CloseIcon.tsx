/**
 * Ícono SVG `CloseIcon` para marcas, stack o acciones en la interfaz.
 *
 * @fileoverview Componente de presentación sin estado; delega color en `currentColor` y tamaño en `className`.
 * @remarks Expone las props nativas de `SVGSVGElement`; ver el comentario del símbolo exportado para el uso semántico.
 */

import { type SVGProps } from 'react'

import { cn } from '@/shared/utils/cn'
/** Icono de cierre. Props nativas de `<svg>`. */

export function CloseIcon({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      className={cn('size-5', className)}
      {...props}
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
