import { ANIMATION } from './animation'

const inputBase =
  `w-full rounded-lg border border-stroke-soft bg-bg-white px-3 py-2 text-sm placeholder:text-text-soft ${ANIMATION.transition.default} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-information-base focus-visible:ring-offset-2 [--tw-ring-offset-color:var(--color-bg-weak)] disabled:cursor-not-allowed disabled:opacity-50` as const

const labelBase = 'block text-sm font-medium' as const

/**
 * Tokens para inputs, textareas, labels y grupos de formularios.
 *
 * Labels de formulario → `INPUT.label.*` (incluye variante `:required`).
 * Labels genéricos fuera de formularios → `TYPOGRAPHY.label.*`.
 *
 * @example
 * ```tsx
 * <div className={INPUT.group.vertical}>
 *   <label className={INPUT.label.required}>Email</label>
 *   <input className={INPUT.base.default} />
 *   <span className={INPUT.helper.default}>Usaremos tu email para notificaciones.</span>
 * </div>
 * ```
 */
export const INPUT = {
  base: {
    /**
     * @use Campo de texto de una sola línea — la mayoría de los inputs de formulario.
     * @combine INPUT.group.vertical como contenedor, INPUT.label.* y INPUT.helper.* como hermanos.
     */
    default: inputBase,

    /**
     * @use Campo de texto multilínea — comentarios, descripciones, mensajes.
     * @combine INPUT.group.vertical como contenedor, INPUT.label.* y INPUT.helper.* como hermanos.
     * @warning No usar `resize-none` adicional — el textarea puede redimensionarse verticalmente por defecto.
     */
    textarea: `${inputBase} min-h-[120px] align-top`,
  },

  label: {
    /**
     * @use Label de campo opcional — cuando el campo no es requerido.
     * @combine INPUT.group.vertical como contenedor, INPUT.base.* como hermano siguiente.
     * @nocombine TYPOGRAPHY.label.* (son sistemas distintos — uno para forms, otro para UI general)
     */
    default: labelBase,

    /**
     * @use Label de campo requerido — genera asterisco rojo automáticamente via CSS.
     * @combine INPUT.group.vertical como contenedor, INPUT.base.* como hermano siguiente.
     * @nocombine TYPOGRAPHY.label.* (son sistemas distintos — uno para forms, otro para UI general)
     * @warning El asterisco se genera con `after:content-["*"]` — no añadir el asterisco manualmente en el texto.
     */
    required: `${labelBase} after:ml-0.5 after:text-error-base after:content-['*']`,
  },

  helper: {
    /**
     * @use Descripción o instrucción del campo — aparece debajo del input siempre visible.
     * @combine INPUT.group.vertical como contenedor, justo después de INPUT.base.*.
     */
    default: 'mt-1 text-xs text-text-soft',

    /**
     * @use Mensaje de validación fallida — reemplaza al helper.default cuando hay error.
     * @combine `aria-invalid="true"` en el input asociado para accesibilidad.
     * @warning No mostrar simultáneamente con helper.success — son estados mutuamente excluyentes.
     */
    error: 'mt-1 text-xs text-error-base',

    /**
     * @use Confirmación de valor válido — solo cuando el campo fue validado positivamente.
     * @combine `aria-invalid="false"` en el input asociado para accesibilidad.
     * @warning No mostrar simultáneamente con helper.error — son estados mutuamente excluyentes.
     */
    success: 'mt-1 text-xs text-success-base',
  },

  group: {
    /**
     * @use Contenedor vertical de un campo completo: label + input + helper.
     * @combine INPUT.label.*, INPUT.base.*, INPUT.helper.* como hijos directos en ese orden.
     */
    vertical: 'flex flex-col gap-1.5',

    horizontal: 'flex flex-row gap-3 items-start flex-wrap',

    grid2: 'grid grid-cols-1 sm:grid-cols-2 gap-3',
  },
} as const

export type InputCategory = keyof typeof INPUT
export type InputVariant<C extends InputCategory> = keyof (typeof INPUT)[C]

export type InputBaseKey = InputVariant<'base'>
export type InputLabelKey = InputVariant<'label'>
export type InputHelperKey = InputVariant<'helper'>
/** `vertical` | `horizontal` | `grid2` */
export type InputGroupKey = InputVariant<'group'>
