import { createBaseConfig } from './lib/base.js';
import { createJsxConfig } from './lib/jsx.js';
import { createTsConfig } from './lib/ts.js';

/**
 *
 * @param {Object} options
 * @param {Object} options.typescript
 * @param {string} options.typescript.project
 * @param {boolean} [options.typescript.jsx]
 */
export function createConfig(options) {
  return [
    {
       ignores: ['**/*/dist/*', '**/*/node_modules/*'],
    },
    createBaseConfig(),
    createJsxConfig(),
    createTsConfig(options.typescript)
  ];
}

