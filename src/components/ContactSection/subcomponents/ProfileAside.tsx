import type { ReactNode } from 'react'
import { Legend } from '@/shared/components/Legend'
import { BADGE, CARD, LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'
import {
  CONTACT_STATUS_MEANINGS,
  CONTACT_STATUS_ROW_ITEMS,
  CONTACT_TIMEZONE_LINE,
} from '../constants'
import { ContactOwnerLocalTime } from './ContactOwnerLocalTime'

const hasTimezoneLine = Boolean(CONTACT_TIMEZONE_LINE.trim())
const timezoneCols = hasTimezoneLine ? ' xs:grid-cols-3' : ' xs:grid-cols-2'
const zoneLabel = CONTACT_TIMEZONE_LINE.trim()

/**
 * Listado de servicios con colores; semánticamente es lista de ítems, no de enlaces.
 */
function StatusList() {
  return (
    <ul
      className={cn('flex list-none flex-col gap-2', TYPOGRAPHY.label.default)}
      aria-label="Indicadores de disponibilidad por tipo de colaboración"
    >
      {CONTACT_STATUS_ROW_ITEMS.map(({ id, label, dotClassName }) => (
        <li
          key={id}
          className="border-bg-soft bg-bg-white text-text-strong shadow-elevation-xs flex items-center gap-3 rounded-xl border px-4 py-2.5"
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

type MetaCellProps = {
  term: string
  children: ReactNode
}

/**
 * Grupo término/valor para la lista de definición: `dt` + `dd` facilitan lectoras de pantalla.
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
 * Barra lateral: leyenda, servicios, hora/respuesta/zona. Complementa la sección sin ser navegación principal.
 */
export function ProfileAside() {
  return (
    <aside
      className={cn(
        'flex h-full min-h-0 flex-col',
        CARD.surface.subtle,
        LAYOUT.spacing.default
      )}
      aria-label="Resumen de perfil y disponibilidad"
    >
      <div className={LAYOUT.spacing.small}>
        <h3 className={TYPOGRAPHY.label.overline}>Disponibilidad</h3>
        <Legend
          items={[...CONTACT_STATUS_MEANINGS]}
          ariaLabel="Significado de los colores en la tarjeta de disponibilidad"
        />
      </div>

      <div className={LAYOUT.spacing.small}>
        <h3 className={TYPOGRAPHY.label.overline}>Servicios disponibles</h3>
        <StatusList />
      </div>

      <div
        className={cn(
          LAYOUT.spacing.small,
          'border-stroke-soft mt-auto border-t pt-5'
        )}
      >
        <dl
          className={cn('grid grid-cols-1 gap-2', timezoneCols)}
          aria-label="Tiempo de respuesta, hora local y zona horaria de referencia"
        >
          <MetaCell term="Respuesta">
            <p className={cn(TYPOGRAPHY.title.xsmall, 'tabular-nums')}>~ 2 h</p>
          </MetaCell>
          <MetaCell term="Hora local">
            <ContactOwnerLocalTime variant="stacked" />
          </MetaCell>
          {hasTimezoneLine && (
            <MetaCell term="Zona">
              <p className={TYPOGRAPHY.title.xsmall}>{zoneLabel}</p>
            </MetaCell>
          )}
        </dl>
      </div>
    </aside>
  )
}
