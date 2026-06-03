/**
 * **Cabecera** del sitio: landmark `<header>` fijo, **logo**, **nav desktop** (scroll-spy +
 * subrayado Motion), **slot derecho** (p. ej. `ThemeToggle`) y **drawer móvil** fuera del stacking
 * del header. **`HEADER_MOBILE_DRAWER_PANEL_ID`**, **`DEFAULT_NAV_ITEMS`** y reexport **anclas del sitio**
 * (`SECTION_ANCHOR_ID`, `sectionHref`, `SectionAnchorHref`) en `./constants/navigation.ts`; labels `aria`
 * exportados donde se usan (`Header.tsx`, `MobileDrawer.tsx`).
 *
 * **Piezas**
 * - `Header.tsx` — composición de UI.
 * - `./hooks` — `useHeader` (incl. `desktopNavUnderlineMotion`), `useNavScrollSpy`,
 * `useNavUnderlinePosition`.
 * - `./constants/` (`navigation.ts`, `styles.ts` — sin `index.ts`; imports directos al archivo).
 * - `./types.ts`, `./subcomponents/`.
 *
 * **Pruebas (Vitest):** `Header.test.tsx`, `hooks/__tests__/*.test.tsx`, tests junto a
 * `HamburgerButton` y `MobileDrawer`; `SiteLogo` vive en `@/shared/components/primitives/SiteLogo`.
 *
 * @module components/Header
 * @remarks Importar desde este barrel: `import { Header } from '@/components/Header'`.
 */
export { Header } from './Header'
