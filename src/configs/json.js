/**
 * @param {Required<Pick<ESLintConfig.Options, "json">>} options
 * @returns {Promise<ESLintConfig.FlatConfig[]>}
 */
export const jsonConfig = async ({ json }) => {
  const { default: plugin } = await import('eslint-plugin-jsonc');
  const { default: parser } = await import('jsonc-eslint-parser');
  /** @type {ESLintConfig.FlatConfig[]} */
  const configs = [
    {
      files: ['**/*.json'],
      languageOptions: {
        parser
      },
      plugins: {
        // @ts-ignore
        jsonc: plugin
      },
      rules: {
        'jsonc/no-bigint-literals': 'error',
        'jsonc/no-binary-expression': 'error',
        'jsonc/no-binary-numeric-literals': 'error',
        'jsonc/no-dupe-keys': 'error',
        'jsonc/no-escape-sequence-in-identifier': 'error',
        'jsonc/no-floating-decimal': 'error',
        'jsonc/no-hexadecimal-numeric-literals': 'error',
        'jsonc/no-infinity': 'error',
        'jsonc/no-multi-str': 'error',
        'jsonc/no-nan': 'error',
        'jsonc/no-number-props': 'error',
        'jsonc/no-numeric-separators': 'error',
        'jsonc/no-octal': 'error',
        'jsonc/no-octal-escape': 'error',
        'jsonc/no-octal-numeric-literals': 'error',
        'jsonc/no-parenthesized': 'error',
        'jsonc/no-plus-sign': 'error',
        'jsonc/no-regexp-literals': 'error',
        'jsonc/no-sparse-arrays': 'error',
        'jsonc/no-template-literals': 'error',
        'jsonc/no-undefined-value': 'error',
        'jsonc/no-unicode-codepoint-escapes': 'error',
        'jsonc/no-useless-escape': 'error',
        'jsonc/space-unary-ops': 'error',
        'jsonc/valid-json-number': 'error',
        'jsonc/vue-custom-block/no-parsing-error': 'error',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off'
      }
    }
  ];
  if (json.sort.packageJson) {
    configs.push({
      files: ['**/package.json'],
      rules: {
        'jsonc/sort-array-values': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^files$'
          }
        ],
        'jsonc/sort-keys': [
          'error',
          {
            order: [
              'publisher',
              'name',
              'displayName',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'author',
              'license',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'categories',
              'sideEffects',
              'exports',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'types',
              'typesVersions',
              'bin',
              'icon',
              'files',
              'engines',
              'activationEvents',
              'contributes',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig'
            ],
            pathPattern: '^$'
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$'
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(?:resolutions|overrides|pnpm.overrides)$'
          },
          {
            order: ['types', 'import', 'require', 'default'],
            pathPattern: '^exports.*$'
          }
        ]
      }
    });
  }
  if (json.sort.tsconfig) {
    configs.push({
      files: ['**/jsconfig.json', '**/tsconfig.json', '**/tsconfig.*.json'],
      rules: {
        'jsonc/sort-keys': [
          'warn',
          {
            order: ['extends', 'compilerOptions', 'references', 'files', 'include', 'exclude'],
            pathPattern: '^$'
          }
        ]
      }
    });
  }
  return configs;
};
