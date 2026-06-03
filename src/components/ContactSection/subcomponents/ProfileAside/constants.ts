/**
 * Datos estáticos del aside de perfil (`ProfileAside`).
 *
 * @fileoverview Define timezone (`CONTACT_IANA_TIMEZONE`), IDs de encabezados sr-only y visibles,
 * leyenda de disponibilidad (`CONTACT_STATUS_MEANINGS`) y filas de estado (`CONTACT_STATUS_ROWS`).
 * @remarks Cambios en `label` o `meaning` pueden romper tests que fijen texto visible o la
 * cardinalidad de la leyenda. La ordenación final de filas la hace `orderContactStatusRowsByLegend`.
 */
import {
  SITE_IANA_TIMEZONE,
  SITE_TIMEZONE_LABEL,
} from '@/shared/constants/siteTimezone'

import type { ContactStatusMeaningEntry, ContactStatusRowEntry } from './types'

/**
 * TZ IANA para `<OwnerLocalTime />` en el aside (mismo valor que {@link SITE_IANA_TIMEZONE}).
 */
export const CONTACT_IANA_TIMEZONE = SITE_IANA_TIMEZONE

/**
 * Encabezado sr-only ante el `<dl>` de metadatos (respuesta / hora local / zona).
 */
export const CONTACT_ASIDE_METADATA_HEADING_ID =
  'contact-aside-metadata-heading' as const

/** `h3` visible: lista de servicios en `ProfileAside`. */
export const CONTACT_ASIDE_SERVICES_HEADING_ID =
  'contact-aside-servicios-heading' as const

/** `h3` visible: bloque disponibilidad + leyenda en `ProfileAside`. */
export const CONTACT_ASIDE_AVAILABILITY_HEADING_ID =
  'contact-aside-disponibilidad-heading' as const

/**
 * Etiqueta de zona normalizada: único `trim` aplicado a {@link SITE_TIMEZONE_LABEL}.
 * Si queda vacía, no se muestra la fila «Zona» en el `dl`.
 */
export const CONTACT_ASIDE_ZONE_LABEL_TRIM = SITE_TIMEZONE_LABEL.trim()

/**
 * Leyenda de significados (`Dot`) y filas de disponibilidad.
 * Contrato: {@link ContactStatusMeaningEntry} (alineado con `<Legend />` vía `LegendItem` en `./types`).
 * Ítems derivados en la UI: `CONTACT_ASIDE_SERVICE_LIST_ITEMS` (`./utils/orderContactStatusRowsByLegend.ts`).
 */
export const CONTACT_STATUS_MEANINGS = [
  { id: 'available', label: 'Disponible', dotClassName: 'bg-success-base' },
  { id: 'limited', label: 'Limitado', dotClassName: 'bg-warning-base' },
  { id: 'unavailable', label: 'No disponible', dotClassName: 'bg-error-base' },
] satisfies readonly ContactStatusMeaningEntry[]

/**
 * Orden del array puede relajarse: la lista derivada ordena por la leyenda
 * (`CONTACT_STATUS_MEANINGS`) y etiqueta (`es`) en `./utils/orderContactStatusRowsByLegend.ts`.
 */
export const CONTACT_STATUS_ROWS = [
  { id: 'remote', label: 'Trabajo remoto', meaning: 'available' },
  { id: 'hybrid', label: 'Trabajo híbrido', meaning: 'available' },
  { id: 'onsite', label: 'Trabajo presencial', meaning: 'available' },
  { id: 'part_time', label: 'Jornada parcial', meaning: 'available' },
  { id: 'relocation', label: 'Abierto a relocalización', meaning: 'available' },
  { id: 'freelance', label: 'Proyectos freelance', meaning: 'limited' },
] as const satisfies readonly ContactStatusRowEntry[]
