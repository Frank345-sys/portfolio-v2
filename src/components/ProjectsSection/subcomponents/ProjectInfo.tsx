import { AnimatePresence, m } from 'motion/react'
import { ANIMATION, BADGE, BUTTON, TYPOGRAPHY } from '@/shared/constants/tokens'
import { MOTION_ANIMATION } from '@/shared/constants'
import { BadgeRow } from '@/shared/components/BadgeRow'
import type { Project } from '../types'
import { cn } from '@/shared/utils/cn'

// ---------------------------------------------------------------------------
// ProjectLink
// ---------------------------------------------------------------------------

interface ProjectLinkProps {
  /** URL de destino. */
  href: string
  /** Texto visible del enlace. */
  label: string
}

/**
 * Enlace de acción con animación de deslizamiento horizontal en hover.
 * Usado para "Ver proyecto" y "Ver código fuente" dentro de `ProjectInfo`.
 */
function ProjectLink({ href, label }: ProjectLinkProps) {
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 4 }}
      className={cn(
        TYPOGRAPHY.link.plain,
        'group inline-flex w-fit items-center gap-2 text-sm font-semibold'
      )}
    >
      {label}
      <span
        className={cn(
          ANIMATION.transition.transform,
          'group-hover:translate-x-1'
        )}
      >
        →
      </span>
    </m.a>
  )
}

// ---------------------------------------------------------------------------
// ProjectInfo
// ---------------------------------------------------------------------------

interface ProjectInfoProps {
  /** Datos del proyecto a mostrar. */
  project: Project
  /**
   * Controla la visibilidad del contenido con animación de entrada/salida.
   * En `lg` lo gestiona el scroll observer; en móvil siempre es `true`.
   */
  visible: boolean
  /** Total de proyectos, usado para renderizar el contador `01 / 03`. */
  totalProjects: number
  /**
   * `id` del encabezado del título; debe coincidir con `aria-labelledby` del `<article>` del bloque.
   */
  headingId: string
}

/**
 * Panel de información detallada de un proyecto.
 *
 * En viewports `lg` se muestra como sidebar sticky sincronizado con el scroll,
 * animando la transición entre proyectos vía `visible`. En móvil se renderiza
 * inline encima de cada `ProjectPreviewCard` con `visible` siempre activo.
 *
 * Incluye: contador de posición, título, subtítulo, descripción, bullets
 * animados, badges de tecnologías y enlaces opcionales al proyecto y al repositorio.
 *
 * @example
 * ```tsx
 * // lg — sidebar sincronizado con el observer (`headingId` distinto al del `<article>` para no duplicar `id` en el DOM)
 * <ProjectInfo
 *   project={currentProject}
 *   visible={showInfo}
 *   totalProjects={PROJECTS.length}
 *   headingId="project-1-title-panel"
 * />
 *
 * // móvil — siempre visible, inline por proyecto
 * <ProjectInfo
 *   project={project}
 *   visible={true}
 *   totalProjects={PROJECTS.length}
 *   headingId={`project-${project.id}-title`}
 * />
 * ```
 */
export function ProjectInfo({
  project,
  visible,
  totalProjects,
  headingId,
}: ProjectInfoProps) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <m.div
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{
            duration: 0.45,
            ease: MOTION_ANIMATION.easing.expressive,
          }}
          className="flex flex-col gap-4 2xl:gap-5"
        >
          {/* Contador de posición: 01 / 03 */}
          <span
            className={cn(
              TYPOGRAPHY.paragraph.small,
              'text-information-base font-mono tracking-[0.3em] uppercase'
            )}
          >
            {String(project.id).padStart(2, '0')} /{' '}
            {String(totalProjects).padStart(2, '0')}
          </span>

          {/* Título, subtítulo y separador */}
          <div>
            <h3
              id={headingId}
              className={cn(
                TYPOGRAPHY.title.subsection,
                'mb-1 leading-tight font-bold tracking-tight'
              )}
            >
              {project.title}
            </h3>
            <p
              className={cn(
                TYPOGRAPHY.title.small,
                'text-information-base mb-2.5 font-mono tracking-widest'
              )}
            >
              {project.subtitle}
            </p>
            <div className="bg-information-base h-px w-12" />
          </div>

          {/* Descripción */}
          <p className={cn(TYPOGRAPHY.paragraph.secondary, 'text-text-strong')}>
            {project.description}
          </p>

          {/* Bullets animados con stagger */}
          <ul className="flex flex-col gap-2">
            {project.bullets.map((b, i) => (
              <m.li
                key={`project-${project.id}-bullet-${b}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                className={cn(
                  TYPOGRAPHY.paragraph.small,
                  'text-text-strong flex items-center gap-3'
                )}
              >
                <span
                  className={cn(
                    BADGE.special.dot,
                    BADGE.special.dotSize.sm,
                    'bg-information-base'
                  )}
                />
                {b}
              </m.li>
            ))}
          </ul>

          {/* Badges de tecnologías */}
          <BadgeRow
            items={project.skills.map((label) => ({
              label,
              variantClassName: BADGE.variant.primary,
            }))}
          />

          {/* Enlaces opcionales al proyecto y al repositorio */}
          {(project.link ?? project.githubLink) && (
            <div className={BUTTON.group.horizontal}>
              {project.link && (
                <ProjectLink href={project.link} label="Ver proyecto" />
              )}
              {project.githubLink && (
                <ProjectLink
                  href={project.githubLink}
                  label="Ver código fuente"
                />
              )}
            </div>
          )}
        </m.div>
      )}
    </AnimatePresence>
  )
}
