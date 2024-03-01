import type { ESLint, Linter } from 'eslint';

export type FlatConfig = Linter.FlatConfig;

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

export type { ESLint, Linter };
