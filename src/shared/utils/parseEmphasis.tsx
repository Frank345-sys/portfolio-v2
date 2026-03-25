import type { ReactNode } from 'react'

/**
 * Convierte marcas **texto** en nodos con <strong> y la clase indicada.
 * Útil para resaltar palabras clave (ej. color blanco en dark) sin cambiar la fuente de datos.
 *
 * @param text - Cadena que puede contener **fragmentos** a resaltar.
 * @param emphasisClassName - Clase CSS para el <strong> (ej. token de tipografía emphasis).
 * @returns Array de strings y elementos React para renderizar dentro de un párrafo.
 */
export function parseEmphasis(
  text: string,
  emphasisClassName: string
): ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={emphasisClassName}>
        {part}
      </strong>
    ) : (
      part
    )
  )
}
