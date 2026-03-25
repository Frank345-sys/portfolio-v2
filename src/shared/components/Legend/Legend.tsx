import { cn } from '@/shared/utils/cn'
import { TYPOGRAPHY, BADGE } from '@/shared/constants/tokens'

export interface LegendItem {
  /** Identificador único (clave de React y accesibilidad). */
  id: string
  /** Texto explicativo del ítem. */
  label: string
  /** Clase del punto de color (ej. `bg-feature-base`, `bg-information-base`). */
  dotClassName: string
}

export interface LegendProps {
  /** Ítems de la leyenda (punto de color + texto). */
  items: LegendItem[]
  /** Etiqueta para lectores de pantalla (opcional). */
  ariaLabel?: string
  /** Clases adicionales para el contenedor (ej. margen). */
  className?: string
}

/**
 * Leyenda reutilizable: lista de ítems con punto de color y texto.
 * Sirve para explicar el significado de chips o badges (stack técnico, experiencia, formación).
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
 *   ariaLabel="Niveles del stack técnico"
 * />
 *
 * // Experiencia: áreas, métricas de código, impacto
 * <Legend
 *   items={[
 *     { id: 'tech', label: 'Área/tecnología', dotClassName: 'bg-information-base' },
 *     { id: 'code', label: 'Métrica de código', dotClassName: 'bg-feature-base' },
 *     { id: 'impact', label: 'Impacto en rendimiento', dotClassName: 'bg-success-base' },
 *   ]}
 *   ariaLabel="Significado de los chips"
 * />
 * ```
 */
export function Legend({ items, ariaLabel, className }: LegendProps) {
  return (
    <ul
      className={cn(
        'flex list-none flex-wrap items-center gap-x-4 gap-y-2',
        TYPOGRAPHY.label.default,
        className
      )}
      {...(ariaLabel && { 'aria-label': ariaLabel })}
    >
      {items.map(({ id, label, dotClassName }) => (
        <li key={id} className="flex items-center gap-2">
          <span
            className={cn(BADGE.special.dot, 'shrink-0', dotClassName)}
            aria-hidden="true"
          />
          {label}
        </li>
      ))}
    </ul>
  )
}
