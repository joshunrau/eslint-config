import { filesFactory } from '../utils.js';

/**
 * @param {Required<Pick<import('../index.js').Options, "env" | "exclude">> & { fileRoots?: string[] }} options
 * @returns {Promise<import('../index.js').FlatConfig[]>}
 */
export const baseConfig = async ({ env, exclude, fileRoots }) => {
  const { default: js } = await import('@eslint/js');
  const { default: globals } = await import('globals');
  return [
    {
      ignores: ['**/.astro/*', '**/build', '**/dist', '**/node_modules', '**/.svelte-kit', ...exclude]
    },
    {
      files: filesFactory(['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'], fileRoots),
      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...(env.browser ? globals.browser : null),
          ...(env.es2021 ? globals.es2021 : null),
          ...(env.node ? globals.node : null)
        },
        sourceType: 'module'
      },
      rules: {
        ...js.configs.recommended.rules,
        'no-alert': 'error'
      }
    },
    {
      files: filesFactory(['**/*.cjs'], fileRoots),
      languageOptions: {
        globals: {
          ...globals.commonjs,
          ...globals.node,
          ...(env.es2021 ? globals.es2021 : null)
        },
        sourceType: 'commonjs'
      }
    }
  ];
};
