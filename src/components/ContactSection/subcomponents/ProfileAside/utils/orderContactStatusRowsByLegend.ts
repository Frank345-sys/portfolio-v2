/**
 * Utilidades de ordenamiento y lista derivada para `ProfileAside`.
 *
 * @fileoverview Exporta `orderContactStatusRowsByLegend` (comparador para `Array.toSorted`)
 * y `CONTACT_ASIDE_SERVICE_LIST_ITEMS` (filas ordenadas y enriquecidas con `dotClassName`).
 * @remarks Función pura sin efectos secundarios — sin DOM, React ni tokens de diseño.
 * El orden de significados se deriva de {@link CONTACT_STATUS_MEANINGS} para mantener
 * leyenda y lista sincronizadas. Construido con {@link createCompareByLegendOrder}.
 */
import { createCompareByLegendOrder } from '@/shared/utils/createCompareByLegendOrder'

import { CONTACT_STATUS_MEANINGS, CONTACT_STATUS_ROWS } from '../constants'

import type { ContactStatusRowEntry } from '../types'

/** Lookup O(1) de significado por `id` — evita `.find()` repetido al enriquecer filas. */
const meaningById = new Map(
  CONTACT_STATUS_MEANINGS.map((meaning) => [meaning.id, meaning])
)

/**
 * Comparador para `sort` en el aside de contacto: **Disponible** → **Limitado** → **No disponible**;
 * mismo criterio que la leyenda {@link CONTACT_STATUS_MEANINGS} (`ProfileAside/constants.ts`).
 *
 * Dentro de un mismo significado, orden alfabético por `label` (`es`).
 */
export const orderContactStatusRowsByLegend: (
  a: ContactStatusRowEntry,
  b: ContactStatusRowEntry
) => number = createCompareByLegendOrder(
  CONTACT_STATUS_MEANINGS.map((item) => item.id),
  (row) => row.meaning,
  (a, b) => a.label.localeCompare(b.label, 'es')
)

/**
 * Filas de {@link CONTACT_STATUS_ROWS} ordenadas con {@link orderContactStatusRowsByLegend}
 * y enriquecidas con `dotClassName` según cada `meaning` en la leyenda.
 */
export const CONTACT_ASIDE_SERVICE_LIST_ITEMS = CONTACT_STATUS_ROWS.toSorted(
  orderContactStatusRowsByLegend
).map((row) => {
  const meaning = meaningById.get(row.meaning)
  // Guarda de integridad: si un `meaning` en CONTACT_STATUS_ROWS no tiene
  // entrada en CONTACT_STATUS_MEANINGS, es un error de datos — falla en build, no en runtime.
  if (meaning === undefined) {
    throw new Error(`[${row.id}] meaning desconocido: "${row.meaning}"`)
  }
  return {
    id: row.id,
    label: row.label,
    dotClassName: meaning.dotClassName,
  }
})
