/**
 * Escala de sombras semánticas (elevación).
 * Variables en index.css (light + dark). Usar SHADOW.xs | .sm | .md | .lg | .xlg | .x2lg
 * en lugar de inventar valores o shadow-[...].
 *
 * @example
 * ```tsx
 * <header className={cn(LAYOUT.header.bar)} />  // bar ya lleva SHADOW.sm
 * <div className={SHADOW.lg}>card</div>
 * ```
 */
export const SHADOW = {
  /** Extra sutil: bordes suaves, inputs */
  xs: 'shadow-elevation-xs',
  /** Muy sutil: header, barras, inputs */
  sm: 'shadow-elevation-sm',
  /** Media: cards, dropdowns */
  md: 'shadow-elevation-md',
  /** Grande: modales, cajas flotantes */
  lg: 'shadow-elevation-lg',
  /** Extra grande: popovers, overlays */
  xlg: 'shadow-elevation-xlg',
  /** Máxima elevación: dialogs, flotantes destacados */
  x2lg: 'shadow-elevation-2xlg',
} as const
