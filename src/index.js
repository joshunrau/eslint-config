// @ts-check

import js from '@eslint/js';

/** @type {import('eslint').Linter.FlatConfig} */
const baseConfig = {
  files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
  languageOptions: {
    ecmaVersion: 'latest'
  },
  rules: js.configs.recommended.rules
};

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [baseConfig];
