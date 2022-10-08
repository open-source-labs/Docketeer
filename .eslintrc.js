module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
  // "off" or 0 - turn the rule off
  // "warn" or 1 - turn the rule on as a warning(doesn’ t affect exit code)
  // "error" or 2 - turn the rule on as an error(exit code is 1 when triggered)
    indent: [2, 2],
    'no-unused-vars': ['off', { vars: 'local' }],
    'prefer-const': 'warn',
    quotes: [1, 'single'],
    semi: 2,
    'space-infix-ops': 'warn',
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          'CallExpression[callee.object.name=\'console\'][callee.property.name!=/^(log|warn|error|info|trace)$/]',
        message: 'Unexpected property on console object was called',
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
  },
};
