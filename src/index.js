/**
 * @typedef {import('eslint').Linter.FlatConfig} FlatConfig
 */

import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';
import globals from 'globals';
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export class ConfigFactory {
  /**
   * @param {Object} options
   * @param {string} options.project
   * @param {'browser' | 'node' | 'shared-node-browser'} [options.env]
   * @param {boolean} [options.jsx]
   * @returns {FlatConfig[]}
   */
  static create(options) {
    return [this.#createBase(options), this.#createJsx(), this.#createTs(options), perfectionistNatural];
  }

  /**
   * @param {Object} [options]
   * @param {'browser' | 'node' | 'shared-node-browser'} [options.env]
   * @returns {FlatConfig}
   */
  static #createBase(options) {
    return {
      files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals[options?.env ?? 'shared-node-browser']
        }
      },
      rules: {
        ...js.configs.recommended.rules
      }
    };
  }

  /** @returns {FlatConfig} */
  static #createJsx() {
    return {
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
        react: reactPlugin
      },
      rules: {
        ...reactPlugin.configs.recommended.rules,
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
    };
  }

  /**
   * @param {Object} options
   * @param {string} options.project
   * @param {boolean} [options.jsx]
   * @returns {FlatConfig}
   */
  static #createTs(options) {
    return {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: options?.jsx
          },
          project: options.project,
          sourceType: 'module'
        }
      },
      plugins: {
        '@typescript-eslint': tsPlugin
      },
      rules: {
        ...tsPlugin.configs['eslint-recommended'].rules,
        ...tsPlugin.configs['recommended'].rules,
        ...tsPlugin.configs['recommended-requiring-type-checking'].rules,
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
    };
  }
}
