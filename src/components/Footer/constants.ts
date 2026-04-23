import { SITE_PROFILE, SITE_DISPLAY_NAME } from '@/shared/constants/siteProfile'

/**
 * Marca reutilizable en el pie. Nombre y rol provienen de
 * `SITE_PROFILE` / `SITE_DISPLAY_NAME` (`shared/constants/siteProfile`).
 *
 * @module components/Footer/constants
 */
export const FOOTER_BRAND = {
  name: SITE_DISPLAY_NAME,
  role: SITE_PROFILE.role,
} as const

/**
 * Título de sección del bloque marca (solo lectores de pantalla): agrupa nombre, rol y tagline.
 */
export const FOOTER_BRAND_LANDMARK_LABEL = 'Marca y perfil del sitio' as const

/**
 * Tecnologías mostradas en la línea “Construido con …” (prosa breve, sin versión fija de deps).
 */
export const FOOTER_BUILT_WITH = 'React, TypeScript y Vite' as const

/** Atajo único en el pie: contacto (el resto de secciones ya están en el header). */
export const FOOTER_QUICK_CONTACT = {
  href: '#contacto' as const,
  label: 'Contacto',
} as const

/** Foco visible en enlaces del pie (offset acorde al fondo `bg-bg-white`). */
export const FOOTER_FOCUS_VISIBLE =
  'focus-visible:ring-information-base/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-white focus-visible:outline-none' as const
