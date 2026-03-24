/**
 * Escala de z-index semántica — 7 niveles de apilamiento.
 *
 * Centraliza todos los valores de z-index del sistema. No usar clases
 * `z-*` arbitrarias en componentes — referenciar siempre este token.
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
   * @use Modales, diálogos, overlays de pantalla completa.
   *      Equivale a `z-index: 40`.
   * @combine CARD.overlay.modal — siempre gestionar z-index desde aquí.
   * @warning El backdrop del modal debe ir en `z-[39]` para quedar justo debajo.
   */
  modal: 'z-40',

  /**
   * @use Navbar fija — siempre visible sobre todo el contenido de página.
   *      Equivale a `z-index: 50`.
   * @combine LAYOUT.header.bar y LAYOUT.header.sticky — ya usan z-50 internamente.
   * @warning No superar este nivel salvo para toasts — el header es el techo de la UI estática.
   */
  header: 'z-50',

  /**
   * @use Notificaciones toast y snackbars — deben aparecer sobre cualquier overlay activo.
   *      Equivale a `z-index: 60`.
   * @warning Nivel máximo del sistema — no añadir elementos por encima de este valor.
   */
  toast: 'z-[60]',
} as const

export type ZKey = keyof typeof Z
