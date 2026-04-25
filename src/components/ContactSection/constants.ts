/**
 * Datos de la sección de contacto: enlaces públicos, huso horario y
 * modelos de disponibilidad para la tarjeta lateral.
 *
 * @module components/ContactSection/constants
 */

/** Opcional. Si queda vacío, no se muestra la tarjeta de correo. (Valor base; el resto del módulo deriva cadenas con trim y mailto). */
const CONTACT_EMAIL = 'francgonzalez456@gmail.com'

const _contactEmailTrimmed = CONTACT_EMAIL.trim()

/**
 * Mismo correo en crudo, sin espacios; `''` si el valor está vacío.
 * Úsalo para copy, `aria-label` y condicionales en un solo sitio.
 */
export const CONTACT_EMAIL_TRIMMED = _contactEmailTrimmed

/**
 * `mailto:…` listo para `href`, o `''` si no hay correo. Evita duplicar el trim
 * en `ContactSection` y `ContactLinkCards`.
 */
export const CONTACT_EMAIL_HREF = _contactEmailTrimmed
  ? `mailto:${_contactEmailTrimmed}`
  : ''

export const CONTACT_PROFILE = {
  githubHref: 'https://github.com/Frank345-sys',
  linkedinHref: 'https://www.linkedin.com/in/francisco-omar-h-glez-utrera/',
  /** Enlace wa.me con mensaje prellenado para abrir chat en WhatsApp Web o la app. */
  whatsAppHref:
    'https://wa.me/522283111621?text=Hola,%20vi%20tu%20perfil%20y%20me%20gustaría%20contactarte.',
} as const

/**
 * IANA de tu ubicación. Usada con `Intl` para la hora en pantalla (maneja DST si aplica).
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export const CONTACT_IANA_TIMEZONE = 'America/Mexico_City' as const

/**
 * Referencia de offset UTC en la tarjeta. Deja `''` para no mostrar la celda “Zona”.
 * La hora en vivo usa {@link CONTACT_IANA_TIMEZONE}.
 */
export const CONTACT_TIMEZONE_LINE = 'UTC−6'

// ── Disponibilidad (leyenda y filas) ──

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
  { id: 'hybrid', label: 'Trabajo híbrido', meaning: 'available' },
  { id: 'onsite', label: 'Trabajo presencial', meaning: 'available' },
  { id: 'freelance', label: 'Proyectos freelance', meaning: 'limited' },
  { id: 'consulting', label: 'Consultoría puntual', meaning: 'limited' },
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
