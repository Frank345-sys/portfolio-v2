/**
 * Tipos del dominio **About**: extienden contratos de `@/shared` sin duplicarlos.
 *
 * @fileoverview Define `AboutTimelineEntry` (alias de `TimelineItemData`) y `AboutLegendItem`
 * (alias de `LegendItem`) como tipos de dominio propios del módulo para poder añadirles
 * reglas de negocio sin contaminar `@/shared`.
 * @remarks Mantener alineado con {@link TimelineItemData} y {@link LegendItem} en `@/shared`.
 * Si `shared` añade campos, evaluar si el dominio About necesita restricciones adicionales.
 */
import type { LegendItem } from '@/shared/components/primitives/Legend'
import type { TimelineItemData } from '@/shared/components/primitives/TimelineItem'

/**
 * Contrato de datos para `AboutAcademic` / `AboutExperience` → `TimelineItem`.
 *
 * Extiende `TimelineItemData` (contrato de props del componente) sin añadir
 * campos nuevos; existe como tipo de dominio separado para poder adjuntarle
 * reglas de negocio propias del módulo `About` sin contaminar `shared`.
 *
 * ### Chips con `SkillLabel`
 * `applied` vs `learned` marcan cómo quieres contar cada skill en la narrativa del
 * timeline; el orden y la repetición de badges los defines en los datos (`ABOUT_*`).
 */
export type AboutTimelineEntry = TimelineItemData

// ─── Leyendas (Legend) homologadas con chips / badges del About ───────────────

/**
 * Ítem de leyenda en About: usado por el timeline ({@link CHIP_BADGE_CLASS} en {@link TimelineItem})
 * y por el stack ({@link SKILLS_LEGEND_ITEMS} en `AboutSkills`) — mismo contrato, distinto dataset.
 */
export type AboutLegendItem = LegendItem
