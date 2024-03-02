declare module 'eslint-plugin-react' {
  import { Linter } from 'eslint';
  export const configs: Record<string, Linter.Config>;
}
