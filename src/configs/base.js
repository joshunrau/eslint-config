/**
 * @param {Required<Pick<ESLintConfig.Options, "env" | "exclude">>} options
 * @returns {Promise<ESLintConfig.FlatConfig[]>}
 */
export const baseConfig = async ({ env, exclude }) => {
  const { default: js } = await import('@eslint/js');
  const { default: globals } = await import('globals');
  return [
    {
      ignores: ['**/build', '**/dist', '**/node_modules', ...exclude]
    },
    {
      files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
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
      files: ['**/*.cjs'],
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
