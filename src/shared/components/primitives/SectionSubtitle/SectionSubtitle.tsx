/**
 * Pieza de interfaz del portfolio (`SectionSubtitle`).
 *
 * @fileoverview Implementación del archivo `SectionSubtitle.tsx` dentro de `shared/components/primitives/SectionSubtitle`.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad con el resto de la sección.
 */

import { TYPOGRAPHY, LAYOUT } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface SectionSubtitleProps extends Omit<
  ComponentPropsWithoutRef<'h3'>,
  'children'
> {
  /** Texto del subtítulo, p. ej. "about me", "stack técnico". Sin necesidad de agregar "//". */
  children: ReactNode
  /** Mostrar la línea decorativa a la derecha del texto. Por defecto `true`. */
  showLine?: boolean
}

/**
 * @module shared/components/primitives/SectionSubtitle/SectionSubtitle
 *
 * Subtítulo de sección con prefijo `//` y línea decorativa opcional.
 * Siempre renderiza como `<h3>` — semántica fija, no configurable.
 * Usado para etiquetar subsecciones bajo un `AnimatedSectionHeading`.
 *
 * @example
 * ```tsx
 * <SectionSubtitle>stack técnico</SectionSubtitle>
 * <SectionSubtitle showLine={false}>sin línea</SectionSubtitle>
 * <SectionSubtitle id="skills-heading">stack técnico</SectionSubtitle>
 * ```
 */
export function SectionSubtitle({
  children,
  showLine = true,
  className,
  ...rest
}: SectionSubtitleProps) {
  return (
    <h3
      {...rest}
      className={cn(
        TYPOGRAPHY.title.subsection,
        'flex items-center gap-2 font-bold tracking-widest',
        className
      )}
    >
      <span className="font-bold" aria-hidden="true">
        {'//'}
      </span>
      <span className="shrink-0">{children}</span>
      {showLine && (
        <span className={LAYOUT.divider.horizontal} aria-hidden="true" />
      )}
    </h3>
  )
}
