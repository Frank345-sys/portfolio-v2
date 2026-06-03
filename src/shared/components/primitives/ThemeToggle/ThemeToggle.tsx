/**
 * Pieza de interfaz del portfolio (`ThemeToggle`).
 *
 * @fileoverview Implementación del archivo `ThemeToggle.tsx` dentro de `shared/components/ThemeToggle`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import { m, AnimatePresence } from 'motion/react'

import { useTheme } from '@/shared/components/primitives/ThemeToggle/hooks/useTheme'
import {
  MOTION_ANIMATION,
  PRESENCE_FADE_EXPRESSIVE,
} from '@/shared/constants/motionAnimations'
import { TYPOGRAPHY, BADGE } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

/** Recorrido del knob: ancho útil del track (w-9 − padding) menos el dot xl (w-4). */
const KNOB_TRAVEL_X_PX = 16 as const

/**
 * @module shared/components/ThemeToggle/ThemeToggle
 *
 * Conmutador accesible (`role="switch"`) claro/oscuro, sincronizado con `useTheme`
 * y etiqueta de modo visible. El nombre accesible del switch coincide con el texto
 * visible (WCAG 2.5.3) vía **`aria-labelledby="theme-toggle-label"`** (`id` fijo en el `span`).
 * En layout actual solo hay un **`ThemeToggle`** montado a la vez (cabecera `lg` o drawer móvil),
 * así el `id` no se duplica.
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export function ThemeToggle() {
  const { isDark, setTheme } = useTheme()

  const toggle = () => setTheme(isDark ? 'light' : 'dark')

  return (
    <div className="inline-flex items-center gap-3 select-none">
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-labelledby="theme-toggle-label"
        onClick={toggle}
        className={cn(
          'flex h-5 w-9 shrink-0 items-center rounded-full p-0.5',
          'focus-visible:ring-information-base cursor-pointer [--tw-ring-offset-color:var(--color-bg-weak)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          isDark ? 'bg-information-light' : 'bg-stroke-strong/20'
        )}
      >
        <m.div
          animate={{ x: isDark ? 0 : KNOB_TRAVEL_X_PX }}
          transition={MOTION_ANIMATION.spring.control}
          className={cn(
            BADGE.special.dot,
            BADGE.special.dotSize.xl,
            isDark ? 'bg-information-base' : 'bg-white',
            'shadow-elevation-sm'
          )}
        />
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <m.span
          id="theme-toggle-label"
          key={isDark ? 'dark' : 'light'}
          {...PRESENCE_FADE_EXPRESSIVE}
          className={cn(TYPOGRAPHY.paragraph.small, 'min-w-24 font-medium')}
        >
          {isDark ? 'Modo oscuro' : 'Modo claro'}
        </m.span>
      </AnimatePresence>
    </div>
  )
}
