module.exports = {
  env: {
    browser: true,
  },
  extends: ["./index", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  rules: {
    "import/order": [
      "warn",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        "newlines-between": "always",
        pathGroups: [
          {
            group: "external",
            pattern: "react",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
      },
    ],
  },
  settings: {
    "import/extensions": [".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    react: {
      version: "detect",
    },
  },
};
