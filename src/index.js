// @ts-check

import js from '@eslint/js';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig} */
export const baseConfig = {
  files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: globals['shared-node-browser']
  },
  rules: js.configs.recommended.rules
};

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [baseConfig];
