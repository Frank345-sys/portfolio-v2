/**
 * Clases Tailwind compuestas para {@link Header} y {@link MobileDrawer} (logo, nav, contenedor).
 * Evita duplicar `cn(...)` entre desktop y panel móvil.
 *
 * @module components/Header/styles
 */
import {
  BRAND,
  TYPOGRAPHY,
  LAYOUT,
  PRIMARY_NAV_LINK,
} from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

/** Fila principal del header: distribución, padding vertical y {@link LAYOUT.px}. */
export const headerContainer = cn(
  'flex items-center justify-between gap-4 py-2.5 md:py-4',
  LAYOUT.px
)

/** Enlace de marca con foco visible (anillo) hacia `#inicio`. */
export const logoLink = cn(
  'flex shrink-0 items-center gap-2 rounded-md no-underline outline-none',
  'focus-visible:ring-information-base focus-visible:ring-2 focus-visible:ring-offset-2'
)

/** Tamaño del icono junto al nombre del sitio. */
export const logoIcon = BRAND.logoIcon

/** Texto del nombre del sitio junto al icono. */
export const logoText = cn(TYPOGRAPHY.label.default, 'tracking-tight')

/** Enlaces de navegación desktop (misma base que {@link PRIMARY_NAV_LINK}). */
const navLink = PRIMARY_NAV_LINK

/** Estado activo del scroll-spy (misma base que {@link navLink}). */
const navLinkActive = 'text-information-base font-medium'

/**
 * Clases del enlace de la nav desktop según scroll-spy (evita `cn` inline en
 * {@link Header} por reglas estrictas de tipos en `ClassValue`).
 */
export function desktopNavLinkClassName(isActive: boolean): string {
  return cn(isActive ? cn(navLink, navLinkActive) : navLink, 'pb-1')
}

/** Línea inferior animada bajo el ítem activo de la nav desktop. */
export const desktopNavUnderline = 'bg-information-base rounded-full'

const mobileNavLinkBase = cn(navLink, 'hover:bg-bg-soft rounded-lg px-3 py-2')

/**
 * Clases del enlace en el drawer móvil (lista vertical + hover de fila).
 */
export function mobileNavLinkClassName(isActive: boolean): string {
  return isActive ? cn(mobileNavLinkBase, navLinkActive) : mobileNavLinkBase
}
