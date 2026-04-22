/**
 * Datos de la sección de contacto: enlaces públicos alineados con `index.html` (JSON-LD / sameAs).
 *
 * @module components/ContactSection/constants
 */

/** Opcional. Si queda vacío, no se muestra la tarjeta de correo. */
export const CONTACT_EMAIL = 'francgonzalez456@gmail.com'

const _contactEmailTrimmed = CONTACT_EMAIL.trim()

/**
 * Mismo {@link CONTACT_EMAIL} sin espacios; `''` si el valor está vacío.
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
