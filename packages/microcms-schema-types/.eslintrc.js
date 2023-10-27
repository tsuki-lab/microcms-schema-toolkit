module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/order': ['warn', { alphabetize: { order: 'asc' } }],
    'no-duplicate-imports': 'warn',
    '@typescript-eslint/restrict-template-expressions': ['warn'],
    '@typescript-eslint/no-unused-vars': ['error'],
    curly: ['error', 'multi-line'],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
};
