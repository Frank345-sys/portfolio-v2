/**
 * Pieza de interfaz del portfolio (`LinkCard`).
 *
 * @fileoverview Implementación del archivo `LinkCard.tsx` dentro de `shared/components/LinkCard`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { TYPOGRAPHY, CARD, ANIMATION } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'

/**
 * Datos de texto y URL compartidos con listas que alimentan {@link LinkCard}
 * (p. ej. constantes sin `ReactNode`).
 */
export interface LinkCardDatum {
  /** URL de destino. */
  href: string
  /** Título principal visible. */
  title: string
  /** Línea secundaria (ej. emisor, fecha). Cadena vacía si no debe mostrarse segunda línea. */
  subtitle: string
}

interface LinkCardProps extends Omit<
  ComponentPropsWithoutRef<'a'>,
  'children' | 'title'
> {
  /** Título principal visible. */
  title: LinkCardDatum['title']
  /** Línea secundaria (ej. emisor, fecha). Cadena vacía si no debe mostrarse segunda línea. */
  subtitle: LinkCardDatum['subtitle']
  /**
   * Contenido del recuadro del ícono: emoji (`string`), `<svg>` o componentes
   * que rendericen SVG (p. ej. desde `@/shared/icons`). Los SVG hijos se
   * escalan a ~24px dentro del recuadro; puedes pasar `className` al ícono
   * para afinar tamaño o `currentColor` si el SVG lo soporta.
   */
  icon: ReactNode
}

/**
 * @module shared/components/LinkCard/LinkCard
 *
 * Fila tipo tarjeta enlazada: ícono, título, subtítulo e indicador de enlace.
 *
 * @example
 * ```tsx
 * <LinkCard
 *   href="https://example.com"
 *   target="_blank"
 *   title="Certificado"
 *   subtitle="Plataforma · 2024"
 *   icon="📜"
 * />
 *
 * // Con ícono SVG (recomendado: aria-hidden en decorativos)
 * <LinkCard
 *   href="https://github.com/user/repo"
 *   target="_blank"
 *   aria-label="Repositorio de ejemplo"
 *   title="Repositorio"
 *   subtitle=""
 *   icon={<GithubIcon className="text-text-strong group-hover:text-text-white" aria-hidden />}
 * />
 * ```
 */
export function LinkCard({
  title,
  subtitle,
  icon,
  target,
  rel,
  className,
  ...anchorProps
}: LinkCardProps) {
  const isExternal = target === '_blank'
  const hasExplicitAria = Boolean(anchorProps['aria-label'])

  return (
    <a
      {...anchorProps}
      target={target}
      rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
      className={cn(
        'group hover:border-information-base hover:bg-information-lighter flex items-center justify-between',
        CARD.interactive.weak,
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'bg-information-light group-hover:bg-information-base flex size-9 shrink-0 items-center justify-center rounded-lg',
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
      {isExternal && !hasExplicitAria ? (
        <span className="sr-only">, abre en una nueva pestaña</span>
      ) : null}
    </a>
  )
}
