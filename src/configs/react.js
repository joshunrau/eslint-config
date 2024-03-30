/**
 * @param {Required<Pick<import('../index.js').Options, "typescript">>} options
 * @returns {Promise<import('../index.js').FlatConfig[]>}
 */
export const reactConfig = async ({ typescript }) => {
  const { default: jsxA11yPlugin } = await import('eslint-plugin-jsx-a11y');
  const { default: reactPlugin } = await import('eslint-plugin-react');
  return [
    {
      files: typescript.enabled ? ['**/*.jsx', '**/*.tsx'] : ['**/*.jsx'],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        }
      },
      plugins: {
        'jsx-a11y': jsxA11yPlugin,
        react: reactPlugin
      },
      rules: {
        ...reactPlugin.configs['recommended']?.rules,
        ...jsxA11yPlugin.configs['recommended']?.rules,
        'no-alert': 'error',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function'
          }
        ],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off'
      },
      settings: {
        react: {
          version: 'detect'
        }
      }
    },
    {
      files: ['**/*.stories.jsx', '**/*.stories.tsx'],
      rules: {
        'no-alert': 'off'
      }
    }
  ];
};
