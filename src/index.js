import { astroConfig } from './configs/astro.js';
import { baseConfig } from './configs/base.js';
import { jsdocConfig } from './configs/jsdoc.js';
import { jsonConfig } from './configs/json.js';
import { perfectionistConfig } from './configs/perfectionist.js';
import { reactConfig } from './configs/react.js';
import { svelteConfig } from './configs/svelte.js';
import { typescriptConfig } from './configs/typescript.js';

/** @typedef {import('eslint').Linter.FlatConfig} FlatConfig */
/** @typedef {FlatConfig | FlatConfig[] | Promise<FlatConfig> | Promise<FlatConfig[]>} ConfigDef */

/**
 * User configuration options for ESLint
 * @typedef {object} Options
 * @property {object} [astro]
 * @property {boolean} astro.enabled
 * @property {object} [env]
 * @property {boolean} [env.browser]
 * @property {boolean} [env.es2021]
 * @property {boolean} [env.node]
 * @property {string[]} [exclude]
 * @property {string[]} [fileRoots]
 * @property {object} [jsdoc]
 * @property {boolean} jsdoc.enabled
 * @property {object} [json]
 * @property {boolean} json.enabled
 * @property {object} json.sort
 * @property {boolean} json.sort.packageJson
 * @property {boolean} json.sort.tsconfig
 * @property {object} [perfectionist]
 * @property {boolean} perfectionist.enabled
 * @property {object} [react]
 * @property {boolean} react.enabled
 * @property {string} [react.version]
 * @property {object} [svelte]
 * @property {boolean} svelte.enabled
 * @property {object} [typescript]
 * @property {boolean} typescript.enabled
 */

/**
 * Create an array of eslint config objects based on the provided options
 * @param {Options} options
 * @param {...ConfigDef} args
 * @returns {Promise<FlatConfig[]>}
 */
export const config = async (
  {
    astro = { enabled: false },
    env = { browser: true, es2021: true, node: true },
    exclude = [],
    fileRoots = undefined,
    jsdoc = { enabled: false },
    json = { enabled: true, sort: { packageJson: true, tsconfig: true } },
    perfectionist = { enabled: true },
    react = { enabled: false, version: 'detect' },
    svelte = { enabled: false },
    typescript = { enabled: true }
  } = {},
  ...args
) => {
  /** @type {ConfigDef[]} */
  const items = [];
  items.push(baseConfig({ env, exclude, fileRoots }));
  if (astro.enabled) {
    items.push(astroConfig({ fileRoots }));
  }
  if (jsdoc.enabled) {
    items.push(jsdocConfig({ fileRoots, typescript }));
  }
  if (json.enabled) {
    items.push(jsonConfig({ fileRoots, json }));
  }
  if (perfectionist.enabled) {
    items.push(perfectionistConfig({ fileRoots }));
  }
  if (react.enabled) {
    items.push(reactConfig({ fileRoots, react, typescript }));
  }
  if (svelte.enabled) {
    items.push(svelteConfig({ fileRoots }));
  }
  if (typescript.enabled) {
    items.push(typescriptConfig({ fileRoots, react }));
  }
  items.push(...args);
  return (await Promise.all(items)).flat();
};

export default config();
