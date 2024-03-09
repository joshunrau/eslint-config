/**
 * @param {Required<Pick<import('../index.js').Options, "json">>} options
 * @returns {Promise<import('../index.js').FlatConfig[]>}
 */
export const jsonConfig = async ({ json }) => {
  const { default: plugin } = await import("eslint-plugin-jsonc");
  const { default: parser } = await import("jsonc-eslint-parser");
  /** @type {import('../index.js').FlatConfig[]} */
  const configs = [];
  if (json.sort.packageJson) {
    configs.push({
      files: ["**/package.json"],
      languageOptions: {
        parser,
      },
      plugins: {
        // @ts-ignore
        jsonc: plugin,
      },
      rules: {
        "jsonc/sort-array-values": [
          "warn",
          {
            order: { type: "asc" },
            pathPattern: "^files$",
          },
        ],
        "jsonc/sort-keys": [
          "warn",
          {
            order: [
              "publisher",
              "name",
              "displayName",
              "type",
              "version",
              "private",
              "packageManager",
              "description",
              "author",
              "license",
              "funding",
              "homepage",
              "repository",
              "bugs",
              "keywords",
              "categories",
              "sideEffects",
              "exports",
              "main",
              "module",
              "unpkg",
              "jsdelivr",
              "types",
              "typesVersions",
              "bin",
              "icon",
              "files",
              "engines",
              "activationEvents",
              "contributes",
              "scripts",
              "peerDependencies",
              "peerDependenciesMeta",
              "dependencies",
              "optionalDependencies",
              "devDependencies",
              "pnpm",
              "overrides",
              "resolutions",
              "husky",
              "simple-git-hooks",
              "lint-staged",
              "eslintConfig",
            ],
            pathPattern: "^$",
          },
          {
            order: { type: "asc" },
            pathPattern:
              "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$",
          },
          {
            order: { type: "asc" },
            pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$",
          },
          {
            order: ["types", "import", "require", "default"],
            pathPattern: "^exports.*$",
          },
        ],
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
      },
    });
  }
  if (json.sort.tsconfig) {
    configs.push({
      files: ["**/jsconfig.json", "**/tsconfig.json", "**/tsconfig.*.json"],
      rules: {
        "jsonc/sort-keys": [
          "warn",
          {
            order: [
              "extends",
              "compilerOptions",
              "references",
              "files",
              "include",
              "exclude",
            ],
            pathPattern: "^$",
          },
        ],
      },
    });
  }
  return configs;
};