/**
 * Tokens de animación: transiciones, hover, fade, slide, bounce, spin, pulse, stagger, scroll y loading.
 *
 * @use Importar el token específico que necesites — no usar el objeto completo.
 * Las categorías son independientes entre sí y no se combinan con cn().
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
  // combinar varias genera conflictos de transition-property.
  transition: {
    /** @use Feedback inmediato: toggles, checkboxes, switches. */
    fast: 'transition-all duration-150 ease-in-out',

    /** @use Uso general — la mayoría de los elementos interactivos. */
    default: 'transition-all duration-300 ease-in-out',

    /** @use Entradas de página, modales, drawers. */
    slow: 'transition-all duration-500 ease-in-out',

    /**
     * @use Hover de texto, iconos y bordes — cuando solo cambia el color.
     * @nocombine transition.default / transition.fast (conflict en transition-property)
     */
    colors: 'transition-colors duration-300 ease-in-out',

    /**
     * @use Fades y tooltips — cuando solo cambia la opacidad.
     * @nocombine transition.default / transition.fast (conflict en transition-property)
     */
    opacity: 'transition-opacity duration-300 ease-in-out',

    /**
     * @use Slides y scales — cuando solo cambia el transform.
     * @nocombine transition.default / transition.fast (conflict en transition-property)
     */
    transform: 'transition-transform duration-300 ease-in-out',

    /**
     * @use Elevación animada — cuando solo cambia la sombra (hover de cards, focus de inputs).
     * @nocombine transition.default / transition.fast (conflict en transition-property)
     * @combine Clase `shadow-elevation-*` para el valor de sombra en reposo y hover.
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
    scale: 'hover:scale-105 transition-transform duration-300',

    /**
     * @use Cards con énfasis fuerte — el elemento sube visualmente al hacer hover.
     * @nocombine ANIMATION.transition.* (ya incluye transition-all)
     */
    lift: 'hover:-translate-y-1 hover:shadow-elevation-lg transition-all duration-300',

    /**
     * @use Elementos con foco especial — añade glow de color information al hover.
     * @nocombine ANIMATION.transition.* (ya incluye transition-shadow)
     * @warning Solo visible sobre fondos claros — el glow pierde contraste en dark mode.
     */
    glow: 'hover:shadow-elevation-lg hover:shadow-information-lighter transition-shadow duration-300',

    /**
     * @use Links en párrafos o nav items con underline animado al hover.
     * @nocombine ANIMATION.transition.* (ya incluye after:transition-all)
     * @warning Requiere position:relative en el elemento padre si no está ya presente.
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

  // ── Slide ─────────────────────────────────────────────────────────────────
  // Sin fade — movimiento puro. Para movimiento + opacidad usar fade.inFrom*
  slide: {
    /**
     * @use Elementos que bajan al entrar sin desvanecer — banners, alertas top.
     * @nocombine fade.inFromTop (se solapan los efectos)
     */
    fromTop: 'animate-in slide-in-from-top-8 duration-500',

    /**
     * @use Elementos que suben al entrar sin desvanecer.
     * @nocombine fade.inFromBottom (se solapan los efectos)
     */
    fromBottom: 'animate-in slide-in-from-bottom-8 duration-500',

    /**
     * @use Elementos que entran desde la izquierda sin desvanecer.
     * @nocombine fade.inFromLeft (se solapan los efectos)
     */
    fromLeft: 'animate-in slide-in-from-left-8 duration-500',

    /**
     * @use Elementos que entran desde la derecha sin desvanecer.
     * @nocombine fade.inFromRight (se solapan los efectos)
     */
    fromRight: 'animate-in slide-in-from-right-8 duration-500',
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
    /** @use Skeletons y estados de carga — aplicar sobre el placeholder, no el contenedor. */
    continuous: 'animate-pulse',

    /** @use Elementos que refuerzan su presencia solo al interactuar con ellos. */
    onHover: 'hover:animate-pulse',
  },

  // ── Stagger ───────────────────────────────────────────────────────────────
  // Requiere clase `group` en el elemento padre.
  // Aplicar child1..child5 a hijos consecutivos en orden DOM.
  // Escala lineal: 0 / 75 / 150 / 225 / 300ms — incrementos uniformes de 75ms.
  stagger: {
    /**
     * @use Primer hijo de una lista con entrada escalonada.
     * @warning El padre debe tener la clase `group` para que los delays se coordinen.
     * @combine No necesita combinación adicional — ya incluye transition-all.
     */
    child1: 'transition-all duration-300 delay-0',

    /** @use Segundo hijo de una lista con entrada escalonada. */
    child2: 'transition-all duration-300 delay-75',

    /** @use Tercer hijo de una lista con entrada escalonada. */
    child3: 'transition-all duration-300 delay-150',

    /** @use Cuarto hijo de una lista con entrada escalonada. */
    child4: 'transition-all duration-300 delay-[225ms]',

    /** @use Quinto hijo de una lista con entrada escalonada. */
    child5: 'transition-all duration-300 delay-300',
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
     * @use Placeholder de contenido en carga — skeleton loader.
     * @combine Dimensiones explícitas con cn(): `cn(ANIMATION.loading.skeleton, 'h-4 w-32')`
     */
    skeleton: 'animate-pulse bg-bg-soft rounded',

    /**
     * @use Indicador de proceso en curso — spinner circular.
     * @combine Dimensiones explícitas con cn(): `cn(ANIMATION.loading.spinner, 'h-5 w-5')`
     */
    spinner:
      'animate-spin rounded-full border-2 border-stroke-soft border-t-information-base',
  },
} as const

export type AnimationCategory = keyof typeof ANIMATION
export type AnimationVariant<C extends AnimationCategory> =
  keyof (typeof ANIMATION)[C]

export type TransitionKey = AnimationVariant<'transition'>
export type HoverKey = AnimationVariant<'hover'>
export type FadeKey = AnimationVariant<'fade'>
export type SlideKey = AnimationVariant<'slide'>
export type StaggerKey = AnimationVariant<'stagger'>
export type ScrollKey = AnimationVariant<'scroll'>
export type LoadingKey = AnimationVariant<'loading'>
