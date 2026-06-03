/**
 * Tipos del dominio `AboutBio`.
 *
 * @fileoverview Define `AboutBioParagraph`: contrato de cada entrada de `ABOUT_BIO`
 * con `id` estable para React y `text` con marcado `**énfasis**` para {@link parseEmphasis}.
 * @remarks Archivo de tipo único — si el dominio crece, añadir tipos aquí antes de
 * crear un `types/` anidado.
 */

/**
 * Contrato de cada párrafo de la bio personal.
 * Consumido por `ABOUT_BIO` en `./constants` y renderizado en {@link AboutBio}.
 */
export interface AboutBioParagraph {
  /** Clave estable para React (y posibles anclas). */
  id: string
  /** Texto con marcado `**énfasis**` para `parseEmphasis`. */
  text: string
}
