import { type SVGProps } from 'react'

import { cn } from '@/shared/utils/cn'
/** Icono de React. Props nativas de `<svg>`. */
export function ReactIcon({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden={ariaHidden}
      className={cn('h-7 w-7', className)}
      fill="#61DAFB"
      {...props}
    >
      <circle cx="12" cy="12" r="2.3" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.8"
        stroke="#61DAFB"
        strokeWidth="1.1"
        fill="none"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.8"
        stroke="#61DAFB"
        strokeWidth="1.1"
        fill="none"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.8"
        stroke="#61DAFB"
        strokeWidth="1.1"
        fill="none"
        transform="rotate(120 12 12)"
      />
    </svg>
  )
}
