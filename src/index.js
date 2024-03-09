import { baseConfig } from "./configs/base.js";
import { jsdocConfig } from "./configs/jsdoc.js";
import { jsonConfig } from "./configs/json.js";
import { perfectionistConfig } from "./configs/perfectionist.js";
import { reactConfig } from "./configs/react.js";
import { typescriptConfig } from "./configs/typescript.js";

/** @typedef {import('eslint').Linter.FlatConfig} FlatConfig */

/**
 * User configuration options for ESLint
 * @typedef {object} Options
 * @property {object} [env]
 * @property {boolean} [env.browser]
 * @property {boolean} [env.es2021]
 * @property {boolean} [env.node]
 * @property {string[]} [exclude]
 * @property {object} [jsdoc]
 * @property {boolean} jsdoc.enabled
 * @property {object} [json]
 * @property {boolean} json.enabled
 * @property {object} json.sort
 * @property {boolean} json.sort.packageJson
 * @property {boolean} json.sort.tsconfig
 * @property {object} [perfectionist]
 * @property {boolean} [perfectionist.enabled]
 * @property {object} [react]
 * @property {boolean} react.enabled
 * @property {object} [typescript]
 * @property {boolean} typescript.enabled
 */

/**
 * Create an array of eslint config objects based on the provided options
 * @param {Options} options
 * @returns {Promise<FlatConfig[]>}
 */
export const config = async ({
  env = { browser: true, es2021: true, node: true },
  exclude = [],
  jsdoc = { enabled: false },
  json = { enabled: true, sort: { packageJson: true, tsconfig: true } },
  perfectionist = { enabled: true },
  react = { enabled: false },
  typescript = { enabled: true },
} = {}) => {
  /** @type {FlatConfig[][]} */
  const items = [];
  items.push(await baseConfig({ env, exclude }));
  if (jsdoc.enabled) {
    items.push(await jsdocConfig({ typescript }));
  }
  if (json.enabled) {
    items.push(await jsonConfig({ json }));
  }
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
