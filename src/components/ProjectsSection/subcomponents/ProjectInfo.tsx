import { AnimatePresence, m } from 'motion/react'

import { BadgeRow } from '@/shared/components/BadgeRow'
import { MOTION_ANIMATION } from '@/shared/constants'
import { BADGE, BUTTON, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import { parseEmphasis } from '@/shared/utils/parseEmphasis'

import type { Project } from '../types'

const BULLET_LEAD_LABEL_REGEX = /^(Problema|Solución|Impacto|Resultado):\s*/u

// ---------------------------------------------------------------------------
// ProjectLink
// ---------------------------------------------------------------------------

interface ProjectLinkProps {
  /** URL de destino. */
  href: string
  /** Texto visible del enlace. */
  label: string
  /**
   * `contained` — acción principal; `outlined` — secundaria junto al enlace al sitio en vivo.
   */
  variant: 'contained' | 'outlined'
}

/**
 * Enlace con apariencia de botón (`BUTTON.variant` + `BUTTON.size.responsive`).
 * Usado para "Abrir sitio en vivo" y "Código en GitHub" dentro de `ProjectInfo`.
 */
function ProjectLink({ href, label, variant }: ProjectLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        variant === 'contained'
          ? cn(BUTTON.variant.contained.primary, BUTTON.size.responsive)
          : cn(BUTTON.variant.outlined.primary, BUTTON.size.responsive),
        'w-fit normal-case'
      )}
    >
      {label}
    </a>
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
   * `id` del `<h3>` visible del título.
   * Si se omite, el encabezado no expone `id` (p. ej. cuando el nombre accesible del
   * `<article>` lo aporta un `p.sr-only` en el padre).
   */
  headingId?: string
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
                  // `min-w-0` + `flex-1` en el texto: sangría francesa / hanging indent al envolver líneas
                  'text-text-strong flex items-start gap-3'
                )}
              >
                <span
                  className={cn(
                    BADGE.special.dot,
                    BADGE.special.dotSize.sm,
                    'bg-information-base mt-1.5 shrink-0 self-start sm:mt-2'
                  )}
                  aria-hidden
                />
                <div className="min-w-0 flex-1 wrap-break-word">
                  {parseEmphasis(
                    b.replace(
                      BULLET_LEAD_LABEL_REGEX,
                      (_, label: string) => `**${label}:** `
                    ),
                    TYPOGRAPHY.special.emphasis
                  )}
                </div>
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
                <ProjectLink
                  href={project.link}
                  label="Abrir sitio en vivo"
                  variant="contained"
                />
              )}
              {project.githubLink && (
                <ProjectLink
                  href={project.githubLink}
                  label="Código en GitHub"
                  variant={project.link ? 'outlined' : 'contained'}
                />
              )}
            </div>
          )}
        </m.div>
      )}
    </AnimatePresence>
  )
}
