/**
 * Dimensiones intrínsecas por defecto para reservar ratio en `<img>` y reducir CLS.
 *
 * @module shared/constants/imageIntrinsic
 * @fileoverview Ratios por defecto para capturas de proyecto y avatar; consumido por carrusel y `Avatar`.
 * @remarks Los contenedores CSS (`aspect-video`, avatar circular) escalan la imagen;
 * los atributos `width`/`height` solo fijan la relación de aspecto para el layout inicial.
 */

/**
 * Ratio 16:9 para `<img>` bajo contenedor `aspect-video` (carrusel de proyectos).
 */
export const PROJECT_CAPTURE_INTRINSIC = {
  width: 16,
  height: 9,
} as const

/**
 * Ratio 1:1 para foto de perfil en avatar (el círculo lo escala CSS).
 */
export const PROFILE_AVATAR_INTRINSIC = {
  width: 1,
  height: 1,
} as const
