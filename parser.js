const fs = require("fs");
const path = require("path");

/**
 * Creates files and folders from an ASCII tree representation
 * @param {string} tree - ASCII tree string with ├──, └──, and │ characters
 * @param {boolean} [force=false] - Whether to overwrite existing files
 * @returns {void}
 */
function createFromTree(tree, force = false) {
  const lines = tree.split("\n").filter(Boolean);
  const stack = [];
  let root = "";

  for (const line of lines) {
    const depth = (line.match(/│/g) || []).length;

    const name = line
      .replace(/[├└│─]/g, "")
      .trim();

    if (!root) {
      root = name.replace(/\//g, "");
      fs.mkdirSync(root, { recursive: true });
      stack[0] = root;
      continue;
    }

    const parent = stack[depth];
    const fullPath = path.join(parent, name.replace(/\//g, ""));

    if (name.endsWith("/")) {
      fs.mkdirSync(fullPath, { recursive: true });
      stack[depth + 1] = fullPath;
    } else {
      if (force || !fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, "");
      }
    }
  }
}

/**
 * Creates files and folders from an array of paths
 * @param {string[]} paths - Array of file/directory paths to create
 * @param {boolean} [force=false] - Whether to overwrite existing files
 * @returns {void}
 */
function createFromPaths(paths, force = false) {
  for (const p of paths) {
    const normalized = path.normalize(p);
    const dir = normalized.endsWith(path.sep)
      ? normalized
      : path.dirname(normalized);

    fs.mkdirSync(dir, { recursive: true });

    if (!normalized.endsWith(path.sep)) {
      if (force || !fs.existsSync(normalized)) {
        fs.writeFileSync(normalized, "");
      }
    }
  }
}

module.exports = {
  createFromTree,
  createFromPaths
};