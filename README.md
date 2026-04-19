# Frank González — Frontend Developer

[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0.18-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![CI](https://github.com/OWNER/portfolio-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/portfolio-v2/actions/workflows/ci.yml)

> Reemplaza `OWNER` por tu usuario u organización de GitHub para que el badge de CI apunte a tu repositorio.

---

## 📌 Descripción del proyecto

**portfolio-v2** es una SPA (Single Page Application) que sirve como mi portfolio personal. Está construida con React 19, Vite 7 y TypeScript en modo estricto, utiliza Tailwind CSS 4 para estilos y un sistema de design tokens con colores semánticos. Incluye una pipeline de calidad completa: ESLint, Prettier, Husky (pre-commit y commit-msg), lint-staged, Commitlint (local y en CI) y workflows de GitHub Actions (CI, validación de mensajes, React Doctor en PRs y Dependabot). Para asistentes de IA en local: guías en `.agents/AGENTS.md` (índice) y `.agents/react-doctor/AGENTS.md` (React Doctor). Esa carpeta **no se versiona** (ver `.gitignore`); en GitHub el código y la CI siguen siendo la referencia pública.

---

## 🚀 Stack tecnológico

| Categoría         | Tecnología                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Runtime**       | Node (npm)                                                                                                                            |
| **Build**         | Vite 7.2.4                                                                                                                            |
| **Framework**     | React 19.2.0                                                                                                                          |
| **Lenguaje**      | TypeScript 5.9.3 (strict)                                                                                                             |
| **Estilos**       | Tailwind CSS 4.1.18 (`@tailwindcss/vite`)                                                                                             |
| **Design System** | Tokens en `src/shared/constants/` (TYPOGRAPHY, LAYOUT, BUTTON, BADGE, ANIMATION, INPUT) + tokens semánticos en `index.css`            |
| **Testing**       | Vitest 4.0.18, @testing-library/react 16.3.2, @testing-library/user-event 14.6.1, @testing-library/jest-dom 6.9.1, jsdom 28.1.0       |
| **Linting**       | ESLint 9.39.1 (flat config), typescript-eslint 8.46.4, eslint-plugin-react-hooks, eslint-plugin-react-refresh, eslint-config-prettier |
| **Formateo**      | Prettier 3.8.1, prettier-plugin-tailwindcss 0.7.2                                                                                     |
| **Git hooks**     | Husky 9.1.7, lint-staged 16.3.0                                                                                                       |
| **CI**            | GitHub Actions: workflow `ci.yml` (formato, lint, typecheck, cobertura, build), `commitlint.yml` y Dependabot semanal                 |

**Alias:** `@` → `src` en `vite.config.ts` y `tsconfig.app.json`.

---

## 📂 Estructura del proyecto

```
src/
├── App.tsx
├── index.css
├── main.tsx
├── components/
│   ├── AboutSection/       # sección “Sobre mí” + __tests__
│   ├── Footer/             # pie de página (copyright + enlaces)
│   ├── Header/             # barra + __tests__ (subcomponents, constants)
│   ├── HeroSection/
│   ├── ProjectsSection/    # hooks/, subcomponents/, ProjectsSection.test.tsx
│   └── ...
├── shared/
│   ├── components/         # Avatar, BadgeRow, ThemeToggle/, etc. + __tests__
│   ├── constants/          # tokens/, skills/, enums/
│   ├── hooks/
│   └── utils/
└── test/
    ├── setup.ts                 # jest-dom + mock de matchMedia (Motion / breakpoints)
    ├── renderWithMotion.tsx     # render con LazyMotion para tests de animación
    ├── stackSkillLabelSet.ts    # helper solo para tests de sincronía de skills
    └── stackSkillLabelSet.test.ts
```

- **`src/main.tsx`** — Punto de entrada; monta la app con React StrictMode, estilos globales (incl. Lenis) y comprobación segura del elemento `#root`.
- **`src/App.tsx`** — Raíz de la SPA: `SmoothScrollRoot` (Lenis si no hay `prefers-reduced-motion`), skip link, `Header` y `main` con Hero, About y Projects.
- **`src/components/`** — Secciones y piezas de dominio: p. ej. `Header/`, `HeroSection/`, `AboutSection/`, `ProjectsSection/` (cada una con tests y `index.ts` donde aplica).
- **`src/shared/components/`** — Componentes compartidos (ThemeToggle, SmoothScrollRoot, carruseles, etc.) y sus tests.
- **`src/shared/constants/`** — Design tokens (`tokens/`), skills y enums.
- **`src/shared/hooks/`** — Hooks reutilizables (p. ej. useFocusTrap) y tests.
- **`src/shared/utils/`** — Utilidades de producción (p. ej. `cn`).
- **`src/test/`** — Setup de Vitest, helpers de render y utilidades usadas solo en tests.

---

## ⚙️ Scripts disponibles

Definidos en `package.json`. Uso: `npm run <script>`.

| Script            | Comando                                              | Descripción                                               |
| ----------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| **dev**           | `vite`                                               | Servidor de desarrollo con HMR.                           |
| **build**         | `tsc -b && vite build`                               | Type-check y build de producción (salida en `build/`).    |
| **preview**       | `vite preview`                                       | Sirve el build en local.                                  |
| **preview:build** | `vite preview --outDir build`                        | Preview del artefacto generado en `build/`.               |
| **deploy**        | `npm run build && gh-pages -d build`                 | Sube el sitio a la rama `gh-pages` (GitHub Pages).        |
| **lint**          | `eslint .`                                           | Lint de todo el proyecto.                                 |
| **format**        | `prettier --write .`                                 | Formateo con Prettier.                                    |
| **format:check**  | `prettier --check .`                                 | Comprueba formato sin modificar archivos (como en CI).    |
| **check**         | `typecheck` → `format:check` → `lint` → `test`       | Comprobación local rápida antes de commitear.             |
| **check:ci**      | Mismo orden que `ci.yml` en GitHub Actions           | Cobertura con umbrales y `build`; ideal antes de PR/push. |
| **prepare**       | `husky`                                              | Instala hooks de Husky (post-`npm install`).              |
| **test**          | `vitest run`                                         | Tests una vez.                                            |
| **test:watch**    | `vitest`                                             | Tests en watch.                                           |
| **test:changed**  | `vitest --changed --run`                             | Solo tests de archivos modificados vs. último commit.     |
| **test:ui**       | `vitest --ui --open`                                 | UI de Vitest en el navegador.                             |
| **test:coverage** | `vitest run --coverage && start coverage/index.html` | Cobertura y apertura del informe HTML (Windows: `start`). |
| **typecheck**     | `tsc --noEmit`                                       | Comprobación de tipos sin emitir archivos.                |

### GitHub Pages (`gh-pages`)

1. En el repo: **Settings → Pages** → Source: rama `gh-pages`, carpeta `/ (root)`.
2. Sitio en subruta (`https://usuario.github.io/portfolio-v2/`): antes del build, define la base de Vite:

   ```bash
   set VITE_BASE_PATH=/portfolio-v2/
   npm run deploy
   ```

   (En PowerShell: `$env:VITE_BASE_PATH="/portfolio-v2/"; npm run deploy`.) Ajusta `/portfolio-v2/` al nombre real del repositorio.

3. Dominio propio o `username.github.io` con sitio en la raíz: usa `VITE_BASE_PATH=/` (por defecto) y `npm run deploy`.
4. La primera vez, `gh-pages` crea/actualiza la rama `gh-pages` con el contenido de `build/`. Requiere permisos de push al remoto.

**test:coverage:** El comando actual usa `start`, que es **solo para Windows**. En otros sistemas, tras ejecutar `vitest run --coverage`:

- **macOS:** `open coverage/index.html`
- **Linux:** `xdg-open coverage/index.html` o abrir manualmente `coverage/index.html` en el navegador.

---

## 🎨 Design System

El proyecto usa un sistema de design tokens en `src/shared/constants/` para mantener tipografía, layout, componentes y colores de forma consistente.

### Archivos de tokens y qué exporta cada uno

| Archivo         | Export principal | Contenido                                                                                        |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| `typography.ts` | `TYPOGRAPHY`     | Títulos, headings, párrafos, labels, links, variantes especiales y base.                         |
| `layout.ts`     | `LAYOUT`         | Contenedores, secciones, espaciado, grid, flex, cards, hero, CTA, header, footer, divider.       |
| `button.ts`     | `BUTTON`         | Base, tamaños, variantes, especiales (CTA, link, icon), grupos.                                  |
| `badge.ts`      | `BADGE`          | Base, tamaños, variantes, especiales (dot, pill, chip), estados, grupos.                         |
| `animation.ts`  | `ANIMATION`      | Transiciones, hover, fade, slide, bounce, spin, pulse, stagger, scroll, loading.                 |
| `input.ts`      | `INPUT`          | Base (input y textarea), label (default y required), helper, group vertical.                     |
| `index.ts`      | —                | Re-exporta todo (`export *` y `export { TYPOGRAPHY, LAYOUT, BUTTON, BADGE, ANIMATION, INPUT }`). |

`INPUT` se importa como `import { INPUT } from '@/shared/constants'` (vía `export * from './input'`).

### Tokens semánticos de color en `src/index.css`

En `index.css` se definen variables CSS en `:root` (grises, azul, naranja, rojo, verde, amarillo, morado) y en el bloque `@theme` de Tailwind 4 los **tokens semánticos** usados en los componentes:

- **Texto:** `text-strong`, `text-subtle`, `text-soft`, `text-disabled`, `text-white`
- **Fondos:** `bg-weak`, `bg-soft`, `bg-subtle`, `bg-surface`, `bg-strong`, `bg-white`
- **Bordes:** `border-stroke-soft`, `border-stroke-subtle`, `border-stroke-strong`
- **Estados:** information, warning, error, success, idle, feature (base, dark, light, lighter)

El bloque `.dark` redefine estos tokens para modo oscuro. No se usan colores crudos (p. ej. `text-gray-600`) en componentes; se usan estos tokens.

### Utilidad `cn()`

En `src/shared/utils/cn.ts`, `cn` combina **clsx** y **tailwind-merge**: une y normaliza clases condicionales y evita conflictos entre clases de Tailwind.

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Ejemplo de uso

```ts
import { TYPOGRAPHY, LAYOUT, BUTTON } from '@/shared/constants'
import { cn } from '@/shared/utils/cn'

// En un componente
<section className={LAYOUT.section.hero}>
  <h1 className={TYPOGRAPHY.title.hero}>Título</h1>
  <button className={cn(BUTTON.base.default, BUTTON.variant.primary, BUTTON.size.lg)}>
    Acción
  </button>
</section>
```

---

## 🧠 Filosofía del Setup

Esta sección documenta el razonamiento detrás de las decisiones del pipeline de pre-commit y su relación con la calidad de código.

**Por qué `vitest --changed` en pre-commit y no la suite completa**
Ejecutar solo los tests afectados por los archivos en staging reduce el tiempo del hook (segundos en lugar de minutos) y mantiene el feedback inmediato. La suite completa debe ejecutarse en CI o antes de merge; el pre-commit actúa como red de seguridad rápida para no subir cambios que rompan lo que se ha tocado. Así se evita que el desarrollador desactive el hook por lentitud y se controle la deuda en el código que se modifica.

**Por qué `--no-stash` en lint-staged**
lint-staged puede hacer stash de cambios no staged, ejecutar los linters y luego restaurar con `git apply`. En ciertos contextos (por ejemplo, primer commit, ramas nuevas o cambios parciales) ese flujo puede fallar con errores tipo "Needed a single revision" al pasar una referencia inválida a `git apply`. Con `--no-stash` se evita ese camino; solo se formatean/lintan los archivos staged. Si los comandos modifican el working tree, el desarrollador puede volver a hacer `git add`; no se intenta restaurar estado previo automáticamente. Es un trade-off aceptable para evitar fallos intermitentes del hook.

**Por qué el typecheck forma parte del commit gate**
TypeScript en modo estricto detecta errores de tipos y contratos antes de que lleguen a runtime o a revisión. Si el typecheck no está en el pre-commit, es fácil que se acumulen errores que solo aparecen en CI o en el build, retrasando la corrección. Incluirlo en el hook garantiza que cada commit que se sube cumple los tipos del proyecto y reduce fallos en integración.

**Qué resuelve cada capa**

- **lint-staged (Prettier + ESLint):** Formato consistente y reglas de estilo/calidad solo sobre lo que se commitea; evita ruido en el diff y desacopla estilo de revisión de código.
- **test:changed:** Asegura que los cambios no rompen tests existentes en los archivos tocados.
- **typecheck:** Asegura que el código cumple el contrato de tipos del proyecto.
- **Commitlint (local y en CI):** Valida que los mensajes sigan una convención (p. ej. Conventional Commits), lo que permite changelogs automáticos, versionado semántico y un historial legible.

**Efecto en deuda técnica y trabajo en equipo**
El pre-commit impide introducir, en un solo commit, violaciones de formato, regresiones en tests afectados y errores de tipos. El hook commit-msg valida el mensaje antes de que el commit se complete. La validación en CI mantiene el mismo estándar sobre los commits ya subidos. En conjunto, se evita que la deuda se acumule en el tronco y se alinea a todo el equipo con las mismas comprobaciones antes de push y en cada PR.

---

## 🧪 Testing

- **Runner:** Vitest 4.0.18, bloque `test` en `vite.config.ts`.
- **Entorno:** `jsdom`.
- **Setup:** `src/test/setup.ts` importa `@testing-library/jest-dom` (matchers como `toBeInTheDocument()`).
- **Globals:** `globals: true` en Vitest; se pueden usar `describe`, `it`, `expect`, `vi` sin importarlos (en los tests del proyecto se importan por claridad).
- **Cantidad actual:** 18 tests en 7 archivos (Button, HeroSection, AboutSection, ProjectsSection, ContactSection, ThemeToggle, useTheme).

**Umbrales de cobertura** (en `vite.config.ts` → `test.coverage.thresholds`): **lines** 80%, **functions** 80%, **branches** 70%, **statements** 80%. Si algún valor queda por debajo, `vitest run --coverage` falla.

**Comandos:** `npm run test` | `npm run test:watch` | `npm run test:changed` | `npm run test:ui` | `npm run test:coverage`.

**Generar informe de cobertura:** `npm run test:coverage` ejecuta Vitest con cobertura y en Windows abre el HTML con `start`. En macOS/Linux usar `open coverage/index.html` o `xdg-open coverage/index.html` tras `vitest run --coverage`.

---

## 🔍 Comprobación de tipos

`npm run typecheck` ejecuta `tsc --noEmit`. El proyecto usa la solución del `tsconfig.json` raíz (referencias a `tsconfig.app.json` y `tsconfig.node.json`); la app se comprueba con opciones estrictas en `tsconfig.app.json`. El build (`npm run build`) ejecuta `tsc -b` antes de `vite build`, así que la producción siempre pasa el typecheck.

Opciones de rigor adicionales en `tsconfig.app.json`:

- **noUncheckedIndexedAccess:** el acceso a índices en arrays/objetos indexables devuelve `T | undefined`.
- **noImplicitOverride:** los métodos que sobrescriben deben llevar `override`.
- **exactOptionalPropertyTypes:** las propiedades opcionales no aceptan `undefined` explícito salvo que el tipo lo incluya.

---

## 🎨 Estilos

Tailwind CSS 4.x vía `@tailwindcss/vite`. Punto de entrada: `src/index.css` con `@import 'tailwindcss'` y design tokens/estilos globales (tokens base en `:root`, semánticos en `@theme`, modo oscuro en `.dark`). Prettier usa `prettier-plugin-tailwindcss` con `tailwindFunctions: ["clsx", "cn"]` para ordenar clases (compatible con `cn()`).

---

## 🧰 Calidad de código

### Husky

El script `prepare` en `package.json` ejecuta `husky` tras `npm install`, instalando los hooks en `.husky`. Hay **dos hooks** configurados:

1. **pre-commit** (`.husky/pre-commit`): se ejecuta antes de cada `git commit`, en este orden:
   - `npx lint-staged --no-stash` — formateo y lint solo de archivos staged.
   - `npm run test:changed` — tests de archivos modificados.
   - `npm run typecheck` — comprobación de tipos.

   Si cualquiera falla, el commit se aborta.

2. **commit-msg** (`.husky/commit-msg`): se ejecuta tras escribir el mensaje de commit.
   - `npx --no -- commitlint --edit "$1"` — valida el formato del mensaje (Conventional Commits).
   - Si el mensaje no cumple la convención, el commit se aborta.

### Commitlint (local y en CI)

Commitlint está configurado **tanto en local como en CI**. Las siguientes restricciones se aplican automáticamente en cada commit mediante el hook **commit-msg** de Husky:

- **Subject en minúsculas** (sin mayúsculas salvo acrónimos si se permitieran; en la práctica usar todo en minúsculas).
- **Sin acentos ni caracteres especiales** en el subject (p. ej. usar "semanticas" en lugar de "semánticas").
- **Sin guiones** en palabras del subject (p. ej. "reexports" en lugar de "re-exports").
- **Scope mínimo 3 caracteres** (p. ej. usar `workflow` en lugar de `ci` para GitHub Actions).
- **Scope en kebab-case** (minúsculas y guiones; p. ej. `design-tokens` o `tokens`).
- **Header máximo 100 caracteres** (tipo + scope + descripción).

- **Local:** Se usa `@commitlint/cli` y `@commitlint/config-conventional` como devDependencies. El archivo `commitlint.config.cjs` en la raíz extiende `@commitlint/config-conventional` y define las reglas anteriores. El hook **commit-msg** de Husky ejecuta `npx commitlint --edit "$1"` y valida el mensaje antes de que el commit quede registrado.
- **CI:** El workflow `.github/workflows/commitlint.yml` se dispara en **push** y **pull_request** (todas las ramas). La validación de mensajes se ejecuta **solo en pull_request**: tras checkout con historial completo (`fetch-depth: 0`), Node 20 y `npm ci`, se ejecuta commitlint sobre el rango de commits entre la base y la cabeza del PR. Si la base no está disponible (por ejemplo, primer push a una rama nueva, SHA en ceros), se valida solo el último commit (HEAD~1..HEAD) para evitar el error "Invalid revision range".

### lint-staged

En `package.json`, clave `"lint-staged"`: archivos `*.{js,jsx,ts,tsx}`; comandos en orden `prettier --write` y `eslint --fix`. Solo se procesan archivos en staging en el momento del pre-commit. Prettier va primero para que ESLint (con eslint-config-prettier) no marque conflictos de formato.

---

## 🔁 Gitflow

Este proyecto sigue el modelo **Gitflow** con las siguientes ramas:

| Rama        | Tipo       | Propósito                                                                                           |
| ----------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `main`      | Permanente | Código en producción. Solo recibe merges desde `release/*` y `hotfix/*`                             |
| `develop`   | Permanente | Rama de integración. Todas las features se integran aquí                                            |
| `feat/*`    | Temporal   | Nueva funcionalidad. Se crea y mergea en `develop`                                                  |
| `fix/*`     | Temporal   | Corrección de bugs. Se crea y mergea en `develop`                                                   |
| `chore/*`   | Temporal   | Cambios de configuración. Se crea y mergea en `develop`                                             |
| `release/*` | Temporal   | Preparación de release. Se crea desde `develop`; luego merge a `main` (tag) y de vuelta a `develop` |
| `hotfix/*`  | Temporal   | Fix urgente en producción. Se crea desde `main`, mergea en `main` y `develop`                       |

### Flujo completo

1. Crear rama desde `develop`:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/nombre-feature
   ```

2. Desarrollar con commits atómicos siguiendo Conventional Commits.

3. Antes de cada commit, el pre-commit ejecuta automáticamente:
   lint-staged → test:changed → typecheck → commitlint

4. Abrir PR hacia `develop` usando la plantilla del proyecto.

5. CI debe pasar: lint + typecheck + test + build.

6. Merge a `develop`.

7. Cuando `develop` esté listo para una release:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/v1.0.0
   ```

   En la rama `release/*`: versión, changelog y solo fixes menores de cierre.

8. Abrir PR **release/v1.0.0** → **main**. Tras el merge, etiquetar en `main`:

   ```bash
   git checkout main
   git pull origin main
   git tag v1.0.0
   git push origin v1.0.0
   ```

9. Integrar la release en `develop` (PR **release/v1.0.0** → **develop** o merge de `main` en `develop`) para alinear ramas.

### Hotfix

Para bugs críticos en producción:

```bash
git checkout main
git checkout -b hotfix/nombre-bug
# fix the bug
# open PR to main AND develop
```

---

## 🛡️ Validaciones automáticas

| Ámbito                          | Ejecución                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Pre-commit (Husky)**          | lint-staged (Prettier + ESLint en `*.{js,jsx,ts,tsx}` staged) → `npm run test:changed` → `npm run typecheck`. |
| **Commit-msg (Husky)**          | commitlint (formato del mensaje de commit).                                                                   |
| **GitHub Actions — CI**         | lint + typecheck + test + build en push y pull_request (`ci.yml`).                                            |
| **GitHub Actions — Commitlint** | Validación de mensajes de commit en el rango de push/PR (`commitlint.yml`).                                   |

---

## 📦 Instalación

Requisitos: Node.js 20+, npm.

```bash
git clone <url-del-repositorio>
cd portfolio-v2
npm install
```

`npm install` ejecuta `prepare` e instala los hooks de Husky. No se documentan variables de entorno ni APIs externas en este README.

---

## 🏗️ Build y producción

```bash
npm run build
```

Ejecuta `tsc -b` y luego `vite build`. Salida en `dist/`. Servir en local: `npm run preview`.

---

## 🔮 Mejoras futuras

- Añadir **LICENSE** en la raíz si se define una licencia.
- Hacer el script `test:coverage` multiplataforma (p. ej. usando `open`/`xdg-open` según el SO) o documentar los comandos por plataforma en el README.
- Añadir **og:image** y **og:url** en `index.html` cuando el proyecto esté desplegado y se disponga de URL e imagen definitivas.
- Sustituir el contenido placeholder de las secciones por el contenido real del portfolio (textos, proyectos, enlaces).
- Lazy loading de secciones pesadas con `React.lazy` y `Suspense`.
- Optimizar imágenes con formatos WebP/AVIF y tamaños responsivos.
