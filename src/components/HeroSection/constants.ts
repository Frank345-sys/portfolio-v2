/**
 * Datos estáticos del hero (título, lead, **`HERO_CV_HREF`**, stats). Identidad del título del hero:
 * alias legibles sobre `@/shared/constants/siteProfile` (mismo criterio que
 * `TYPOGRAPHY.link.nav` en `@/shared/constants/tokens`).
 *
 * **`HERO_SECTION_TITLE_ID`:** `id` del **`h1`** en **`HeroTitle`**; el **`<section>`** de **`HeroSection`**
 * declara `aria-labelledby` apuntando a ese `h1`.
 *
 * @module components/HeroSection/constants
 * @fileoverview Centraliza valores importados por componentes colindantes; evita cadenas mágicas en el JSX.
 * @remarks Los cambios de texto o `href` suelen requerir actualizar tests que fijen el contrato de la sección.
 */
import { SECTION_ANCHOR_ID } from '@/shared/constants/sectionAnchors'
import {
  HERO_STACK_HIGHLIGHT,
  SITE_DISPLAY_NAME,
  SITE_PROFILE,
} from '@/shared/constants/siteProfile/siteProfile'

/**
 * Fragmento (`id`) del landmark del hero — mismo valor que {@link SECTION_ANCHOR_ID.inicio}
 * (`@/shared/constants/sectionAnchors`).
 */
export const HERO_SECTION_ANCHOR_ID = SECTION_ANCHOR_ID.inicio

/** Nombre visible en el `h1` del hero. */
export const HERO_TITLE_NAME = SITE_DISPLAY_NAME

/** Rol en la línea bajo el `h1`. */
export const HERO_TITLE_ROLE = SITE_PROFILE.role

/** Línea breve de stack bajo el rol. */
export const HERO_TITLE_STACK = HERO_STACK_HIGHLIGHT

/** `id` del `h1`; referenciado por el `<section id="…">` vía `aria-labelledby`. */
export const HERO_SECTION_TITLE_ID = 'hero-heading' as const

/** Párrafo lead bajo el bloque de título (`HeroLead`). */
export const HERO_LEAD =
  'Desarrollo interfaces web rápidas, limpias y accesibles, optimizando rendimiento, integración con APIs y experiencia de usuario.' as const

/**
 * Ruta pública del CV en PDF (prefijo **`BASE_URL`** de Vite). Mantener sincronizado con `public/` y despliegue.
 *
 * CTA y `aria-label`: `subcomponents/HeroCvCta/HeroCvCta.tsx`.
 */
export const HERO_CV_HREF =
  `${import.meta.env.BASE_URL}Francisco_Gonzalez_Frontend_Developer_2026.pdf` as const
