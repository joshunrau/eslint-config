import globals from 'globals';
import * as importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';

/**
 * @returns {import('eslint').Linter.FlatConfig}
 */
export function createBaseConfig() {
  return {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
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
}
