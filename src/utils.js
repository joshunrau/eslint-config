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
