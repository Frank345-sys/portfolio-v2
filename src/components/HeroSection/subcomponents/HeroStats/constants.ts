/**
 * Constantes del bloque {@link HeroStats}.
 *
 * @fileoverview Estadísticas de impacto mostradas bajo el CTA del hero.
 * @remarks Mantener en sync con tests que validan etiquetas visibles.
 */

/** Estadísticas de impacto bajo el CTA. */
export const HERO_STATS = [
  { value: '+2', label: 'Años en frontend' },
  { value: '+5', label: 'Casos en portfolio' },
  { value: '+14', label: 'Herramientas y prácticas' },
] as const
