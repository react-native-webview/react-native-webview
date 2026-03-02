import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['react', 'typescript', 'import'],
  rules: {
    'no-unused-vars': 'off',
    complexity: 'off',
    'no-empty-function': 'off',
    'no-eq-null': 'off',
    'no-shadow': 'off',
    'no-undefined': 'off',
    'no-console': 'off',

    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/rules-of-hooks': 'error',
    'react/exhaustive-deps': 'error',

    'typescript/explicit-function-return-type': 'off',
    'typescript/explicit-module-boundary-types': 'off',
    'typescript/no-var-requires': 'off',
    'typescript/no-require-imports': 'off',

    'import/no-default-export': 'off',
    'import/no-commonjs': 'off',
    'import/unambiguous': 'off',
    'import/no-relative-parent-imports': 'off',
  },
  ignorePatterns: ['node_modules', 'lib', 'android', 'ios', 'macos', 'windows', 'example'],
  categories: {
    correctness: 'error',
    perf: 'error',
    restriction: 'error',
    suspicious: 'error',
  },
  env: {
    builtin: true,
  },
});
