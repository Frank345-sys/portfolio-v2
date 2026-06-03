import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import tsdoc from 'eslint-plugin-tsdoc'
import vitest from '@vitest/eslint-plugin'
import testingLibrary from 'eslint-plugin-testing-library'
import betterTailwind from 'eslint-plugin-better-tailwindcss'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

/** Parser type-aware compartido (app, tests y tooling TS). */
const typeAwareParserOptions = {
  projectService: true,
  tsconfigRootDir: import.meta.dirname,
}

/**
 * Tooling ejecutado en Node.
 * Se añaden globals de Node sobre la base compartida del resto de reglas.
 */
const nodeToolingFiles = [
  '*.config.{js,ts,cjs,mjs}',
  'scripts/**/*.{js,mjs,cjs}',
]

/** Vitest + Testing Library (React). */
const testFiles = [
  '**/*.test.{ts,tsx}',
  '**/*.spec.{ts,tsx}',
  '**/__tests__/**/*.{ts,tsx}',
  'src/test/**/*.{ts,tsx}',
]

/** Resolver + regla compartida: sin maxDepth ⇒ profundidad ilimitada (eslint-plugin-import). */
const importResolverSettings = {
  'import/resolver': {
    typescript: {
      alwaysTryTypes: true,
      project: ['./tsconfig.app.json', './tsconfig.node.json'],
    },
  },
}

const importNoCycleRule = ['error', { ignoreExternal: true }]

export default tseslint.config(
  {
    ignores: ['dist/**', 'build/**', 'coverage/**'],
  },
  {
    /** Incluye `.mjs`/`.cjs` (scripts/, commitlint) con reglas JS base; Node tooling añade globals en bloque aparte. */
    files: ['**/*.{js,jsx,mjs,cjs}'],
    extends: [js.configs.recommended, tseslint.configs.disableTypeChecked],
    languageOptions: {
      ecmaVersion: 2023,
      globals: { ...globals.browser },
    },
    plugins: {
      import: importPlugin,
    },
    settings: importResolverSettings,
    rules: {
      'import/no-cycle': importNoCycleRule,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      /** Sin `strictTypeChecked`: no activa `@typescript-eslint/no-unsafe-*` (sí añaden ruido/costo; el checker + `no-explicit-any` cubren el grueso). */
      ...tseslint.configs.recommendedTypeChecked,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: { ...globals.browser },
      parserOptions: typeAwareParserOptions,
    },
    plugins: {
      import: importPlugin,
      sonarjs,
      tsdoc,
      unicorn,
    },
    settings: {
      ...importResolverSettings,
      react: {
        version: 'detect',
      },
    },
    rules: {
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      /** Grafos cíclicos entre módulos locales (profundidad ilimitada por defecto). */
      'import/no-cycle': importNoCycleRule,
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      /**
       * Const exportadas — dos familias legítimas (no mezclar en un único formato):
       * - **camelCase** (`headerContainer`, `navLink`, …): clases Tailwind/`cn()`, helpers composables.
       * - **UPPER_CASE / PascalCase** (`HEADER_*_ID`, `LAYOUT`, `TYPOGRAPHY`, …): tokens, IDs semánticos,
       *   mapas agrupados. `PascalCase` cubre acrónimos en mayúsculas que no llevan `_`.
       *
       * Los `filter` `^[a-z]` / `^[A-Z]` separan por “primera letra” (heurística estable para este repo).
       * `prefix` en naming-convention no sustituye bien este corte; si cambian convenciones, revisar filtros o `custom`.
       */
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          filter: '^[a-z]',
          format: ['camelCase'],
        },
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          filter: '^[A-Z]',
          format: ['UPPER_CASE', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      /** `warn`: no bloquea CI; subir a `error` si se prefiere endurecer (proyecto greenfield o deuda bajo control). */
      'sonarjs/cognitive-complexity': ['warn', 20],
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-small-switch': 'warn',
      'tsdoc/syntax': 'error',
      'react/prop-types': 'off',
      'unicorn/consistent-function-scoping': 'warn',
      'unicorn/no-array-for-each': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-string-slice': 'error',
    },
  },
  /** React Compiler (ESLint): alinea el código con las “Rules of React” que el compilador espera. */
  reactCompiler.configs.recommended,
  /** Clases Tailwind v4: entrada CSS con `@import 'tailwindcss'` (ver docs del plugin). */
  {
    files: ['**/*.{tsx,jsx}'],
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/index.css',
      },
    },
    plugins: betterTailwind.configs.correctness.plugins,
    rules: {
      ...betterTailwind.configs.correctness.rules,
      'better-tailwindcss/no-unknown-classes': [
        'error',
        {
          ignore: ['^u-', '^test-'],
        },
      ],
    },
  },
  {
    files: nodeToolingFiles,
    plugins: {
      unicorn,
    },
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      'unicorn/prefer-node-protocol': 'error',
    },
  },
  {
    files: testFiles,
    languageOptions: {
      parserOptions: typeAwareParserOptions,
      globals: {
        ...globals.browser,
        ...vitest.configs.env.languageOptions.globals,
      },
    },
    plugins: {
      vitest,
      'testing-library': testingLibrary,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...testingLibrary.configs['flat/react'].rules,
      /**
       * Testing Library: relajado en **todo** el glob de tests por pragmatismo (contenedor, `document`/nodos crudos,
       * `render().getBy*`). Para acotarlo sin adivinar: en un sprint de limpieza, buscar violaciones si se vuelve a
       * `error`/`warn` solo en este bloque base y mover `off` a un override con `files` concretos; suele bastar un
       * subconjunto pequeño respecto al total `*.test.*`.
       */
      'testing-library/no-container': 'off',
      'testing-library/no-node-access': 'off',
      'testing-library/prefer-screen-queries': 'off',
      /**
       * TypeScript “unsafe” + `unbound-method` desactivados **solo en tests**:
       * - `vi.mock`/`fn`/`spyOn` y módulos simulados suelen producir valores mal tipados o `any` implícitos.
       * - Asignaciones desde `fixtures`, `partialDeep` o APIs externas espías sin narrowing exhaustivo.
       * En código de aplicación siguen aplicando `recommendedTypeChecked` (sin `strictTypeChecked`); aquí el coste de
       * endurecer suele ser ruido sin ganar garantías si no se tipan todos los mocks. Reactivar por archivo si un test
       * concreto debe quedar tan estricto como producción.
       */
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'testing-library/render-result-naming-convention': 'off',
    },
  },
  eslintConfigPrettier
)
