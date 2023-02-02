module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    project: ['tsconfig.json'],
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-unused-vars': ['off', { vars: 'local' }],
    'prefer-const': 'warn',
    quotes: ['warn', 'single'],
    semi: 'off',
    'space-infix-ops': 'warn',
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          'CallExpression[callee.object.name=\'console\'][callee.property.name!=/^(log|warn|error|info|trace)$/]',
        message: 'Unexpected property on console object was called'
      }
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+']
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true
        }
      }
    ],

    // ---- TYPESCRIPT ---- //
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/semi': ['warn', 'always']
  }
};
