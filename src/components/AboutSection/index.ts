/**
 * Sección **Sobre mí** del portfolio.
 *
 * **Landmark único:** `<section id="sobre-mi">` → `./AboutSection.tsx` + `./constants.ts` (`ABOUT_SECTION_TITLE_ID`).
 *
 * **Subbloques (`./subcomponents`):** cada uno usa `role="group"`, encabezado `h3` con `id` estable y,
 * donde aplica, listas `ul`/`ol`; `AboutHero` usa `<header>` con el `h2` etiquetador del landmark.
 *
 * @module components/AboutSection
 * @remarks Importar desde este barrel: `import { AboutSection } from '@/components/AboutSection'`.
 * Contratos en `./types`; leyenda timeline en `./constants`.
 */
export { AboutSection } from './AboutSection'
