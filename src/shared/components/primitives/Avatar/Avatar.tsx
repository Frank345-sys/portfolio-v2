/**
 * Pieza de interfaz del portfolio (`Avatar`).
 *
 * @fileoverview Implementación del archivo `Avatar.tsx` dentro de `shared/components/Avatar`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { useState } from 'react'

import { PROFILE_AVATAR_INTRINSIC } from '@/shared/constants/imageIntrinsic'
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

/**
 * @module shared/components/Avatar/Avatar
 *
 * Avatar decorativo accesible con fallback de iniciales y ring animado.
 */
export function Avatar({
  initials,
  name,
  src,
  size = 'lg',
  className,
}: AvatarProps) {
  const initialsOnlyLabel = name ? `Avatar de ${name}` : `Avatar de ${initials}`
  const photoAlt = name ? `Foto de ${name}` : `Avatar con iniciales ${initials}`
  const [hasImageError, setHasImageError] = useState(false)
  const showPhoto = Boolean(src) && !hasImageError

  return (
    <div
      className={cn('relative shrink-0', AVATAR_SIZES[size], className)}
      {...(!showPhoto
        ? { role: 'img' as const, 'aria-label': initialsOnlyLabel }
        : {})}
    >
      <div
        className={cn(
          ANIMATION.spin.continuous,
          'u-avatar-feature-ring absolute inset-0 rounded-full [animation-duration:20s]'
        )}
      />

      <div
        className={cn(
          'shadow-elevation-lg relative flex h-full w-full items-center justify-center overflow-hidden rounded-full font-bold text-white',
          !showPhoto && 'u-avatar-feature-gradient'
        )}
      >
        {showPhoto ? (
          <img
            src={src}
            alt={photoAlt}
            width={PROFILE_AVATAR_INTRINSIC.width}
            height={PROFILE_AVATAR_INTRINSIC.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-full object-cover"
            onError={() => setHasImageError(true)}
          />
        ) : null}
        <span
          hidden={showPhoto}
          {...(!showPhoto ? { 'aria-hidden': true } : {})}
        >
          {initials}
        </span>
      </div>
    </div>
  )
}
