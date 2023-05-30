import globals from 'globals';
import * as importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';

/** @type {import('eslint').Linter.FlatConfig} */
export const baseConfig = {
  files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
  ignores: ['**/*/dist/*', '**/*/node_modules/*'],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: {
      ...globals.node
    }
  },
  plugins: {
    import: importPlugin
  },
  rules: {
    ...js.configs.recommended.rules,
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/no-named-as-default': 'warn',
    'import/no-named-as-default-member': 'warn',
    'import/no-duplicates': 'warn',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc'
        },
        'newlines-between': 'always'
      }
    ],
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true
      }
    ]
  }
};