import { cn } from '@/shared/utils/cn'
import { type SVGProps } from 'react'
/**
 * Icono de cierre.
 * @param props - Propiedades del SVG.
 * @returns SVG de cierre.
 */

const CloseIcon = ({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden={ariaHidden}
    className={cn('h-5 w-5', className)}
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

export default CloseIcon
