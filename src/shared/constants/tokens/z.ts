/**
 * Escala de z-index semántica — niveles de apilamiento ordenados.
 *
 * Centraliza los valores de z-index del sistema donde **sí** hace falta separar
 * capas. No usar `z-*` sueltos fuera de esta escala. **No existe token para
 * `z-index: 0`** — el contenido en flujo normal no debe fijar z-index; basta
 * `isolation`,
 * `relative` o el stacking context que ya imponga el layout.
 *
 * **Jerarquía correcta:** el **header** fijo queda por **debajo** de la capa de
 * modales/drawers fullscreen (mismo `z-50` para el contenedor que envuelve velo + panel).
 * Por encima de eso solo tienen sentido los **toasts**.
 *
 * **Orden de menor a mayor:** `raised` → `dropdown` → `drawer` → `header`
 * → `backdrop` (modales/drawers fullscreen) → `toast`.
 *
 * ```tsx
 * <nav className={cn('fixed top-0 …', Z.header)}>…</nav>
 * <div className={cn('fixed inset-0 …', LAYOUT.overlay.scrim, Z.backdrop)}>
 *   … panel del modal/drawer como hijo …
 * </div>
 * ```
 *
 * @example
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.
 */
export const Z = {
  // ── Contenido y elevación ligera ──────────────────────────────────────────

  /**
   * @use Cards en hover, thumbnails, controles locales del carrusel.
   * Equivale a `z-index: 10`.
   * @combine ANIMATION.hover.lift — cards que ganan relieve al hover.
   */
  raised: 'z-10',

  /**
   * @use Menús locales, chips flotantes, UI que debe superar el bloque cercano pero no el chrome global.
   * Equivale a `z-index: 20`.
   * @warning Por debajo del header fijo; menús desplegables globales suelen ir en portal con capa mayor o con `dropdown` + contexto adecuado.
   */
  dropdown: 'z-20',

  /**
   * @use Drawers y paneles laterales que no deben tapar el header fijo.
   * Equivale a `z-index: 30`.
   * @combine CARD.overlay.panel cuando aplique.
   */
  drawer: 'z-30',

  // ── Chrome de página ──────────────────────────────────────────────────────

  /**
   * @use Header / navbar fijo — por encima del scroll del `main`, por debajo de modales.
   * Equivale a `z-index: 40`.
   */
  header: 'z-40',

  // ── Overlays de pantalla completa ─────────────────────────────────────────

  /**
   * @use Overlay fullscreen sobre el header: velo/clic-catcher, modal en portal o
   * drawer móvil (`Modal`, `MobileDrawer`). Un único wrapper fijo `z-50` con scrim +
   * panel hijo — o dos hermanos ambos `Z.backdrop` y el segundo en DOM encima del velo.
   * Equivale a `z-index: 50`.
   * @combine CARD.overlay.modal / panel del drawer dentro del mismo contexto apilado.
   */
  backdrop: 'z-50',

  /**
   * @use Toasts y snackbars — máximo nivel del sistema.
   * Equivale a `z-index: 80`.
   */
  toast: 'z-80',
} as const
