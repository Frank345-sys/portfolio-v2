import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react'
import { useInView } from 'motion/react'
import { MEDIA_QUERY_LG_MIN } from '@/shared/constants/breakpoints'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { getValidUrls } from '@/shared/utils/getValidUrls'
import type {
  ProjectLightboxCarouselSync,
  ProjectPreviewGallery,
} from '../types'

interface UseProjectPreviewCardParams
  extends
    Pick<ProjectPreviewGallery, 'images'>,
    Pick<
      ProjectLightboxCarouselSync,
      'lightboxSlideIndex' | 'onLightboxSlideChange'
    > {
  autoplay?: boolean
  /** `true` cuando el lightbox de esta card está abierto en `ProjectsSection`. */
  lightboxActive: boolean
}

interface UseProjectPreviewCardResult {
  cardRef: RefObject<HTMLDivElement | null>
  validImages: string[]
  hasImages: boolean
  shouldAutoplay: boolean
  canExpand: boolean
  /** Índice actual para `ImageCarousel` y para abrir el lightbox en el slide visible. */
  slideIndex: number
  /** Navegación manual: actualiza estado local o el padre según el lightbox esté abierto o no. */
  onCarouselSlideChange: (index: number) => void
}

/**
 * Vista previa de proyecto: viewport, imágenes, autoplay, lightbox expandible e índice del carrusel.
 *
 * Carrusel:
 * - **Lightbox cerrado:** índice local por card.
 * - **Lightbox abierto:** controlado por `ProjectsSection` (misma fuente que el modal).
 * - **Al cerrar el lightbox:** la card adopta el último slide visto en el modal.
 *
 * - **Cambio de galería (`imagesKey`):** patrón de React “ajustar estado cuando cambia una prop”
 *   durante el render (`prevImagesKey` + `setLocalSlide(0)`), sin `useEffect` que duplique derivación.
 * - **Lightbox:** último slide compartido en ref vía `useLayoutEffect`; al cerrar, otro `useLayoutEffect`
 *   copia ese valor a `localSlide` antes del pintado (handoff con el carrusel de la card).
 */
export function useProjectPreviewCard({
  images,
  autoplay = false,
  lightboxActive,
  lightboxSlideIndex,
  onLightboxSlideChange,
}: UseProjectPreviewCardParams): UseProjectPreviewCardResult {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const isCardInView = useInView(cardRef, { amount: 0.35 })
  const isLg = useMediaQuery(MEDIA_QUERY_LG_MIN)

  const validImages = useMemo(() => getValidUrls(images), [images])
  const hasImages = validImages.length > 0
  const imagesKey = validImages.join('|')
  const shouldAutoplay = autoplay && isCardInView && hasImages
  const canExpand = isLg && hasImages

  const [localSlide, setLocalSlide] = useState(0)
  const [prevImagesKey, setPrevImagesKey] = useState(imagesKey)
  const lastSharedSlideRef = useRef(0)
  const wasLightboxOpenRef = useRef(false)

  if (prevImagesKey !== imagesKey) {
    setPrevImagesKey(imagesKey)
    setLocalSlide(0)
  }

  useLayoutEffect(() => {
    if (lightboxActive && typeof lightboxSlideIndex === 'number') {
      lastSharedSlideRef.current = lightboxSlideIndex
    }
  }, [lightboxActive, lightboxSlideIndex])

  useLayoutEffect(() => {
    if (wasLightboxOpenRef.current && !lightboxActive) {
      setLocalSlide(lastSharedSlideRef.current)
    }
    wasLightboxOpenRef.current = lightboxActive
  }, [lightboxActive])

  const slideIndex =
    lightboxActive && typeof lightboxSlideIndex === 'number'
      ? lightboxSlideIndex
      : localSlide

  const onCarouselSlideChange = useCallback(
    (index: number) => {
      if (lightboxActive) {
        onLightboxSlideChange?.(index)
      } else {
        setLocalSlide(index)
      }
    },
    [lightboxActive, onLightboxSlideChange]
  )

  return {
    cardRef,
    validImages,
    hasImages,
    shouldAutoplay,
    canExpand,
    slideIndex,
    onCarouselSlideChange,
  }
}
