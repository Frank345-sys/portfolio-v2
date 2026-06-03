/**
 * Base para el atributo `imageAlt` del componente `ImageCarousel` en vistas de proyecto.
 *
 * Con varios slides, el hook `useImageCarousel` concatena « — imagen n de total» sobre este texto.
 *
 *
 *
 * @param title - Título visible del proyecto (no vacío después de trim).
 * @returns Frase lista para uso accesible y SEO sobre capturas de interfaz.
 * @module components/ProjectsSection/utils/projectCarouselImageAlt
 * @fileoverview Implementación del archivo `projectCarouselImageAlt.ts` dentro de `components/ProjectsSection/utils`; ver exports para la API pública.
 * @remarks Coordinar tokens (`@/shared/constants`), accesibilidad y Motion con el resto de la sección.
 */
export function getProjectCarouselImageAltBase(title: string): string {
  const t = title.trim()
  if (t.length === 0) {
    return 'Captura de pantalla de la interfaz del proyecto'
  }
  return `Captura de pantalla de la interfaz del proyecto «${t}»`
}
