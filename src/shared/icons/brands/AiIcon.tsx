/**
 * Ícono SVG `AiIcon` para marcas, stack o acciones en la interfaz.
 *
 * @fileoverview Componente de presentación sin estado; delega color en `currentColor` y tamaño en `className`.
 * @remarks Expone las props nativas de `SVGSVGElement`; ver el comentario del símbolo exportado para el uso semántico.
 */

import { type SVGProps } from 'react'

import { cn } from '@/shared/utils/cn'

/** Icono IA (chip con “AI” en el centro); relleno `currentColor` para tema y hover. */
export function AiIcon({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="none"
      aria-hidden={ariaHidden}
      className={cn('size-6', className)}
      {...props}
    >
      <g transform="translate(64 64)" fill="currentColor">
        <path d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.75,128 L146.82,128 L99.48,256 L121.98,256 L130.91,230.98 L187.58,230.98 L196.32,256 L220.17,256 L171.75,128 Z M260.09,128 L237.69,128 L237.69,256 L260.09,256 L260.09,128 Z M159.09,149.48 L181.41,213.33 L137.14,213.33 L159.09,149.48 Z M341.33,256 L384,256 L384,298.67 L341.33,298.67 L341.33,256 Z M85.33,341.33 L128,341.33 L128,384 L85.33,384 L85.33,341.33 Z M170.67,341.33 L213.33,341.33 L213.33,384 L170.67,384 L170.67,341.33 Z M85.33,0 L128,0 L128,42.67 L85.33,42.67 L85.33,0 Z M256,341.33 L298.67,341.33 L298.67,384 L256,384 L256,341.33 Z M170.67,0 L213.33,0 L213.33,42.67 L170.67,42.67 L170.67,0 Z M256,0 L298.67,0 L298.67,42.67 L256,42.67 L256,0 Z M341.33,170.67 L384,170.67 L384,213.33 L341.33,213.33 L341.33,170.67 Z M0,256 L42.67,256 L42.67,298.67 L0,298.67 L0,256 Z M341.33,85.33 L384,85.33 L384,128 L341.33,128 L341.33,85.33 Z M0,170.67 L42.67,170.67 L42.67,213.33 L0,213.33 L0,170.67 Z M0,85.33 L42.67,85.33 L42.67,128 L0,128 L0,85.33 Z" />
      </g>
    </svg>
  )
}
