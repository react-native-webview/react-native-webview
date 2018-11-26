module.exports = {
  // Airbnb is the base, prettier is here so that eslint doesn't conflict with prettier
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'typescript-eslint-parser',
  plugins: ['react-native', 'typescript'],
  rules: {
    // Parens will be needed for arrow functions
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    // Lines will be broken before binary operators
    'operator-linebreak': ['error', 'before'],
    // Allow imports from dev and peer dependencies
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, peerDependencies: true },
    ],
    // Allows writing JSX in JS & TS files
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    // This rule doesn't play nice with Prettier
    'react/jsx-one-expression-per-line': 'off',
    // This rule doesn't play nice with Prettier
    'react/jsx-wrap-multilines': 'off',
    // Remove this rule because we only destructure props, but never state
    'react/destructuring-assignment': 'off',
    // Restrict imports that should be used carefully. Usually we have created a wrapper around them

    'typescript/adjacent-overload-signatures': 'error',
    'typescript/explicit-function-return-type': 'error',
    'typescript/no-angle-bracket-type-assertion': 'error',
    'typescript/no-empty-interface': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-inferrable-types': 'error',
    'typescript/no-namespace': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/no-triple-slash-reference': 'error',
    'typescript/no-type-alias': 'error',
    'typescript/prefer-namespace-keyword': 'error',
    'typescript/type-annotation-spacing': 'error',

    'no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['*.ts?(x)'],
      parser: 'typescript-eslint-parser',
      plugins: ['react-native', 'typescript'],
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.tsx',
          '.ts',
          '.android.tsx',
          '.android.ts',
          '.ios.tsx',
          '.ios.ts',
        ],
      },
    },
  },
};
