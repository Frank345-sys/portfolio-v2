import { type SVGProps } from 'react'
import { cn } from '@/shared/utils/cn'

/** Icono de chevron hacia arriba (p. ej. “volver al inicio”). Props nativas de `<svg>`. */
export function ArrowUpIcon({
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
        d="M6 15l6-6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
