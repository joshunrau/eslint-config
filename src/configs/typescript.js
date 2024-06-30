import { filesFactory } from '../utils.js';

/**
 * @param {Required<Pick<import('../index.js').Options, "react" | "svelte">> & { fileRoots?: string[] }} options
 * @returns {Promise<import('../index.js').FlatConfig[]>}
 */
export const typescriptConfig = async ({ fileRoots, react, svelte }) => {
  const { parser, plugin } = await import('typescript-eslint');
  const extensions = ['.ts'];
  if (react.enabled) {
    extensions.push('.tsx');
  }
  if (svelte.enabled) {
    extensions.push('.svelte');
  }
  const files = extensions.map((ext) => '**/*' + ext);
  const testFiles = extensions.flatMap((ext) => ['**/*.test' + ext, '**/*.spec' + ext]);

  return [
    {
      files: filesFactory(files, fileRoots),
      languageOptions: {
        // @ts-ignore
        parser,
        parserOptions: {
          extraFileExtensions: svelte.enabled ? ['.svelte'] : undefined,
          project: true,
          sourceType: 'module'
        }
      },
      plugins: {
        // @ts-ignore
        '@typescript-eslint': plugin
      },
      rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/class-literal-property-style': 'error',
        '@typescript-eslint/consistent-generic-constructors': 'error',
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-duplicate-type-constituents': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-loss-of-precision': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allowBoolean: true,
            allowNever: true,
            allowNumber: true
          }
        ],
        '@typescript-eslint/unbound-method': 'error',
        'dot-notation': 'off',
        'no-array-constructor': 'off',
        'no-empty-function': 'off',
        'no-loss-of-precision': 'off',
        'no-redeclare': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'require-await': 'off'
      }
    },
    {
      files: filesFactory(testFiles, fileRoots),
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-declaration-merging': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off'
      }
    }
  ];
};
