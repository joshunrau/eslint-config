# ESLint Config

## Install

```shell
pnpm add -D @joshunrau/eslint-config eslint
```

## Usage

**eslint.config.js**

```javascript
import { config } from '@joshunrau/eslint-config';

// These are the defaults, override as needed depending on project
export default config({
  astro: { enabled: false },
  env: { browser: true, es2021: true, node: true },
  exclude: [],
  jsdoc: { enabled: false },
  json: { enabled: true, sort: { packageJson: true, tsconfig: true } },
  perfectionist: { enabled: true },
  react: { enabled: false },
  typescript: { enabled: true }
});

```

## VSCode

**settings.json**

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "astro",
    "typescript",
    "typescriptreact",
    "javascript",
    "javascriptreact",
    "json",
    "jsonc"
  ]
}
```
