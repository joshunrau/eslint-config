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
        ...react.configs.recommended.rules
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
        ...ts.configs['recommended-requiring-type-checking'].rules
      }
    },
    perfectionistNatural
  ];
};
