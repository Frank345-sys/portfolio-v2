import { AnimatedSectionHeading } from '@/shared/components/AnimatedSectionHeading'
import { LAYOUT, ANIMATION } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { PROJECTS } from './constants'
import { useProjectsSection } from './hooks'
import {
  ProjectInfo,
  ProjectPreviewCard,
  ProjectPreviewLightbox,
} from './subcomponents'

/**
 * Sección de proyectos: composición pura. Toda la lógica de estado vive en {@link useProjectsSection}.
 *
 * - Panel lateral sticky (`lg`) + lista de artículos + rail de navegación.
 * - Un solo {@link ProjectPreviewLightbox} montado en viewport `lg` para animar salida y compartir slide con las cards.
 *
 * @see useProjectsScrollSync — índice activo por scroll / intersección.
 * @see useProjectsSection — orquestación lightbox + derivados.
 * @see `PROJECTS` en `./constants` — las `skills` de cada proyecto deben figurar en el stack (`ABOUT_SKILLS`, AboutSection).
 * @see stackSkillLabelSet — `@/test/stackSkillLabelSet` (aplanado de grupos para asserts de sincronía en Vitest).
 *
 * @example
 * ```tsx
 * <ProjectsSection />
 * ```
 */
export function ProjectsSection() {
  const {
    totalProjects,
    activeProject,
    activeIndex,
    showInfo,
    scrollSyncEnabled,
    articleRefAssigners,
    handleProjectDotClick,
    reduceMotion,
    lightboxProjectIndex,
    lightboxSlide,
    setLightboxSlide,
    openProjectLightbox,
    closeProjectLightbox,
    lightboxProject,
    lightboxValidImages,
  } = useProjectsSection(PROJECTS)

  return (
    <section
      aria-labelledby="projects-section-heading"
      className={cn(LAYOUT.container.full, LAYOUT.section.default)}
      id="proyectos"
    >
      <div className={cn(LAYOUT.spacing.large, LAYOUT.px)}>
        {/* Titulo de la sección */}
        <AnimatedSectionHeading
          overline="Selección de"
          title="Proyectos"
          titleHighlight="en producción"
          titleId="projects-section-heading"
        />

        {/* Contenido de la sección */}
        <div className="relative flex w-full gap-10">
          <div className="sticky top-24 hidden h-fit w-[50%] lg:block xl:w-[45%]">
            {scrollSyncEnabled && activeProject ? (
              <ProjectInfo
                project={activeProject}
                visible={showInfo}
                totalProjects={totalProjects}
                headingId={`project-${activeProject.id}-title-panel`}
              />
            ) : null}
          </div>

          <div className={cn(LAYOUT.spacing.large, 'flex-1 xl:space-y-18')}>
            {PROJECTS.map((project, i) => {
              const articleHeadingId = `project-${project.id}-title`
              return (
                <article
                  key={project.id}
                  ref={articleRefAssigners[i]}
                  aria-labelledby={articleHeadingId}
                  data-project-index={i}
                  className={LAYOUT.spacing.default}
                >
                  {/*
                    Nombre accesible del landmark (`p` + sr-only): en `lg` el panel móvil
                    está oculto; un `h3` oculto duplicaría el título visible en móvil en el
                    outline. `aria-labelledby` admite cualquier nodo con texto.
                  */}
                  <p id={articleHeadingId} className="sr-only">
                    {project.title}
                  </p>
                  <div className="block lg:hidden">
                    <ProjectInfo
                      project={project}
                      visible={true}
                      totalProjects={totalProjects}
                    />
                  </div>

                  <ProjectPreviewCard
                    images={project.images}
                    imageAlt={project.title}
                    subtitle={project.subtitle}
                    title={project.title}
                    reduceMotion={reduceMotion}
                    isActive={scrollSyncEnabled ? activeIndex === i : true}
                    autoplay={activeIndex === i}
                    onRequestLightbox={(slideIndex) =>
                      openProjectLightbox(i, slideIndex)
                    }
                    lightboxActive={lightboxProjectIndex === i}
                    lightboxSlideIndex={
                      lightboxProjectIndex === i ? lightboxSlide : undefined
                    }
                    onLightboxSlideChange={setLightboxSlide}
                  />
                </article>
              )
            })}
          </div>

          {/* Navegación entre proyectos */}
          <nav
            aria-label="Navegación entre proyectos"
            className="sticky top-5/12 -ml-4 hidden h-fit shrink-0 flex-col gap-3 lg:flex"
          >
            {PROJECTS.map((project, i) => (
              <button
                key={project.id}
                type="button"
                data-project-dot-index={i}
                onClick={handleProjectDotClick}
                className={cn(
                  'w-1.5 rounded-full',
                  ANIMATION.transition.default,
                  activeIndex === i
                    ? 'bg-information-base h-8'
                    : 'bg-bg-subtle hover:bg-bg-soft h-4 cursor-pointer'
                )}
                aria-label={`Ir al proyecto ${i + 1}`}
                aria-current={activeIndex === i ? 'true' : undefined}
              />
            ))}
          </nav>
        </div>
      </div>

      {scrollSyncEnabled ? (
        <ProjectPreviewLightbox
          isOpen={lightboxProjectIndex !== null}
          onClose={closeProjectLightbox}
          images={lightboxValidImages}
          imageAlt={lightboxProject?.title ?? ''}
          title={lightboxProject?.title ?? ''}
          subtitle={lightboxProject?.subtitle ?? ''}
          reduceMotion={reduceMotion}
          autoplay
          carouselSlideIndex={lightboxSlide}
          onCarouselSlideChange={setLightboxSlide}
        />
      ) : null}
    </section>
  )
}
