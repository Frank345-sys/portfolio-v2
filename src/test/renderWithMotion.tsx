import { render, type RenderOptions } from '@testing-library/react'
import { LazyMotion, domAnimation } from 'motion/react'
import type { ReactElement, ReactNode } from 'react'

/**
 * `render` de Testing Library envuelto en LazyMotion (misma configuración que App).
 */
export function renderWithMotion(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    ...options,
    wrapper: ({ children }: { children: ReactNode }) => (
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    ),
  })
}
