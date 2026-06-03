/**
 * Crea un comparador para `Array.prototype.sort` que respeta el orden visual de una leyenda
 * (`LegendItem.id` u otro identificador en el mismo orden que `items` de `<Legend />`).
 *
 * - Claves desconocidas van al final (mismo rango, desempate solo vía `tieBreak` si se pasa).
 * - Sin `tieBreak`, el orden relativo queda **no especificado** cuando dos ítems comparten el mismo rango: bien entre desconocidos entre sí, bien entre cualquier par con el mismo índice en la leyenda (aunque en la práctica los ids de leyenda suelen ser únicos).
 * - Ese orden puede ser estable en engines modernos, pero no está garantizado por la especificación.
 *
 * @fileoverview Funciones puras o helpers sin acoplar a una sección concreta del portfolio.
 * @remarks Preferir pruebas unitarias directas; evitar importar React salvo que el módulo lo requiera.
 */

export function createCompareByLegendOrder<T>(
  legendOrderedIds: readonly string[],
  getLegendId: (item: T) => string,
  tieBreak?: (a: T, b: T) => number
): (a: T, b: T) => number {
  const rank = new Map(legendOrderedIds.map((id, index) => [id, index]))
  const unknownRank = legendOrderedIds.length

  return (a, b) => {
    const ra = rank.get(getLegendId(a)) ?? unknownRank
    const rb = rank.get(getLegendId(b)) ?? unknownRank
    if (ra !== rb) return ra - rb
    return tieBreak?.(a, b) ?? 0
  }
}
