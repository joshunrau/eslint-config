import js from '@eslint/js';
import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';
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
export default [baseConfig, perfectionistNatural];
