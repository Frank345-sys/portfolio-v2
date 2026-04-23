import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'
import { TYPOGRAPHY, CARD, ANIMATION } from '@/shared/constants/tokens'

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
   * Anula el nombre accesible del enlace. Si no se pasa, el nombre se calcula
   * del título, subtítulo y (si `external`) un aviso de nueva pestaña en
   * `sr-only` para cumplir 2.5.3 (etiqueta en el nombre accesible).
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
  const hasExplicitAria =
    ariaLabel != null && String(ariaLabel).trim().length > 0

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(hasExplicitAria ? { 'aria-label': ariaLabel } : {})}
      className={cn(
        'group hover:border-information-base hover:bg-information-lighter flex items-center justify-between',
        CARD.interactive.weak,
        className
      )}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div
          className={cn(
            'bg-information-light group-hover:bg-information-base flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
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
            <p
              className={cn(
                TYPOGRAPHY.paragraph.small,
                'text-text-subtle font-mono'
              )}
            >
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
      {external && !hasExplicitAria ? (
        <span className="sr-only">, abre en una nueva pestaña</span>
      ) : null}
    </a>
  )
}
