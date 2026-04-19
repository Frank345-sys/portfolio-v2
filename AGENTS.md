# Guía para agentes (Cursor / IA)

SPA **portfolio-v2**: **Vite 7**, **React 19**, **TypeScript estricto**, **Tailwind CSS 4** y design tokens en `src/shared/constants/tokens/`. Sin React Router ni librerías de estado global en el stack actual.

## Dónde está la referencia

| Tema                                            | Ubicación                                                                                                                                    |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Comportamiento del asistente, alcance y commits | [`.cursor/rules/base.mdc`](.cursor/rules/base.mdc) (siempre aplicable)                                                                       |
| Estructura de carpetas, stack y prohibiciones   | [`.cursor/rules/project-structure.mdc`](.cursor/rules/project-structure.mdc)                                                                 |
| Commits, ramas, PR y scopes Commitlint          | [`.cursor/rules/commits-branches.mdc`](.cursor/rules/commits-branches.mdc)                                                                   |
| UI, tokens y Motion                             | `design-tokens.mdc`, `motion.mdc`, `react-components.mdc` en [`.cursor/rules/`](.cursor/rules/)                                              |
| Tests (Vitest + Testing Library)                | [`.cursor/rules/testing.mdc`](.cursor/rules/testing.mdc)                                                                                     |
| TypeScript                                      | [`.cursor/rules/typescript.mdc`](.cursor/rules/typescript.mdc)                                                                               |
| Auditorías (rendimiento, a11y, SEO, calidad)    | Skills en [`.cursor/skills/`](.cursor/skills/) — para una pasada amplia usar `web-quality-audit`; para un solo eje, la skill correspondiente |

Las skills incluyen sección de alineación con este repo; si hay conflicto, **prevalecen las reglas en `.cursor/rules`**.

## Comprobación local alineada con CI

Antes de un **PR o push**, en la raíz del repositorio:

```bash
npm run check:ci
```

Equivale al orden del workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml): formato, lint, tipos, cobertura con umbrales y build. Para iteración rápida: `npm run check`.

## Commits

Solo con petición explícita del mantenedor. Convención y scopes: `commits-branches.mdc` y `commitlint.config.cjs`.
