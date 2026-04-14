/**
 * Construye el conjunto de etiquetas de badges a partir de grupos tipo `SkillGroup` (AboutSection).
 * Solo para tests de sincronía (Vitest) entre stack, timelines y `PROJECTS`.
 */
export function stackSkillLabelSet(
  groups: readonly { tags: readonly { label: string }[] }[]
): Set<string> {
  return new Set(groups.flatMap((g) => g.tags.map((t) => t.label)))
}
