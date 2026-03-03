# Frank González — Frontend Developer

[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0.18-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![CI](https://github.com/OWNER/portfolio-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/portfolio-v2/actions/workflows/ci.yml)

> Reemplaza `OWNER` por tu usuario u organización de GitHub para que el badge de CI apunte a tu repositorio.

---

## 📌 Descripción del proyecto

**portfolio-v2** es una SPA (Single Page Application) que sirve como portfolio personal de Frank González. Está construida con React 19, Vite 7 y TypeScript en modo estricto, utiliza Tailwind CSS 4 para estilos y un sistema de design tokens con colores semánticos. Incluye una pipeline de calidad completa: ESLint, Prettier, Husky (pre-commit y commit-msg), lint-staged, Commitlint (local y en CI) y dos workflows de GitHub Actions (CI y validación de mensajes de commit).

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
| **CI**            | GitHub Actions: workflow `ci.yml` (lint, typecheck, test, build) y workflow `commitlint.yml` (validación de mensajes)                 |

**Alias:** `@` → `src` en `vite.config.ts` y `tsconfig.app.json`.

---

## 📂 Estructura del proyecto

```
src/
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── components/
│   ├── AboutSection/
│   │   ├── AboutSection.tsx
│   │   ├── AboutSection.test.tsx
│   │   └── index.ts
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
│   ├── ContactSection/
│   │   ├── ContactSection.tsx
│   │   ├── ContactSection.test.tsx
│   │   └── index.ts
│   ├── HeroSection/
│   │   ├── HeroSection.tsx
│   │   ├── HeroSection.test.tsx
│   │   └── index.ts
│   └── ProjectsSection/
│       ├── ProjectsSection.tsx
│       ├── ProjectsSection.test.tsx
│       └── index.ts
├── shared/
│   ├── components/
│   │   ├── ThemeToggle.tsx
│   │   └── ThemeToggle.test.tsx
│   ├── constants/
│   │   ├── animation.ts
│   │   ├── badge.ts
│   │   ├── button.ts
│   │   ├── index.ts
│   │   ├── input.ts
│   │   ├── layout.ts
│   │   ├── readme.md
│   │   ├── typography.ts
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   └── useTheme.test.ts
│   └── utils/
│       └── cn.ts
└── test/
    └── setup.ts
```

- **`src/main.tsx`** — Punto de entrada; monta la app con React StrictMode y comprobación segura del elemento `#root`.
- **`src/App.tsx`** — Componente raíz: header con ThemeToggle y main con las cuatro secciones (Hero, About, Projects, Contact).
- **`src/components/`** — Secciones de la página: HeroSection, AboutSection, ProjectsSection, ContactSection y el componente reutilizable Button. Cada sección tiene su `.tsx`, `.test.tsx` e `index.ts`.
- **`src/shared/components/`** — Componentes compartidos (ThemeToggle) y sus tests.
- **`src/shared/constants/`** — Design tokens (tipografía, layout, botones, badges, animación, input) y documentación interna.
- **`src/shared/hooks/`** — Hooks reutilizables (useTheme) y sus tests.
- **`src/shared/utils/`** — Utilidades (cn para combinar clases).
- **`src/test/setup.ts`** — Setup global de Vitest (importa `@testing-library/jest-dom`).

---

## ⚙️ Scripts disponibles

Definidos en `package.json`. Uso: `npm run <script>`.

| Script            | Comando                                              | Descripción                                               |
| ----------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| **dev**           | `vite`                                               | Servidor de desarrollo con HMR.                           |
| **build**         | `tsc -b && vite build`                               | Type-check y build de producción.                         |
| **preview**       | `vite preview`                                       | Sirve el build en local.                                  |
| **lint**          | `eslint .`                                           | Lint de todo el proyecto.                                 |
| **format**        | `prettier --write .`                                 | Formateo con Prettier.                                    |
| **prepare**       | `husky`                                              | Instala hooks de Husky (post-`npm install`).              |
| **test**          | `vitest run`                                         | Tests una vez.                                            |
| **test:watch**    | `vitest`                                             | Tests en watch.                                           |
| **test:changed**  | `vitest --changed --run`                             | Solo tests de archivos modificados vs. último commit.     |
| **test:ui**       | `vitest --ui --open`                                 | UI de Vitest en el navegador.                             |
| **test:coverage** | `vitest run --coverage && start coverage/index.html` | Cobertura y apertura del informe HTML (Windows: `start`). |
| **typecheck**     | `tsc --noEmit`                                       | Comprobación de tipos sin emitir archivos.                |

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

Commitlint está configurado **tanto en local como en CI**.

- **Local:** Se usa `@commitlint/cli` y `@commitlint/config-conventional` como devDependencies. El archivo `commitlint.config.cjs` en la raíz extiende `@commitlint/config-conventional`. El hook **commit-msg** de Husky ejecuta `npx commitlint --edit "$1"` y valida el mensaje antes de que el commit quede registrado.
- **CI:** El workflow `.github/workflows/commitlint.yml` se dispara en **push** y **pull_request** (todas las ramas). Tras checkout con historial completo (`fetch-depth: 0`), Node 20 y `npm ci`, se ejecuta Commitlint sobre el rango de commits:
  - **En push:** `npx commitlint --from ${{ github.event.before }} --to ${{ github.sha }} --verbose`
  - **En pull_request:** `npx commitlint --from ${{ github.event.pull_request.base.sha }} --to ${{ github.event.pull_request.head.sha }} --verbose`

Si algún mensaje del rango no cumple la convención, el job falla.

### lint-staged

En `package.json`, clave `"lint-staged"`: archivos `*.{js,jsx,ts,tsx}`; comandos en orden `prettier --write` y `eslint --fix`. Solo se procesan archivos en staging en el momento del pre-commit. Prettier va primero para que ESLint (con eslint-config-prettier) no marque conflictos de formato.

---

## 🔁 Flujo commit → push → PR

1. Crear rama desde `main` (o la rama base).
2. Desarrollar usando el alias `@/` para imports desde `src/`.
3. Opcional en local: `npm run format`, `npm run lint`, `npm run test`, `npm run typecheck`.
4. `git add` y `git commit`:
   - **pre-commit** ejecuta lint-staged, `test:changed` y typecheck; si algo falla, el commit no se completa.
   - **commit-msg** ejecuta Commitlint sobre el mensaje; si el formato no es válido, el commit se aborta.
5. `git push`. En GitHub se ejecutan los workflows:
   - **ci.yml:** lint, typecheck, test, build.
   - **commitlint.yml:** validación de mensajes de commit en el rango subido.
6. Abrir PR; usar la plantilla `.github/pull_request_template.md` si existe. Los mismos workflows validan la rama y los mensajes de los commits del PR.

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
