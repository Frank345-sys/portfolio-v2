/**
 * Pieza de interfaz del portfolio (`ProfileAside`).
 *
 * @fileoverview Implementación del archivo `ProfileAside.tsx` dentro de `components/ContactSection/subcomponents/ProfileAside`; ver exports para la API pública.
 * @remarks Servicios ordenados con `./utils/orderContactStatusRowsByLegend`. La fila «Zona» se renderiza condicionalmente
 * según `CONTACT_ASIDE_ZONE_LABEL_TRIM`.
 */
import { Legend } from '@/shared/components/primitives/Legend'
import { OwnerLocalTime } from '@/shared/components/primitives/OwnerLocalTime'
import { BADGE, CARD, LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import {
  CONTACT_ASIDE_AVAILABILITY_HEADING_ID,
  CONTACT_ASIDE_METADATA_HEADING_ID,
  CONTACT_ASIDE_SERVICES_HEADING_ID,
  CONTACT_ASIDE_ZONE_LABEL_TRIM,
  CONTACT_IANA_TIMEZONE,
  CONTACT_STATUS_MEANINGS,
} from './constants'
import { CONTACT_ASIDE_SERVICE_LIST_ITEMS } from './utils/orderContactStatusRowsByLegend'

import type { ReactNode } from 'react'

// Columnas del dl: 3 si hay zona horaria, 2 si no — evita celda vacía en el grid.
const timezoneCols = CONTACT_ASIDE_ZONE_LABEL_TRIM
  ? ' xs:grid-cols-3'
  : ' xs:grid-cols-2'

/**
 * Lista de servicios con dot de color por disponibilidad.
 * Datos desde {@link CONTACT_ASIDE_SERVICE_LIST_ITEMS} (ordenados por leyenda y etiqueta).
 * Cada ítem es un `<li>` con `aria-hidden` en el dot decorativo.
 */
function StatusList() {
  return (
    <ul
      className={cn(
        LAYOUT.grid.cols1,
        'list-none gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1'
      )}
      aria-label="Indicadores de disponibilidad por tipo de colaboración"
    >
      {CONTACT_ASIDE_SERVICE_LIST_ITEMS.map(({ id, label, dotClassName }) => (
        <li
          key={id}
          className={cn(
            TYPOGRAPHY.label.default,
            'bg-bg-white shadow-elevation-xs flex items-center gap-3 rounded-xl px-4 py-2.5'
          )}
        >
          <span
            className={cn(
              BADGE.special.dot,
              BADGE.special.dotSize.md,
              dotClassName
            )}
            aria-hidden="true"
          />
          {label}
        </li>
      ))}
    </ul>
  )
}

/**
 * Grupo término/valor (`dt` + `dd`) dentro del `dl` de metadatos.
 */
interface MetaCellProps {
  term: string
  children: ReactNode
}

/**
 * Celda término/valor del `dl` de metadatos: `dt` centrado + `dd` con contenido flexible.
 */
function MetaCell({ term, children }: MetaCellProps) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2">
      <dt className={cn(TYPOGRAPHY.label.overline, 'text-center')}>{term}</dt>
      <dd className="flex w-full max-w-full min-w-0 flex-col items-center justify-center text-center">
        {children}
      </dd>
    </div>
  )
}

/**
 * @module components/ContactSection/subcomponents/ProfileAside/ProfileAside
 *
 * Panel lateral (`<section aria-label>`): disponibilidad, servicios y metadatos ({@link OwnerLocalTime}).
 * No usa `<aside>` para evitar landmark complementario anidado dentro del `<section>` de contacto.
 *
 * @example
 * ```tsx
 * <ProfileAside />
 * ```
 * @see {@link CONTACT_STATUS_MEANINGS} para la leyenda de disponibilidad
 * @see {@link CONTACT_ASIDE_SERVICE_LIST_ITEMS} para los servicios ordenados
 * @see {@link OwnerLocalTime} para el componente de hora local en vivo
 */
export function ProfileAside() {
  return (
    <section
      className={cn(
        CARD.surface.weak,
        LAYOUT.spacing.default,
        'flex h-full flex-col'
      )}
      aria-label="Resumen de perfil y disponibilidad"
    >
      <section
        aria-labelledby={CONTACT_ASIDE_AVAILABILITY_HEADING_ID}
        className={LAYOUT.spacing.small}
      >
        <h3
          id={CONTACT_ASIDE_AVAILABILITY_HEADING_ID}
          className={TYPOGRAPHY.label.overline}
        >
          Disponibilidad
        </h3>
        <Legend
          items={CONTACT_STATUS_MEANINGS}
          aria-label="Significado de los colores en la tarjeta de disponibilidad"
        />
      </section>

      <section
        aria-labelledby={CONTACT_ASIDE_SERVICES_HEADING_ID}
        className={LAYOUT.spacing.small}
      >
        <h3
          id={CONTACT_ASIDE_SERVICES_HEADING_ID}
          className={TYPOGRAPHY.label.overline}
        >
          Servicios disponibles
        </h3>
        <StatusList />
      </section>

      <section
        aria-labelledby={CONTACT_ASIDE_METADATA_HEADING_ID}
        className={cn(
          LAYOUT.spacing.small,
          'border-stroke-subtle mt-auto border-t pt-5'
        )}
      >
        <h3 id={CONTACT_ASIDE_METADATA_HEADING_ID} className="sr-only">
          Tiempo de respuesta, hora local y zona horaria de referencia
        </h3>
        <dl className={cn(timezoneCols, 'grid grid-cols-1 gap-2')}>
          <MetaCell term="Respuesta">
            <p className={cn(TYPOGRAPHY.title.xsmall, 'tabular-nums')}>~ 2 h</p>
          </MetaCell>
          <MetaCell term="Hora local">
            <OwnerLocalTime
              timeZone={CONTACT_IANA_TIMEZONE}
              variant="stacked"
            />
          </MetaCell>
          {CONTACT_ASIDE_ZONE_LABEL_TRIM && (
            <MetaCell term="Zona">
              <p className={cn(TYPOGRAPHY.title.xsmall)}>
                {CONTACT_ASIDE_ZONE_LABEL_TRIM}
              </p>
            </MetaCell>
          )}
        </dl>
      </section>
    </section>
  )
}
