import { motion } from 'motion/react'
import { useTheme } from '@/shared/components/ThemeToggle/hooks/useTheme'
import { LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

const TOGGLE_SPRING = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 28,
}
/**
 * Control para alternar entre tema claro y oscuro. Usa un botón tipo switch
 * con animación de layout (Motion) y sincroniza con useTheme.
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
    <div className={LAYOUT.flex.inlineToggle}>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Alternar tema claro u oscuro"
        onClick={toggle}
        className={cn(
          'flex h-5 w-9 shrink-0 rounded-full p-0.5',
          'focus-visible:ring-information-base focus-visible:ring-offset-bg-weak focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          isDark
            ? 'bg-information-light justify-start'
            : 'bg-stroke-strong/20 justify-end',
          'cursor-pointer'
        )}
      >
        <motion.div
          layout
          transition={TOGGLE_SPRING}
          className={cn(
            'h-4 w-4 shrink-0 rounded-full',
            isDark
              ? 'bg-information-base shadow-elevation-sm'
              : 'shadow-elevation-sm bg-white'
          )}
        />
      </button>

      <span
        className={cn(TYPOGRAPHY.paragraph.small, 'text-subtle font-medium')}
      >
        {isDark ? 'Dark mode' : 'Light mode'}
      </span>
    </div>
  )
}
