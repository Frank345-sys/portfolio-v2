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
    text: `Soy **Francisco Omar Habib González Utrera**, ingeniero en sistemas computacionales, con especialidad en **ingeniería de software**. Llevo **más de dos años** de recorrido en frontend (formación intensiva y entrega en producción). Cubrí e-commerce, B2B, ERP y landings, cerca de producto y de back-end.`,
  },
  {
    id: 'about-bio-positioning',
    text: 'Diseño e implemento interfaces de producto con **React** y **TypeScript**: de landings a plataformas con **APIs**, priorizando rendimiento, accesibilidad y consistencia con diseño.',
  },
  {
    id: 'about-bio-proof',
    text: 'Refactorizaciones con impacto medible donde he logrado **~40% menos** código de frontend y **carga aproximadamente a la mitad** (de ~3s a **~1,4–1,6s**) en un núcleo B2B, además de desarrollar y **homogeneizar la UI** con el ecosistema de producto completo.',
  },
  {
    id: 'about-bio-collaboration',
    text: 'Trabajo junto a diseño **Figma** y equipos de **back-end**: el detalle cuenta para negocio y mantenimiento — **componentes y patrones** listos para extender, no parches aislados.',
  },
] as const satisfies readonly AboutBioParagraph[]

/** Encabezado `h3` de la subsección «Quién soy» (`AboutBio`). */
export const ABOUT_BIO_HEADING_ID = 'about-bio-heading' as const
