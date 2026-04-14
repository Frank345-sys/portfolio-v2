import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/** Props de `SmoothScrollRoot`. */
interface SmoothScrollRootProps {
  /** Contenido de la app envuelto por Lenis cuando el motion reducido no está activo. */
  children: ReactNode
}

/**
 * Scroll con inercia (Lenis) en el viewport raíz. No sustituye al patrón
 * `useScroll` + `useSpring` de Motion: ese suaviza valores derivados (0–1) para
 * animaciones, no el desplazamiento nativo.
 *
 * Con `prefers-reduced-motion: reduce` se omite Lenis y se mantiene el scroll
 * del navegador (coherente con {@link MotionConfig} en App).
 */
export function SmoothScrollRoot({ children }: SmoothScrollRootProps) {
  const prefersReducedMotion = useReducedMotion()

  // useReducedMotion puede ser null (p. ej. antes de hidratar). Solo omitimos Lenis
  // cuando el valor es explícitamente true. Con null priorizamos la experiencia con
  // scroll suave; no cambiar a `if (prefersReducedMotion)` sin acordar el trade-off.
  if (prefersReducedMotion === true) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      options={{
        // autoRaf: Lenis gestiona su propio RAF; con StrictMode en dev los efectos se
        // montan dos veces y aquí sigue siendo seguro. Si se añaden useEffect que
        // toquen la instancia de Lenis, revisar doble invocación en desarrollo.
        autoRaf: true,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
