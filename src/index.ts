import path from 'path';

import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';
import type { ESLint, Linter } from 'eslint';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

type FlatConfig = Linter.FlatConfig;

const filesFactory = (files: string[], roots?: string[]) => {
  if (!roots) {
    return files;
  }
  return roots.flatMap((root) => files.map((file) => path.join(root, file)));
};

export type ConfigOptions = {
  astro?: boolean;
  base?: {
    env?: 'browser' | 'node' | 'shared-node-browser';
    fileRoots?: string[];
  };
  jsx?: boolean;
  ts?: {
    project: string;
  };
};

export const createBase = ({ base }: ConfigOptions): FlatConfig => ({
  files: filesFactory(['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx'], base?.fileRoots),
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

export const createJsx = ({ base, ts }: ConfigOptions): FlatConfig[] => {
  return [
    {
      files: filesFactory(ts ? ['**/*.jsx', '**/*.tsx'] : ['**/*.jsx'], base?.fileRoots),
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
      files: filesFactory(['**/*.stories.jsx', '**/*.stories.tsx'], base?.fileRoots),
      rules: {
        'no-alert': 'off'
      }
    }
  ];
};

export const createTypeScript = ({ astro, base, jsx, ts }: ConfigOptions): FlatConfig[] => {
  return [
    {
      files: filesFactory(['**/*.ts', '**/*.tsx'], base?.fileRoots),
      languageOptions: {
        parser: tsParser as Linter.ParserModule,
        parserOptions: {
          ecmaFeatures: {
            jsx
          },
          extraFileExtensions: astro ? ['.astro'] : undefined,
          project: ts?.project,
          sourceType: 'module'
        }
      },
      plugins: {
        '@typescript-eslint': tsPlugin as Record<string, ESLint.Plugin>
      },
      rules: {
        ...tsPlugin.configs['eslint-recommended'].rules,
        ...tsPlugin.configs.recommended.rules,
        ...tsPlugin.configs['recommended-type-checked'].rules,
        ...tsPlugin.configs['stylistic-type-checked'].rules,
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        "@typescript-eslint/no-explicit-any": "off",
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allowBoolean: true,
            allowNever: true,
            allowNumber: true,
          }
        ],
        'no-redeclare': 'off',
        'no-undef': 'off'
      }
    },
    {
      files: filesFactory(['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'], base?.fileRoots),
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off'
      }
    }
  ];
};

export const createAstro = ({ base }: ConfigOptions): FlatConfig => {
  return {
    files: filesFactory(['*.astro'], base?.fileRoots),
    languageOptions: {
      parser: astroParser as Linter.ParserModule,
      parserOptions: {
        extraFileExtensions: ['.astro'],
        parser: tsParser
      }
    }
  };
};

export const createPerfectionist = (): FlatConfig => {
  return {
    plugins: {
      perfectionist
    },
    rules: {
      ...perfectionist.configs['recommended-natural'].rules,
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
  };
};

export const createConfig = (options: ConfigOptions = {}) => {
  const config: FlatConfig[] = [{ ignores: ['build/*', 'dist/*'] }, createBase(options)];
  if (options.jsx) config.push(...createJsx(options));
  if (options.ts) config.push(...createTypeScript(options));
  if (options.astro) config.push(createAstro(options));
  config.push(createPerfectionist());
  return config;
};
