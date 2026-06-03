/**
 * Constantes de navegación del módulo `Header`.
 *
 * @module components/Header/constants/navigation
 * @fileoverview Define `DEFAULT_NAV_ITEMS`, re-exporta anclas de sección (`SECTION_ANCHOR_ID`,
 * `sectionHref`), `SITE_DISPLAY_NAME`, `HEADER_DRAWER_NAV_ARIA_LABEL` y `HEADER_MOBILE_DRAWER_PANEL_ID`.
 * @remarks Import directo: `import { DEFAULT_NAV_ITEMS } from '@/components/Header/constants/navigation'`.
 * Sin `constants/index.ts`. Las anclas de sección son la fuente de verdad para `Header`, `MobileDrawer`, `SiteLogo` y sus tests.
 */
import {
  SECTION_ANCHOR_ID,
  sectionHref,
  type SectionAnchorHref,
} from '@/shared/constants/sectionAnchors'

/**
 * Re-exports de `@/shared/constants/sectionAnchors` para consumo estable
 * dentro del módulo Header sin importar desde shared directamente.
 */
export { SECTION_ANCHOR_ID, sectionHref }

/** Reexport desde `siteProfile` — mismo contrato único para `Header`/`SiteLogo`/`MobileDrawer` y tests del módulo. */
export { SITE_DISPLAY_NAME } from '@/shared/constants/siteProfile'

/**
 * Ítems de navegación por defecto. Cada `href` debe coincidir con `SECTION_ANCHOR_ID` / `sectionHref`
 * y con el `id` del landmark correspondiente en la página.
 *
 * **`as const` + `satisfies`** — preserva literales (`href`) y comprueba contra {@link SectionAnchorHref}.
 */
export const DEFAULT_NAV_ITEMS = [
  { href: sectionHref(SECTION_ANCHOR_ID.inicio), label: 'Inicio' },
  { href: sectionHref(SECTION_ANCHOR_ID.sobreMi), label: 'Sobre mí' },
  { href: sectionHref(SECTION_ANCHOR_ID.proyectos), label: 'Proyectos' },
  { href: sectionHref(SECTION_ANCHOR_ID.contacto), label: 'Contacto' },
] as const satisfies ReadonlyArray<{ href: SectionAnchorHref; label: string }>

/** `aria-label` de la `nav` dentro del drawer móvil (`MobileDrawer`). */
export const HEADER_DRAWER_NAV_ARIA_LABEL = 'Navegación móvil' as const

/** `id` del panel `role="dialog"` del drawer; **`aria-controls`** del `HamburgerButton`. */
export const HEADER_MOBILE_DRAWER_PANEL_ID = 'mobile-menu' as const
