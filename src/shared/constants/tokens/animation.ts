/**
 * Constantes compartidas del proyecto (`shared/constants/tokens/animation.ts`).
 *
 * @fileoverview Catálogo importado por secciones y utilidades; cambios globales de marca o layout.
 * @remarks Coordinar con tokens en `shared/constants/tokens` y con el sistema de temas si toca color o tipografía.
 */

import { cn } from '@/shared/utils/cn'

// ─────────────────────────────────────────────────────────────────────────────
// Fragmentos internos (no exportar)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Transiciones base usadas para componer `hover.*`.
 * Se definen aquí para evitar dependencia circular con `ANIMATION.transition.*`.
 *
 * @internal
 */
const _hoverTransition = {
  transform: 'transition-transform duration-300',
  all: 'transition-all duration-300',
  shadow: 'transition-shadow duration-300',
} as const

// ─────────────────────────────────────────────────────────────────────────────
// Export principal
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tokens de animación **solo con clases CSS (Tailwind)** — patrones simples y homogéneos
 * para que duraciones, easings y efectos comunes no improvisen en cada componente.
 *
 * **Motion for React** (`motion/react`) cubre lo complejo: entrances compuestas, stagger en
 * listas largas, gestures, `layout`, orquestación entre hijos, etc. Ahí no hay que replicar
 * esos casos como nuevos valores en este archivo; estos tokens sirven cuando basta una
 * transición única o un efecto repetible en todo el sistema.
 *
 * **Contenido:** transiciones, hover, fade, bounce, spin, pulse, scroll (clases de apoyo)
 * y loading (spinner + skeletons en `index.css`).
 *
 * **Orden en este archivo:** constantes internas → {@link ANIMATION}
 * (`transition` → `hover` → entradas/salida → `loading`).
 *
 * @use Importar el token concreto — no usar el objeto completo.
 * Cada categoría es autónoma; no mezclar dos `transition.*` en el mismo nodo.
 *
 * @example
 * ```tsx
 * <div className={ANIMATION.transition.default}>...</div>
 * <div className={ANIMATION.hover.lift}>...</div>
 * ```
 */
