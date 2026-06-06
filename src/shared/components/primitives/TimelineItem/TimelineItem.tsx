/**
 * Pieza de interfaz del portfolio (`TimelineItem`).
 *
 * @fileoverview Implementación del archivo `TimelineItem.tsx` dentro de `shared/components/TimelineItem`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { BADGE, LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { useTimelineItem } from './hooks/useTimelineItem'
import {
  TIMELINE_CHIP_VARIANT,
  type TimelineChipVariant,
  type TimelineItemData,
} from './types'

// ─── Mapa variante → clase de badge (detalle de presentación interno) ─────────

/**
 * Clase Tailwind de badge para cada variante de chip.
 *
 * Privado al módulo: al cambiar variantes, revisar la leyenda
 * `ABOUT_TIMELINE_LEGEND_ITEMS` (`components/AboutSection/constants.ts`) para que los puntos
 * sigan la misma semántica de color.
 *
 * `Record<TimelineChipVariant, string>` garantiza exhaustividad:
 * añadir una variante al union rompe el build aquí.
 */
const CHIP_BADGE_CLASS: Record<TimelineChipVariant, string> = {
  [TIMELINE_CHIP_VARIANT.TECHNOLOGY]: BADGE.variant.light.neutral,
  [TIMELINE_CHIP_VARIANT.IMPACT_METRIC]: BADGE.variant.light.success,
  [TIMELINE_CHIP_VARIANT.APPLIED]: BADGE.variant.light.primary,
  [TIMELINE_CHIP_VARIANT.LEARNED]: BADGE.variant.light.feature,
}

// ─── Estilos de acento ────────────────────────────────────────────────────────

/** Línea vertical de acento `information` que conecta los ítems del timeline. */
const ACCENT_LINE_CLASS = cn(
  LAYOUT.divider.vertical,
  'bg-information-base relative'
)

/**
 * Dot de acento centrado sobre la línea vertical.
 * El offset `top-5.5` en `md` compensa la mayor altura del encabezado.
 */
const ACCENT_DOT_CLASS = cn(
  BADGE.special.dot,
  BADGE.special.dotSize.md,
  'bg-information-base absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-5 md:top-5.5'
)

// ─── Props ────────────────────────────────────────────────────────────────────

/** `className` opcional para ajuste puntual del `<li>` contenedor. */
type TimelineItemProps = TimelineItemData & { className?: string }

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * @module shared/components/TimelineItem/TimelineItem
 *
 * Ítem de timeline (experiencia laboral o formación académica).
 *
 * Layout de dos columnas:
 * - **sm+** — `[80px | dot | contenido]`: fecha a la izquierda, línea de acento con dot, cuerpo.
 * - **&lt; sm** — `[dot | contenido]`: la fecha se mueve dentro del cuerpo, debajo de la empresa.
 *
 * **`<time>` duplicado**: el mismo texto `period` se muestra dos veces (solo una visible por breakpoint).
 * Opcionalmente `periodStartDatetime` / `periodEndDatetime` establecen **el mismo**
 * `dateTime={start/end}` en ambos elementos.
 *
 * @example
 * ```tsx
 * import { SKILL_LABEL } from '@/shared/constants/skills/skillLabels'
 * import { TimelineItem } from '@/shared/components/primitives/TimelineItem'
 * import { TIMELINE_CHIP } from '@/shared/components/primitives/TimelineItem/constants'
 *
 * <TimelineItem
 *   period="Sep 2024 – Feb 2026"
 *   periodStartDatetime="2024-09-01"
 *   periodEndDatetime="2026-02-28"
 *   heading={SITE_PROFILE.role}
 *   company="B Life · Puebla, MX"
 *   modalidad="Presencial"
 *   description="Trabajo en productos web e-commerce."
 *   chips={[
 *     TIMELINE_CHIP.technology('E-commerce'),
 *     TIMELINE_CHIP.impactMetric('−50% tiempo de carga'),
 *     TIMELINE_CHIP.applied(SKILL_LABEL.REACT),
 *     TIMELINE_CHIP.learned(SKILL_LABEL.TYPESCRIPT),
 *   ]}
 * />
 * ```
 */
export function TimelineItem({
  period,
  periodStartDatetime,
  periodEndDatetime,
  heading,
  company,
  modalidad,
  description,
  chips,
  className,
}: TimelineItemProps) {
  const { orderedChips, hasChips, periodTimeProps } = useTimelineItem({
    chips,
    periodStartDatetime,
    periodEndDatetime,
  })

  return (
    <li
      className={cn(
        'grid grid-cols-[auto_1fr] gap-4 sm:grid-cols-[80px_auto_1fr] md:gap-5',
        className
      )}
    >
      {/* Fecha — visible solo en sm+ (en móvil se repite dentro del cuerpo) */}
      <time
        className={cn(
          TYPOGRAPHY.paragraph.small,
          'hidden pt-3 font-mono sm:block'
        )}
        {...periodTimeProps}
      >
        {period}
      </time>

      {/* Línea + dot de acento (decorativo — fechas en <time>; oculto a tecnologías asistivas) */}
      <div className={ACCENT_LINE_CLASS} aria-hidden="true">
        <span className={ACCENT_DOT_CLASS} />
      </div>

      {/* Cuerpo del ítem */}
      <div className="pt-2 pb-4">
        <h4 className={cn(TYPOGRAPHY.title.small, 'mb-1.5')}>{heading}</h4>
        <p
          className={cn(
            TYPOGRAPHY.title.xsmall,
            'text-information-base font-mono sm:mb-2'
          )}
        >
          <span>{company}</span>
          {modalidad !== undefined ? (
            <>
              <span aria-hidden="true"> · </span>
              <span className="text-text-subtle font-normal">{modalidad}</span>
            </>
          ) : null}
        </p>

        {/* Fecha — visible solo debajo del breakpoint sm (ver nota en JSDoc) */}
        <time
          className={cn(TYPOGRAPHY.paragraph.small, 'font-mono sm:hidden')}
          {...periodTimeProps}
        >
          {period}
        </time>

        <p
          className={cn(TYPOGRAPHY.paragraph.secondary, 'mt-2 mb-2.5 sm:mt-0')}
        >
          {description}
        </p>

        {hasChips && (
          <div className={BADGE.group.horizontal}>
            {orderedChips.map((chip) => (
              <span
                key={`${chip.variant}__${chip.label}`}
                className={CHIP_BADGE_CLASS[chip.variant]}
              >
                {chip.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}
