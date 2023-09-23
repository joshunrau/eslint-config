import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';
import react from 'eslint-plugin-react';
import globals from 'globals';

/**
 * @param {Object} options
 * @param {boolean} options.jsx
 * @param {string} options.project
 * @returns {Promise<{import('eslint').Linter.FlatConfig>}
 */
export const createConfig = (options) => {
  return [
    {
      files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals['shared-node-browser']
        }
      },
      rules: {
        ...js.configs.recommended.rules
      }
    },
    {
      files: ['**/*.jsx', '**/*.tsx'],
      languageOptions: {
        globals: {
          ...globals.browser
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        }
      },
      plugins: {
        react
      },
      rules: {
        ...react.configs.recommended.rules,
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function'
          }
        ],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off'
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: options.jsx
          },
          project: options.project,
          sourceType: 'module'
        }
      },
      plugins: {
        '@typescript-eslint': ts
      },
      rules: {
        ...ts.configs['eslint-recommended'].rules,
        ...ts.configs['recommended'].rules,
        ...ts.configs['recommended-requiring-type-checking'].rules,
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allowNumber: true,
            allowBoolean: true
          }
        ]
      }
    },
    perfectionistNatural
  ];
};
