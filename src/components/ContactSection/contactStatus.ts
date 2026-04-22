/**
 * Modelo de leyenda y filas de servicios para la tarjeta “Disponibilidad”.
 *
 * @module components/ContactSection/contactStatus
 */

export const CONTACT_STATUS_MEANINGS = [
  { id: 'available', label: 'Disponible', dotClassName: 'bg-success-base' },
  { id: 'limited', label: 'Limitado', dotClassName: 'bg-warning-base' },
  { id: 'unavailable', label: 'No disponible', dotClassName: 'bg-error-base' },
] as const

type ContactStatusMeaningId = (typeof CONTACT_STATUS_MEANINGS)[number]['id']

const MEANING_BY_ID = Object.fromEntries(
  CONTACT_STATUS_MEANINGS.map((m) => [m.id, m])
) as Record<ContactStatusMeaningId, (typeof CONTACT_STATUS_MEANINGS)[number]>

/**
 * Orden: disponible → limitado → no disponible en la leyenda; en la lista, primero
 * filas con significado `available`, luego `limited`, luego `unavailable` si añades.
 */
export const CONTACT_STATUS_ROWS = [
  { id: 'remote', label: 'Trabajo remoto', meaning: 'available' },
  { id: 'onsite', label: 'Trabajo presencial', meaning: 'available' },
  { id: 'freelance', label: 'Proyectos freelance', meaning: 'limited' },
  { id: 'consulting', label: 'Consultoría puntual', meaning: 'limited' },
  {
    id: 'mentoring',
    label: 'Mentoría / revisión de código',
    meaning: 'limited',
  },
] as const satisfies readonly {
  id: string
  label: string
  meaning: ContactStatusMeaningId
}[]

export const CONTACT_STATUS_ROW_ITEMS = CONTACT_STATUS_ROWS.map((row) => ({
  id: row.id,
  label: row.label,
  dotClassName: MEANING_BY_ID[row.meaning].dotClassName,
}))
