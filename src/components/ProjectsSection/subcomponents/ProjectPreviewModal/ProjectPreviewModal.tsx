/**
 * Pieza de interfaz del portfolio (`ProjectPreviewModal`).
 *
 * @fileoverview Implementación del archivo `ProjectPreviewModal.tsx` dentro de `components/ProjectsSection/subcomponents/ProjectPreviewModal`; ver exports para la API pública.
 * @remarks Diálogo controlado por `Boolean(modalProject)`; título del modal vía `useId`.
 */

import { useId } from 'react'

import { ImageCarousel } from '@/shared/components/composites/ImageCarousel'
import { Modal } from '@/shared/components/primitives/Modal'

import { getProjectCarouselImageAltBase } from '../../utils/projectCarouselImageAlt'
import { ProjectPreviewTitleBlock } from '../ProjectPreviewTitleBlock/ProjectPreviewTitleBlock'

import type { ProjectPreviewModalProps } from './types'

/**
 * @module components/ProjectsSection/subcomponents/ProjectPreviewModal/ProjectPreviewModal
 *
 * Modal con carrusel a pantalla completa cuando `modalProject` está definido.
 */
export function ProjectPreviewModal({
  modalProject,
  modalSlide,
  setModalSlide,
  onClose,
  resolveProjectImageAttributes,
}: ProjectPreviewModalProps) {
  const modalTitleId = useId()
  const isOpen = Boolean(modalProject)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy={modalTitleId}
      closeButtonAriaLabel="Cerrar vista ampliada"
      className="flex max-h-[min(92vh,920px)] max-w-[min(1080px,calc(100vw-2rem))] flex-col gap-4"
    >
      <Modal.Header>
        <ProjectPreviewTitleBlock
          subtitle={modalProject?.subtitle ?? ''}
          title={modalProject?.title ?? ''}
          titleHeadingId={modalTitleId}
        />
      </Modal.Header>
      <Modal.Body className="bg-bg-subtle overflow-hidden rounded-md">
        {modalProject ? (
          <ImageCarousel
            slides={[...modalProject.slides]}
            imageAlt={getProjectCarouselImageAltBase(modalProject.title)}
            autoplay
            resolveImageAttributes={resolveProjectImageAttributes}
            carouselAriaLabel={`Capturas ampliadas: ${modalProject.title}`}
            previousSlideAriaLabel="Imagen anterior (vista ampliada)"
            nextSlideAriaLabel="Imagen siguiente (vista ampliada)"
            slideIndex={modalSlide}
            onSlideChange={setModalSlide}
            className="aspect-video h-[min(72vh,760px)]"
            imageClassName="object-contain object-center"
          />
        ) : null}
      </Modal.Body>
    </Modal>
  )
}
