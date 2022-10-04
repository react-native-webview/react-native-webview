module.exports = {
  // Airbnb is the base, prettier is here so that eslint doesn't conflict with prettier
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-native', 'import', '@typescript-eslint'],
  rules: {
    'no-console': 'off',
    // Lines will be broken before binary operators
    'operator-linebreak': ['error', 'before'],
    // Allow imports from dev and peer dependencies
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true, peerDependencies: true },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    // This rule doesn't play nice with Prettier
    'react/jsx-one-expression-per-line': 'off',
    // This rule doesn't play nice with Prettier
    'react/jsx-wrap-multilines': 'off',
    // Remove this rule because we only destructure props, but never state
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/static-property-placement': 'off',
    'react/state-in-constructor': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/generic-type-naming': ['error', '^[a-zA-Z]+$'],
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
      },
    ],
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/triple-slash-reference': [
      'error',
      { path: 'never', types: 'never', lib: 'never' },
    ],
    '@typescript-eslint/no-type-alias': [
      'error',
      {
        allowAliases: 'always',
        allowCallbacks: 'always',
        allowMappedTypes: 'always',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    '@typescript-eslint/consistent-type-definitions': [
      'error',
      'interface',
    ],
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.android.js',
          '.ios.js',
          '.jsx',
          '.android.jsx',
          '.ios.jsx',
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
