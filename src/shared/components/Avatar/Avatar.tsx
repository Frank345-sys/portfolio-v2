import type { SyntheticEvent } from 'react'
import { ANIMATION } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

const AVATAR_SIZES = {
  sm: 'h-20 w-20 text-lg lg:h-24 lg:w-24 lg:text-2xl',
  md: 'h-28 w-28 text-3xl md:h-32 md:w-32 md:text-4xl lg:h-36 lg:w-36 lg:text-5xl',
  lg: 'h-32 w-32 text-4xl md:h-36 md:w-36 md:text-5xl lg:h-40 lg:w-40 lg:text-6xl',
} as const

type AvatarSize = keyof typeof AVATAR_SIZES

interface AvatarProps {
  initials: string
  name?: string
  src?: string
  size?: AvatarSize
  className?: string
}

function handleImageError(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = 'none'
  e.currentTarget.nextElementSibling?.removeAttribute('hidden')
}

/**
 * Avatar decorativo accesible con fallback de iniciales.
 * Usa un ring animado y, opcionalmente, una imagen.
 */
export function Avatar({
  initials,
  name,
  src,
  size = 'lg',
  className,
}: AvatarProps) {
  const ariaLabel = name ? `Avatar de ${name}` : `Avatar de ${initials}`

  return (
    <div
      className={cn('relative shrink-0', AVATAR_SIZES[size], className)}
      role="img"
      aria-label={ariaLabel}
    >
      <div
        className={cn(
          ANIMATION.spin.continuous,
          'u-avatar-feature-ring absolute inset-0 rounded-full [animation-duration:20s]'
        )}
      />

      <div
        className={cn(
          'text-text-white shadow-elevation-lg relative flex h-full w-full items-center justify-center rounded-full font-bold',
          !src && 'u-avatar-feature-gradient'
        )}
      >
        {src ? (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className="h-full w-full rounded-full object-cover"
            onError={handleImageError}
          />
        ) : null}
        <span hidden={!!src}>{initials}</span>
      </div>
    </div>
  )
}
