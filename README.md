# ESLint Config

## About

This repository houses my ESLint configurations for various types of TypeScript projects.

## Install

```
$ npx install-peerdeps --dev @joshunrau/eslint-config
```

Please note that this will install all peer dependencies, including those which may be unnecessary (e.g., `eslint-plugin-react` for a project that only uses the `node` config).

## Usage

In your `.eslintrc` file, you can extend either the base configuration provided in `src/index.js` or any of the other configurations in `src`, as shown in the examples below. As all configs rely on type-aware static analysis rules, you must specify `parserOptions.project` in your config.

**Extend the Base Config**

```json
{
  "extends": ["@joshunrau"],
  "parserOptions": {
    "project": ["./tsconfig.json"]
  }
}
```

**Extend The React Config**

```json
{
  "extends": ["@joshunrau/eslint-config/react"],
  "parserOptions": {
    "project": ["./tsconfig.json"]
  }
}
```
