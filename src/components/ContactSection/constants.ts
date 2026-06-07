/**
 * Constantes de la sección contacto: ancla (`CONTACT_SECTION_ANCHOR_ID`) y datos públicos (`CONTACT_EMAIL_*`, {@link CONTACT_PROFILE}).
 *
 * Los IDs **`CONTACT_SECTION_TITLE_ID`** y **`CONTACT_MAIN_COLUMN_HEADING_ID`** viven en `ContactSection.tsx`.
 *
 * @fileoverview Centraliza valores importados por componentes colindantes; evita cadenas mágicas en el JSX.
 * @remarks Los cambios de texto o `href` suelen requerir actualizar tests que fijen el contrato de la sección.
 */
import { SECTION_ANCHOR_ID } from '@/shared/constants/sectionAnchors'
import {
  SITE_CONTACT_EMAIL,
  SITE_CONTACT_EMAIL_HREF,
  SITE_CONTACT_EMAIL_TRIMMED,
  SITE_SOCIAL_HREFS,
} from '@/shared/constants/siteProfile/siteProfile'

/**
 * Fragmento (`id`) del landmark de la sección contacto — mismo valor que {@link SECTION_ANCHOR_ID.contacto}
 * (`@/shared/constants/sectionAnchors`).
 */
export const CONTACT_SECTION_ANCHOR_ID = SECTION_ANCHOR_ID.contacto

/** Correo de contacto en crudo — re-exportado desde {@link SITE_CONTACT_EMAIL} para
 * consumo estable en `ContactSection` sin importar directamente desde `siteProfile`.
 */
export const CONTACT_EMAIL = SITE_CONTACT_EMAIL

/**
 * Alias estable para consumo en Contact y tests (misma referencia que {@link SITE_SOCIAL_HREFS}).
 */
export const CONTACT_PROFILE = SITE_SOCIAL_HREFS

/** Correo sin espacios extremos — usado para validaciones y comparaciones en tests.
 * `''` si {@link SITE_CONTACT_EMAIL} está vacío; nunca lanzar con este valor sin verificar.
 */
export const CONTACT_EMAIL_TRIMMED = SITE_CONTACT_EMAIL_TRIMMED

/** `mailto:…` listo para `href`, o `''` si no hay correo. */
export const CONTACT_EMAIL_HREF = SITE_CONTACT_EMAIL_HREF
