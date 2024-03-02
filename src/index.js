import { baseConfig } from './configs/base.js';
import { perfectionistConfig } from './configs/perfectionist.js';
import { reactConfig } from './configs/react.js';
import { typescriptConfig } from './configs/typescript.js';

/**
 * Create an array of eslint config objects based on the provided options
 * @param {ESLintConfig.Options} options
 * @returns {Promise<ESLintConfig.FlatConfig[]>}
 */
export const config = async ({
  env = { browser: true, es2021: true, node: true },
  exclude = [],
  perfectionist = { enabled: true },
  react = { enabled: false },
  typescript = { enabled: true }
} = {}) => {
  /** @type {ESLintConfig.FlatConfig[][]} */
  const items = [];
  items.push(await baseConfig({ env, exclude }));
  if (perfectionist.enabled) {
    items.push(await perfectionistConfig());
  }
  if (react.enabled) {
    items.push(await reactConfig({ typescript }));
  }
  if (typescript.enabled) {
    items.push(await typescriptConfig({ react }));
  }
  return items.flat();
};
