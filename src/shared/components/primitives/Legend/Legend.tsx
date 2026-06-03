/**
 * Pieza de interfaz del portfolio (`Legend`).
 *
 * @fileoverview Implementación del archivo `Legend.tsx` dentro de `shared/components/Legend`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { TYPOGRAPHY, BADGE } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import type { ComponentPropsWithoutRef } from 'react'

export interface LegendItem {
  /** Identificador único (clave de React y accesibilidad). */
  id: string
  /** Texto explicativo del ítem. */
  label: string
  /** Clase del punto de color (ej. `bg-feature-base`, `bg-information-base`). */
  dotClassName: string
}

export interface LegendProps extends Omit<
  ComponentPropsWithoutRef<'ul'>,
  'children'
> {
  /** Ítems de la leyenda (punto de color + texto). */
  items: readonly LegendItem[]
}

/**
 * @module shared/components/Legend/Legend
 *
 * Leyenda reutilizable: lista de ítems con punto de color y texto.
 *
 * @example
 * ```tsx
 * // Stack técnico: dominio / proficiente / familiar
 * <Legend
 *   items={[
 *     { id: 'dominio', label: 'Dominio (uso diario)', dotClassName: 'bg-feature-base' },
 *     { id: 'proficiente', label: 'Proficiente', dotClassName: 'bg-information-base' },
 *     { id: 'familiar', label: 'Familiar', dotClassName: 'bg-bg-subtle' },
 *   ]}
 *   aria-label="Niveles del stack técnico"
 * />
 *
 * // Experiencia: áreas, métricas de código, impacto
 * <Legend
 *   items={[
 *     { id: 'tech', label: 'Área o tecnología', dotClassName: 'bg-information-base' },
 *     { id: 'code', label: 'Métrica de código', dotClassName: 'bg-feature-base' },
 *     { id: 'impact', label: 'Impacto en rendimiento', dotClassName: 'bg-success-base' },
 *   ]}
 *   aria-label="Significado de los chips"
 * />
 * ```
 */
export function Legend({ items, className, ...rest }: LegendProps) {
  return (
    <ul
      {...rest}
      className={cn(
        'flex list-none flex-wrap items-center gap-x-4 gap-y-2',
        TYPOGRAPHY.label.default,
        className
      )}
    >
      {items.map(({ id, label, dotClassName }) => (
        <li key={id} className="flex items-center gap-2">
          <span
            className={cn(
              BADGE.special.dot,
              BADGE.special.dotSize.md,
              dotClassName
            )}
            aria-hidden="true"
          />
          {label}
        </li>
      ))}
    </ul>
  )
}
