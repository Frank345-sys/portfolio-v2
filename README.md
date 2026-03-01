# portfolio-v2

[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0.18-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

---

## 📌 Descripción del proyecto

**portfolio-v2** es una SPA construida con React, Vite y TypeScript en modo estricto. Incluye Tailwind CSS para estilos y una pipeline de calidad: ESLint, Prettier, Husky, lint-staged y validación de commits en GitHub Actions.

---

## 🚀 Stack tecnológico

| Categoría    | Tecnología |
|-------------|------------|
| **Runtime** | Node (npm) |
| **Build**   | Vite 7.x |
| **Framework** | React 19.x |
| **Lenguaje** | TypeScript 5.9.x (strict) |
| **Estilos** | Tailwind CSS 4.x (`@tailwindcss/vite`) |
| **Testing** | Vitest 4.x, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom, jsdom |
| **Linting** | ESLint 9.x (flat config), typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh, eslint-config-prettier |
| **Formateo** | Prettier 3.x, prettier-plugin-tailwindcss |
| **Git hooks** | Husky 9.x, lint-staged 16.x |
| **CI**       | GitHub Actions (Commitlint) |

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
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx
├── shared/
│   ├── components/
│   │   └── ThemeToggle.tsx
│   ├── constants/
│   │   ├── animation.ts
│   │   ├── badge.ts
│   │   ├── button.ts
│   │   ├── index.ts
│   │   ├── layout.ts
│   │   ├── readme.md
│   │   └── typography.ts
│   ├── hooks/
│   │   └── useTheme.ts
│   └── utils/
│       └── cn.ts
└── test/
    └── setup.ts
```

- **`src/main.tsx`** — Entrada; monta la app con React StrictMode.
- **`src/App.tsx`** — Componente raíz.
- **`src/components/`** — Componentes de dominio y sus tests.
- **`src/shared/`** — Componentes, constantes, hooks y utilidades compartidas.
- **`src/test/setup.ts`** — Setup de Vitest (importa `@testing-library/jest-dom`).

---

## ⚙️ Scripts disponibles

Definidos en `package.json`. Uso: `npm run <script>`.

| Script | Comando | Descripción |
|--------|---------|-------------|
| **dev** | `vite` | Servidor de desarrollo con HMR. |
| **build** | `tsc -b && vite build` | Type-check y build de producción. |
| **preview** | `vite preview` | Sirve el build en local. |
| **lint** | `eslint .` | Lint de todo el proyecto. |
| **format** | `prettier --write .` | Formateo con Prettier. |
| **prepare** | `husky` | Instala hooks de Husky (post-`npm install`). |
| **test** | `vitest run` | Tests una vez. |
| **test:watch** | `vitest` | Tests en watch. |
| **test:changed** | `vitest --changed --run` | Solo tests de archivos modificados vs. último commit. |
| **test:ui** | `vitest --ui --open` | UI de Vitest en el navegador. |
| **test:coverage** | `vitest run --coverage && start coverage/index.html` | Cobertura y apertura del informe HTML (Windows: `start`). |
| **typecheck** | `tsc --noEmit` | Comprobación de tipos sin emitir archivos. |

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
- **Commitlint (en CI):** Valida que los mensajes sigan una convención (p. ej. Conventional Commits), lo que permite changelogs automáticos, versionado semántico y un historial legible.

**Efecto en deuda técnica y trabajo en equipo**  
El pre-commit impide introducir, en un solo commit, violaciones de formato, regresiones en tests afectados y errores de tipos. La validación de mensajes en CI mantiene un historial estándar. En conjunto, se evita que la deuda se acumule en el tronco y se alinea a todo el equipo con las mismas comprobaciones antes de push y en cada PR.

---

## 🧪 Testing

- **Runner:** Vitest 4.x, bloque `test` en `vite.config.ts`.
- **Entorno:** `jsdom`.
- **Setup:** `src/test/setup.ts` importa `@testing-library/jest-dom` (matchers como `toBeInTheDocument()`).
- **Globals:** `globals: true`; se pueden usar `describe`, `it`, `expect`, `vi` sin import (en el ejemplo se importan por claridad).
- **Referencia:** `src/components/Button/Button.test.tsx` — render, consulta por rol, `userEvent`.

Comandos: `npm run test` | `npm run test:watch` | `npm run test:changed` | `npm run test:coverage`.

---

## 🔍 Comprobación de tipos

`npm run typecheck` ejecuta `tsc --noEmit`. El proyecto usa la solución del `tsconfig.json` raíz (referencias a `tsconfig.app.json` y `tsconfig.node.json`); la app se comprueba con opciones estrictas en `tsconfig.app.json`. El build (`npm run build`) ejecuta `tsc -b` antes de `vite build`, así que la producción siempre pasa el typecheck.

---

## 🎨 Estilos

Tailwind CSS 4.x vía `@tailwindcss/vite`. Punto de entrada: `src/index.css` con `@import 'tailwindcss'` y design tokens/estilos globales. Prettier usa `prettier-plugin-tailwindcss` para orden de clases (compatible con `clsx`/`cn`).

---

## 🧰 Calidad de código

### Husky

El script `prepare` en `package.json` ejecuta `husky` tras `npm install`, instalando los hooks en `.husky`. El único hook configurado es **pre-commit** (`.husky/pre-commit`), que se ejecuta en este orden antes de cada `git commit`:

1. `npx lint-staged --no-stash` — formateo y lint solo de archivos staged.
2. `npm run test:changed` — tests de archivos modificados.
3. `npm run typecheck` — comprobación de tipos.

Si cualquiera de los tres falla, el commit se aborta. No hay otros hooks (p. ej. commit-msg) configurados en el proyecto.

### Commitlint (solo en CI)

En este proyecto **no hay configuración local de Commitlint**: no existe `commitlint.config.*` ni `@commitlint/cli` en `package.json`. La validación de mensajes de commit **solo se ejecuta en GitHub Actions**, no en tu máquina.

El workflow `.github/workflows/commitlint.yml` se dispara en **push** y **pull_request** (todas las ramas). Tras `checkout` con historial completo (`fetch-depth: 0`), Node 20 y `npm ci`, se ejecuta Commitlint sobre un rango de commits:

- **En push:** `npx commitlint --from ${{ github.event.before }} --to ${{ github.sha }}`  
  Valida todos los commits entre el SHA anterior al push (`event.before`) y el SHA actual de la rama (`event.sha`), es decir, los commits que acabas de subir.

- **En pull_request:** `npx commitlint --from ${{ github.event.pull_request.base.sha }} --to ${{ github.event.pull_request.head.sha }}`  
  Valida todos los commits del PR: desde la base del PR hasta la punta de la rama del PR.

Si algún mensaje del rango no cumple la convención configurada en CI, el job falla. Para que el workflow pueda ejecutar `npx commitlint`, la instalación en CI debe disponer de Commitlint (por ejemplo añadiendo `@commitlint/cli` como devDependency y un archivo de config si se quiere usar convención explícita).

### lint-staged

En `package.json`, clave `"lint-staged"`: archivos `*.{js,jsx,ts,tsx}`; comandos en orden `prettier --write` y `eslint --fix`. Solo se procesan archivos que están en staging en el momento del pre-commit. Prettier va primero para que ESLint (con eslint-config-prettier) no marque conflictos de formato.

---

## 🔁 Flujo commit → push → PR

1. Crear rama desde `main` (o la rama base).
2. Desarrollar usando el alias `@/` para imports desde `src/`.
3. Opcional en local: `npm run format`, `npm run lint`, `npm run test`, `npm run typecheck`.
4. `git add` y `git commit`. El pre-commit ejecuta lint-staged, `test:changed` y typecheck; si algo falla, el commit no se completa.
5. Mensajes de commit: usar convención que valide el workflow de Commitlint en CI (p. ej. Conventional Commits: `feat: ...`, `fix: ...`), ya que la validación ocurre en push/PR, no en local.
6. `git push`. El workflow de Commitlint valida los mensajes del rango subido.
7. Abrir PR; usar la plantilla `.github/pull_request_template.md`. El mismo workflow valida los mensajes de todos los commits del PR.

**Relación pre-commit vs CI:** El pre-commit asegura formato, lint, tests afectados y tipos antes de que el commit exista. La CI (Commitlint) asegura la convención de mensajes sobre los commits ya subidos. No hay en este repo otro job de CI que replique lint/test/typecheck; eso podría añadirse para garantizar que la rama base también pasa todas las comprobaciones.

---

## 📊 Cobertura

- **Provider:** V8 (`vite.config.ts` → `test.coverage`).
- **Reporters:** `text` (terminal) e `html`.
- **Umbrales** (`test.coverage.thresholds`): **lines** 80%, **functions** 80%, **branches** 70%, **statements** 80%. Si algún valor queda por debajo, `vitest run --coverage` falla.

**Generar informe:** `npm run test:coverage` ejecuta Vitest con cobertura y abre el HTML. El script usa `start coverage/index.html`, que **solo funciona en Windows**. En otros sistemas:

- **macOS:** después de `npm run test:coverage` (o solo `vitest run --coverage`), abrir el informe con:
  ```bash
  open coverage/index.html
  ```
- **Linux:** usar el navegador por defecto, por ejemplo:
  ```bash
  xdg-open coverage/index.html
  ```
  o abrir manualmente el archivo `coverage/index.html` desde el explorador.

El informe HTML muestra qué líneas, ramas y funciones están cubiertas; el reporte en terminal se imprime al ejecutar `vitest run --coverage`.

---

## 🛡️ Validaciones automáticas

| Ámbito | Ejecución |
|--------|-----------|
| **Pre-commit (Husky)** | lint-staged (Prettier + ESLint en `*.{js,jsx,ts,tsx}` staged) → `npm run test:changed` → `npm run typecheck`. |
| **GitHub Actions** | Workflow Commitlint en push y pull_request; valida mensajes de commit en el rango correspondiente. |

No hay más workflows en `.github/workflows/`.

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
- Añadir workflow(s) en GitHub Actions que ejecuten lint, tests completos y typecheck en push/PR para alinear CI con el pre-commit.
- Hacer el script `test:coverage` multiplataforma (p. ej. usando `open`/`xdg-open` según el SO) o documentar los comandos por plataforma.
- Si se quiere validar mensajes de commit en local: añadir `@commitlint/cli` y un `commitlint.config.*` (p. ej. `commitlint.config.cjs` extendiendo `@commitlint/config-conventional`) para que `npx commitlint` funcione igual que en CI.
