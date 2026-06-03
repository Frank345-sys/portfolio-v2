/**
 * Pieza de interfaz del portfolio (`ContactLead`).
 *
 * @fileoverview Implementación del archivo `ContactLead.tsx` dentro de `components/ContactSection/subcomponents/ContactLead`; ver exports para la API pública.
 * @remarks La coletilla « o correo» depende de {@link CONTACT_EMAIL_HREF}.
 */
import { TYPOGRAPHY } from '@/shared/constants/tokens'

import { CONTACT_EMAIL_HREF } from '../../constants'

/**
 * @module components/ContactSection/subcomponents/ContactLead/ContactLead
 *
 * Párrafo introductorio de la columna principal de contacto.
 *
 * @example
 * ```tsx
 * <ContactLead />
 * ```
 * @see {@link CONTACT_EMAIL_HREF} para la condición de visibilidad del correo
 */
export function ContactLead() {
  return (
    <p className={TYPOGRAPHY.paragraph.lead}>
      ¿Colaboración en producto, revisión o rol React/TypeScript? Mira el código
      y proyectos en GitHub o escríbeme por LinkedIn, WhatsApp
      {CONTACT_EMAIL_HREF ? ' o correo' : ''}.
    </p>
  )
}
