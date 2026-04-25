import { CodeIcon } from '@/shared/icons'
import { logoIcon, logoLink, logoText } from '../styles'

interface SiteLogoProps {
  /** Nombre del sitio junto al ícono. */
  siteName: string
  /**
   * Se llama al activar el enlace (p. ej. cerrar el drawer móvil tras navegar).
   * No sustituye la navegación por ancla; solo efectos colaterales.
   */
  onNavigate?: () => void
  /**
   * Si se indica, se asigna al `<span>` del nombre (p. ej. `mobile-menu-title`
   * para `aria-labelledby` del diálogo).
   */
  siteNameSpanId?: string
}

/**
 * Marca del sitio: enlace a `#inicio` con ícono y texto, estilos compartidos con el drawer.
 */
export function SiteLogo({
  siteName,
  onNavigate,
  siteNameSpanId,
}: SiteLogoProps) {
  return (
    <a
      href="#inicio"
      className={logoLink}
      aria-label={`Ir al inicio: ${siteName}`}
      onClick={onNavigate}
    >
      <CodeIcon aria-hidden="true" className={logoIcon} />
      <span id={siteNameSpanId} className={logoText}>
        {siteName}
      </span>
    </a>
  )
}
