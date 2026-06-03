/**
 * Tipos compartidos del módulo `Header`.
 *
 * @fileoverview Define {@link NavItem}: contrato de cada ítem de navegación usado en
 * la nav desktop, el drawer móvil y el scroll-spy.
 * @remarks Archivo de tipo único — si el módulo crece, añadir tipos aquí antes de crear un `types/` anidado.
 * El contrato de `href` para el scroll-spy está documentado en la propiedad {@link NavItem.href}.
 */

/**
 * Ítem de la barra de navegación: usado en nav desktop, drawer móvil y scroll-spy.
 * Consumido por `DEFAULT_NAV_ITEMS` en `./constants/navigation` y por las props
 * `navItems` de {@link Header} y {@link MobileDrawer}.
 */
export interface NavItem {
  /**
   * Destino del enlace. Para el **scroll-spy** debe ser ancla interna `#id` donde
   * `id` (sin `#`) coincide con el atributo `id` de la sección en el documento
   * (p. ej. `#sobre-mi` ↔ `<section id="sobre-mi">`).
   *
   * Las anclas del sitio se reexportan en `./constants/navigation.ts` como `SectionAnchorHref` /
   * `sectionHref`; la definición canónica vive en `@/shared/constants/sectionAnchors`. Cualquier otro
   * `href` es válido aquí; el scroll-spy ignora los que no sean `#fragmento`
   * (`useNavScrollSpy`).
   */
  href: string
  /** Texto visible del enlace. */
  label: string
}
