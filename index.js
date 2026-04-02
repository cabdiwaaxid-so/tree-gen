#!/usr/bin/env node

const fs = require("fs");
const { createFromTree, createFromPaths } = require("./parser");

const args = process.argv.slice(2);
let force = false;

if (args.includes("--force") || args.includes("-f")) {
  force = true;
  const forceIndex = args.findIndex(arg => arg === "--force" || arg === "-f");
  args.splice(forceIndex, 1);
}

if (!args.length) {
  process.stdout.write(
    "Provide input\nExamples:\n  tree-gen structure.txt\n  tree-gen --force structure.txt\n  tree-gen \"tree string\"\n  tree-gen my-app/src/app.js\n"
  );
  process.exit(1);
}

const input = args.join(" ");

if (fs.existsSync(input)) {
  const tree = fs.readFileSync(input, "utf-8");
  createFromTree(tree, force);
  process.stdout.write("Project created\n");
} else if (input.includes("├") || input.includes("│")) {
  createFromTree(input, force);
  process.stdout.write("Project created\n");
} else {
  const paths = args;
  createFromPaths(paths, force);
  process.stdout.write("Project created\n");
}