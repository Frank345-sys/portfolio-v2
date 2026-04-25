import {
  useCallback,
  useMemo,
  useState,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from 'react'
import { ANIMATION, Z } from '@/shared/constants/tokens'
import { ImageBrokenIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'
import { m, AnimatePresence, useReducedMotion } from 'motion/react'
import { OVERLAY_FADE } from '@/shared/constants/motion'

/** Duración de entrada/salida del overlay (debe coincidir con `OVERLAY_FADE` variants). */
const OVERLAY_FADE_DURATION_S = 0.3

/** Overlays instantáneos cuando el movimiento está reducido (prop o sistema). */
const OVERLAY_INSTANT = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0 },
} as const

interface ProgressiveImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'onLoad' | 'onError'
> {
  /** Clases del contenedor `relative` (p. ej. `aspect-video w-full`). */
  wrapperClassName?: string
  /** Clases extra del overlay skeleton (dimensiones, bordes). */
  skeletonClassName?: string
  showSkeleton?: boolean
  onLoad?: (e: SyntheticEvent<HTMLImageElement>) => void
  onError?: (e: SyntheticEvent<HTMLImageElement>) => void
  /**
   * Alineado con p. ej. `ImageCarousel`: si es `true`, animaciones mínimas.
   * Se combina con `prefers-reduced-motion` del sistema (`true` en cualquiera → reducido).
   * `null` solo aplica la preferencia del sistema (útil hasta hidratar).
   */
  reduceMotion?: boolean | null
}

/**
 * `<img>` con placeholder tipo skeleton, fade-in al cargar y estado de error.
 * Pensado para Vite/React (sin `next/image`): lazy/async decoding nativos.
 *
 * Al cambiar `src`, el estado de carga se reinicia remontando la implementación interna
 * (`key={src}`), sin `useEffect` ni renders en cascada.
 *
 * Flujo: **descargando** → shimmer fade in → **descargado** → shimmer fade out → imagen fade in;
 * **falló** → shimmer fade out → ícono fade in (`AnimatePresence` + `mode="wait"`).
 */
export function ProgressiveImage(props: ProgressiveImageProps) {
  return <ProgressiveImageImpl key={props.src} {...props} />
}

function ProgressiveImageImpl({
  src,
  alt,
  className,
  wrapperClassName,
  skeletonClassName,
  showSkeleton = true,
  onLoad,
  onError,
  reduceMotion: reduceMotionProp,
  loading = 'lazy',
  decoding = 'async',
  ...imgProps
}: ProgressiveImageProps) {
  const prefersReducedMotion = useReducedMotion()
  const effectiveReducedMotion =
    reduceMotionProp === true || prefersReducedMotion === true
  const overlayFadeDuration = effectiveReducedMotion
    ? 0
    : OVERLAY_FADE_DURATION_S
  const overlayMotionProps = effectiveReducedMotion
    ? OVERLAY_INSTANT
    : OVERLAY_FADE

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const imageOpacityTransition = useMemo(
    () => ({
      opacity: {
        duration: overlayFadeDuration,
        delay:
          !isLoading && !hasError && showSkeleton ? overlayFadeDuration : 0,
      },
    }),
    [hasError, isLoading, overlayFadeDuration, showSkeleton]
  )

  const handleLoad = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false)
      onLoad?.(e)
    },
    [onLoad]
  )

  const handleError = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false)
      setHasError(true)
      onError?.(e)
    },
    [onError]
  )

  if (!src) {
    return (
      <div
        className={cn('relative h-full w-full', wrapperClassName)}
        aria-hidden
      />
    )
  }

  const showSkeletonOverlay = isLoading && showSkeleton
  const showErrorOverlay = hasError

  return (
    <div className={cn('relative h-full w-full', wrapperClassName)}>
      {/* Imagen: opacidad 0 mientras carga; tras salida del shimmer, fade in (o al instante si no hay skeleton). */}
      {!hasError && (
        <m.div
          initial={false}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={imageOpacityTransition}
          className="h-full w-full"
        >
          <img
            src={src}
            alt={alt}
            loading={loading}
            decoding={decoding}
            onLoad={handleLoad}
            onError={handleError}
            className={cn('h-full w-full', className)}
            {...imgProps}
          />
        </m.div>
      )}

      <AnimatePresence mode="wait">
        {showSkeletonOverlay && (
          <m.div
            key="skeleton"
            {...overlayMotionProps}
            className={cn('absolute inset-0', Z.raised)}
          >
            <div
              aria-hidden
              className={cn(
                ANIMATION.loading.skeleton,
                'absolute inset-0',
                skeletonClassName
              )}
            />
          </m.div>
        )}

        {showErrorOverlay && (
          <m.div
            key="error"
            {...overlayMotionProps}
            className={cn('absolute inset-0', Z.raised)}
          >
            <div
              role="alert"
              className="bg-bg-subtle text-text-soft absolute inset-0 flex items-center justify-center"
            >
              <span className="sr-only">No se pudo cargar la imagen</span>
              <ImageBrokenIcon />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
