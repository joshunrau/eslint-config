import { filesFactory } from '../utils.js';

/**
 * @param {Required<Pick<import('../index.js').Options, "typescript">> & { fileRoots?: string[] }} options
 * @returns {Promise<import('../index.js').FlatConfig[]>}
 */
export const astroConfig = async ({ fileRoots, typescript }) => {
  const { default: tsParser } = await import('@typescript-eslint/parser');
  const { default: astroParser } = await import('astro-eslint-parser');
  const { default: astroPlugin } = await import('eslint-plugin-astro');
  const { default: globals } = await import('globals');
  return [
    {
      files: filesFactory(['**/*.astro'], fileRoots),
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...astroPlugin.environments.astro.globals,
          ...globals.browser,
          ...globals.es2021,
          ...globals.node
        },
        parser: astroParser,
        parserOptions: {
          extraFileExtensions: ['.astro'],
          parser: typescript.enabled ? tsParser : undefined,
          sourceType: 'module'
        },
        sourceType: 'module'
      },
      plugins: {
        // @ts-ignore
        astro: astroPlugin
      },
      // @ts-ignore
      rules: {
        ...astroPlugin.configs.recommended.rules,
        'no-alert': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }]
      }
    }
  ];
};
