module.exports = {
  // JavaScript/TypeScript files
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write', 'git add'],

  // JSON files
  '*.json': ['prettier --write', 'git add'],

  // Markdown files
  '*.md': ['prettier --write', 'git add'],

  // Style files (if any)
  '*.{css,scss,less}': ['prettier --write', 'git add'],

  // YAML files
  '*.{yml,yaml}': ['prettier --write', 'git add'],
};
