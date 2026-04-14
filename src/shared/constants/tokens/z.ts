/**
 * Escala de z-index semántica — niveles de apilamiento ordenados.
 *
 * Centraliza todos los valores de z-index del sistema. No usar clases
 * `z-*` sueltas en componentes — referenciar siempre este token.
 *
 * La escala es incremental y no deja huecos entre niveles adyacentes
 * con propósito semántico distinto, para que la jerarquía visual sea
 * predecible en cualquier combinación de overlays activos.
 *
 * @example
 * ```tsx
 * <div className={Z.modal}>...</div>
 * <nav className={Z.header}>...</nav>
 * ```
 */
export const Z = {
  /**
   * @use Fondo base — elementos sin apilamiento especial.
   *      Equivale a `z-index: 0`.
   */
  base: 'z-0',

  /**
   * @use Cards en hover, elementos que se elevan al interactuar.
   *      Equivale a `z-index: 10`.
   * @combine ANIMATION.hover.lift — para cards que suben visualmente.
   */
  raised: 'z-10',

  /**
   * @use Dropdowns, tooltips, menús contextuales — sobre el contenido pero bajo drawers.
   *      Equivale a `z-index: 20`.
   * @combine CARD.overlay.panel cuando el contexto lo requiere.
   */
  dropdown: 'z-20',

  /**
   * @use Drawers, sidebars deslizables, paneles laterales.
   *      Equivale a `z-index: 30`.
   * @combine CARD.overlay.panel — siempre gestionar z-index desde aquí.
   */
  drawer: 'z-30',

  /**
   * @use Backdrop de modales — overlay semitransparente que queda justo debajo del modal.
   *      Equivale a `z-index: 40`.
   * @combine Z.modal — siempre usar junto al modal que cubre.
   */
  backdrop: 'z-40',

  /**
   * @use Modales, diálogos, overlays de pantalla completa.
   *      Equivale a `z-index: 50`.
   * @combine CARD.overlay.modal — siempre gestionar z-index desde aquí.
   * @combine Z.backdrop — usar para el overlay semitransparente debajo del modal.
   */
  modal: 'z-50',

  /**
   * @use Navbar u header fijo — siempre visible sobre el contenido de página.
   *      Equivale a `z-index: 60`.
   * @combine Clases de layout del `<header>` en el componente — no hay token `LAYOUT.header.*`.
   * @warning No superar este nivel salvo para drawerElevated y toasts.
   */
  header: 'z-60',

  /**
   * @use Drawer que debe cubrir el header fijo — exclusivo para navegación mobile.
   *      Equivale a `z-index: 70`.
   * @warning Usar exclusivamente para drawers de navegación que deben superar el header.
   *          Para overlays genéricos usar Z.modal. Para toasts usar Z.toast.
   * @combine Overlay + panel del drawer — ambos deben usar este token.
   */
  drawerElevated: 'z-70',

  /**
   * @use Notificaciones toast y snackbars — deben aparecer sobre cualquier overlay activo.
   *      Equivale a `z-index: 80`.
   * @warning Nivel máximo del sistema — no añadir elementos por encima de este valor.
   */
  toast: 'z-80',
} as const

export type ZKey = keyof typeof Z
export type ZValue = (typeof Z)[ZKey]
