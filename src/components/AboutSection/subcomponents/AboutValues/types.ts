/**
 * Tipos del dominio `AboutValues`.
 *
 * @fileoverview Define `AboutValue`: contrato de cada tarjeta del bloque «Cómo trabajo»
 * con `name` (título), `desc` (subtítulo en tono information) y `detail` (párrafo de detalle).
 * @remarks Archivo de tipo único — si el dominio crece, añadir tipos aquí antes de crear un `types/` anidado.
 * Mantener alineado con `ABOUT_VALUES` en `./constants` y con {@link ValueCard} en `AboutValues.tsx`.
 */

/**
 * Contrato de cada tarjeta de valor en el bloque «Cómo trabajo».
 * Consumido por `ABOUT_VALUES` en `./constants` y renderizado por {@link ValueCard}.
 */
export interface AboutValue {
  /** Título del valor (encabezado de tarjeta). */
  name: string
  /** Subtítulo breve (tono `information`). */
  desc: string
  /** Párrafo de detalle. */
  detail: string
}
