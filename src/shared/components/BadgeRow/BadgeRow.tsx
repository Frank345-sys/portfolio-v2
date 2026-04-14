import { cn } from '@/shared/utils/cn'
import { BADGE } from '@/shared/constants/tokens'

export interface BadgeRowItem {
  /** Texto visible del chip o badge. */
  label: string
  /** Clase de variante visual (p. ej. `BADGE.variant.primary`). */
  variantClassName: string
}

export interface BadgeRowProps {
  /** Lista de elementos a renderizar como chips/badges. */
  items: BadgeRowItem[]
  /** Clases del contenedor (p. ej. max-width, márgenes). */
  className?: string
}

/**
 * Fila horizontal de chips con `BADGE.size.sm` y la variante ya resuelta en cada ítem.
 * Si `items` está vacío, no renderiza nada.
 *
 * @example
 * ```tsx
 * <BadgeRow
 *   items={[
 *     { label: 'React', variantClassName: BADGE.variant.primary },
 *     { label: 'TypeScript', variantClassName: BADGE.variant.neutral },
 *   ]}
 * />
 * ```
 */
export function BadgeRow({ items, className }: BadgeRowProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className={cn(BADGE.group.horizontal, className)}>
      {items.map(({ label, variantClassName }) => (
        <span key={label} className={cn(BADGE.size.sm, variantClassName)}>
          {label}
        </span>
      ))}
    </div>
  )
}
