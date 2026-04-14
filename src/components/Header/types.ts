/**
 * Tipos compartidos del módulo Header (p. ej. ítems de navegación).
 *
 * @module components/Header/types
 */

/**
 * Un ítem de la barra de navegación (desktop y drawer).
 */
export interface NavItem {
  /**
   * Destino del enlace. Para el **scroll-spy** debe ser ancla interna `#id` donde
   * `id` (sin `#`) coincide con el atributo `id` de la sección en el documento
   * (p. ej. `#sobre-mi` ↔ `<section id="sobre-mi">`). Otros formatos se ignoran
   * en el scroll-spy (`useNavScrollSpy`).
   */
  href: string
  /** Texto visible del enlace. */
  label: string
}
