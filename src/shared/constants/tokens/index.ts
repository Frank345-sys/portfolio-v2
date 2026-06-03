/**
 * Design Tokens — re-exports centralizados.
 *
 * Importar desde `\@/shared/constants/tokens` (no desde archivos individuales).
 *
 * Cada `tokens/*.ts` indica en su cabecera el **orden de secciones** del archivo
 * (imports → piezas internas → export) para mantener el mismo criterio entre módulos.
 *
 * @example
 * ```tsx
 * import { TYPOGRAPHY, LAYOUT, BUTTON, CARD, Z } from '@/shared/constants/tokens'
 * ```
 *
 * @module shared/constants/tokens
 * @remarks Importar desde este barrel: `import { … } from '@/shared/constants/tokens'`.
 */

export { ANIMATION } from './animation'
export { BADGE } from './badge'
export { BUTTON, type ButtonVariantMode } from './button'
export { CARD } from './card'
export { LAYOUT } from './layout'
export { TYPOGRAPHY } from './typography'
export { Z } from './z'
