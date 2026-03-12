import { ANIMATION } from './animation'

/**
 * Tokens para inputs, textareas, labels y grupos de formularios.
 *
 * @example
 * ```tsx
 * <input className={INPUT.base.default} />
 * <label className={INPUT.label.default}>Email</label>
 * ```
 */
export const INPUT = {
  base: {
    default: `w-full rounded-lg border border-stroke-soft bg-surface px-3 py-2 text-sm text-subtle placeholder:text-soft ${ANIMATION.transition.default} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-information-base focus-visible:ring-offset-2 focus-visible:ring-offset-bg-weak disabled:cursor-not-allowed disabled:opacity-50`,

    textarea: `w-full min-h-[120px] rounded-lg border border-stroke-soft bg-surface px-3 py-2 text-sm text-subtle placeholder:text-soft align-top ${ANIMATION.transition.default} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-information-base focus-visible:ring-offset-2 focus-visible:ring-offset-bg-weak disabled:cursor-not-allowed disabled:opacity-50`,
  },

  label: {
    default: 'block text-sm font-medium text-subtle',
    required:
      "block text-sm font-medium text-subtle after:ml-0.5 after:text-error-base after:content-['*']",
  },

  helper: {
    default: 'mt-1 text-xs text-soft',
  },

  group: {
    vertical: 'flex flex-col gap-1.5',
  },
} as const
