// @ts-check

import { createBaseConfig } from './lib/base.js';
import { createJsxConfig } from './lib/jsx.js';
import { createTsConfig } from './lib/ts.js';

/**
 *
 * @param {Object} options
 * @param {Object} options.typescript
 * @param {string} options.typescript.project
 */
export function createConfig(options) {
  return [
    createBaseConfig(),
    createJsxConfig(),
    createTsConfig(options.typescript)
  ];
}

