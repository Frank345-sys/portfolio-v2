import { cn } from '@/shared/utils/cn'
import { TYPOGRAPHY, LAYOUT, BADGE } from '@/shared/constants/tokens'
import {
  TIMELINE_CHIP_VARIANT,
  type TimelineChipVariant,
} from '@/shared/constants/enums'
import { BadgeRow } from '@/shared/components/BadgeRow'

export interface TimelineChip {
  /** Texto del chip (tecnología, métrica, etc.). */
  label: string
  /** Variante semántica que define color del badge. */
  variant: TimelineChipVariant
}

/**
 * Props para renderizar un ítem de experiencia o formación en formato timeline.
 */
export interface TimelineItemProps {
  /** Rango de fechas (ej. "Sep 2024 → Feb 2026") */
  period: string
  /** Título del puesto o formación (se muestra en el encabezado del ítem) */
  heading: string
  /** Empresa o institución; se muestra con el color de acento */
  company: string
  /** Descripción del puesto o formación */
  description: string
  /** Chips con variante semántica (opcional) */
  chips?: TimelineChip[]
  /**
   * Acento visual para el dot y la empresa.
   * - **information**: azul (experiencia laboral)
   * - **feature**: violeta (formación académica)
   */
  accent?: 'information' | 'feature'
  /** Clase adicional para el contenedor */
  className?: string
}

const CHIP_VARIANT_MAP = {
  [TIMELINE_CHIP_VARIANT.TECHNOLOGY]: BADGE.variant.neutral,
  [TIMELINE_CHIP_VARIANT.IMPACT_METRIC]: BADGE.variant.success,
  [TIMELINE_CHIP_VARIANT.LEARNED]: BADGE.variant.primary,
  [TIMELINE_CHIP_VARIANT.ACADEMIC]: BADGE.variant.feature,
} as const

/**
 * Ítem reutilizable de timeline (experiencia laboral o formación académica).
 * Dos columnas: fechas a la izquierda, dot de acento, y contenido (rol, empresa, descripción, chips) a la derecha.
 * Los chips usan colores semánticos según su variante.
 *
 * @example
 * ```tsx
 * // Experiencia laboral (acento azul)
 * <TimelineItem
 *   period="Sep 2024 → Feb 2026"
 *   heading={puestoEnEmpresa} (p. ej. el rol en `SITE_PROFILE` si coincide)
 *   company="B Life · Puebla, MX"
 *   description="..."
 *   chips={[
 *     { label: 'E-commerce', variant: 'technology' },
 *     { label: '−50% tiempo de carga', variant: 'impactMetric' },
 *     { label: 'React.js', variant: 'learned' },
 *   ]}
 *   accent="information"
 * />
 *
 * // Formación académica (acento violeta)
 * <TimelineItem
 *   period="Ago 2018 → Ene 2022"
 *   heading="Ingeniería en Sistemas"
 *   company="ITSX"
 *   description="..."
 *   chips={[{ label: 'Java', variant: 'academic' }, ...]}
 *   accent="feature"
 * />
 * ```
 */
export function TimelineItem({
  period,
  heading,
  company,
  description,
  chips,
  accent = 'information',
  className,
}: TimelineItemProps) {
  const accentLine = cn(
    'relative',
    LAYOUT.divider.vertical,
    accent === 'information' && 'bg-information-base',
    accent === 'feature' && 'bg-feature-base'
  )
  const accentDot = cn(
    'absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-5.5 md:top-5.5',
    BADGE.special.dot,
    BADGE.special.dotSize.md,
    accent === 'information' ? 'bg-information-base' : 'bg-feature-base'
  )
  const accentCompany =
    accent === 'information' ? 'text-information-base' : 'text-feature-base'

  return (
    <li
      className={cn(
        'grid grid-cols-[auto_1fr] gap-4 sm:grid-cols-[80px_auto_1fr] md:gap-5',
        className
      )}
    >
      <time
        className={cn(
          TYPOGRAPHY.paragraph.small,
          'hidden pt-2.5 font-mono sm:block'
        )}
      >
        {period}
      </time>
      <div className={accentLine}>
        <span className={accentDot} aria-hidden />
      </div>
      <div className="pt-2 pb-4">
        <h4 className={cn(TYPOGRAPHY.title.small, 'mb-1.5')}>{heading}</h4>
        <p
          className={cn(
            TYPOGRAPHY.title.xsmall,
            'font-mono sm:mb-2',
            accentCompany
          )}
        >
          {company}
        </p>
        <time className={cn(TYPOGRAPHY.paragraph.small, 'font-mono sm:hidden')}>
          {period}
        </time>
        <p
          className={cn(TYPOGRAPHY.paragraph.secondary, 'mt-2 mb-2.5 sm:mt-0')}
        >
          {description}
        </p>
        {chips != null && chips.length > 0 && (
          <BadgeRow
            items={chips.map((chip) => ({
              label: chip.label,
              variantClassName: CHIP_VARIANT_MAP[chip.variant],
            }))}
          />
        )}
      </div>
    </li>
  )
}
