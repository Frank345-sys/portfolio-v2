/**
 * Barrel global de iconos SVG del portfolio (`CloseIcon`, `GithubIcon`, etc.).
 *
 * Estructura por categoría (sin barrels intermedios):
 * - `brands/` — tecnologías y herramientas de desarrollo
 * - `ui/` — controles y acciones
 * - `media/` — imágenes y diseño
 * - `social/` — redes y contacto
 * - `nav/` — flechas y navegación
 *
 * Convención: un componente por archivo, PascalCase + sufijo `Icon`, export nombrado,
 * props `SVGProps<SVGSVGElement>` (`className`, `color` vía `currentColor`, tamaño vía clases).
 *
 * @example
 * ```tsx
 * import { JsIcon } from '@/shared/icons'
 * <JsIcon className="size-6" aria-hidden />
 * ```
 *
 * @module shared/icons
 * @remarks Importar siempre desde este barrel: `import { … } from '@/shared/icons'`.
 */

// brands — tecnologías / SDKs
export { AiIcon } from './brands/AiIcon'
export { AstroIcon } from './brands/AstroIcon'
export { BootstrapIcon } from './brands/BootstrapIcon'
export { CssIcon } from './brands/CssIcon'
export { GitIcon } from './brands/GitIcon'
export { HtmlIcon } from './brands/HtmlIcon'
export { JsIcon } from './brands/JsIcon'
export { NextIcon } from './brands/NextIcon'
export { ReactIcon } from './brands/ReactIcon'
export { TailwindIcon } from './brands/TailwindIcon'
export { TsIcon } from './brands/TsIcon'
export { VsCodeIcon } from './brands/VsCodeIcon'

// ui — controles / acciones
export { CloseIcon } from './ui/CloseIcon'
export { CodeIcon } from './ui/CodeIcon'
export { DownloadIcon } from './ui/DownloadIcon'
export { ExpandScreenIcon } from './ui/ExpandScreenIcon'
export { HelpCircleIcon } from './ui/HelpCircleIcon'
export { RefreshIcon } from './ui/RefreshIcon'
export { SeoWebBusinessIcon } from './ui/SeoWebBusinessIcon'

// media — imágenes / display
export { FigmaIcon } from './media/FigmaIcon'
export { FramerMotionIcon } from './media/FramerMotionIcon'
export { ImageBrokenIcon } from './media/ImageBrokenIcon'

// social — redes / contacto
export { GithubIcon } from './social/GithubIcon'
export { LinkedinIcon } from './social/LinkedinIcon'
export { MailIcon } from './social/MailIcon'
export { TelegramIcon } from './social/TelegramIcon'
export { WhatsappIcon } from './social/WhatsappIcon'

// nav — flechas / navegación
export { ArrowNextIcon } from './nav/ArrowNextIcon'
export { ArrowPrevIcon } from './nav/ArrowPrevIcon'
export { ArrowUpIcon } from './nav/ArrowUpIcon'
