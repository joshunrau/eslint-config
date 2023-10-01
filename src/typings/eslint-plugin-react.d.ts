declare module 'eslint-plugin-react' {
  import { Linter } from 'eslint';
  export const rules: {
    [key: string]: {
      create: (...args: any[]) => any;
      meta: Record<string, any>;
    };
  };
  export const configs: {
    [key: string]: {
      plugins: string[];
      rules: Linter.RulesRecord;
    };
  };
}
