import { ANIMATION } from './animation'

const base =
  `inline-flex items-center justify-center font-medium tracking-wide rounded-lg ${ANIMATION.transition.default} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none select-none uppercase text-[0.8125rem] leading-[1.75] cursor-pointer` as const

/**
 * Tokens de botones: contained, outlined, text, especiales y grupos.
 *
 * Composición general:
 * - `BUTTON.variant.*.*` se combina con `BUTTON.size.*` via cn().
 * - `BUTTON.special.*` son autónomos — ver cada variante para restricciones.
 *
 * Links: para un link con ícono usar `BUTTON.special.link`.
 *        Para texto inline con estilo de enlace usar `TYPOGRAPHY.link.*`.
 *
 * @example
 * ```tsx
 * <button className={cn(BUTTON.variant.contained.primary, BUTTON.size.md)}>
 *   Enviar
 * </button>
 * ```
 */
export const BUTTON = {
  // ── Tamaños ───────────────────────────────────────────────────────────────
  size: {
    /**
     * @use Contextos muy densos — tablas, toolbars, inline actions.
     * @warning Para uso general preferir `md` — `sm` reduce el área de toque.
     */
    sm: 'px-3 py-2 text-sm',

    /** @use Uso general — la mayoría de las acciones de la UI. */
    md: 'px-4 py-2 text-[0.875rem]',

    /** @use Acciones destacadas dentro de secciones de contenido. */
    lg: 'px-[22px] py-[10px] text-[0.9375rem]',

    /**
     * @use CTAs aislados de alto impacto — uno por vista como máximo.
     * @nocombine BUTTON.special.cta (ya incluye tamaño xl propio)
     */
    xl: 'px-7 py-3 text-base',

    /** @use Botones que deben adaptarse automáticamente al breakpoint del viewport. */
    responsive:
      'px-[10px] sm:px-4 md:px-[22px] py-[6px] sm:py-2 md:py-[10px] text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem]',
  },

  // ── Variantes ─────────────────────────────────────────────────────────────
  variant: {
    // Relleno sólido — máxima prominencia. Para la acción principal de un contexto.
    contained: {
      /**
       * @use Acción principal — submit, confirmar, continuar.
       * @combine BUTTON.size.* via cn().
       */
      primary: `${base} bg-information-base text-text-white shadow-elevation-sm hover:bg-information-dark hover:shadow-elevation-md active:opacity-90 active:shadow-elevation-xs focus-visible:ring-information-base`,

      /**
       * @use Acción de confirmación positiva — guardar, activar, completar.
       * @combine BUTTON.size.* via cn().
       */
      success: `${base} bg-success-base text-text-white shadow-elevation-sm hover:bg-success-dark hover:shadow-elevation-md active:opacity-90 active:shadow-elevation-xs focus-visible:ring-success-base`,

      /**
       * @use Acción destructiva — eliminar, desactivar, revocar.
       * @combine BUTTON.size.* via cn().
       */
      danger: `${base} bg-error-base text-text-white shadow-elevation-sm hover:bg-error-dark hover:shadow-elevation-md active:opacity-90 active:shadow-elevation-xs focus-visible:ring-error-base`,

      /**
       * @use Acción con consecuencias reversibles que requieren atención — archivar, pausar.
       * @combine BUTTON.size.* via cn().
       */
      warning: `${base} bg-warning-base text-text-white shadow-elevation-sm hover:bg-warning-dark hover:shadow-elevation-md active:opacity-90 active:shadow-elevation-xs focus-visible:ring-warning-base`,

      /**
       * @use Máximo contraste sobre fondos claros — acciones sobre imágenes o fondos de color.
       * @combine BUTTON.size.* via cn().
       */
      dark: `${base} bg-bg-strong text-text-white shadow-elevation-sm hover:bg-bg-surface hover:shadow-elevation-md active:opacity-90 active:shadow-elevation-xs focus-visible:ring-stroke-strong`,
    },

    // Borde fino, fondo transparente — acción secundaria junto a un contained.
    outlined: {
      /**
       * @use Acción secundaria junto a `contained.primary` — cancelar, volver, ver más.
       * @combine BUTTON.size.* via cn().
       */
      primary: `${base} bg-transparent text-information-base border-2 border-information-base hover:bg-information-lighter active:bg-information-light/30 focus-visible:ring-information-base`,

      /**
       * @use Acción secundaria junto a `contained.success`.
       * @combine BUTTON.size.* via cn().
       */
      success: `${base} bg-transparent text-success-base border-2 border-success-base hover:bg-success-lighter active:bg-success-light/30 focus-visible:ring-success-base`,

      /**
       * @use Acción de cancelación de un flujo destructivo.
       * @combine BUTTON.size.* via cn().
       */
      danger: `${base} bg-transparent text-error-base border-2 border-error-base hover:bg-error-lighter active:bg-error-light/30 focus-visible:ring-error-base`,

      /**
       * @use Acción secundaria en contextos de advertencia.
       * @combine BUTTON.size.* via cn().
       */
      warning: `${base} bg-transparent text-warning-base border-2 border-warning-base hover:bg-warning-lighter active:bg-warning-light/30 focus-visible:ring-warning-base`,

      /**
       * @use Acción secundaria genérica sin carga semántica — sobre fondos claros.
       * @combine BUTTON.size.* via cn().
       */
      neutral: `${base} bg-transparent text-text-strong border-2 border-stroke-subtle hover:bg-bg-soft hover:border-stroke-strong active:bg-bg-subtle focus-visible:ring-stroke-strong`,
    },

    // Sin borde ni fondo — mínima prominencia, acciones terciarias o en listas.
    text: {
      /**
       * @use Acción terciaria, links de acción dentro de contenido.
       * @combine BUTTON.size.* via cn().
       */
      primary: `${base} bg-transparent text-information-base hover:bg-information-lighter active:bg-information-light/40 focus-visible:ring-information-base`,

      /**
       * @use Acción positiva de baja prominencia — dentro de listas o tablas.
       * @combine BUTTON.size.* via cn().
       */
      success: `${base} bg-transparent text-success-base hover:bg-success-lighter active:bg-success-light/40 focus-visible:ring-success-base`,

      /**
       * @use Acción destructiva de baja prominencia — en tablas, confirmar antes de ejecutar.
       * @combine BUTTON.size.* via cn().
       */
      danger: `${base} bg-transparent text-error-base hover:bg-error-lighter active:bg-error-light/40 focus-visible:ring-error-base`,

      /**
       * @use Acción preventiva de baja prominencia.
       * @combine BUTTON.size.* via cn().
       */
      warning: `${base} bg-transparent text-warning-base hover:bg-warning-lighter active:bg-warning-light/40 focus-visible:ring-warning-base`,

      /**
       * @use Acción terciaria sin carga semántica — sobre cualquier fondo.
       * @combine BUTTON.size.* via cn().
       */
      neutral: `${base} bg-transparent text-text-strong hover:bg-bg-soft active:bg-bg-subtle focus-visible:ring-stroke-strong`,
    },
  },

  special: {
    /**
     * @use CTA hero de máximo impacto — uno por página, siempre visible above the fold.
     * @nocombine BUTTON.size.* (ya incluye tamaño px-7 py-3 internamente)
     */
    cta: `${base} gap-2 px-7 py-3 text-[0.9375rem] bg-information-base text-text-white shadow-elevation-md hover:bg-information-dark hover:shadow-elevation-lg active:opacity-90 active:shadow-elevation-sm focus-visible:ring-information-base`,

    /**
     * @use Acciones de ícono aisladas — toggle de tema, cerrar, menú.
     *      Usar en `<button>` con un ícono como único hijo.
     * @nocombine BUTTON.size.* (usa padding circular propio `p-2`)
     * @warning Sin texto visible — requiere `aria-label` para accesibilidad.
     */
    icon: `p-2 rounded-full text-text-subtle hover:bg-bg-soft active:bg-bg-subtle ${ANIMATION.transition.colors} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-information-base disabled:opacity-40 disabled:pointer-events-none cursor-pointer`,

    /**
     * @use Link autónomo con ícono — CTAs de texto con flecha, "Ver más", "Descargar".
     *      Para links dentro de párrafos o nav usar `TYPOGRAPHY.link.*`.
     * @nocombine BUTTON.size.* (hereda el tamaño del contexto tipográfico)
     */
    link: `inline-flex items-center gap-1.5 text-information-base hover:text-information-dark font-medium underline underline-offset-4 decoration-information-light hover:decoration-information-base ${ANIMATION.transition.colors} cursor-pointer`,
  },

  group: {
    /** @use Fila de botones relacionados — acciones de una card, toolbar. */
    horizontal: 'inline-flex gap-2 sm:gap-3 flex-wrap',

    /** @use Stack de botones — acciones en mobile o en paneles estrechos. */
    vertical: 'flex flex-col gap-2 sm:gap-3',

    /**
     * @use Botones unidos como segmented control — sin gap, bordes compartidos.
     * @warning Los bordes internos se eliminan automáticamente — no añadir border manualmente
     *          a los hijos o se verán dobles.
     */
    attached:
      'inline-flex [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:border-l-0',
  },
} as const

export type ButtonCategory = keyof typeof BUTTON
export type ButtonVariant<C extends ButtonCategory> = keyof (typeof BUTTON)[C]

export type ButtonSizeKey = ButtonVariant<'size'>
export type ButtonVariantKey = ButtonVariant<'variant'>
export type ButtonSpecialKey = ButtonVariant<'special'>
export type ButtonGroupKey = ButtonVariant<'group'>
