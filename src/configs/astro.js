import { filesFactory } from '../utils.js';

/**
 * @param {{ fileRoots?: string[] }} options
 * @returns {Promise<import('../index.js').FlatConfig[]>}
 */
export const astroConfig = async ({ fileRoots }) => {
  const { default: astroPlugin } = await import('eslint-plugin-astro');
  return [
    ...astroPlugin.configs.recommended.map((config) => {
      const files = /** @type {string[] | undefined} */ (config.files);
      if (!files) {
        return config;
      }
      return { ...config, files: filesFactory(files, fileRoots) };
    }),
    {
      files: filesFactory(['**/*.astro'], fileRoots),
      rules: {
        'no-alert': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }]
      }
    }
  ];
};
