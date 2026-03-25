import type { ElementType } from 'react'
import { cn } from '@/shared/utils/cn'
import { TYPOGRAPHY, LAYOUT } from '@/shared/constants/tokens'

export type SectionLabelVariant = 'prefix' | 'rule'

/**
 * Elemento a renderizar: cualquier etiqueta HTML (`'div'`, `'h1'`, `'header'`, …)
 * o componente React que acepte `className` y `children`.
 */
export type SectionLabelAs = ElementType

export interface SectionLabelProps {
  /** Texto de la sección, p. ej. "about me", "stack técnico". Sin necesidad de agregar "//". */
  children: React.ReactNode
  /**
   * Variante visual:
   * - `prefix` → // Titulo ————  (por defecto)
   * - `rule`   → ——— Titulo
   */
  variant?: SectionLabelVariant
  /** Si se muestra la línea decorativa al final. Solo aplica en variante `prefix`. Por defecto true. */
  showLine?: boolean
  /**
   * Etiqueta HTML a renderizar (cualquier intrínseca). Ej.: `h2` título de sección,
   * `h3` subsección, `p` (por defecto) si ya hay un heading visible encima.
   */
  as?: SectionLabelAs
}

/**
 * Etiqueta de sección con dos variantes visuales.
 *
 * @example
 * ```tsx
 * <SectionLabel>stack técnico</SectionLabel>
 * <SectionLabel variant="rule">about me</SectionLabel>
 * <SectionLabel showLine={false}>sin línea</SectionLabel>
 * ```
 */
export function SectionLabel({
  children,
  variant = 'prefix',
  showLine = true,
  as: Tag = 'p',
}: SectionLabelProps) {
  if (variant === 'rule') {
    return (
      <Tag
        className={cn(
          TYPOGRAPHY.title.subsection,
          'flex items-center gap-2 font-bold tracking-widest'
        )}
      >
        <span className="font-bold" aria-hidden="true">
          −
        </span>
        <span>{children}</span>
      </Tag>
    )
  }

  return (
    <Tag
      className={cn(
        TYPOGRAPHY.title.subsection,
        'flex items-center gap-2 font-bold tracking-widest'
      )}
    >
      <span className="font-bold" aria-hidden="true">
        //
      </span>
      <span className="shrink-0">{children}</span>
      {showLine && (
        <span className={LAYOUT.divider.horizontal} aria-hidden="true" />
      )}
    </Tag>
  )
}
