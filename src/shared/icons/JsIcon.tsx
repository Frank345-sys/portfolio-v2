import { type SVGProps } from 'react'
import { cn } from '@/shared/utils/cn'
/**
 * Icono de JavaScript.
 * @param props - Propiedades del SVG.
 * @returns SVG de JavaScript.
 */
const JsIcon = ({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden={ariaHidden}
    className={cn('h-7 w-7', className)}
    {...props}
  >
    <rect width="24" height="24" rx="3" fill="#F7DF1E" />
    <text x="3.5" y="19" fontSize="13" fontWeight="bold" fill="#000">
      JS
    </text>
  </svg>
)

export default JsIcon
