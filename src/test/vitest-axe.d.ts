/** Declaración mínima para `expect.extend({ toHaveNoViolations })` (vitest-axe). */
declare module 'vitest' {
  interface Assertion {
    toHaveNoViolations(): void
  }
}

export {}
