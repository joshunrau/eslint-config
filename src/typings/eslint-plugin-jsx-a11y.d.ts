declare module 'eslint-plugin-jsx-a11y' {
  import { Linter } from 'eslint';
  export const configs: {
    [key: string]: {
      plugins: string[];
      rules: Linter.RulesRecord;
    };
  };
}
