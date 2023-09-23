import js from '@eslint/js';
import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';
import reactRecommended from 'eslint-plugin-react/configs/recommended';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig} */
export const baseConfig = {
  files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: {
      ...globals['shared-node-browser']
    }
  },
  rules: js.configs.recommended.rules
};

/** @type {import('eslint').Linter.FlatConfig} */
export const jsxConfig = {
  files: ['**/*.jsx', '**/*.tsx'],
  ...reactRecommended,
  languageOptions: {
    ...reactRecommended.languageOptions,
    globals: {
      ...globals.browser,
      ...globals.serviceworker
    }
  }
};

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [baseConfig, jsxConfig, perfectionistNatural];
