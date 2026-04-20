# Changelog

Registro de cambios relevantes del proyecto. El formato se inspira en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el versionado en [Semantic Versioning](https://semver.org/lang/es/).

## [1.2.0] - 2026-04-19

### Añadido

- Workflow de GitHub Actions que publica una GitHub Release al crear o pushear un tag semver con prefijo `v`, usando el bloque `## [X.Y.Z]` de este changelog como cuerpo de la nota.

### Cambiado

- CI: permisos explícitos de solo lectura donde aplica, concurrencia por workflow, Commitlint solo en `pull_request`, React Doctor alineado con la versión declarada en `package.json`.
- Dependabot: prefijo de commit `chore(deps):` para npm y GitHub Actions; los pull requests de actualización se abren contra la rama `develop`.
- Commitlint: se admite el scope `deps-dev` para mensajes legacy de Dependabot.
- Lockfile y pin de `react-doctor` en desarrollo para coincidir con el workflow de React Doctor.

## [1.1.0] - 2026-04-19

### Añadido

- Variables de entorno por modo de build (`.env.development`, `.env.github`, `.env.production`) para `VITE_BASE_PATH` y `VITE_PUBLIC_SITE_URL`.
- Scripts `build:github` y `deploy:pages` en `package.json`.
- Plugin de build en Vite que genera `robots.txt` y `sitemap.xml` en el directorio de salida según la URL pública configurada.
- `engines.node` en `package.json`, scripts `format:check`, `test:coverage:ci` y `check:ci` alineados con la CI.
- Dependabot para npm y GitHub Actions (con agrupación en Actions).

### Cambiado

- Metadatos SEO en `index.html` (canonical, Open Graph, Twitter Card, JSON-LD) parametrizados con `%VITE_PUBLIC_SITE_URL%`.
- Configuración de Vite: `loadEnv`, `base` desde variables de entorno y generación de archivos SEO al cerrar el bundle.
- Dependencias y lockfile al día (incl. React y React DOM en parches recientes del ecosistema).
- ESLint en flat config con `eslint-plugin-react` (`recommended`, `jsx-runtime`, `react/prop-types` desactivado, `version: detect`).
- Flujo de CI: formato, lint, typecheck, cobertura y build; documentación del README (scripts, pipeline, guías bajo `.agents/`).
- Prettier: `endOfLine: "auto"` para evitar fallos de `format:check` en Windows / Git Bash por diferencias CRLF/LF.

### Eliminado

- `AGENTS.md` en la raíz del repositorio (las guías para asistentes viven en `.agents/` de forma local, carpeta ignorada por git).
