/**
 * Pieza de interfaz del portfolio (`ProjectLink`).
 *
 * @fileoverview Implementación del archivo `ProjectLink.tsx` dentro de `components/ProjectsSection/subcomponents/ProjectInfo/subcomponents/ProjectLink`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { BUTTON, type ButtonVariantMode } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

/**
 * Subconjunto de claves de {@link BUTTON.variant} para enlaces con apariencia de botón
 * en pares primario / secundario (p. ej. “sitio en vivo” + “código en GitHub”).
 * Deriva de `BUTTON` para mantener el mismo contrato que los tokens.
 */
type ButtonLinkVariant = Extract<ButtonVariantMode, 'solid' | 'outline'>

interface ProjectLinkProps {
  /** URL de destino. */
  href: string
  /** Texto visible del enlace. */
  label: string
  /**
   * `solid` — acción principal; `outline` — secundaria junto al enlace al sitio en vivo.
   * Alineado con {@link BUTTON.variant} vía {@link ButtonLinkVariant}.
   */
  variant: ButtonLinkVariant
}

/**
 * @module components/ProjectsSection/subcomponents/ProjectInfo/subcomponents/ProjectLink/ProjectLink
 *
 * Enlace con apariencia de botón para sitio en vivo y repositorio; nueva pestaña con aviso en `aria-label`.
 */
export function ProjectLink({ href, label, variant }: ProjectLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (abre en una nueva pestaña)`}
      className={cn(
        BUTTON.variant[variant].primary,
        BUTTON.size.responsive,
        'normal-case'
      )}
    >
      {label}
    </a>
  )
}
