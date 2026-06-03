/**
 * Forma base para cualquier elemento con etiqueta y variante semántica.
 * Usar para construir tipos concretos: `SkillTag`, `TimelineChip`, etc.
 *
 * ```ts
 * type SkillTag = LabeledVariantTag<SkillTagVariant, SkillLabel>
 * type TimelineChip = LabeledVariantTag<TimelineChipVariant>
 * ```
 *
 * @module shared/constants/skills/labeledVariantTag
 * @fileoverview Tipo genérico para chips/tags con variante semántica.
 * @remarks Import directo: `import type { LabeledVariantTag } from '@/shared/constants/skills/labeledVariantTag'`.
 */
export type LabeledVariantTag<
  TVariant extends string,
  TLabel extends string = string,
> = {
  label: TLabel
  variant: TVariant
}
