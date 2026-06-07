# portfolio-v2

SPA de portfolio personal. El **perfil unificado** (nombre visible, rol, títulos de página, metadatos SEO, JSON-LD Person) vive en [`src/shared/constants/siteProfile/`](src/shared/constants/siteProfile/siteProfile.ts).

[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![CI](https://github.com/Frank345-sys/portfolio-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/Frank345-sys/portfolio-v2/actions/workflows/ci.yml)

---

## Descripción

**portfolio-v2** es una **SPA** (**React 19**, **Vite 7**, **TypeScript** en modo estricto) con **Tailwind CSS 4** y un sistema de **design tokens** (`src/shared/constants/tokens/` + primitivos y modo oscuro en `src/index.css`).

Incluye: **cabecera** (navegación + drawer móvil con trampa de foco), **hero**, **Sobre mí**, **Proyectos** (lista + sincronización de scroll + modal de vistas), **Contacto** y **pie**; desplazamiento suave con **Lenis** (respetando `prefers-reduced-motion`), animaciones con **Motion** (`motion/react`, `MotionConfig reducedMotion="user"` global), **tema claro/oscuro** con transición (`ThemeProvider`) y carga diferida por sección (`React.lazy` + `Suspense`).

**Sitio público único (`es`):** el copy está en español en el código; no hay i18n multiidioma por ahora. La hora de contacto (**`OwnerLocalTime`**) usa `Intl` con **`navigator.language`** cuando no pasas la prop `locale`, con respaldo **`es-MX`**.

**Build:** artefacto en **`build/`**. Los plugins de Vite inyectan **título, metas, Open Graph**, **JSON-LD**, generan **`robots.txt`**, **`sitemap.xml`** y **`.well-known/security.txt`** a partir de **`VITE_PUBLIC_SITE_URL`** (ver [Variables de entorno](#variables-de-entorno)). En producción también optimizan PNG bajo rutas de proyectos y generan **`*.webp`** para `srcset`/`sizes`.

**Errores de render / red:** **`ErrorBoundary`** en **`main.tsx`** (límite raíz) y otro bajo **`<main>`** en **`App.tsx`**, agrupando las cuatro secciones lazy. Si varios chunks fallan, se muestra **un solo** fallback dentro del área del boundary (cabecera y pie siguen visibles).

**Rendimiento en cliente:** tras el arranque se registran métricas con la librería **`web-vitals`** (**LCP**, **INP**, **CLS**, **FCP**, **TTFB**). Por defecto en **desarrollo** se escribe **`console.warn` ‘[web-vitals]’** con valor y rating; en **producción** puedes enlazar **`reportWebVitals(callback)`** a analíticas (ver [`src/shared/utils/reportWebVitals.ts`](src/shared/utils/reportWebVitals.ts)).

**Calidad:** **React Compiler** (Babel + reglas ESLint; sin memoización manual salvo excepciones), ESLint (`jsx-a11y`, testing-library, …), **Knip**, Prettier, Husky (**pre-commit**, **commit-msg**), **Commitlint** con scopes en lista cerrada, GitHub Actions, workflow **React Doctor** en PRs (objetivo **100/100** con `react-doctor:full`), Dependabot.

---

## Stack

| Categoría       | Tecnología                                                                               |
| --------------- | ---------------------------------------------------------------------------------------- |
| **Build**       | Vite 7, `tsc -b` previo al bundle                                                        |
| **UI**          | React 19 + **React Compiler**, Motion (`motion/react`), **`cn`** (clsx + tailwind-merge) |
| **Estilos**     | Tailwind CSS 4 (`@tailwindcss/vite`), tokens TS + tema en `index.css`                    |
| **Scroll**      | Lenis dentro de **`SmoothScrollRoot`**                                                   |
| **Test**        | Vitest 4, Testing Library, jsdom; **vitest-axe** + **axe-core** en flujos clave          |
| **Rendimiento** | **`web-vitals`** (runtime); auditorías Lighthouse manuales (DevTools / PageSpeed)        |
| **Deploy**      | **`gh-pages`** → rama `gh-pages`; scripts **`deploy`** / **`deploy:pages`**              |

**Alias:** `@` → **`src`** (en `vite.config.ts` y `tsconfig.app.json`).

---

## Estructura del código

```
src/
├── main.tsx              # StrictMode → ErrorBoundary raíz → App; reportWebVitals()
├── App.tsx               # LazyMotion, MotionConfig, ThemeProvider, Lenis shell, Header, main (grain + ErrorBoundary + Suspense ×4), Footer lazy
├── index.css             # Tailwind @import, tokens CSS, modo oscuro, utilidades (.u-*)
├── components/           # Secciones de página por dominio (About, Hero, Projects, …)
├── shared/
│   ├── components/      # Modal (+ subcomponentes), carrusel, ThemeToggle, ErrorBoundary, SiteLogo, …
│   ├── constants/       # siteProfile/, siteTimezone, breakpoints, theme.ts, tokens/, skills/, motion/
│   ├── hooks/, utils/
│   └── icons/
└── test/                 # setup.ts, vitest-axe.d.ts; helpers/ (renderWithMotion, mocks, barrel `index.ts`)
```

- **`siteProfile`** (`siteProfile/siteProfile.ts`) se importa también en **`vite.config.ts`** para SEO en tiempo de build (acople intencional; documentado en auditoría).
- **`MEDIA_QUERY_REDUCED_MOTION`** en **`breakpoints.ts`** centraliza `prefers-reduced-motion` (tema, parallax de BackgroundBoxes, etc.).

---

## Scripts (`npm run …`)

| Script                                          | Descripción                                                                                                                                    |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`                                           | Servidor de desarrollo Vite                                                                                                                    |
| `build` / `build:github`                        | Producción estándar o modo **`github`** (`.env.github`) para subruta Pages                                                                     |
| `preview` / `preview:build`                     | Preview del contenido ya construido en **`build/`**                                                                                            |
| `deploy` / `deploy:pages`                       | **`gh-pages`** (segundo script fuerza **`build:github`**)                                                                                      |
| `optimize:public`                               | Comprime assets en **`public/`** (CV, foto, OG, capturas) vía **`scripts/optimize-public-assets.mjs`**                                         |
| `lint`                                          | **ESLint** + **`scripts/check-tsdoc.mjs`** (cabeceras TSDoc en barrels, fuente y tests)                                                        |
| `lint:tsdoc`                                    | Solo **`check-tsdoc.mjs`** (sin ESLint; útil para iterar cabeceras)                                                                            |
| `lint:exports`                                  | Barrels sin nombres duplicados en re-exports (`scripts/check-exports.mjs`)                                                                     |
| `lint:env`                                      | Variables **`VITE_*`** presentes según `.env.example` y modo Vite (por defecto `production`)                                                   |
| `lint:env:strict`                               | Igual que `lint:env` pero falla si alguna **`VITE_*`** está vacía                                                                              |
| `knip`                                          | Dependencias/export/archivos huérfanos ([Knip](https://knip.dev/); ver `knip.json`)                                                            |
| `format` / `format:check`                       | Prettier                                                                                                                                       |
| `typecheck`                                     | **`tsc -b --noEmit`**                                                                                                                          |
| `test`, `test:watch`, `test:changed`, `test:ui` | Vitest                                                                                                                                         |
| `test:coverage`                                 | Cobertura con umbrales (`vite.config.ts`); genera informe **HTML** en **`coverage/`**                                                          |
| `test:coverage:ci`                              | Mismos umbrales; reporter solo **`text`** (logs de CI más ligeros; sin depender del HTML)                                                      |
| `check`                                         | **`format:check` → `lint` → `lint:exports` → `lint:env` → `typecheck` → `knip` → `test`** (mismo orden que `check:ci`, sin cobertura ni build) |
| `check:ci`                                      | **`format:check` → `lint` → `lint:exports` → `lint:env` → `typecheck` → `knip` → `test:coverage:ci` → `build`** (mismo bloque que CI)          |
| `check:extended`                                | **`check`** + **`react-doctor:full`** (gate local + auditoría React completa; opcional pre-release)                                            |
| `react-doctor`                                  | Diagnóstico React (**diff** vs `develop` por defecto; ver `doctor.config.ts`; override: `npm run react-doctor -- --diff <rama>`)               |
| `react-doctor:full`                             | Auditoría completa del repo (`--diff false`; objetivo **100/100** en reglas React Doctor)                                                      |
| `tsdoc:fill-placeholders`                       | Sustituye placeholders tras `node scripts/check-tsdoc.mjs --fix` (ver [`scripts/README.md`](scripts/README.md))                                |
| `tsdoc:fill-placeholders:dry`                   | Vista previa sin escribir archivos                                                                                                             |
| `tsdoc:homogenize-barrels`                      | Homogeneiza texto TSDoc en barrels (migración puntual)                                                                                         |
| `tsdoc:homogenize-barrels:dry`                  | Vista previa sin escribir                                                                                                                      |
| `tsdoc:fix-empty-module`                        | Repara `@module` vacíos en barrels                                                                                                             |
| `tsdoc:fix-test-double-blank`                   | Repara doble línea en blanco en cabeceras de tests                                                                                             |
| `prepare`                                       | Husky                                                                                                                                          |

**Salida de build:** **`build/`**, no **`dist/`** (fijado en `vite.config.ts`).

---

## GitHub Pages (`…/portfolio-v2/` o subpath similar)

1. **Settings → Pages:** rama **`gh-pages`**, carpeta **root**.
2. Definir **`VITE_BASE_PATH`** y **`VITE_PUBLIC_SITE_URL`** coherentes antes de **`npm run deploy:pages`** / CI (véase [.env.github](.env.github) trackeado como plantilla de ejemplo para Pages).
3. **No** esperes cabeceras HTTP avanzadas (CSP completa, `X-Frame-Options`, etc.) solo con Pages: sirve ficheros estáticos. Para eso hace falta **proxy/CDN/hosting configurable** (`_headers`, workers, servidor propio). El proyecto documenta esa limitación en comentarios de **`vite.config.ts`** y en metas **`referrer` / `Permissions-Policy`** solo a nivel HTML.

---

## SEO: `robots.txt` y `sitemap.xml`

Se **generan en el plugin** `writeSeoFilesPlugin` dentro de **`vite.config.ts`** al **`closeBundle`** usando **`VITE_PUBLIC_SITE_URL`**.

**Importante:** no hay copias paralelas versionadas en **`public/`** para esos dos archivos, para evitar divergencias. Tras un **`npm run build`**, están en **`build/`** listos para Pages.

Otros assets en **`public/`** (PDF CV, **`og-image.png`**, capturas PNG, íconos) siguen copiándose tal cual.

---

## Design system (resumen)

Convención: colores y espacio semánticos (`text-text-*`, `bg-bg-*`, …). Referencia rápida: [`src/shared/constants/tokens/readme.md`](src/shared/constants/tokens/readme.md) y [`src/index.css`](src/index.css).

Utilidad **`cn()`:** [`src/shared/utils/cn.ts`](src/shared/utils/cn.ts).

---

## Variables de entorno

| Aspecto                                                        | Detalle                                                                                                                                                                                                                                                                      |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prefijo público cliente                                        | Solo **`VITE_*`** llega de forma estable al bundle (`import.meta.env`). No uses secretos ahí.                                                                                                                                                                                |
| **`.env.example`**                                             | Lista mínima y documentada (**`VITE_BASE_PATH`**, **`VITE_PUBLIC_SITE_URL`** + nota sobre `PROD`, `BASE_URL`). Es la plantilla recomendada para nuevos clones.                                                                                                               |
| **`.env.development`** / `.env.production` / `.env.github`\*\* | Pueden estar versionadas en el repo cuando solo contienen **variables públicas** de ejemplo para cada modo. Manténlas **alineadas** con `.env.example` y con la URL real de despliegue (`VITE_PUBLIC_SITE_URL` sin slash final, coherente con `index.html` y el plugin SEO). |
| `import.meta.env`                                              | También **`PROD`**, **`DEV`**, **`MODE`**, **`BASE_URL`** los inyecta Vite.                                                                                                                                                                                                  |

Ejemplo rápido (PowerShell) para Pages:

```powershell
$env:VITE_BASE_PATH="/portfolio-v2/"
$env:VITE_PUBLIC_SITE_URL="https://frank345-sys.github.io/portfolio-v2"
npm run deploy:pages
```

---

## Accesibilidad y tests automatizados

- **Lint:** **`eslint-plugin-jsx-a11y`** (reglas recomendadas).
- **Unit / integración ligera:** algunos tests usan **`axe()`** de **vitest-axe** contra el árbol renderizado (**Modal abierto**, **MobileDrawer abierto**, **ImageCarousel multi-slide**). El matcher **`toHaveNoViolations`** se registra en [`src/test/setup.ts`](src/test/setup.ts).

**Fallo de imagen en carrusel:** fallback con **`<img alt="…">`** descriptivo e icono decorativo **`aria-hidden`** (sin **`role="alert"`** intrusivo en la carga de un slide).

Ejecutar toda la suite: **`npm run test`**. Para Motion + LazyMotion usar **`renderWithMotion`** (definido en [`src/test/helpers/renderWithMotion.tsx`](src/test/helpers/renderWithMotion.tsx), reexportado por **`@/test/helpers`**).

---

## Filosofía del pipeline

- **lint-staged**: Prettier y ESLint `--fix` en staged; **`check-tsdoc.mjs`** solo en archivos **`src/**/\*.{ts,tsx}`** staged (no escanea todo `src/` en cada commit).
- **pre-commit**: `lint-staged` → **`npm run test:changed`** → **`typecheck`** (ver `.husky/pre-commit`). Knip, `lint:exports`, `lint:env` y build siguen en **`check`** / **`check:ci`**.
- **commit-msg**: **Commitlint** con Conventional Commits y **scopes kebab-case** (detalle operativo en `commitlint.config.cjs` y en `.cursor/rules/commits-branches.mdc`).
- **Knip** en `check` y CI.
- **Pre-release opcional:** `npm run check:extended` (`check` + **`react-doctor:full`**). Config en **`doctor.config.ts`** (`diff: 'develop'`, `deadCode: false` para no duplicar Knip). Los scripts bajo **`scripts/`** están documentados en [`scripts/README.md`](scripts/README.md).

---

## TypeScript

`tsconfig.app.json`: modo estricto (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, etc.). **`npm run build`** ejecuta **`tsc -b`** antes de Vite.

---

## Estilos

`src/index.css`: **`@import 'tailwindcss'`**, primitivos, **`@theme`**, bloque **`.dark`**, utilidades `.u-*` (grano del `main`, skip link…). Prettier ordena clases Tailwind mediante **`prettier-plugin-tailwindcss`** (`tailwindFunctions`: `clsx`, **`cn`**).

---

## Calidad en CI (`ci.yml`)

El workflow ejecuta **`npm run check:ci`** (véase **`package.json`**): **`format:check`** → **`lint`** → **`lint:exports`** → **`lint:env`** → **`typecheck`** → **`knip`** → **`test:coverage:ci`** → **`build`**.

Workflow **`react-doctor`** en PRs hacia **`main`** / **`develop`** (versión fijada en `package.json`, p. ej. **0.4.0**; `npm exec` en CI, sin `@latest`). Modo **`--diff origin/<base>`** con **`--blocking error`** y comentario en el PR. Local: `npm run react-doctor` (diff vs **`develop`**, por defecto en `doctor.config.ts`; override: `npm run react-doctor -- --diff <rama>`); auditoría completa del repo: `npm run react-doctor:full` (**`--diff false`**, gate **100/100**). **`deadCode: false`** evita duplicar Knip; **`react-doctor-report.txt`** está en **`.gitignore`**. El workflow **falla** si hay issues tras publicar el comentario.

---

## Gitflow (resumen breve)

Ramas **`main`** (producción), **`develop`**, **`feat/*`**, **`fix/*`**, **`chore/*`**, **`release/*`**, **`hotfix/*`**. Convenciones y scopes de Commitlint descritos en la regla de commits del repo. Evitar push directo a **`main`** sin proceso.

---

## Instalación

Requisitos: **Node ≥ 20**, npm.

```bash
git clone <url-del-repo>
cd portfolio-v2
npm install   # ejecuta también `prepare` → Husky
```

---

## Mejoras posibles fuera del alcance actual

- Alimentar **`reportWebVitals`** con **`navigator.sendBeacon`**, dataLayer u otro backend.
- i18n estructurada (mensajes externos, rutas por idioma) si el producto crece más allá de un solo idioma.
- **Cabeceras HTTP** fuertes (CSP granular, **`frame-ancestors`**, políticas nuevas): requiere infraestructura distinta de “solo ficheros HTML en gh-pages”.
- Opcional: **`canvas`** en entorno de test para eliminar warnings de axe/jsdom relacionados con `getContext`.

---

## Reglas Cursor / IA

Directorio **`.cursor/rules/`** con convenciones (commits, diseño, motion, tokens). Skills en **`.cursor/skills/`** para auditorías (accesibilidad, SEO, CWV, calidad) y guías de stack (React, Vite, Vitest, TypeScript, Tailwind, Node).

---

## License

Repositorio de uso personal; añade un **`LICENSE`** si publicas con términos explícitos.
