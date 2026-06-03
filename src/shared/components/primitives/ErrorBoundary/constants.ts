/**
 * Constantes del fallback de {@link ErrorBoundary}.
 *
 * @fileoverview Códigos de error, ancla de inicio del fallback y enlace a contacto del portfolio.
 * @remarks Los cambios en `ERROR_BOUNDARY_SOLUTIONS_HREF` o en `ERROR_BOUNDARY_SECTION_ANCHOR_ID` deben reflejarse en tests del fallback.
 */

import {
  sectionHref,
  SECTION_ANCHOR_ID,
} from '@/shared/constants/sectionAnchors'

/** Código por defecto cuando el error no encaja en una categoría conocida. */
export const ERROR_BOUNDARY_DEFAULT_CODE = 'ERR_NETWORK_FAILED' as const

/**
 * Fragmento (`id`) del landmark del fallback — mismo valor que {@link SECTION_ANCHOR_ID.inicio}
 * cuando el hero no está montado (`@/shared/constants/sectionAnchors`).
 */
export const ERROR_BOUNDARY_SECTION_ANCHOR_ID = SECTION_ANCHOR_ID.inicio

/** Enlace «Ver soluciones comunes» → sección contacto del portfolio. */
export const ERROR_BOUNDARY_SOLUTIONS_HREF = sectionHref(
  SECTION_ANCHOR_ID.contacto
)
