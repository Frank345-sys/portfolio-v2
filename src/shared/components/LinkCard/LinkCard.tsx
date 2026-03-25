import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'
import { TYPOGRAPHY, LAYOUT, CARD, ANIMATION } from '@/shared/constants/tokens'

export interface LinkCardProps {
  /** URL de destino. */
  href: string
  /** Título principal visible. */
  title: string
  /** Línea secundaria (ej. emisor, fecha). */
  subtitle?: string
  /**
   * Contenido del recuadro del ícono: emoji (`string`), `<svg>` o componentes
   * que rendericen SVG (p. ej. desde `@/shared/icons`). Los SVG hijos se
   * escalan a ~24px dentro del recuadro; puedes pasar `className` al ícono
   * para afinar tamaño o `currentColor` si el SVG lo soporta.
   */
  icon: ReactNode
  /**
   * Si es `true`, abre en nueva pestaña y añade `rel="noopener noreferrer"`.
   * @default true
   */
  external?: boolean
  /**
   * Anula el `aria-label` del enlace. Si `external` es true y no se pasa,
   * se usa: `{title} (abre en nueva pestaña)`.
   */
  ariaLabel?: string
  className?: string
}

/**
 * Fila tipo tarjeta enlazada: ícono, título + subtítulo opcional e indicador de enlace.
 * Pensado para certificados, recursos externos o cualquier lista de enlaces con la misma UI.
 *
 * @example
 * ```tsx
 * <LinkCard
 *   href="https://example.com"
 *   title="Certificado"
 *   subtitle="Plataforma · 2024"
 *   icon="📜"
 * />
 *
 * // Con ícono SVG (recomendado: aria-hidden en decorativos)
 * <LinkCard
 *   href="https://github.com/user/repo"
 *   title="Repositorio"
 *   icon={<GithubIcon className="text-text-strong group-hover:text-text-white" aria-hidden />}
 * />
 * ```
 */
export function LinkCard({
  href,
  title,
  subtitle,
  icon,
  external = true,
  ariaLabel,
  className,
}: LinkCardProps) {
  const resolvedAriaLabel =
    ariaLabel ?? (external ? `${title} (abre en nueva pestaña)` : undefined)

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(resolvedAriaLabel ? { 'aria-label': resolvedAriaLabel } : {})}
      className={cn(
        LAYOUT.flex.between,
        CARD.interactive.weak,
        'group hover:border-information-base hover:bg-information-lighter gap-2',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            LAYOUT.flex.center,
            'h-10 w-10 shrink-0 rounded-lg',
            'bg-information-light group-hover:bg-information-base',
            ANIMATION.transition.colors,
            // Normaliza SVG dentro del slot (emojis y texto no se ven afectados)
            '[&_svg]:pointer-events-none [&_svg]:block [&_svg]:size-6 [&_svg]:max-h-full [&_svg]:max-w-full'
          )}
        >
          {icon}
        </div>
        <div>
          <p className={TYPOGRAPHY.title.xxsmall}>{title}</p>
          {subtitle ? (
            <p className={cn(TYPOGRAPHY.paragraph.small, 'font-mono')}>
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      <span
        className={cn(
          'opacity-60 group-hover:opacity-100',
          ANIMATION.transition.opacity
        )}
        aria-hidden="true"
      >
        🔗
      </span>
    </a>
  )
}
