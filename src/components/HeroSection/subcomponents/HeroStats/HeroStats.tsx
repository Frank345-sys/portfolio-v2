/**
 * Pieza de interfaz del portfolio (`HeroStats`).
 *
 * @fileoverview Implementación del archivo `HeroStats.tsx` dentro de `components/HeroSection/subcomponents/HeroStats`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import { HERO_STATS } from './constants'

/**
 * @module components/HeroSection/subcomponents/HeroStats/HeroStats
 *
 * Lista de estadísticas de impacto. En **`HeroSection`**, es el **último** bloque de la columna (después de **`HeroCvCta`**).
 */
export function HeroStats() {
  return (
    <ul
      className="flex list-none flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8"
      aria-label="Estadísticas de impacto"
    >
      {HERO_STATS.map(({ value, label }) => (
        <li
          key={label}
          aria-label={`${value} ${label}`}
          className="flex flex-col items-center gap-1"
        >
          <span aria-hidden="true" className={TYPOGRAPHY.special.stat}>
            {value}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              TYPOGRAPHY.label.default,
              'text-text-strong text-center'
            )}
          >
            {label}
          </span>
        </li>
      ))}
    </ul>
  )
}
