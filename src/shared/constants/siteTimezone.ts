/**
 * Zona horaria del titular del sitio (IANA y etiqueta de offset en UI).
 * Reutilizable en contacto, pie, metadatos u otras secciones que muestren hora local u offset.
 *
 * @module shared/constants/siteTimezone
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.
 */

/**
 * Zona IANA de la ubicación de referencia. Usar con `Intl`, `OwnerLocalTime`, etc. (incluye DST si aplica).
 *
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export const SITE_IANA_TIMEZONE = 'America/Mexico_City' as const

/**
 * Texto fijo de offset UTC en tarjetas o leyendas (p. ej. celda «Zona»).
 * Cadena vacía para ocultar esa celda en layouts que lo soporten.
 */
export const SITE_TIMEZONE_LABEL = 'UTC−6' as const
