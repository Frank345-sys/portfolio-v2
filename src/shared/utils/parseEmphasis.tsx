/**
 * Utilidad `ParseEmphasis` en la capa compartida del proyecto.
 *
 * @fileoverview Funciones puras o helpers sin acoplar a una sección concreta del portfolio.
 * @remarks Preferir pruebas unitarias directas; evitar importar React salvo que el módulo lo requiera.
 */

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
  let emphasisOrdinal = 0
  return parts.map((part, segmentIndex) => {
    if (segmentIndex % 2 === 0) {
      return part
    }
    emphasisOrdinal += 1
    return (
      <strong
        key={`emphasis-block-${String(part)}-${String(emphasisOrdinal)}`}
        className={emphasisClassName}
      >
        {part}
      </strong>
    )
  })
}
