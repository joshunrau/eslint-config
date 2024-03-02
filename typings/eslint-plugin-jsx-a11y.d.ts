declare module 'eslint-plugin-jsx-a11y' {
  import { Linter } from 'eslint';
  export const configs: Record<
    string,
    {
      plugins: string[];
      rules: Linter.RulesRecord;
    }
  >;
}
