module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', 'lower-case'],
    'scope-case': [2, 'always', 'kebab-case'],
    'scope-min-length': [2, 'always', 3],
    'header-max-length': [2, 'always', 100],
  },
}
