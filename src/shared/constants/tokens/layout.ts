const base = 'w-full mx-auto' as const
const divLine = 'w-full h-px bg-stroke-soft' as const
const px = 'px-6 sm:px-8 lg:px-10' as const

/**
 * Tokens de layout: contenedores, secciones, grids, flex, header, footer y divider.
 *
 * Padding horizontal:
 * Los containers NO incluyen `px` por defecto — añadir `LAYOUT.px` con cn()
 * cuando el contenedor necesita margen lateral. Todos los containers comparten
 * el mismo valor de px para garantizar alineación entre secciones.
 *
 * @example
 * ```tsx
 * <section className={LAYOUT.section.default}>
 *   <div className={cn(LAYOUT.container.full, LAYOUT.px)}>...</div>
 * </section>
 * ```
 */
export const LAYOUT = {
  /**
   * @use Padding horizontal estándar — combinar con cualquier container via cn().
   * @combine LAYOUT.container.* siempre via cn() — los containers no lo incluyen por defecto.
   * @warning Todos los containers de una misma sección deben usar el mismo px
   *          para mantener la alineación visual entre ellos.
   */
  px,

  container: {
    /**
     * @use Hero sections, features, grids de máximo ancho (max-w-[1400px]).
     * @combine LAYOUT.px via cn() cuando necesita margen lateral.
     */
    wide: `${base} max-w-[1400px]`,

    /**
     * @use Contenedor principal de página — la mayoría de las secciones (max-w-7xl).
     * @combine LAYOUT.px via cn() cuando necesita margen lateral.
     */
    full: `${base} max-w-7xl`,

    /**
     * @use Timelines, textos largos, contenido lineal donde prima la legibilidad (max-w-4xl).
     * @combine LAYOUT.px via cn() cuando necesita margen lateral.
     */
    narrow: `${base} max-w-4xl`,

    /**
     * @use Formularios, CTAs aislados, contenido centrado estrecho (max-w-2xl).
     * @combine LAYOUT.px via cn() cuando necesita margen lateral.
     */
    tight: `${base} max-w-2xl`,

    /**
     * @use Cabecera de sección — limita el ancho del título + descripción (max-w-3xl).
     * @warning No incluye `mx-auto` — usar dentro de un container centrado existente.
     * @nocombine LAYOUT.px (no es un container de página, es un limitador de ancho inline)
     */
    headerNarrow: 'max-w-3xl',

    /**
     * @use Artículos, posts, documentación — ancho óptimo de lectura (~65 caracteres por línea).
     * @combine LAYOUT.px via cn() cuando necesita margen lateral.
     */
    reading: `${base} max-w-[65ch]`,
  },

  section: {
    /** @use Sección hero — máximo respiro vertical para impacto inicial. */
    hero: 'py-24 sm:py-32 md:py-40 lg:py-48',

    /** @use Sección estándar con padding generoso — la mayoría de las secciones de página. */
    default: 'py-20 sm:py-24 md:py-32 lg:py-40',

    /** @use Sección footer. */
    footer: 'py-16 sm:py-20 md:py-24',

    /** @use Sección con menos respiro — cuando hay muchas secciones consecutivas. */
    compact: 'py-16 sm:py-20 md:py-24',

    /** @use Sección mínima — bloques de apoyo, banners, callouts. */
    small: 'py-12 sm:py-16 md:py-20',
  },

  spacing: {
    /**
     * @use Separación entre secciones de página (Hero, About, Projects...).
     * @warning Solo para flujo en columna (`flex-col` o `block`).
     * @nocombine LAYOUT.spacing.large (usar uno u otro según el nivel jerárquico)
     */
    section: 'space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32',

    /**
     * @use Separación entre sub-bloques dentro de una misma sección.
     * @nocombine LAYOUT.spacing.section (usar uno u otro según el nivel jerárquico)
     */
    large: 'space-y-8 sm:space-y-12 md:space-y-16',

    /** @use Separación estándar entre elementos relacionados. */
    default: 'space-y-6 sm:space-y-8',

    /** @use Separación compacta entre elementos muy relacionados dentro de un bloque. */
    compact: 'space-y-4 sm:space-y-6',

    /** @use Separación mínima — listas, items de formulario, grupos de chips. */
    small: 'space-y-2 sm:space-y-3',
  },

  grid: {
    /**
     * @use Testimonios, pricing, comparativas de dos columnas.
     * @warning El gap aumenta a `gap-5` en md — intencional para evitar que
     *          cards con contenido denso queden demasiado juntas.
     */
    cols2: 'grid grid-cols-1 md:grid-cols-2 gap-4',

    /** @use Features, cards de servicio, grids de tres columnas. */
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',

    /** @use Logos, iconos, grids de cuatro columnas. */
    cols4: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',

    /** @use Secciones hero split o about — dos columnas con items centrados. */
    split:
      'grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center',

    /** @use Grid responsive automático — 1 col en mobile, 2 en tablet, 3 en desktop. */
    autoFit: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8',

    /**
     * @use Galerías o listados de altura variable — masonry-like con CSS columns.
     * @warning El orden visual no coincide con el orden DOM (fluye por columnas).
     *          Evitar en contenido interactivo o con orden de lectura semánticamente importante.
     */
    masonry:
      'columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8',
  },

  flex: {
    /** @use Navbar, headers — distribuye elementos entre los dos extremos. */
    between: 'flex items-center justify-between',

    /** @use Centrar contenido horizontal y verticalmente — spinners, estados vacíos. */
    center: 'flex items-center justify-center',

    /** @use Fila de CTAs o botones con wrap en mobile. */
    row: 'flex flex-wrap items-center gap-4 md:gap-6',

    /** @use Stack vertical de elementos relacionados. */
    stack: 'flex flex-col gap-4 md:gap-6',

    /** @use Elementos con ícono a la izquierda — feature items, listas con icono. */
    start: 'flex items-start gap-4 md:gap-6',

    /** @use Grupos de chips, tags o badges que pueden romper línea. */
    wrap: 'flex flex-wrap gap-4 md:gap-6',

    /**
     * @use ThemeToggle, switches, controles inline con label.
     * @warning Incluye `select-none` — el texto del label no es seleccionable.
     */
    inlineToggle: 'inline-flex items-center gap-3 select-none',

    /** @use Grupos de botones que deben apilarse en mobile y alinearse en desktop. */
    rowResponsive:
      'flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4',
  },

  header: {
    /**
     * @use Navbar fija al top del viewport — siempre visible al hacer scroll.
     * @warning Requiere `padding-top` equivalente en el primer elemento de la página
     *          para evitar que el contenido quede tapado por el header fijo.
     */
    bar: 'fixed top-0 right-0 left-0 z-50 bg-bg-white',

    /**
     * @use Navbar sticky — se queda en el top al hacer scroll pero no ocupa espacio fijo.
     * @nocombine LAYOUT.header.bar (son dos estrategias de posicionamiento distintas)
     */
    sticky: 'sticky top-0 z-50 bg-bg-white',

    /** @use Contenedor interno del header — centra y aplica padding horizontal. */
    wrapper: `w-full max-w-7xl mx-auto ${px} py-2.5 md:py-4`,

    /**
     * @use Links de navegación del header — visible solo en desktop.
     * @warning Oculto en mobile (`hidden`) — necesita un menú alternativo para móvil.
     */
    nav: 'hidden md:flex items-center gap-6 lg:gap-8',
  },

  footer: {
    /** @use Wrapper externo del footer — fondo weak con borde superior. */
    wrapper: 'bg-bg-weak border-t border-stroke-soft',

    /** @use Grid de columnas de contenido del footer. */
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12',

    /** @use Barra inferior del footer — copyright y links secundarios. */
    bottom:
      'border-t border-stroke-soft pt-8 flex flex-col sm:flex-row items-center justify-between gap-4',
  },

  divider: {
    /** @use Separación horizontal entre bloques de contenido. */
    horizontal: divLine,

    /** @use Separación vertical — dentro de navbars, toolbars, grupos de iconos. */
    vertical: 'h-full w-px bg-stroke-soft',

    /**
     * @use Separador entre bloques dentro de un contenedor — ya incluye margen vertical.
     * @nocombine Margen adicional con cn() — ya incluye `my-8 sm:my-12` propio.
     */
    section: `${divLine} my-8 sm:my-12`,
  },
} as const

export type LayoutCategory = keyof typeof LAYOUT
export type LayoutVariant<C extends LayoutCategory> = keyof (typeof LAYOUT)[C]

export type ContainerKey = LayoutVariant<'container'>
export type SectionKey = LayoutVariant<'section'>
export type SpacingKey = LayoutVariant<'spacing'>
export type GridKey = LayoutVariant<'grid'>
export type FlexKey = LayoutVariant<'flex'>
export type HeaderKey = LayoutVariant<'header'>
export type FooterKey = LayoutVariant<'footer'>
export type DividerKey = LayoutVariant<'divider'>
