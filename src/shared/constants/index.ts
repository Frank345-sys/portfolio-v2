/**
 * Sistema de Design Tokens para Landing Pages
 *
 * Uso:
 * import { TYPOGRAPHY, LAYOUT, BUTTON } from '@/styles/tokens'
 *
 * <h1 className={TYPOGRAPHY.title.hero}>Hero Title</h1>
 * <div className={LAYOUT.container.full}>...</div>
 * <button className={`${BUTTON.base.default} ${BUTTON.variant.primary} ${BUTTON.size.lg}`}>
 *   Click me
 * </button>
 */

export * from './typography'
export * from './layout'
export * from './button'
export * from './badge'
export * from './animation'
export * from './input'

// Re-exportar todo junto para importaciones más limpias
export { TYPOGRAPHY } from './typography'
export { LAYOUT } from './layout'
export { BUTTON } from './button'
export { BADGE } from './badge'
export { ANIMATION } from './animation'
export { INPUT } from './input'
