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
}

/**
 * Fila reutilizable de chips/badges pequeños.
 * Recibe una lista de etiquetas y la clase de variante ya resuelta
 * (mapeada desde el dominio del componente: nivel de skill, tipo de chip, etc.).
 *
 * Se encarga de aplicar el layout horizontal y el tamaño pequeño consistente.
 */
export function BadgeRow({ items }: BadgeRowProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className={BADGE.group.horizontal}>
      {items.map(({ label, variantClassName }) => (
        <span key={label} className={cn(BADGE.size.sm, variantClassName)}>
          {label}
        </span>
      ))}
    </div>
  )
}
