import { applyFilesFactory, filesFactory } from '../utils.js';

/**
 * @param {{ fileRoots?: string[] }} options
 * @returns {Promise<import('../index.js').FlatConfig[]>}
 */
export const svelteConfig = async ({ fileRoots }) => {
  const { default: sveltePlugin } = await import('eslint-plugin-svelte');
  const { parser } = await import('typescript-eslint');
  return [
    ...applyFilesFactory(sveltePlugin.configs['flat/recommended'], fileRoots),
    ...applyFilesFactory(sveltePlugin.configs['flat/prettier'], fileRoots),
    {
      files: filesFactory(['**/*.svelte'], fileRoots),
      languageOptions: {
        parserOptions: {
          parser
        }
      }
    }
  ];
};
