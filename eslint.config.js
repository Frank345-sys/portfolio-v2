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

/** Vite, flat config de ESLint y scripts Node: no globals de navegador. */
const nodeToolingFiles = ['*.config.{js,ts}', 'scripts/**/*.mjs']

/** Vitest + Testing Library (React). */
const testFiles = [
  '**/*.test.{ts,tsx}',
  '**/*.spec.{ts,tsx}',
  '**/__tests__/**/*.{ts,tsx}',
  'src/test/**/*.{ts,tsx}',
]

export default tseslint.config(
  {
    ignores: ['dist/**', 'build/**', 'coverage/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended, tseslint.configs.disableTypeChecked],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
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
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.app.json', './tsconfig.node.json'],
        },
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
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
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
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
      // Bajo-level DOM / mocks: reglas TLC estrictas desactivadas solo en tests.
      'testing-library/no-container': 'off',
      'testing-library/no-node-access': 'off',
      'testing-library/prefer-screen-queries': 'off',
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
