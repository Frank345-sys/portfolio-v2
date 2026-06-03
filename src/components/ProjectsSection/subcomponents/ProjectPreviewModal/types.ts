/**
 * Tipos TypeScript del submódulo «ProjectPreviewModal».
 *
 * @fileoverview Contratos compartidos entre componentes, hooks y constantes del mismo directorio.
 * @remarks Mantener alineado con las props públicas re-exportadas en los `index.ts` del feature.
 */

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
