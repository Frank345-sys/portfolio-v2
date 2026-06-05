/**
 * Pieza de interfaz del portfolio (`SiteLogo`).
 *
 * @fileoverview Implementación del archivo `SiteLogo.tsx` dentro de `shared/components/SiteLogo`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */

import {
  SECTION_ANCHOR_ID,
  sectionHref,
} from '@/shared/constants/sectionAnchors'
import { SITE_DISPLAY_NAME } from '@/shared/constants/siteProfile/siteProfile'
import { ANIMATION, TYPOGRAPHY } from '@/shared/constants/tokens'
import { CodeIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

/** Tamaño del `CodeIcon` junto al nombre (cabecera / drawer / pie). */
const SITE_LOGO_ICON_CLASS = 'h-7 w-7 md:h-10 md:w-10' as const

/** Clases base del `<a>` de marca: foco visible y fila ícono + nombre. */
const SITE_LOGO_LINK_DEFAULT =
  'focus-visible:ring-information-base flex w-fit shrink-0 items-center gap-2 rounded-md no-underline outline-none focus-visible:ring-2 focus-visible:ring-offset-2' as const

/** Tipografía por defecto del nombre junto al ícono (cabecera / drawer). */
const SITE_LOGO_NAME_CLASS = cn(TYPOGRAPHY.label.default, 'tracking-tight')

interface SiteLogoProps {
  /** Texto junto al ícono; por defecto `SITE_DISPLAY_NAME` (`siteProfile`). */
  displayName?: string | undefined
  /** Clases del `<a>`; por defecto foco + layout de marca (cabecera / drawer). */
  linkClassName?: string
  /** Clases del `<span>` del nombre; por defecto tipografía de cabecera. */
  nameClassName?: string
  /**
   * Se llama al activar el enlace (p. ej. cerrar el drawer móvil tras navegar).
   * No sustituye la navegación por ancla; solo efectos colaterales.
   */
  onNavigate?: () => void
  /**
   * Si se indica, se asigna al `<span>` del nombre (p. ej. `aria-labelledby` del diálogo
   * del drawer móvil).
   */
  nameSpanId?: string
}

/**
 * @module shared/components/SiteLogo/SiteLogo
 *
 * Marca del sitio: enlace al inicio, ícono y nombre (header, drawer, footer).
 */
export function SiteLogo({
  displayName = SITE_DISPLAY_NAME,
  linkClassName = SITE_LOGO_LINK_DEFAULT,
  nameClassName = SITE_LOGO_NAME_CLASS,
  onNavigate,
  nameSpanId,
}: SiteLogoProps) {
  return (
    <a
      href={sectionHref(SECTION_ANCHOR_ID.inicio)}
      className={cn(
        'hover:text-text-strong',
        ANIMATION.transition.colors,
        linkClassName
      )}
      aria-label={`Ir al inicio: ${displayName}`}
      onClick={onNavigate}
    >
      <CodeIcon aria-hidden="true" className={SITE_LOGO_ICON_CLASS} />
      <span id={nameSpanId} className={nameClassName}>
        {displayName}
      </span>
    </a>
  )
}
