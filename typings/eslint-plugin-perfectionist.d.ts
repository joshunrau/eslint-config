declare module 'eslint-plugin-perfectionist' {
  import { Linter } from 'eslint';
  export const configs: {
    [key: string]: Linter.Config;
    ['recommended-natural']: Linter.Config;
  };
}
