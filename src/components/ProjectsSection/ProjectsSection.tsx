/**
 * Compositor de la sección "Proyectos" del portfolio (`ProjectsSection`).
 *
 * @fileoverview Implementación del archivo `ProjectsSection.tsx` dentro de `components/ProjectsSection`; ver exports para la API pública.
 * @remarks Coordinar tokens, accesibilidad, scroll sync y Motion con hooks en `./hooks`.
 */

import { AnimatedSectionHeading } from '@/shared/components/primitives/AnimatedSectionHeading'
import { LAYOUT, ANIMATION } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import {
  PROJECTS_NAV_RAIL_ARIA_LABEL,
  PROJECTS_SECTION_ANCHOR_ID,
  PROJECTS_SECTION_TITLE_ID,
} from './constants/landmarks'
import { PROJECTS } from './constants/projects'
import { useProjectsSection } from './hooks/useProjectsSection'
import { ProjectInfo } from './subcomponents/ProjectInfo/ProjectInfo'
import { ProjectPreviewCard } from './subcomponents/ProjectPreviewCard/ProjectPreviewCard'
import { ProjectPreviewModal } from './subcomponents/ProjectPreviewModal/ProjectPreviewModal'
import { getProjectImageAttributes } from './utils/getProjectImageAttributes'

/** Resolución de atributos de imagen para el lightbox del modal — referencia estable. */
const resolveModalImageAttributes = (src: string) =>
  getProjectImageAttributes(src, { variant: 'lightbox' })

/**
 * @module components/ProjectsSection/ProjectsSection
 *
 * Sección Proyectos: `ol` de `article`, panel sticky en `lg`, rail y modal. Estado en {@link useProjectsSection}.
 *
 * @see `./constants` — landmarks; en `lg`, `headingId` del panel distinto del `aria-labelledby` del `article`.
 * @example
 * ```tsx
 * <ProjectsSection />
 * ```
 */
export function ProjectsSection() {
  const { data, ui, modal, carousel } = useProjectsSection(PROJECTS)

  return (
    <section
      aria-labelledby={PROJECTS_SECTION_TITLE_ID}
      className={cn(LAYOUT.container.full, LAYOUT.section.default)}
      id={PROJECTS_SECTION_ANCHOR_ID}
    >
      <div className={cn(LAYOUT.spacing.large, LAYOUT.px)}>
        <AnimatedSectionHeading
          overline="Selección de"
          title="Proyectos"
          titleHighlight="en producción"
          titleId={PROJECTS_SECTION_TITLE_ID}
        />

        <div className="relative flex w-full gap-10">
          {/* Panel de información detallada del proyecto activo en desktop */}
          <div className="sticky top-24 hidden h-fit w-[50%] lg:block xl:w-[45%]">
            {ui.scrollSyncEnabled && data.activeProject ? (
              <ProjectInfo
                project={data.activeProject}
                visible={ui.showInfo}
                totalProjects={data.totalProjects}
                headingId={`project-${data.activeProject.id}-title-panel`}
              />
            ) : null}
          </div>

          {/* Lista de proyectos */}
          <ol
            className={cn(
              LAYOUT.spacing.large,
              'flex-1 list-none xl:space-y-18'
            )}
          >
            {data.projects.map((project, i) => {
              const articleHeadingId = `project-${project.id}-title`
              return (
                <li key={project.id}>
                  <article
                    ref={carousel.articleRefAssigners[i]}
                    aria-labelledby={articleHeadingId}
                    data-project-index={i}
                    className={LAYOUT.spacing.default}
                  >
                    {/* Nombre accesible */}
                    <p id={articleHeadingId} className="sr-only">
                      {project.title}
                    </p>

                    {/* Panel de información detallada del proyecto en móvil */}
                    <ProjectInfo
                      project={project}
                      visible={true}
                      totalProjects={data.totalProjects}
                      className="flex lg:hidden"
                    />

                    {/* Tarjeta de vista previa del proyecto */}
                    <ProjectPreviewCard
                      project={project}
                      projectIndex={i}
                      activeIndex={data.activeIndex}
                      scrollSyncEnabled={ui.scrollSyncEnabled}
                      modalProjectIndex={modal.index}
                      openProjectModal={modal.open}
                      getProjectPreviewSlideIndex={carousel.getSlideIndex}
                      handleProjectPreviewSlideChange={
                        carousel.handleSlideChange
                      }
                      resolveProjectImageAttributes={getProjectImageAttributes}
                    />
                  </article>
                </li>
              )
            })}
          </ol>

          {/* Navegación por proyectos */}
          <nav
            aria-label={PROJECTS_NAV_RAIL_ARIA_LABEL}
            className="sticky top-5/12 -ml-4 hidden h-fit shrink-0 flex-col gap-3 lg:flex"
          >
            {data.projects.map((project, i) => (
              <button
                key={project.id}
                type="button"
                data-project-dot-index={i}
                onClick={carousel.handleDotClick}
                className={cn(
                  'w-1.5 rounded-full',
                  data.activeIndex === i
                    ? 'bg-information-base h-8'
                    : 'bg-bg-subtle hover:bg-bg-soft h-4 cursor-pointer',
                  ANIMATION.transition.default
                )}
                aria-label={`Ir al proyecto ${i + 1}: ${project.title}`}
                aria-current={data.activeIndex === i ? 'true' : undefined}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Modal de vista previa del proyecto */}
      <ProjectPreviewModal
        modalProject={modal.project}
        modalSlide={modal.slide}
        setModalSlide={modal.setSlide}
        onClose={modal.close}
        resolveProjectImageAttributes={resolveModalImageAttributes}
      />
    </section>
  )
}
