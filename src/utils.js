import path from 'path';

/**
 * Apply roots to files, if applicable
 * @param {string[]} files
 * @param {string[]} [roots]
 * @returns {string[]}
 */
export const filesFactory = (files, roots) => {
  if (!roots) {
    return files;
  }
  return roots.flatMap((root) => files.map((file) => path.join(root, file)));
};

/**
 *
 * @param {import('eslint').Linter.FlatConfig<import('eslint').Linter.RulesRecord>[]} configs
 * @param {string[]} [roots]
 */
export const applyFilesFactory = (configs, roots) => {
  return configs.map((config) => {
    const files = /** @type {string[] | undefined} */ (config.files);
    if (!files) {
      return config;
    }
    return { ...config, files: filesFactory(files, roots) };
  });
};
