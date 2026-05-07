import type { ProjectImageAttributes, ProjectWithSlides } from '../../types'

export type ResolveProjectImageAttributes = (
  src: string
) => ProjectImageAttributes

export interface ProjectPreviewModalProps {
  modalProject: ProjectWithSlides | undefined
  modalSlide: number
  setModalSlide: (index: number) => void
  onClose: () => void
  resolveProjectImageAttributes: ResolveProjectImageAttributes
}
