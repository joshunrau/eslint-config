/**
 * @param {Required<Pick<import('../index.js').Options, "typescript">>} options
 * @returns {Promise<import('../index.js').FlatConfig[]>}
 */
export const jsdocConfig = async ({ typescript }) => {
  const { default: jsdoc } = await import('eslint-plugin-jsdoc');
  /** @type {import('../index.js').FlatConfig[]} */
  const configs = [
    {
      files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
      plugins: {
        jsdoc
      },
      rules: {
        'jsdoc/check-access': 'warn',
        'jsdoc/check-alignment': 'warn',
        'jsdoc/check-param-names': 'warn',
        'jsdoc/check-property-names': 'warn',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/check-values': 'warn',
        'jsdoc/empty-tags': 'warn',
        'jsdoc/implements-on-classes': 'warn',
        'jsdoc/multiline-blocks': 'warn',
        'jsdoc/no-defaults': 'warn',
        'jsdoc/no-multi-asterisks': 'warn',
        'jsdoc/require-jsdoc': 'warn',
        'jsdoc/require-param': 'warn',
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-param-name': 'warn',
        'jsdoc/require-param-type': 'warn',
        'jsdoc/require-property': 'warn',
        'jsdoc/require-property-description': 'warn',
        'jsdoc/require-property-name': 'warn',
        'jsdoc/require-property-type': 'warn',
        'jsdoc/require-returns': 'warn',
        'jsdoc/require-returns-check': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-returns-type': 'warn',
        'jsdoc/require-yields': 'warn',
        'jsdoc/require-yields-check': 'warn',
        'jsdoc/tag-lines': 'warn',
        'jsdoc/valid-types': 'warn'
      }
    }
  ];
  if (typescript.enabled) {
    configs.push({
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
      'jsdoc/check-tag-names': ['warn', {
        typed: true
      }],
      'jsdoc/no-types': 'warn',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-property-type': 'off',
      'jsdoc/require-returns-type': 'off'
      }
    });
  }
  return configs;
};