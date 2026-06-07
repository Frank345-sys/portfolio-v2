/**
 * Clases Tailwind compuestas para {@link Header} y {@link MobileDrawer}.
 * El logo de marca usa `SiteLogo` en `@/shared/components/primitives/SiteLogo` — no vive aquí.
 *
 * @fileoverview Define `headerContainer` (fila principal del header) y `navLinkActive`
 * (estado activo del scroll-spy). Centraliza clases compuestas para evitar duplicación en JSX.
 * @remarks Strings literales de clases — sin lógica ni dependencias de runtime.
 * Si un estilo crece en complejidad, moverlo a un token en `@/shared/constants/tokens`.
 */

/** Fila principal del header: distribución, padding vertical. */
export const headerContainer =
  'flex items-center justify-between gap-4 py-2.5 md:py-4'

/** Estado activo del scroll-spy (misma base que `TYPOGRAPHY.link.nav`). */
export const navLinkActive = 'text-information-base font-medium'
