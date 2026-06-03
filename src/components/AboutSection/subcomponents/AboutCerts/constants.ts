/**
 * Datos estáticos del bloque de certificaciones (`AboutCerts`).
 *
 * @fileoverview Define `CERT_ID` (claves estables para el mapa de iconos),
 * `ABOUT_CERTS` (entradas con título, institución, fecha y `href` externo)
 * y `ABOUT_CERTS_HEADING_ID`.
 * @remarks Cambios en `title`, `subtitle` o `href` pueden romper tests que fijen
 * texto visible o atributos de enlace. Tipos en `./types`.
 */
import type { AboutCertEntry } from './types'

/**
 * Claves estables para mapear iconos en `CERT_ICON_BY_ID` (`AboutCerts.tsx`).
 * El `satisfies` garantiza que cada valor sea un `AboutCertEntry['id']` válido.
 */
export const CERT_ID = {
  IA_AGENTS: 'ia-agents',
  SEO_IA_GOOGLE: 'seo-ia-google',
  IA_DESARROLLO: 'ia-desarrollo',
  GIT_GITHUB: 'git-github',
  JS_FUNDAMENTOS: 'js-fundamentos',
  HTML_CSS_FRONTEND: 'html-css-frontend',
} as const satisfies Record<string, AboutCertEntry['id']>

/**
 * Certificaciones con enlace externo, renderizadas como {@link LinkCard} en `AboutCerts.tsx`.
 * Orden: más reciente primero. `id` referencia {@link CERT_ID} para el mapa de iconos SVG.
 */
export const ABOUT_CERTS = [
  {
    id: CERT_ID.IA_AGENTS,
    title: 'Agentes IA',
    subtitle: 'Big School · Mayo 2026',
    href: 'https://certificados.thebigschool.com/wp-content/uploads/certs/MIA6/Certificado-Francisco-Omar-Habib-Gonzalez-Utrera-9rv0g1gq.pdf',
  },
  {
    id: CERT_ID.SEO_IA_GOOGLE,
    title: 'SEO para IA y Google',
    subtitle: 'Big School · Abril 2026',
    href: 'https://certificados.thebigschool.com/wp-content/uploads/certs/MSEO-10/Certificado-Francisco-Omar-Habib-Gonzalez-Utrera-2n0ucrhd.pdf',
  },
  {
    id: CERT_ID.IA_DESARROLLO,
    title: 'Desarrollo con IA',
    subtitle: 'Big School · Marzo 2026',
    href: 'https://certificados.thebigschool.com/wp-content/uploads/certs/MDEV2/Certificado-Francisco-Omar-Habib-Gonzalez-Utrera-ttfathmh.pdf',
  },
  {
    id: CERT_ID.GIT_GITHUB,
    title: 'Git y GitHub',
    subtitle: 'Crehana · Julio 2024',
    href: 'https://s3.amazonaws.com/public-lessons.crehana.com/images/certificate/participation-pdf/f3224198/3d9d7622.pdf',
  },
  {
    id: CERT_ID.JS_FUNDAMENTOS,
    title: 'Fundamentos de Javascript',
    subtitle: 'Crehana · Noviembre 2022',
    href: 'https://s3.amazonaws.com/public-lessons.crehana.com/images/certificate/participation-pdf/09ef2e51/d7cfd6c5.pdf',
  },
  {
    id: CERT_ID.HTML_CSS_FRONTEND,
    title: 'Introducción al Desarrollo Web',
    subtitle: 'Crehana · Noviembre 2022',
    href: 'https://www.crehana.com/diplomas/890575cf/',
  },
] as const satisfies readonly AboutCertEntry[]

/** Encabezado `h3` de certificaciones (`AboutCerts`). */
export const ABOUT_CERTS_HEADING_ID = 'about-certs-heading' as const
