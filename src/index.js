module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {
    'import/exports-last': 'warn',
    'import/newline-after-import': 'warn'
  },
  settings: {
    'import/extensions': ['.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/resolver': {
      typescript: true
    }
  }
};
