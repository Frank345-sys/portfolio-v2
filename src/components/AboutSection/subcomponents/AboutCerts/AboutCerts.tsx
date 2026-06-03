/**
 * Pieza de interfaz del portfolio (`AboutCerts`).
 *
 * @fileoverview Implementación del archivo `AboutCerts.tsx` dentro de `components/AboutSection/subcomponents/AboutCerts`; ver exports para la API pública.
 * @remarks Mapa `CERT_ICON_BY_ID` asigna SVG por `id` de certificado.
 */
import { LinkCard } from '@/shared/components/primitives/LinkCard'
import { SectionSubtitle } from '@/shared/components/primitives/SectionSubtitle'
import { LAYOUT } from '@/shared/constants/tokens'
import {
  AiIcon,
  GitIcon,
  HtmlIcon,
  JsIcon,
  SeoWebBusinessIcon,
} from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

import { ABOUT_CERTS, ABOUT_CERTS_HEADING_ID, CERT_ID } from './constants'

import type { AboutCertId } from './types'
import type { ComponentType, SVGProps } from 'react'

/** Clase CSS para iconos de certificados. */
const CERT_ICON_CLASS = 'size-6 shrink-0'

/** Alias para componentes SVG con props nativas de `SVGSVGElement`. */
type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>

/** Mapa estático `AboutCertId` → componente SVG; centraliza la asignación de iconos por certificado. */
const CERT_ICON_BY_ID: Record<AboutCertId, SvgIcon> = {
  [CERT_ID.IA_AGENTS]: AiIcon,
  [CERT_ID.SEO_IA_GOOGLE]: SeoWebBusinessIcon,
  [CERT_ID.IA_DESARROLLO]: AiIcon,
  [CERT_ID.GIT_GITHUB]: GitIcon,
  [CERT_ID.JS_FUNDAMENTOS]: JsIcon,
  [CERT_ID.HTML_CSS_FRONTEND]: HtmlIcon,
}

/**
 * @module components/AboutSection/subcomponents/AboutCerts/AboutCerts
 *
 * Certificaciones: rejilla de {@link LinkCard} (enlaces externos); iconos en {@link CERT_ICON_BY_ID}.
 *
 * @example
 * ```tsx
 * <AboutCerts />
 * ```
 * @see {@link ABOUT_CERTS} para los datos de certificados
 * @see {@link LinkCard} para el componente de tarjeta enlazable
 */
export function AboutCerts() {
  return (
    <section
      aria-labelledby={ABOUT_CERTS_HEADING_ID}
      className={LAYOUT.spacing.default}
    >
      <SectionSubtitle id={ABOUT_CERTS_HEADING_ID}>
        Certificaciones
      </SectionSubtitle>
      <ul className={cn(LAYOUT.grid.cols2, 'list-none')}>
        {ABOUT_CERTS.map(({ id, href, title, subtitle }) => {
          const Icon = CERT_ICON_BY_ID[id]
          return (
            <li key={id}>
              <LinkCard
                href={href}
                target="_blank"
                title={title}
                subtitle={subtitle}
                icon={<Icon className={CERT_ICON_CLASS} aria-hidden />}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
