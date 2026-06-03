/**
 * Pieza de interfaz del portfolio (`ProjectInfo`).
 *
 * @fileoverview Implementación del archivo `ProjectInfo.tsx` dentro de `components/ProjectsSection/subcomponents/ProjectInfo`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { AnimatePresence, m } from 'motion/react'

import { MOTION_ANIMATION } from '@/shared/constants/motionAnimations'
import { BADGE, BUTTON, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import { parseEmphasis } from '@/shared/utils/parseEmphasis'

import { ProjectLink } from './subcomponents/ProjectLink/ProjectLink'

import type { Project } from '../../types'
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
   * `id` del `<h3>` visible del título.
   * Si se omite, el encabezado no expone `id` (p. ej. cuando el nombre accesible del
   * `<article>` lo aporta un `p.sr-only` en el padre).
   */
  headingId?: string
  className?: string
}

/**
 * @module components/ProjectsSection/subcomponents/ProjectInfo/ProjectInfo
 *
 * Panel de información detallada de un proyecto.
 *
 * En viewports `lg` se muestra como sidebar sticky sincronizado con el scroll,
 * animando la transición entre proyectos vía `visible`. En móvil se renderiza
 * inline encima de cada `ProjectPreviewCard` con `visible` siempre activo.
 *
 * Incluye: contador de posición, título, subtítulo, descripción, bullets
 * animados, badges de tecnologías y enlaces al sitio (si `link.trim()`) y al repositorio (si `githubLink`)
 * mediante el subcomponente `ProjectLink` (nueva pestaña y `aria-label` con aviso accesible).
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
 * // móvil — siempre visible; sin `headingId` si el artículo ya expone `aria-labelledby`
 * // vía un `p.sr-only` en `ProjectsSection`.
 * <ProjectInfo
 *   project={project}
 *   visible={true}
 *   totalProjects={PROJECTS.length}
 * />
 * ```
 */
export function ProjectInfo({
  project,
  visible,
  totalProjects,
  headingId,
  className,
}: ProjectInfoProps) {
  const hasLiveSiteLink = Boolean(project.link?.trim())

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
          className={cn('flex flex-col gap-4', className)}
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
              {...(headingId ? { id: headingId } : {})}
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
          <p className={TYPOGRAPHY.paragraph.secondary}>
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
                className="flex gap-2.5"
              >
                <span
                  className={cn(
                    BADGE.special.dot,
                    BADGE.special.dotSize.sm,
                    'bg-information-base mt-2 shrink-0'
                  )}
                  aria-hidden
                />
                <p
                  className={cn(
                    TYPOGRAPHY.paragraph.small,
                    'flex-1 wrap-break-word'
                  )}
                >
                  {parseEmphasis(b, TYPOGRAPHY.special.emphasis)}
                </p>
              </m.li>
            ))}
          </ul>

          {/* Badges de tecnologías */}
          {project.skills.length > 0 && (
            <div className={BADGE.group.horizontal}>
              {project.skills.map((label) => (
                <span key={label} className={BADGE.variant.light.primary}>
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* Enlaces opcionales: `link`, `githubLink` */}
          <div className={BUTTON.group.horizontal}>
            {hasLiveSiteLink && project.link ? (
              <ProjectLink
                href={project.link.trim()}
                label="Ver sitio en vivo"
                variant="solid"
              />
            ) : null}
            {project.githubLink ? (
              <ProjectLink
                href={project.githubLink}
                label="Código en GitHub"
                variant={hasLiveSiteLink ? 'outline' : 'solid'}
              />
            ) : null}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
