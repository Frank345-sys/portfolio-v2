import js from '@eslint/js'
import globals from 'globals'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tsdoc from 'eslint-plugin-tsdoc'
import vitest from 'eslint-plugin-vitest'
import testingLibrary from 'eslint-plugin-testing-library'
import betterTailwind from 'eslint-plugin-better-tailwindcss'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

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
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      tsdoc,
    },
    rules: {
      'tsdoc/syntax': 'error',
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
          ignore: [
            '^u-',
            '^test-',
            '^custom-class$',
            '^custom-legend-class$',
            '^test-carousel-wrap$',
          ],
        },
      ],
    },
  },
  {
    files: testFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
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
