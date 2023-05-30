// @ts-check

import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/**
 * @param {Object} options
 * @param {string} options.project
 * @param {boolean} [options.jsx]
 * @returns {import('eslint').Linter.FlatConfig}
 */
export function createTsConfig(options) {
  return {
    files: [`**/*.${options.jsx ? '{ts,tsx}' : 'ts'}`],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: options.jsx
        },
        project: options.project,
        warnOnUnsupportedTypeScriptVersion: true
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...tsPlugin.configs['recommended'].rules,
      ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off'
    },
    settings: {
      'import/extensions': ['.ts', '.tsx'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        node: true,
        typescript: true
      }
    }
  };
}
