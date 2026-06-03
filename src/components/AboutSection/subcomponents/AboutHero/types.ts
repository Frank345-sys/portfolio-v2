/**
 * Tipos del dominio `AboutHero`.
 *
 * @fileoverview Define `AboutHeroData`: contrato de los datos de presentación del hero
 * (nombre, badges, tagline con énfasis `**…**`, avatar). Consumido por `ABOUT_HERO` en
 * `./constants` y renderizado en `AboutHero.tsx`.
 * @remarks Archivo de tipo único — si el dominio crece, añadir tipos aquí antes de crear un `types/` anidado.
 * `location` no incluye emoji: el icono 📍 se añade en UI con `aria-hidden`.
 */

/**
 * Datos de presentación del hero introductorio de la sección "Sobre mí".
 * Implementa el contrato que `satisfies` en {@link ABOUT_HERO} garantiza en tiempo de compilación.
 */
export interface AboutHeroData {
  /** Nombre de pila (parte principal del título animado). */
  firstName: string
  /** Apellido o fragmento resaltado en `information` tras el nombre. */
  lastName: string
  /** Texto del badge principal (p. ej. rol). */
  badge: string
  /** Ubicación legible, sin emoji (el icono se añade en UI con `aria-hidden`). */
  location: string
  /** Tagline con marcado `**término**` para `parseEmphasis`. */
  tagline: string
  /** Iniciales para avatar / fallback. */
  avatarInitials: string
  /** Ruta de foto de perfil o URL. */
  avatarPhotoSrc: string
}
