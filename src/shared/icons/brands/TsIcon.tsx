/**
 * Ícono SVG `TsIcon` para marcas, stack o acciones en la interfaz.
 *
 * @fileoverview Componente de presentación sin estado; delega color en `currentColor` y tamaño en `className`.
 * @remarks Expone las props nativas de `SVGSVGElement`; ver el comentario del símbolo exportado para el uso semántico.
 */

import { type SVGProps } from 'react'

import { cn } from '@/shared/utils/cn'
/** Icono de TypeScript. Props nativas de `<svg>`. */
export function TsIcon({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden={ariaHidden}
      className={cn('h-7 w-7', className)}
      {...props}
    >
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <text x="3" y="19" fontSize="12" fontWeight="bold" fill="#fff">
        TS
      </text>
    </svg>
  )
}
