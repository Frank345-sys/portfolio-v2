# Changelog

Registro de cambios relevantes del proyecto. El formato se inspira en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el versionado en [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Cambiado

- Repo: `.gitattributes` con `* text=auto eol=lf` y Prettier con `endOfLine: "lf"` (alineado con `.editorconfig`) para reducir ruido CRLF/LF bajo Windows y avisos de Git al commitear. `.gitignore` ajustado a `.vscode/*` para que apliquen las excepciones; `.vscode/settings.json` con `files.eol` y trimming acorde a EditorConfig.

- ESLint: `eslint-plugin-vitest` sustituido por `@vitest/eslint-plugin` (mantenimiento oficial, depende de `@typescript-eslint/utils` v8; desaparece el aviso de peer con ESLint 9). Test de contacto: aserción sin `expect` dentro de `if` (`vitest/no-conditional-expect`).

### Añadido

- Build: pipeline con **sharp** en `closeBundle` (optimizar PNG en `.../images/projects/` si reduce tamaño; luego `*-600.webp` y `*-1200.webp`). Sustituye `vite-plugin-imagemin` + `imagemin-pngquant` para alinear con `npm audit` y evitar reescrituras frágiles bajo Windows. `getProjectImageAttributes` + `ImageCarousel` / `ProgressiveImage` con `srcSet` y `sizes` en producción; `sizes` distinto para card vs lightbox (layout real bajo `max-w-7xl` y tope 1080px del modal).
- Code-splitting: secciones bajo el pliegue (`About`, `Proyectos`, `Contacto`, `Footer`) con `React.lazy` y `Suspense`.

## [1.4.1] - 2026-04-24

### Cambiado

- Documentación: `README.md` y `src/shared/constants/tokens/readme.md` alineados con el stack, scripts, despliegue, módulos de tokens (incl. `BRAND`, `Z`, a11y) y convenciones actuales.

### Arreglado

- Accesibilidad: contraste en tarjetas de valores (`AboutValues`), fechas y descripciones de `TimelineItem`, y panel lateral de proyectos (`ProjectInfo` / `ProjectLink`) — textos con `text-text-strong` o `dark:text-information-dark` donde aplica (Lighthouse `color-contrast`).
- `ProjectInfo`: claves estables en la lista de bullets (`project-{id}-bullet-{texto}`) en lugar del índice del array en `key`.

## [1.4.0] - 2026-04-23

### Añadido

- Generación de `.well-known/security.txt` en el build (contacto y URL canónica según `VITE_PUBLIC_SITE_URL`).
- Metas de política en documento: `referrer` y `Permissions-Policy` (complemento a cabeceras HTTP; no sustituyen CSP ni X-Frame-Options en el servidor).
- Script `lighthouse:pages` (Node) para auditar rendimiento, SEO, accesibilidad y buenas prácticas contra la URL publicada en GitHub Pages; resuelve Chrome/Edge con `CHROME_PATH`, directorio temporal bajo `.lighthouse-tmp/`, `--headless=new` y, si el HTML se generó pero `chrome-launcher` falla al borrar (EPERM en Windows), el proceso sale 0 con aviso. `lighthouse-report.html` y `.lighthouse-tmp/` ignorados por git.

### Cambiado

- `public/robots.txt` y `public/sitemap.xml` alineados con la URL actual de GitHub Pages (el build sigue sobrescribiendo ambos según el modo y `.env`).
- Accesibilidad: `LinkCard` alinea el nombre accesible con título, subtítulo y aviso de nueva pestaña vía `sr-only` (WCAG 2.5.3); subtítulos con `text-text-subtle`; reemplazo de `text-text-soft` por `text-text-subtle` en tokens (p. ej. overline, muted, caption) y en pie, prefijo de hora local y tarjeta de correo (sin `aria-label` de mailto duplicado).

## [1.3.0] - 2026-04-21

### Añadido

- Pie de página (`Footer`): marca con enlace a inicio, tagline compartido, bloque “Antes de irte” con enlace a contacto, CTA “Volver al inicio”, copyright y línea “Construido con…”.
- `siteProfile` como fuente única de nombre, rol, tagline y textos SEO; reexport desde `shared/constants`.
- Plugin de Vite que inyecta título, metas y JSON-LD en `index.html` en build a partir de `siteProfile` y placeholders.
- Tokens `BRAND.logoIcon` y `PRIMARY_NAV_LINK` (nav principal alineada entre header y pie); icono `ArrowUpIcon`.
- Tests del `Footer` y ajustes de tests en About, Hero y `TimelineItem`.

### Cambiado

- Hero y sección About usan `SITE_TAGLINE` desde `siteProfile`; copy de bio alineado al tagline compartido.
- `TimelineItem`: `aria-label` del hito académico usa `SITE_DISPLAY_NAME`.
- `README`: referencia a `siteProfile` como origen de nombre y rol visibles.
- `navLink` del header basado en `PRIMARY_NAV_LINK` (misma composición tipográfica que el enlace rápido del pie).

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
