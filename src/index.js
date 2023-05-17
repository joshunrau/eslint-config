// @ts-check
import js from '@eslint/js';

/**
 * @typedef { import('eslint').Linter.FlatConfig[] } Config
 */

/**
 * @typedef {Object} Options
 * @property {'esm' | 'cjs'} moduleType
 */

/** @type {Options} */
const defaultOptions = {
  moduleType: 'esm'
};

/**
 * @param {Options} options
 * @returns {Config}
 */
export function createConfig(options) {
  return [
    js.configs.recommended,
    {
      files: ['"**/*.js"']
    }
  ];
}

export default createConfig(defaultOptions);
