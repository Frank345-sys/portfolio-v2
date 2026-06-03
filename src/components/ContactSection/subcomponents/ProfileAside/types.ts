/**
 * Tipos del dominio `ProfileAside`.
 *
 * @fileoverview Define `ContactStatusMeaningId`, `ContactStatusMeaningEntry` (extiende {@link LegendItem}),
 * `ContactStatusRowId` y `ContactStatusRowEntry` — contrato de filas de disponibilidad con vínculo a leyenda.
 * @remarks Mantener `ContactStatusMeaningId` sincronizado con los `id` de {@link CONTACT_STATUS_MEANINGS}
 * y `ContactStatusRowId` con las claves de {@link CONTACT_STATUS_ROWS} en `./constants`.
 */
import type { LegendItem } from '@/shared/components/primitives/Legend'

/**
 * Identificador de significado en la leyenda (`CONTACT_STATUS_MEANINGS` en `./constants`).
 * Cada fila de disponibilidad referencia uno vía `meaning`.
 */
type ContactStatusMeaningId = 'available' | 'limited' | 'unavailable'

/**
 * Ítem de leyenda de contacto: mismo contrato que `LegendItem` con `id` acotado a significados conocidos.
 */
export interface ContactStatusMeaningEntry extends LegendItem {
  /** Clave del significado — acota `LegendItem.id` a los valores conocidos de la leyenda. */
  id: ContactStatusMeaningId
}

/**
 * Identificador estable de cada fila de disponibilidad (`CONTACT_STATUS_ROWS` en `./constants`).
 */
type ContactStatusRowId =
  | 'remote'
  | 'hybrid'
  | 'onsite'
  | 'part_time'
  | 'relocation'
  | 'freelance'

/**
 * Fila de disponibilidad: texto visible y vínculo al punto de la leyenda (`meaning`).
 */
export interface ContactStatusRowEntry {
  /** Clave estable de la fila — referencia {@link CONTACT_STATUS_ROWS} en `./constants`. */
  id: ContactStatusRowId
  /** Texto visible del servicio o modalidad de colaboración. */
  label: string
  /** Vínculo al punto de leyenda — determina el color del dot en {@link StatusList}. */
  meaning: ContactStatusMeaningId
}
