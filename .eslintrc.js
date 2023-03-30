// module.exports = {
//   env: {
//     browser: true,
//     commonjs: true,
//     es2021: true,
//     node: true,
//   },
//   plugins: ['react', '@typescript-eslint'],
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:@typescript-eslint/recommended',
//   ],
//   ignorePatterns: ['.eslintrc.js', '*.config.js', 'dist/*', '__tests__/*'],
//   overrides: [],
//   parserOptions: {
//     ecmaVersion: 12,
//     sourceType: 'module',
//   },
//   settings: {
//     react: {
//       version: 'detect',
//     },
//   },
//   rules: {
//     indent: ['warn', 2],
//     'no-unused-vars': ['off', { vars: 'local' }],
//     'prefer-const': 'warn',
//     quotes: ['warn', 'single'],
//     semi: ['warn', 'always'],
//     'space-infix-ops': 'warn',
//     'no-console': 'off',
//     'no-restricted-syntax': [
//       'error',
//       {
//         selector:
//           "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
//         message: 'Unexpected property on console object was called',
//       },
//     ],
//     'spaced-comment': [
//       'error',
//       'always',
//       {
//         line: {
//           markers: ['/'],
//           exceptions: ['-', '+'],
//         },
//         block: {
//           markers: ['!'],
//           exceptions: ['*'],
//           balanced: true,
//         },
//       },
//     ],
//
//     // ---- TYPESCRIPT ---- //
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/no-unused-vars': 'error',
//     '@typescript-eslint/semi': ['warn', 'always'],
//   },
// };
