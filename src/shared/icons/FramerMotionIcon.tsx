import { type SVGProps } from 'react'
import { cn } from '@/shared/utils/cn'
/**
 * Icono de Framer Motion.
 * @param props - Propiedades del SVG.
 * @returns SVG de Framer Motion.
 */
const FramerMotionIcon = ({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden={ariaHidden}
    className={cn('h-7 w-7', className)}
    fill="#BB4B96"
    {...props}
  >
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
  </svg>
)

export default FramerMotionIcon
