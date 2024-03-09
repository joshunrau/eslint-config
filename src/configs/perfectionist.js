/**
 * @returns {Promise<import('../index.js').FlatConfig[]>}
 */
export const perfectionistConfig = async () => {
  const { default: perfectionistPlugin } = await import('eslint-plugin-perfectionist');
  return [
    {
      plugins: {
        perfectionist: perfectionistPlugin
      },
      rules: {
        ...perfectionistPlugin.configs['recommended-natural'].rules,
        'perfectionist/sort-classes': [
          'error',
          {
            groups: [
              'index-signature',
              'static-property',
              'property',
              'private-property',
              'constructor',
              'static-method',
              'static-private-method',
              ['get-method', 'set-method'],
              'method',
              'private-method',
              'unknown'
            ],
            order: 'asc',
            type: 'natural'
          }
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            'custom-groups': {
              type: {
                react: ['react', 'react-dom/*']
              },
              value: {
                react: ['react', 'react-dom/*']
              }
            },
            groups: [
              'react',
              ['builtin', 'builtin-type'],
              ['external', 'external-type'],
              ['internal', 'internal-type'],
              ['index', 'sibling', 'parent'],
              'type',
              'style',
              'unknown'
            ],
            'internal-pattern': ['@/**'],
            'newlines-between': 'always',
            type: 'natural'
          }
        ],
        'perfectionist/sort-jsx-props': [
          'error',
          {
            'custom-groups': {
              callback: 'on*'
            },
            groups: ['shorthand', 'unknown', 'callback'],
            order: 'asc',
            type: 'natural'
          }
        ]
      }
    }
  ];
};