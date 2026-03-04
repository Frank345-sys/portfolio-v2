module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'subject-ascii-no-signs': (parsed, when = 'always') => {
          const subject = parsed.subject || ''
          const regex = /^[a-z0-9 ]+$/
          const pass = regex.test(subject)

          if (when === 'always') {
            return [
              pass,
              'el subject solo puede contener [a-z0-9 ] (sin tildes ni signos)',
            ]
          }

          return [
            !pass,
            'el subject NO debe contener solo [a-z0-9 ] cuando se usa "never"',
          ]
        },
      },
    },
  ],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-min-length': [2, 'always', 3],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-ascii-no-signs': [2, 'always'],
  },
}
