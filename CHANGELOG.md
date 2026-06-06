# Changelog

Registro de cambios relevantes del proyecto. El formato se inspira en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el versionado en [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Añadido

- Script **`optimize:public`** (`scripts/optimize-public-assets.mjs`) para comprimir assets en `public/`.
- **`ThemeProvider`** con transición de tema (`runThemeTransition`); **`useTheme`** pasa a consumir contexto.
- Hook **`useScrollAnimationPause`** y **`useFloatingBoxFloat`** en BackgroundBoxes (pausa de animaciones decorativas durante scroll).
- Utilidad **`backgroundBoxesViewportTier`** para densidad de cajas según viewport.
- Constantes modulares: **`siteProfile/`**, **`theme.ts`**, **`imageIntrinsic.ts`**; enlaces legacy de portfolio en **`portfolioLegacyLinks.ts`**.
- Helper de test **`expectNoAxeViolations`** para aserciones axe reutilizables.
- **`TimelineItem`**: prop opcional **`modalidad`** (`TIMELINE_MODALIDAD`: Presencial, Híbrido, Remoto) visible junto a la empresa/institución.
- **Experiencia laboral DIDACTECA** en `ABOUT_EXPERIENCE` (Jun 2026 — Actualidad) con chips de skills aprendidas.
- Etiquetas de stack **`SCRUM`**, **`Turborepo`**, **`Apollo Client`**, **`CI/CD`** y **`Arquitectura Front-end`** en `skillLabels`, `AboutSkills` y timeline de experiencia.

### Cambiado

- **ProjectsSection**: hooks simplificados (`useProjectsModal`, `useProjectsCarousel`, `useProjectsScrollSync`, `useProjectsSection`); atributos de imagen resueltos en el componente; menos memoización manual (React Compiler).
- **Header**: hooks simplificados (`useHeader`, `useNavScrollSpy`, `useNavUnderlinePosition`); cierre de drawer en `lg` sin `queueMicrotask`.
- **`useImageCarousel`** y **`useTimelineItem`**: eliminada memoización prematura; variantes Motion del carrusel como constante de módulo.
- **BackgroundBoxes**: parallax y flotación refactorizados; tier de viewport en generador de cajas.
- **Assets públicos** optimizados (CV PDF, foto de perfil, `og-image.png`).
- Tests ampliados con **vitest-axe** y helpers compartidos en App, Modal, Header, ProjectInfo, ErrorBoundary y secciones lazy.
- **About — formación y experiencia**: modalidad en ITSX (Presencial), TripleTen (Remoto), B Life (Presencial) y DIDACTECA (Híbrido).
- **AboutBio**: copy de «Quién soy» reequilibrado (perfil general, no centrado en un solo empleador); párrafo de impacto con **SEO** (metadatos, HTML semántico, Core Web Vitals) y **SCRUM**.
- **AboutHero**: `fullName` y `overline` centralizados en `ABOUT_HERO`; layout del avatar sin margen extra en desktop.
- **Avatar**: props `loading`, `fetchPriority`, `onImageError` y `onImageLoad`; foto con carga prioritaria por defecto (`eager` / `high`).
- **ProfileAside**: disponibilidad actualizada (remoto y jornada parcial disponibles; híbrido, presencial y relocalización no disponibles).

### Arreglado

- **AboutExperience.test**: aserciones acotadas al `listitem` del timeline cuando hay textos duplicados (mismo rol o chips entre entradas).
- **TimelineItem.test**: cobertura de `modalidad`; acento `information` validado en el contenedor de empresa.

### Eliminado

- **`siteProfile.ts`** monolítico (sustituido por carpeta `siteProfile/`).

## [1.7.0] - 2026-06-02

### Añadido

- Refactor global: componentes compartidos en **`primitives/`** y **`composites/`**; subcomponentes de página con tests co-localizados por carpeta.
- **Modal** compuesto (`Modal.Header`, `Modal.Body`, `Modal.Footer`); subcomponentes en `Modal/subcomponentes/`.
- Constantes de stats en **`HeroStats/constants.ts`**; subcomponentes Hero (CvCta, Stats, Title, Lead).
- Scripts de calidad: **`check-tsdoc`**, **`check-env`**, **`check-exports`**; **`lint-staged`** valida cabeceras TSDoc en `src/**/*.{ts,tsx}` staged.
- **`react-doctor`** / **`react-doctor:full`**; **`react-doctor.config.json`** (`deadCode: false`); script **`check:extended`**.
- **`.env.example`**; plantilla **`.env.github`** documentada para Pages.
- **`web-vitals`** en runtime (`reportWebVitals`); **`vitest-axe`** en tests clave (Modal, MobileDrawer, ImageCarousel).
- Iconos reorganizados en **`brands/`**, **`media/`**, **`nav/`**, **`social/`**, **`ui/`**.
- Hooks **`useIsIntersecting`**; utilidades **`createCompareByLegendOrder`**, **`withSiteBaseUrl`**, **`reportWebVitals`**.
- Tests de integración **`App.test.tsx`**; helpers de test (`renderWithMotion`, mocks compartidos, `vitest-axe.d.ts`).
- Foto de perfil en **`public/images/profile/`**.
- CI: workflow React Doctor en modo **diff** vs rama base del PR.

### Cambiado

- **React Doctor** actualizado a **0.2.6**; auditoría completa local **100/100**.
- **`check`** y **`check:ci`**: orden unificado (`format` → `lint` → exports → env → `typecheck` → Knip → tests → build en CI).
- CI (**`ci.yml`**): un solo paso **`npm run check:ci`**.
- **ErrorBoundary**: fallback acotado al área del boundary (cabecera y pie visibles).
- Accesibilidad: **`section aria-labelledby`** en lugar de `role="group"`; **ThemeToggle** con `aria-labelledby`; **ImageCarousel** con fallback `<img alt="…">`.
- Hooks alineados con **React Compiler** (`useHeader`, `useIsIntersecting`, `useNavScrollSpy`, `useProjectsScrollSync`, `useImageCarousel`).
- **ProjectsSection**: hooks **`useProjectsModal`** / **`useProjectsCarousel`**; utils de imágenes y slides en la sección; modal unificado.
- ESLint: **`ecmaVersion` 2023**; glob extendido a **`.mjs`/`.cjs`**.
- TypeScript app: target **`ES2023`**.
- **`vite.config.ts`**: `security.txt` con **`Expires` dinámico**; umbrales de cobertura documentados; pipeline de imágenes con **sharp** endurecido.
- **`knip.json`**: ignora `vitest-axe.d.ts` (ya no ignora `react-doctor` como dependencia).
- **`tsdoc.json`**: tag **`@fileoverview`** registrado.
- README, **`scripts/README.md`** y pipeline documentados.

### Arreglado

- **ThemeToggle**: id fijo `theme-toggle-label` y enlace accesible con `aria-labelledby`.
- **ErrorBoundary**: alerta y botón Reintentar con tests de restauración.

### Eliminado

- Script **`lighthouse:pages`** y **`scripts/lighthouse-pages.mjs`** (auditoría Lighthouse manual vía DevTools / PageSpeed).
- **`public/robots.txt`** y **`public/sitemap.xml`** versionados (generación en build vía plugin Vite).
- Barriles y utilidades muertas (`shared/constants/index`, `enums/`, `projectImageWebp`, **`ProgressiveImage`** standalone, estructura plana legacy en `shared/components/`).
- Carpeta **`__tests__/`** dispersa; tests junto a cada módulo.

## [1.6.0] - 2026-04-25

### Añadido

- Calidad/pipeline: integración de **Knip** en scripts (`check`, `check:ci`) y CI (`.github/workflows/ci.yml`).
- ESLint: incorporación de `eslint-plugin-sonarjs` y `eslint-plugin-unicorn` con reglas activas para robustez y consistencia.

### Cambiado

- ESLint: configuración reforzada para TypeScript/React y tooling Node (ruleset más estricto, orden/duplicados de imports y reglas de calidad adicionales).
- Lint global: normalización amplia de estilo/imports con `eslint --fix` y ajustes en tests para cumplir reglas de Unicorn sin cambiar comportamiento.
- CSS/tests: limpieza de clases de prueba (`test-custom-class`, `test-legend-class`) y simplificación de ignores de Tailwind para clases de testing.
- Build/config: `vite.config.ts` endurecido para manejar variables de entorno de forma segura y evitar fallos por `trim()` en valores ausentes.
- Dependencias de desarrollo: `react-doctor` actualizado a `0.0.39`.

### Arreglado

- React Doctor: corregido el fallo `issues.files is not iterable`; ejecución completa y estable.
- Validaciones locales/CI: `npm run check`, lint estricto y suite de tests en verde tras los cambios de calidad.

## [1.5.0] - 2026-04-24

### Cambiado

- Repo: `.gitattributes` con `* text=auto eol=lf` y Prettier con `endOfLine: "lf"` (alineado con `.editorconfig`) para reducir ruido CRLF/LF bajo Windows y avisos de Git al commitear. `.gitignore` ajustado a `.vscode/*` para que apliquen las excepciones; `.vscode/settings.json` con `files.eol` y trimming acorde a EditorConfig.
- ESLint: `eslint-plugin-vitest` sustituido por `@vitest/eslint-plugin` (mantenimiento oficial, depende de `@typescript-eslint/utils` v8; desaparece el aviso de peer con ESLint 9). Test de contacto: aserción sin `expect` dentro de `if` (`vitest/no-conditional-expect`).
- Tema/UX: `meta[name="theme-color"]` se sincroniza con el tema activo (light/dark) y `color-scheme` en `html`/`html.dark` para controles nativos coherentes.
- Documentación: `README.md` actualizado para reflejar pipeline de imágenes, `theme-color` dinámico y estado real de calidad/auditoría.

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
