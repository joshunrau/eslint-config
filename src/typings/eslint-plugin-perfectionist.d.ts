declare module 'eslint-plugin-perfectionist/configs/recommended-natural' {
  import { type ESLint, Linter } from 'eslint';
  export const rules: Linter.RulesRecord;
  export const plugins: Record<string, ESLint.Plugin>;
}
