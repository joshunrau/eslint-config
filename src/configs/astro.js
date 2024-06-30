import { applyFilesFactory, filesFactory } from '../utils.js';

/**
 * @param {{ fileRoots?: string[] }} options
 * @returns {Promise<import('../index.js').FlatConfig[]>}
 */
export const astroConfig = async ({ fileRoots }) => {
  const { default: astroPlugin } = await import('eslint-plugin-astro');
  return [
    ...applyFilesFactory(astroPlugin.configs.recommended, fileRoots),
    {
      files: filesFactory(['**/*.astro'], fileRoots),
      rules: {
        'no-alert': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }]
      }
    }
  ];
};
