/**
 * Ícono SVG `JsIcon` para marcas, stack o acciones en la interfaz.
 *
 * @fileoverview Componente de presentación sin estado; delega color en `currentColor` y tamaño en `className`.
 * @remarks Expone las props nativas de `SVGSVGElement`; ver el comentario del símbolo exportado para el uso semántico.
 */

import { type SVGProps } from 'react'

import { cn } from '@/shared/utils/cn'
/** Icono de JavaScript. Props nativas de `<svg>`. */
export function JsIcon({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden={ariaHidden}
      className={cn('size-7', className)}
      {...props}
    >
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <text x="3.5" y="19" fontSize="13" fontWeight="bold" fill="#000">
        JS
      </text>
    </svg>
  )
}
