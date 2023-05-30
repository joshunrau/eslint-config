import globals from 'globals';
import * as importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';

/**
 * @returns {import('eslint').Linter.FlatConfig}
 */
export function createJsxConfig() {
  return {
    files: ['**/*.jsx', '**/*.tsx'],
    languageOptions: {
      globals: globals.browser
    },
    plugins: {
      import: importPlugin,
      react: reactPlugin
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc'
          },
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: 'react',
              position: 'before'
            },
            {
              group: 'external',
              pattern: '{next,next/**}',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['react']
        }
      ],
      'no-alert': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true
        }
      ],
      'react/prop-types': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  };
}
