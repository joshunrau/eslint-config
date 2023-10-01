import type { ESLint, Linter } from 'eslint';

import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

type ConfigOptions = {
  base?: {
    env?: 'browser' | 'node' | 'shared-node-browser';
  };
  jsx?: boolean;
  ts?: {
    project: string;
  };
};

type FlatConfig = Linter.FlatConfig;

const createBase = ({ base }: ConfigOptions): FlatConfig => ({
  files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: {
      ...globals[base?.env ?? 'shared-node-browser']
    }
  },
  rules: {
    ...js.configs.recommended.rules
  }
});

const createJsx = (): FlatConfig => {
  return {
    files: ['**/*.jsx', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser
      },
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
      ...reactPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
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
  };
};

const createTypeScript = ({ jsx, ts }: ConfigOptions): FlatConfig => {
  return {
    files: jsx ? ['**/*.ts', '**/*.tsx'] : ['**/*.ts'],
    languageOptions: {
      parser: tsParser as Linter.ParserModule,
      parserOptions: {
        ecmaFeatures: {
          jsx
        },
        project: ts?.project,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin as Record<string, ESLint.Plugin>
    },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...tsPlugin.configs['recommended'].rules,
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...tsPlugin.configs['stylistic-type-checked'].rules,
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowBoolean: true,
          allowNumber: true
        }
      ]
    }
  };
};

const createConfig = (options: ConfigOptions = {}) => {
  const config: FlatConfig[] = [createBase(options)];
  if (options.jsx) config.push(createJsx());
  if (options.ts) config.push(createTypeScript(options));
  config.push(perfectionistNatural);
  return config;
};

export { type ConfigOptions, createConfig };
