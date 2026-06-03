/**
 * Tipos TypeScript del submódulo «MobileDrawer».
 *
 * @fileoverview Contratos compartidos entre componentes, hooks y constantes del mismo directorio.
 * @remarks Mantener alineado con las props públicas re-exportadas en los `index.ts` del feature.
 */

import type { NavItem } from '@/components/Header/types'

export interface MobileDrawerProps {
  /** Cuando es true, se muestran overlay y panel (en viewport `lg+` el padre debe pasar false). */
  isOpen: boolean
  /** Cierra el drawer (backdrop, enlaces, botón cerrar, tecla Escape). */
  onClose: () => void
  /** Texto junto al logo en cabecera del panel; por defecto `SITE_DISPLAY_NAME` (`siteProfile`). */
  displayName?: string | undefined
  /** Mismos ítems que la nav desktop (`href` + `label`). */
  navItems: ReadonlyArray<NavItem>
  /** `href` de la sección visible (scroll-spy); opcional. */
  activeNavHref?: string | null
}
