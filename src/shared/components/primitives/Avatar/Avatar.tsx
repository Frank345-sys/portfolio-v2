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
  sm: 'size-20 text-lg lg:size-24 lg:text-2xl',
  md: 'size-28 text-3xl md:size-32 md:text-4xl lg:size-36 lg:text-5xl',
  lg: 'size-32 text-4xl md:size-36 md:text-5xl lg:size-40 lg:text-6xl',
} as const

type AvatarSize = keyof typeof AVATAR_SIZES

interface AvatarProps {
  initials: string
  name?: string
  src?: string
  size?: AvatarSize
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  onImageError?: () => void
  onImageLoad?: () => void
  className?: string
}

export function Avatar({
  initials,
  name,
  src,
  size = 'lg',
  loading = 'eager',
  fetchPriority = 'high',
  onImageError,
  onImageLoad,
  className,
}: AvatarProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const showPhoto = !!src && !hasImageError

  const initialsLabel = name
    ? `Avatar de ${name}`
    : (`Avatar con iniciales ${initials}` as const)

  const photoAlt = name
    ? `Foto de ${name}`
    : (`Avatar con iniciales ${initials}` as const)

  return (
    <div
      role={!showPhoto ? 'img' : undefined}
      aria-label={!showPhoto ? initialsLabel : undefined}
      className={cn('relative', AVATAR_SIZES[size], className)}
    >
      <div
        className={cn(
          ANIMATION.spin.continuous,
          'u-avatar-feature-ring absolute inset-0 rounded-full [animation-duration:20s]'
        )}
      />

      <div
        className={cn(
          'shadow-elevation-lg relative flex size-full items-center justify-center overflow-hidden rounded-full font-bold text-white',
          !showPhoto && 'u-avatar-feature-gradient'
        )}
      >
        {showPhoto && (
          <img
            src={src}
            alt={photoAlt}
            width={PROFILE_AVATAR_INTRINSIC.width}
            height={PROFILE_AVATAR_INTRINSIC.height}
            loading={loading}
            fetchPriority={fetchPriority}
            decoding="async"
            className="size-full rounded-full object-cover"
            onError={() => {
              setHasImageError(true)
              onImageError?.()
            }}
            onLoad={onImageLoad}
          />
        )}
        <span
          hidden={showPhoto || undefined}
          aria-hidden={!showPhoto || undefined}
        >
          {initials}
        </span>
      </div>
    </div>
  )
}
