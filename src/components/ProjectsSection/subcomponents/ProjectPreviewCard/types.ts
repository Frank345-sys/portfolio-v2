import type { ProjectWithSlides } from '../../types'
import type { ResolveProjectImageAttributes } from '../ProjectPreviewModal/types'

export interface ProjectPreviewCardProps {
  project: ProjectWithSlides
  projectIndex: number
  activeIndex: number
  scrollSyncEnabled: boolean
  modalProjectIndex: number | null
  openProjectModal: (projectIndex: number, slideIndex: number) => void
  getProjectPreviewSlideIndex: (projectIndex: number) => number
  handleProjectPreviewSlideChange: (projectIndex: number, index: number) => void
  resolveProjectImageAttributes: ResolveProjectImageAttributes
}
