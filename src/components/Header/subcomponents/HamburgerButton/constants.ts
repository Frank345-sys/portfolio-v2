/**
 * Datos estáticos, copy y claves usados por el submódulo «HamburgerButton».
 *
 * @fileoverview Define variants de animación Motion (`hamburgerBarTopVariants`,
 * `hamburgerBarMidVariants`, `hamburgerBarBottomVariants`) y re-exporta
 * `HEADER_MOBILE_DRAWER_PANEL_ID` para co-localizar dependencias del submódulo.
 * @remarks Sin lógica ni efectos — solo constantes declarativas. Los valores
 * numéricos (`y`, `rotate`) deben coincidir con el diseño del ícono; cambiarlos
 * rompe la ilusión de «X» y requiere ajustar los tests de snapshot del botón.
 */

/** Re-export de `../../constants/navigation` — co-localiza la dependencia de `HamburgerButton` sin importar desde el módulo raíz. */
export { HEADER_MOBILE_DRAWER_PANEL_ID } from '../../constants/navigation'

import type { Variants } from 'motion/react'

/** Línea superior: en `open` rota 45° y baja 6 px — forma la diagonal izquierda de la «X» de cierre. */
export const hamburgerBarTopVariants: Variants = {
  open: { rotate: 45, y: 6 },
  closed: { rotate: 0, y: 0 },
}

/** Línea media: en `open` desaparece con fade y colapsa horizontalmente — elimina la barra central. */
export const hamburgerBarMidVariants: Variants = {
  open: { opacity: 0, scaleX: 0 },
  closed: { opacity: 1, scaleX: 1 },
}

/** Línea inferior: en `open` rota -45° y sube 6 px — forma la diagonal derecha de la «X» de cierre. */
export const hamburgerBarBottomVariants: Variants = {
  open: { rotate: -45, y: -6 },
  closed: { rotate: 0, y: 0 },
}
