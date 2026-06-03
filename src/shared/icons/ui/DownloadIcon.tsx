/**
 * Ícono SVG `DownloadIcon` para marcas, stack o acciones en la interfaz.
 *
 * @fileoverview Componente de presentación sin estado; delega color en `currentColor` y tamaño en `className`.
 * @remarks Expone las props nativas de `SVGSVGElement`; ver el comentario del símbolo exportado para el uso semántico.
 */

import { type SVGProps } from 'react'

import { cn } from '@/shared/utils/cn'
/** Icono de descarga. Props nativas de `<svg>`. */
export function DownloadIcon({
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
      className={cn('h-5 w-5', className)}
      {...props}
    >
      <path
        d="M3 15C3 17.83 3 19.24 3.88 20.12C4.76 21 6.17 21 9 21H15C17.83 21 19.24 21 20.12 20.12C21 19.24 21 17.83 21 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
