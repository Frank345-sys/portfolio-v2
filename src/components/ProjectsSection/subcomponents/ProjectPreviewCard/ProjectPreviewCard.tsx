import { m } from 'motion/react'

import { ImageCarousel } from '@/shared/components/ImageCarousel'
import { MOTION_ANIMATION } from '@/shared/constants'
import { ANIMATION, BUTTON, Z } from '@/shared/constants/tokens'
import { ExpandScreenIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

import { ProjectPreviewTitleBlock } from '../ProjectPreviewTitleBlock'

import type { ProjectPreviewCardProps } from './types'

export function ProjectPreviewCard({
  project,
  projectIndex,
  activeIndex,
  scrollSyncEnabled,
  modalProjectIndex,
  openProjectModal,
  getProjectPreviewSlideIndex,
  handleProjectPreviewSlideChange,
  resolveProjectImageAttributes,
}: ProjectPreviewCardProps) {
  const isInactiveByScrollSync =
    scrollSyncEnabled && activeIndex !== projectIndex
  const isModalBoundToCard =
    modalProjectIndex !== null && modalProjectIndex === projectIndex
  const shouldAutoplay = activeIndex === projectIndex && !isModalBoundToCard
  const previewSlideIndex = getProjectPreviewSlideIndex(projectIndex)

  const openCurrentProjectModal = () => {
    openProjectModal(projectIndex, previewSlideIndex)
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{
        opacity: isInactiveByScrollSync ? 0.3 : 1,
        y: 0,
      }}
      animate={{
        opacity: isInactiveByScrollSync ? 0.3 : 1,
      }}
      transition={{
        duration: 0.45,
        ease: MOTION_ANIMATION.easing.expressive,
      }}
      className={cn(
        'shadow-elevation-sm border-stroke-soft relative overflow-hidden rounded-xl border',
        isInactiveByScrollSync
          ? 'cursor-not-allowed'
          : 'group hover:border-information-base hover:shadow-elevation-lg transition-[box-shadow,border-color] duration-300 ease-in-out'
      )}
    >
      <button
        type="button"
        disabled={isInactiveByScrollSync}
        aria-disabled={isInactiveByScrollSync}
        className={cn(
          BUTTON.special.icon.solid.primary,
          'absolute top-5 right-5 hidden lg:flex',
          Z.dropdown
        )}
        aria-label={`Ver ${project.title} a pantalla completa`}
        onClick={(e) => {
          if (isInactiveByScrollSync) return
          e.stopPropagation()
          openCurrentProjectModal()
        }}
      >
        <ExpandScreenIcon className="h-6 w-6 text-white" aria-hidden />
      </button>

      <ImageCarousel
        slides={[...project.slides]}
        imageAlt={project.title}
        resolveImageAttributes={resolveProjectImageAttributes}
        autoplay={shouldAutoplay}
        previousSlideAriaLabel="Imagen anterior del proyecto"
        nextSlideAriaLabel="Imagen siguiente del proyecto"
        slideIndex={previewSlideIndex}
        onSlideChange={(index) =>
          handleProjectPreviewSlideChange(projectIndex, index)
        }
      />

      <div className="absolute right-0 bottom-0 left-0 flex h-1/3 flex-col items-start justify-end bg-linear-to-t from-black/80 to-transparent p-5">
        <div
          className={cn(
            'group-hover:-translate-y-1',
            ANIMATION.transition.transform,
            Z.dropdown
          )}
        >
          <ProjectPreviewTitleBlock
            subtitle={project.subtitle}
            title={project.title}
            titleClassName="text-white"
          />
        </div>
      </div>
    </m.div>
  )
}
