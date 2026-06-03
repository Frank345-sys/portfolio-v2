/**
 * Datos estáticos, copy y claves usados por el submódulo «MobileDrawer».
 *
 * @fileoverview Centraliza valores importados por componentes colindantes; evita cadenas mágicas en el JSX.
 * @remarks Los cambios de texto o `href` suelen requerir actualizar tests que fijen el contrato de la sección.
 */

export {
  DEFAULT_NAV_ITEMS,
  HEADER_DRAWER_NAV_ARIA_LABEL,
  SECTION_ANCHOR_ID,
  SITE_DISPLAY_NAME,
  HEADER_MOBILE_DRAWER_PANEL_ID,
  sectionHref,
} from '../../constants/navigation'

import type { Variants } from 'motion/react'

/** Variantes Motion del panel: entra/sale desde la derecha (`x: 100%`) con spring. Consumida exclusivamente por {@link DRAWER_SLIDE}. */
const drawerSlideVariants: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30, duration: 0.3 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30, duration: 0.3 },
  },
}

/**
 * Entrada/salida del panel móvil desde la derecha (`AnimatePresence`).
 * Uso: `<m.div {...DRAWER_SLIDE} />` o `const { variants, initial } = DRAWER_SLIDE`.
 *
 * **`as const` + `satisfies`** — los literales (`hidden` \| `visible` \| `exit`) encajan con las keys de variants.
 */
export const DRAWER_SLIDE = {
  variants: drawerSlideVariants,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
} as const satisfies {
  readonly variants: Variants
  readonly initial: 'hidden'
  readonly animate: 'visible'
  readonly exit: 'exit'
}
