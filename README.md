# ESLint Config

This repository houses my ESLint configurations for various project types. In all cases, the use of TypeScript is assumed and it is required to specify the path to the TSConfig file.

## Extend the Base Config

```json
{
  "extends": ["@joshunrau"],
  "parserOptions": {
    "project": ["./tsconfig.json"]
  }
}
```

## Extend Another Config

```json
{
  "extends": ["@joshunrau/eslint-config/react"],
  "parserOptions": {
    "project": ["./tsconfig.json"]
  }
}
```