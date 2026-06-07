# Scripts de mantenimiento

Herramientas Node (`.mjs`) que **complementan** la configuración del proyecto. No reemplazan ESLint, Prettier, TypeScript ni Knip.

**React Doctor** no vive en esta carpeta: los comandos `npm run react-doctor` y `npm run react-doctor:full` están en `package.json` (binario `react-doctor`, config en **`doctor.config.ts`** en la raíz). El gate opcional **`check:extended`** encadena `check` + `react-doctor:full`.

## Integración con el toolchain

| Herramienta                              | Qué cubre                                                    | Qué aportan estos scripts                                                                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **eslint-plugin-tsdoc** (`tsdoc/syntax`) | Sintaxis TSDoc válida según `tsdoc.json` en `src/**/*.ts(x)` | `check-tsdoc.mjs` exige **cabecera de archivo** por tipo (barrel / test / source): tags obligatorios y línea descriptiva                                      |
| **eslint-plugin-import**                 | `import/no-duplicates`, ciclos, orden                        | `check-exports.mjs` detecta **nombres duplicados en re-exports** de barrels (`export { … } from`); avisa si hay varios `export * from` (no resuelve el grafo) |
| **Prettier**                             | Formato de código y comentarios                              | Los scripts de TSDoc no se ejecutan en `format`; tras `--fix` conviene `npm run format` si hace falta                                                         |
| **tsc / Vite**                           | Tipos y build                                                | `check-env.mjs` valida presencia (y opcionalmente valor) de `VITE_*` en `.env*` alineado al orden de carga de Vite                                            |
| **Knip**                                 | Exports muertos, dependencias                                | Independiente; no analiza texto de JSDoc en barrels                                                                                                           |

Los `.mjs` bajo `scripts/` entran en `eslint.config.js` como **node tooling** (sin regla `tsdoc/syntax`); llevan su propio TSDoc de cabecera por convención del repo.

## CI vs migración puntual

| Script                                                        | En `check` / `check:ci`                                                    |
| ------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `check-tsdoc.mjs`                                             | Sí (`npm run lint`); también **lint-staged** en `src/**/*.{ts,tsx}` staged |
| `check-exports.mjs`                                           | Sí (`lint:exports`)                                                        |
| `check-env.mjs`                                               | Sí (`lint:env`); `lint:env:strict` falla si hay `VITE_*` vacías            |
| `fill-tsdoc-placeholders.mjs`                                 | No — sustituye placeholders tras `check-tsdoc --fix`                       |
| `homogenize-barrel-tsdoc.mjs`                                 | No — migración legacy de texto en barrels                                  |
| `fix-empty-module-tag.mjs`, `fix-tsdoc-test-double-blank.mjs` | No — reparación puntual                                                    |

Ejecutar `homogenize` o `fill` en masa puede cambiar prosa de cabeceras; lo generado debe seguir pasando `npm run lint` y `lint:tsdoc`.

## Scripts de migración (mantenimiento puntual)

La migración TSDoc del repo ya está cerrada (290 archivos pasan `check-tsdoc`). Estos comandos **no entran en CI** ni en pre-commit; conservarlos solo para reparaciones masivas o imports externos:

| Script npm                          | Archivo                           | Cuándo usarlo                                                         |
| ----------------------------------- | --------------------------------- | --------------------------------------------------------------------- |
| `tsdoc:fill-placeholders` / `:dry`  | `fill-tsdoc-placeholders.mjs`     | Tras `check-tsdoc --fix`, sustituir placeholders por texto según ruta |
| `tsdoc:homogenize-barrels` / `:dry` | `homogenize-barrel-tsdoc.mjs`     | Normalizar `@remarks` legacy en barrels de un directorio              |
| `tsdoc:fix-empty-module`            | `fix-empty-module-tag.mjs`        | Reparar `@module` vacío (idempotente)                                 |
| `tsdoc:fix-test-double-blank`       | `fix-tsdoc-test-double-blank.mjs` | Colapsar doble línea en blanco en cabeceras de tests                  |

Pipeline recomendado si vuelve a hacer falta (p. ej. módulo nuevo importado sin cabeceras):

1. `node scripts/check-tsdoc.mjs --fix`
2. `npm run tsdoc:fill-placeholders:dry` → `npm run tsdoc:fill-placeholders`
3. Opcional: `tsdoc:homogenize-barrels:dry` → `tsdoc:homogenize-barrels`
4. `npm run lint`

No hace falta eliminar estos scripts: son idempotentes, ligeros y evitan reescribir lógica de `utils/tsdoc-templates.mjs` a mano.

## Utilidades compartidas

- `utils/walk.mjs` — recorrido de `.ts`/`.tsx` (omite `node_modules`, `.cache`, `dist`, `.git`); `walkTestFiles()` para `*.test.*` / `*.spec.*`
- `utils/tsdoc-templates.mjs` — plantillas, regex y heurísticas TSDoc compartidas

### `utils/tsdoc-templates.mjs` — API pública

| Símbolo                                                                                  | Uso                                                                                           |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `LEADING_TSDOC`                                                                          | Regex del primer bloque TSDoc de un archivo                                                   |
| `GENERIC_BARREL_LINE`                                                                    | Regex de la línea genérica de barrels post `--fix`; `fill` la detecta para enriquecer exports |
| `genericBarrelProseTsdocLine()`                                                          | Texto canónico de esa línea con margen ` *` (`check-tsdoc --fix`, `completeTsdocBlock`)       |
| `PLACEHOLDER_*`                                                                          | Regex de textos placeholder sustituibles por `fill-tsdoc-placeholders`                        |
| `SOURCE_TSDOC_TAG_LINES`                                                                 | `@fileoverview` + `@remarks` mínimos para fuente                                              |
| `testTsdocTagLines(relPosix)`                                                            | Tags canónicos para tests (hook vs componente)                                                |
| `tsdocCopyFromRoute(relPosix, isTest)`                                                   | Heurísticas completas por ruta (`fill-tsdoc-placeholders`)                                    |
| `buildTemplate(kind, absPath, srcDir)`                                                   | Cabecera mínima insertada por `check-tsdoc --fix`                                             |
| `barrelRemarksLine(mod)`                                                                 | Línea `@remarks` estándar de barrels                                                          |
| `getFileKind`, `modulePathFromFile`, `hasDescriptiveLine`, `splitTsdocInnerProseAndTags` | Clasificación y parsing de bloques                                                            |
| `homogenizeBarrelTsdoc(body)`                                                            | Migración legacy de prosa en barrels                                                          |
| `collapseTestTsdocDoubleBlank(block)`                                                    | Normaliza líneas en blanco duplicadas en tests                                                |

### Pipeline TSDoc recomendado (migración)

1. `node scripts/check-tsdoc.mjs --fix` — inserta cabeceras mínimas (barrels con `genericBarrelProseTsdocLine()`)
2. `node scripts/fill-tsdoc-placeholders.mjs --dry-run` — revisar impacto
3. `node scripts/fill-tsdoc-placeholders.mjs` — textos por ruta + enriquecimiento de barrels
4. Opcional: `homogenize-barrel-tsdoc.mjs` — normaliza variantes legacy hacia la línea genérica de barrel
5. `npm run lint` — debe pasar `tsdoc/syntax` y `check-tsdoc`
