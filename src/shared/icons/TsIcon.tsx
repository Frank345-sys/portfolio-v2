import { type SVGProps } from 'react'
import { cn } from '@/shared/utils/cn'
/**
 * Icono de TypeScript.
 * @param props - Propiedades del SVG.
 * @returns SVG de TypeScript.
 */
const TsIcon = ({
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
    <rect width="24" height="24" rx="3" fill="#3178C6" />
    <text x="3" y="19" fontSize="12" fontWeight="bold" fill="#fff">
      TS
    </text>
  </svg>
)

export default TsIcon
