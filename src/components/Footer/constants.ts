/**
 * Datos estáticos del pie de página (`Footer`).
 *
 * Datos compartidos: marca, atajos rápidos (`FOOTER_QUICK_*`), textos e IDs de bloque.
 * **Anclas de sección** enlazadas desde el footer: {@link FOOTER_SECTION_HREF} (única definición;
 * componentes y tests del módulo consumen esto, no `sectionAnchors` directamente).
 *
 * @fileoverview Define hrefs de sección, datos de marca, IDs de encabezados, atajos de navegación
 * Todos los valores son `as const` para tipos literales estables.
 * @remarks Cambios en `href`, `label` o `id` pueden romper tests que fijen texto visible
 * o atributos de enlace. Origen de hrefs: `sectionHref` de `@/shared/constants/sectionAnchors`.
 */
import {
  SECTION_ANCHOR_ID,
  sectionHref,
} from '@/shared/constants/sectionAnchors'
import {
  SITE_PROFILE,
  SITE_DISPLAY_NAME,
  SITE_TAGLINE,
} from '@/shared/constants/siteProfile/siteProfile'

/**
 * Hrefs de las secciones a las que el pie enlaza (inicio / contacto).
 * Contrato único derivado de `@/shared/constants/sectionAnchors`.
 */
export const FOOTER_SECTION_HREF = {
  inicio: sectionHref(SECTION_ANCHOR_ID.inicio),
  contacto: sectionHref(SECTION_ANCHOR_ID.contacto),
} as const

/**
 * Marca legible para el bloque inicial del pie (`SITE_PROFILE` / `SITE_DISPLAY_NAME`).
 */
export const FOOTER_BRAND = {
  name: SITE_DISPLAY_NAME,
  role: SITE_PROFILE.role,
  tagline: SITE_TAGLINE,
} as const

/** Texto accesible del `h2` sr-only del bloque marca. */
export const FOOTER_BRAND_LANDMARK_LABEL = 'Marca y perfil del sitio' as const

/** Enlace destacado a la sección contacto. */
export const FOOTER_QUICK_CONTACT = {
  href: FOOTER_SECTION_HREF.contacto,
  label: 'Contacto',
} as const

/** Enlace destacado al inicio (subir / hero). */
export const FOOTER_QUICK_BACK_TO_TOP = {
  href: FOOTER_SECTION_HREF.inicio,
  label: 'Volver al inicio',
} as const
