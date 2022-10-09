module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ['react', '@typescript-eslint', 'jest', 'prettier'],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use
      version: 'detect',
    },
  },
  // any directories/files to ignore goes here; node_modules ignore by default
  ignorePatterns: [],
  rules: {
    /**
     * Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
     * e.g. "@typescript-eslint/explicit-function-return-type": "off",
     *
     *  "off" or 0 - turn the rule off
     * "warn" or 1 - turn the rule on as a warning(doesn’ t affect exit code)
     * "error" or 2 - turn the rule on as an error(exit code is 1 when triggered)
     **/

    indent: 0, // set to 0 as eslint and prettier will conflict
    'prefer-const': 'warn',
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    semi: 2,
    'space-infix-ops': 'warn',
    'no-console': 'off',
    // ----- REACT ----- //
    'react/prop-types': 0, // remove with TS usage

    // ----- TYPESCRIPT ----- //
    '@typescript-eslint/no-var-requires': 0,

    // ----- PRETTIER ----- //
    'prettier/prettier': ['error', { singleQuote: true }],

    // ----- MISC ----- //
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
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