export const ANIMATION = {
  // ── Transiciones ──────────────────────────────────────────────────────────
  // Controlan duration y easing. Usar una sola variante por elemento —
  // combinar dos tokens transition.* en className genera conflicto de transition-property.
  //
  // Para varias propiedades a la vez (p. ej. sombra + borde) sin nuevos tokens: una sola
  // clase arbitraria de Tailwind alineada al timing del sistema, p. ej.
  // `transition-[box-shadow,border-color] duration-300 ease-in-out` (mismo duration/ease
  // que transition.shadow / transition.colors). En nodos con Motion, listar solo
  // propiedades que no anima Motion (evitar incluir opacity ni transform si Motion las usa).
  transition: {
    /** @use Feedback inmediato: toggles, checkboxes, switches. */
    fast: 'transition-all duration-150 ease-in-out',

    /** @use Uso general — la mayoría de los elementos interactivos. */
    default: 'transition-all duration-300 ease-in-out',

    /** @use Entradas de página, modales, drawers. */
    slow: 'transition-all duration-500 ease-in-out',

    /**
     * @use Hover de texto, iconos y bordes — cuando solo cambia el color.
     * @nocombine transition.default / transition.fast (conflicto en transition-property)
     */
    colors: 'transition-colors duration-300 ease-in-out',

    /**
     * @use Fades y tooltips — cuando solo cambia la opacidad.
     * @nocombine transition.default / transition.fast (conflicto en transition-property)
     */
    opacity: 'transition-opacity duration-300 ease-in-out',

    /**
     * @use Slides y scales — cuando solo cambia el transform.
     * @nocombine transition.default / transition.fast (conflicto en transition-property)
     */
    transform: 'transition-transform duration-300 ease-in-out',

    /**
     * @use Elevación animada — cuando solo cambia la sombra (hover de cards, focus de inputs).
     * @nocombine transition.default / transition.fast (conflicto en transition-property)
     * @combine Clase `shadow-elevation-*` para el valor de sombra en reposo y hover.
     *
     * @example
     * ```tsx
     * <div className={cn('shadow-elevation-sm', 'hover:shadow-elevation-lg', ANIMATION.transition.shadow)}>
     * ```
     */
    shadow: 'transition-shadow duration-300 ease-in-out',
  },

  // ── Hover ─────────────────────────────────────────────────────────────────
  // Ya incluyen su propia transición — no combinar con ANIMATION.transition.*
  hover: {
    /**
     * @use Cards clickeables, avatares, thumbnails.
     * @nocombine ANIMATION.transition.* (ya incluye transition-transform)
     */
    scale: cn('hover:scale-105', _hoverTransition.transform),

    /**
     * @use Cards con énfasis fuerte — el elemento sube visualmente al hacer hover.
     * @nocombine ANIMATION.transition.* (ya incluye transition-all)
     */
    lift: cn(
      'hover:shadow-elevation-lg hover:-translate-y-1',
      _hoverTransition.all
    ),

    /**
     * @use Elementos con foco especial — añade glow de color information al hover.
     * @nocombine ANIMATION.transition.* (ya incluye transition-shadow)
     * @warning Solo visible sobre fondos claros — el glow pierde contraste en dark mode.
     */
    glow: cn(
      'hover:shadow-elevation-lg hover:shadow-information-lighter',
      _hoverTransition.shadow
    ),

    /**
     * @use Links en párrafos o nav items con underline animado al hover.
     * @nocombine ANIMATION.transition.* (ya incluye after:transition-all)
     * @warning Requiere `position: relative` en el elemento padre si no está ya presente.
     */
    underline:
      'relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-information-base after:transition-all after:duration-300 hover:after:w-full',
  },

  // ── Fade ──────────────────────────────────────────────────────────────────
  // Requiere tailwindcss-animate. Usar una sola variante — no combinar entre sí.
  fade: {
    /** @use Aparición simple sin dirección — tooltips, popovers. */
    in: 'animate-in fade-in duration-700',

    /** @use Contenido que desciende al entrar — dropdowns, notificaciones desde arriba. */
    inFromTop: 'animate-in fade-in slide-in-from-top-4 duration-700',

    /** @use Contenido que sube al entrar — modales, bottom sheets. */
    inFromBottom: 'animate-in fade-in slide-in-from-bottom-4 duration-700',

    /** @use Contenido que entra desde la izquierda — sidebars, drawers izquierdos. */
    inFromLeft: 'animate-in fade-in slide-in-from-left-4 duration-700',

    /** @use Contenido que entra desde la derecha — drawers derechos, paneles. */
    inFromRight: 'animate-in fade-in slide-in-from-right-4 duration-700',

    /** @use Salida genérica — combinar con fade.in* para ciclos entrada/salida. */
    out: 'animate-out fade-out duration-300',
  },

  bounce: {
    /** @use Indicadores de atención que necesitan llamar al usuario — badges, dots de notificación. */
    default: 'animate-bounce',
  },

  spin: {
    /** @use Spinners de carga activa — usar dentro de un elemento con dimensiones fijas. */
    continuous: 'animate-spin',
  },

  pulse: {
    /** @use Estado de espera genérico — pulsación uniforme — distinto de `loading.skeletonPulse` (CSS tema). */
    continuous: 'animate-pulse',

    /** @use Elementos que refuerzan su presencia solo al interactuar con ellos. */
    onHover: 'hover:animate-pulse',
  },

  // ── Scroll ────────────────────────────────────────────────────────────────
  // Requiere Intersection Observer para funcionar.
  // `reveal` es el estado inicial; `visible` se aplica por JS al entrar al viewport.
  scroll: {
    /**
     * @use Estado inicial del elemento antes de entrar al viewport.
     *      Aplicar en el markup — el elemento arranca invisible y desplazado.
     * @combine ANIMATION.scroll.visible — añadir con JS al detectar entrada.
     * @warning Sin Intersection Observer el elemento permanece invisible.
     *
     * @example
     * ```tsx
     * // En el observer callback:
     * entry.target.classList.add(...ANIMATION.scroll.visible.split(' '))
     * ```
     */
    reveal: 'opacity-0 translate-y-8 transition-all duration-700',

    /**
     * @use Clases que se añaden por JS cuando el elemento entra al viewport.
     * @combine ANIMATION.scroll.reveal — siempre va junto a reveal.
     */
    visible: 'opacity-100 translate-y-0',
  },

  loading: {
    /**
     * @use Placeholder — gradiente barrido (`.u-app-skeleton` en `index.css`).
     * @combine Dimensiones explícitas via `cn()`: `cn(ANIMATION.loading.skeleton, 'h-4 w-full max-w-48')`
     */
    skeleton: 'u-app-skeleton rounded-md',

    /**
     * @use Placeholder — pulso de opacidad sobre `bg-soft` (`.u-app-skeleton-pulse` en `index.css`).
     * @combine Dimensiones explícitas via `cn()` como `loading.skeleton`.
     */
    skeletonPulse: 'u-app-skeleton-pulse rounded-md',

    /**
     * @use Indicador de proceso en curso — spinner circular.
     * @combine Dimensiones explícitas via `cn()`: `cn(ANIMATION.loading.spinner, 'h-5 w-5')`
     */
    spinner:
      'animate-spin rounded-full border-2 border-stroke-soft border-t-information-base',
  },
} as const
