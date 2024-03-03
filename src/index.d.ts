import type { Linter } from 'eslint';

declare type FlatConfig = Linter.FlatConfig;

declare type Factory<T extends Record<string, unknown> = Record<string, unknown>> = (
  options?: T
) => Promise<FlatConfig[]>;

declare type Options = {
  env?: {
    browser?: boolean;
    es2021?: boolean;
    node?: boolean;
  };
  exclude?: string[];
  jsdoc?: {
    enabled: boolean;
  };
  json?: {
    enabled: boolean;
    sort: {
      packageJson: boolean;
      tsconfig: boolean;
    };
  };
  perfectionist?: {
    enabled: boolean;
  };
  react?: {
    enabled: boolean;
  };
  typescript?: {
    enabled: boolean;
  };
};

export declare const config: Factory<Options>;

export as namespace ESLintConfig;
