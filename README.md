# portfolio-v2

SPA de portfolio personal. El **perfil unificado** (nombre, rol, títulos de página, metadatos, JSON-LD) vive en [`src/shared/constants/siteProfile.ts`](src/shared/constants/siteProfile.ts).

[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![CI](https://github.com/Frank345-sys/portfolio-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/Frank345-sys/portfolio-v2/actions/workflows/ci.yml)

---

## Descripción

**portfolio-v2** es una **SPA** (React 19, Vite 7, TypeScript estricto) con **Tailwind CSS 4** y un sistema de **design tokens** (tipografía, layout, colores semánticos en `index.css`).

Incluye: **Header** (nav + menú móvil), **Hero**, **Sobre mí** (bio, experiencia, formación, skills, certificaciones, valores), **Proyectos** (scroll sync + panel sticky), **Contacto** (tarjetas de enlaces) y **Footer**; desplazamiento suave con **Lenis** (respetando `prefers-reduced-motion`); animaciones con **Motion**; tema claro/oscuro.

**Build:** el artefacto va a `build/`. Vite aplica plugins que inyectan título, metas, JSON-LD, `robots.txt`, `sitemap.xml` y `.well-known/security.txt` según `VITE_PUBLIC_SITE_URL` (ver [Variables de entorno](#variables-de-entorno)). Además, en producción optimiza PNG de `images/projects/` y genera `-600.webp` / `-1200.webp` para consumo responsive en tarjetas y lightbox. **GitHub Pages** no añade cabeceras HTTP del repo; metas de `referrer` y `Permissions-Policy` complementan (no sustituyen CSP en servidor).

**Calidad en repo:** ESLint (incl. `jsx-a11y`, React Compiler, testing-library), Prettier, Husky (pre-commit, commit-msg), **Commitlint** con scopes enumerados, CI en GitHub Actions, workflow opcional de **React Doctor** en PRs, Dependabot. Documentación viva de tokens: [`src/shared/constants/tokens/readme.md`](src/shared/constants/tokens/readme.md).

---

## Stack

| Categoría   | Tecnología                                                                                                                  |
| ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Build**   | Vite 7, `tsc -b` antes del bundle                                                                                           |
| **UI**      | React 19, **Motion** (`motion/react`), class-variance-authority, `cn` (clsx + tailwind-merge)                               |
| **Estilos** | Tailwind CSS 4 (`@tailwindcss/vite`), tokens en `src/shared/constants/tokens/`, primitivos y modo oscuro en `src/index.css` |
| **Scroll**  | Lenis bajo `SmoothScrollRoot`                                                                                               |
| **Tests**   | Vitest 4, Testing Library, jsdom, umbrales de cobertura en `vite.config.ts`                                                 |
| **Deploy**  | `gh-pages` → rama `gh-pages` (script `deploy:pages` con modo `github`)                                                      |

**Alias:** `@` → `src` (`vite.config.ts`, `tsconfig`).

---

## Estructura del código

```
src/
├── main.tsx, App.tsx, index.css
├── components/
│   ├── AboutSection/       # subcomponents, __tests__, constants, types
│   ├── ContactSection/
│   ├── Footer/
│   ├── Header/
│   ├── HeroSection/
│   ├── ProjectsSection/    # hooks, subcomponents, tests
│   └── ...
├── shared/
│   ├── components/         # carrusel, LinkCard, ThemeToggle, TimelineItem, etc.
│   ├── constants/          # siteProfile, tokens/, skills/, enums/
│   ├── hooks/
│   └── utils/              # cn, parseEmphasis, …
└── test/                   # setup, renderWithMotion, helpers solo-test
```

- **`App.tsx`:** skip link, grano de fondo, `Header`, `main` (Hero, About, Projects, Contact), `Footer`, todo bajo `SmoothScrollRoot` + `LazyMotion` / `MotionConfig`.
- **`src/shared/constants/siteProfile.ts`:** nombre visible, rol, textos SEO y JSON-LD; consumido por Vite, secciones y tests afines.
- **Tema visual:** `ThemeToggle` persiste en `localStorage`, sincroniza clase `dark` en `<html>`, actualiza `meta[name="theme-color"]` dinámicamente y `src/index.css` declara `color-scheme` para controles nativos en claro/oscuro.

---

## Scripts (`npm run …`)

| Script                                             | Descripción                                                                                                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dev`                                              | Servidor de desarrollo (HMR).                                                                                                                                                        |
| `build`                                            | `tsc -b && vite build` → salida en **`build/`**.                                                                                                                                     |
| `build:github`                                     | Build con modo `github` (usa `.env.github` si existe) para publicar bajo `VITE_BASE_PATH` del repo.                                                                                  |
| `preview` / `preview:build`                        | Previsualizar el build local.                                                                                                                                                        |
| `deploy`                                           | `build` + `gh-pages` a rama `gh-pages` (flujo base `VITE_BASE_PATH=/` si no se define otra).                                                                                         |
| `deploy:pages`                                     | `build:github` + `gh-pages` (recomendado para el subpath de GitHub Pages).                                                                                                           |
| `lint`                                             | ESLint en todo el proyecto.                                                                                                                                                          |
| `format` / `format:check`                          | Prettier.                                                                                                                                                                            |
| `typecheck`                                        | `tsc --noEmit`.                                                                                                                                                                      |
| `test` / `test:watch` / `test:changed` / `test:ui` | Vitest.                                                                                                                                                                              |
| `test:coverage` / `test:coverage:ci`               | Cobertura (local: en Windows abre el HTML; en macOS/Linux abrir `coverage/index.html` manualmente o con `open`/`xdg-open`).                                                          |
| `check`                                            | `typecheck` → `format:check` → `lint` → `test` (rápido).                                                                                                                             |
| `check:ci`                                         | Igual que la CI: `format:check` → `lint` → `typecheck` → `test:coverage:ci` → `build`.                                                                                               |
| `lighthouse:pages`                                 | Audita en headless la URL pública (por defecto GitHub Pages); genera `lighthouse-report.html` (ignorada por git). Requiere Chromium; en Windows a veces `CHROME_PATH` a Edge/Chrome. |
| `prepare`                                          | Instala hooks de Husky.                                                                                                                                                              |

### GitHub Pages (subruta `…/repo/`)

1. **Settings → Pages:** rama `gh-pages`, carpeta `/ (root)`.
2. Definir **base** y **URL canónica** antes de build, p. ej. en `.env.github` o en la sesión:

   ```bash
   # Windows PowerShell
   $env:VITE_BASE_PATH="/portfolio-v2/"; $env:VITE_PUBLIC_SITE_URL="https://frank345-sys.github.io/portfolio-v2/"; npm run deploy:pages
   ```

3. Ajusta `/portfolio-v2/` y la URL a tu usuario y nombre de repo. La primera publicación crea/actualiza `gh-pages` con el contenido de `build/`.

**Detalle de salida de build:** no es `dist/`, sino **`build/`** (fijado en `vite.config.ts` para alinear con `gh-pages`).

---

## Design system (resumen)

Convención: colores y espaciado semánticos vía clases `text-text-*`, `bg-bg-*`, `border-stroke-*`, `shadow-elevation-*`, etc. — ver [`src/index.css`](src/index.css) y [tokens/readme](src/shared/constants/tokens/readme.md).

| Módulo (TS)     | Export                           | Rol                                                      |
| --------------- | -------------------------------- | -------------------------------------------------------- |
| `typography.ts` | `TYPOGRAPHY`, `PRIMARY_NAV_LINK` | Títulos, párrafos, links, special                        |
| `layout.ts`     | `LAYOUT`                         | Secciones, grids, prose, dividers, spacing               |
| `button.ts`     | `BUTTON`                         | Variantes, tamaños, CTA, grupos                          |
| `card.ts`       | `CARD`                           | Superficies, interactivo, overlay, layout interno        |
| `badge.ts`      | `BADGE`                          | Badges, chips, dots, grupos                              |
| `animation.ts`  | `ANIMATION`                      | Transiciones, stagger, scroll, loading                   |
| `brand.ts`      | `BRAND`                          | Tamaño de icono de marca (header/footer)                 |
| `z.ts`          | `Z`                              | Capas (header, modal, drawer móvil, …)                   |
| `index.ts`      | Re-export                        | No hay módulo `INPUT` (sin formularios con ese sistema). |

`import { … } from '@/shared/constants/tokens'`.

Utilidad: **`cn()`** en `src/shared/utils/cn.ts` (clsx + tailwind-merge).

---

## Filosofía del pipeline (pre-commit y CI)

- **lint-staged** (`--no-stash`): Prettier y ESLint solo en archivos en staging; evita el fallo de `git apply` al restaurar.
- **test:changed:** Vitest solo sobre cambios respecto al commit anterior — rápido; la suite completa y cobertura corren en CI o con `check:ci`.
- **typecheck** en pre-commit: no subir tipos rotos.
- **Commitlint** (hook `commit-msg`, no el pre-commit): valida [Conventional Commits](https://www.conventionalcommits.org/) con **scopes en lista cerrada** y **kebab-case**; **longitud mínima del scope 2**; asunto con **máximo 100 caracteres** en el encabezado. Detalle: `commitlint.config.cjs`.

Efecto: formato consistente, tests afectados en verde, tipos correctos, mensajes de commit legibles y filtrables.

---

## Tests

- **Runner:** Vitest, entorno `jsdom`, setup en `src/test/setup.ts` (jest-dom, `matchMedia` para temas y Motion).
- **Cobertura:** umbrales en `vite.config.ts` (líneas, funciones, ramas, statements); `test:coverage:ci` en CI.
- **Cantidad:** decenas de archivos de test bajo `**/__tests__/**` y `*.test.ts(x)`; ejecutar `npm run test` para el recuento actual.

`renderWithMotion` envuelve pruebas que usan componentes con Motion/LazyMotion.

---

## TypeScript

`tsconfig.app.json`: opciones estrictas (`noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`, etc.). `npm run build` ejecuta `tsc -b` antes de Vite.

---

## Estilos

`src/index.css`: `@import 'tailwindcss'`, primitivos en `:root`, `@theme` con tokens semánticos, bloque **`.dark`**. Prettier con `prettier-plugin-tailwindcss` y `tailwindFunctions: ['clsx', 'cn']`.

Incluye además:

- `html { color-scheme: light; }`
- `html.dark { color-scheme: dark; }`

Esto alinea widgets nativos del navegador (inputs, scrollbars y controles del UA) con el tema activo.

---

## Calidad: Husky y CI

| Evento            | Qué corre                                                        |
| ----------------- | ---------------------------------------------------------------- |
| **pre-commit**    | `lint-staged` → `test:changed` → `typecheck`                     |
| **commit-msg**    | `commitlint --edit`                                              |
| **CI** (`ci.yml`) | `format:check`, `lint`, `typecheck`, `test:coverage:ci`, `build` |
| **PR (opcional)** | Workflow `react-doctor`                                          |

---

## Gitflow (resumen)

Ramas `main` (producción), `develop` (integración), ramas `feat/*`, `fix/*`, `chore/*`, `release/*`, `hotfix/*` según el flujo acordado en el equipo. **No** hacer push directo a `main` sin proceso.

---

## Instalación

Requisito: **Node 20+**, npm.

```bash
git clone <url>
cd portfolio-v2
npm install
```

`npm install` dispara `prepare` (Husky).

---

## Variables de entorno

- Prefijo **`VITE_`**, lectura con `import.meta.env` (nunca `process.env` en código de app).
- Útiles en build: **`VITE_BASE_PATH`** (p. ej. `/portfolio-v2/`), **`VITE_PUBLIC_SITE_URL`** (URL canónica del sitio desplegado, para sitemap, JSON-LD y `security.txt`).
- Vite carga `.env`, `.env.local`, y por **modo** `.env.[mode]` (p. ej. `development`, `production`, `github`).

### SEO/tema: `theme-color` dinámico

- `index.html` declara un `meta` base:

  ```html
  <meta name="theme-color" content="#ffffff" id="meta-theme-color" />
  ```

- `useTheme` lo sincroniza al tema activo:
  - `light` → `#ffffff`
  - `dark` → `#111111`

Con esto, la barra de dirección del navegador móvil refleja el tema real de la app (no solo `prefers-color-scheme` del sistema).

No commitear secretos; `.env` local en `.gitignore` si aplica.

---

## Mejoras futuras ( ideas )

- Afinar **imágenes** (formatos modernos, `srcset` / tamaños) según presupuesto y CDN.
- **Cobertura** multiplataforma en script (`open` / `xdg-open`) para el informe HTML.
- Cualquier **CSP o cabeceras** estrictas requieren hosting con control (no solo HTML estático en Pages).

Documentación de Cursor: reglas en `.cursor/rules/`, skills en `.cursor/skills/` (pueden resumirse en `.agents/` local si se usa; esa carpeta no se versiona).

---

## License

Repositorio privado / uso personal; añade un `LICENSE` si publicas y quieres términos explícitos.
