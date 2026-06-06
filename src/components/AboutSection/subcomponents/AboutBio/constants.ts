/**
 * Datos estáticos del bloque biográfico (`AboutBio`).
 *
 * @fileoverview Define `ABOUT_BIO` (párrafos con énfasis `**…**`) y `ABOUT_BIO_HEADING_ID`.
 * El copy usa la sintaxis `**término**` procesada por {@link parseEmphasis} en el componente.
 * @remarks Cambios en el texto pueden romper tests que fijen fragmentos visibles
 * (p. ej. nombre completo, métricas de rendimiento). Tipos en `./types`.
 */
import type { AboutBioParagraph } from './types'

/**
 * Párrafos de presentación personal. Resaltados con `**término**`; render en `AboutBio.tsx`.
 */
export const ABOUT_BIO = [
  {
    id: 'about-bio-intro',
    text: `Soy **Francisco Omar Habib González Utrera**, ingeniero en sistemas computacionales con especialidad en **ingeniería de software**. Llevo **más de dos años** en frontend construyendo interfaces, integrando **APIs** y colaborando con equipos multidisciplinarios en modalidad presencial, híbrida y remota.`,
  },
  {
    id: 'about-bio-positioning',
    text: 'Diseño e implemento interfaces de producto con **React** y **TypeScript**: desde **landings** hasta **ERP** y **plataformas internas**, priorizando rendimiento, accesibilidad y consistencia con diseño.',
  },
  {
    id: 'about-bio-proof',
    text: 'En proyectos con deuda técnica, he aplicado refactorizaciones con impacto medible: **~40% menos** código de frontend y **carga aproximadamente a la mitad** (de ~3s a **~1,4–1,6s**) en flujos críticos. También **homogeneicé la UI** con el ecosistema del producto y reforcé **SEO** en landings —metadatos, HTML semántico y **Core Web Vitals**— junto a mejoras de **UX**.',
  },
  {
    id: 'about-bio-collaboration',
    text: 'Trabajo junto a diseño **Figma**, equipos de **back-end** y metodologías ágiles (**SCRUM**): el detalle cuenta para negocio y mantenimiento — **componentes y patrones** listos para extender, no parches aislados.',
  },
] as const satisfies readonly AboutBioParagraph[]

/** Encabezado `h3` de la subsección «Quién soy» (`AboutBio`). */
export const ABOUT_BIO_HEADING_ID = 'about-bio-heading' as const
